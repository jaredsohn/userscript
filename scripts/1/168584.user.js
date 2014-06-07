// ==UserScript==
// @name        Hide elements for kafan
// @namespace   Hide_elements_for_kafan
// @description  Hide elements for kafan
// @include     *.kafan.cn/thread-*
// @include    *kafan.cn/forum.php?mod=viewthread*
// @version     1.2
// @icon http://a.ikafan.com/5/000/53/99/15_avatar_small.jpg
// @author 		loms126
// ==/UserScript==



//******************************************************************************************

window.getPagearea=function (){
　　　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　width: Math.max(document.body.scrollWidth,
　　　　　　　　　　　　　　　　document.body.clientWidth),
　　　　　　　　height: Math.max(document.body.scrollHeight,
　　　　　　　　　　　　　　　　document.body.clientHeight)
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　width: Math.max(document.documentElement.scrollWidth,
　　　　　　　　　　　　　　　　document.documentElement.clientWidth),
　　　　　　　　height: Math.max(document.documentElement.scrollHeight,
　　　　　　　　　　　　　　　　document.documentElement.clientHeight)
　　　　　　}
　　　　}
　　}
function getPageScrollPosition(){
var posX,posY;  
    if (window.innerHeight) {  
        posX = window.pageXOffset;  
        posY = window.pageYOffset;  
    }  
    else if (document.documentElement && document.documentElement.scrollTop) {  
        posX = document.documentElement.scrollLeft;  
        posY = document.documentElement.scrollTop;  
    }  
    else if (document.body) {  
        posX = document.body.scrollLeft;  
        posY = document.body.scrollTop;  
    }  
	return{
		posX: posX,
		posY: posY
	}
}
window.getViewport=function(){
　　　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　width: document.body.clientWidth,
　　　　　　　　height: document.body.clientHeight
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　width: document.documentElement.clientWidth,
　　　　　　　　height: document.documentElement.clientHeight
　　　　　　}
　　　　}
　　}
//===============================================================================================

function getKeyScrollFunc(e){
  if (document.activeElement.id!="nv_forum")
  	return
  e = e || window.event;
  var keycode = e.which ? e.which : e.keyCode;
  if (e.altKey || e.shiftKey || e.ctrlKey )
  	return
  switch (keycode)
	  {
		  case 73:  //i
		  	if (localStorage['Autoscroll_checkbox_hide.98']=='1')
				{localStorage['Autoscroll_checkbox_hide.98']='0'
				try{document.getElementById('Autoscroll_checkbox_hide_98').checked=false;}	catch(e){};
				}				
			else
				{
					localStorage['Autoscroll_checkbox_hide.98']='1';
					try{document.getElementById('Autoscroll_checkbox_hide_98').checked=true;}	catch(e){};
					localStorage['Autoscroll_checkbox_hide.99']='0'
					try{document.getElementById('Autoscroll_checkbox_hide_99').checked=false;}	catch(e){};
				}
		  	refreshHideState();
			break;
		  case 79:  //o
		  	if (localStorage['Autoscroll_checkbox_hide.99']=='1')
				{localStorage['Autoscroll_checkbox_hide.99']='0'
				try{document.getElementById('Autoscroll_checkbox_hide_99').checked=false;}	catch(e){};
				}				
			else
				{
					localStorage['Autoscroll_checkbox_hide.99']='1';
					try{document.getElementById('Autoscroll_checkbox_hide_99').checked=true;}	catch(e){};
					localStorage['Autoscroll_checkbox_hide.98']='0'
					try{document.getElementById('Autoscroll_checkbox_hide_98').checked=false;}	catch(e){};
				}
		  	refreshHideState();
			break
		case 80:  //p
			show_hide_setting();
			break;
	  }

 }
//=====================================================================================================

//======================================================================================================

//------------------------------------------------------------------------------------------------------
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...

 //（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（
 function hideByClassName(classname,show_flag)
 {
	var class_Arr=document.getElementsByClassName(classname);
	for (var i=0;i<class_Arr.length;i++)
	{
		if(show_flag>0)
			class_Arr[i].style.display='';
		else
			class_Arr[i].style.display='none';
	}
 }
 function hideByQuery(pattern,show_flag)
 {
	var class_Arr= document.querySelectorAll(pattern);
	for (var i=0;i<class_Arr.length;i++)
	{
		if(show_flag>0)
			class_Arr[i].style.display='';
		else
			class_Arr[i].style.display='none';
	}
 }
 function hideLargeAvatar(show_flag)
 {
	var avatar_Arr=document.querySelectorAll('div[class=avatar][onmouseover]');
	for (var i=0;i<avatar_Arr.length;i++)
	{
		img_node=avatar_Arr[i].querySelector('img')
		if(show_flag>0)
			img_node.src=img_node.src.replace('small','middle');
		else
			img_node.src=img_node.src.replace('middle','small');
	}
	avatar_Arr=document.getElementsByClassName('p_pop blk bui');
	for (var i=0;i<avatar_Arr.length;i++)
	{
		img_node=avatar_Arr[i].querySelector('img')
		if(show_flag>0)
			img_node.src=img_node.src.replace('small','middle');
		else
			img_node.src=img_node.src.replace('middle','small');
	}
 }
   function hideBrand(show_flag)
 {
	var avatar_Arr=document.querySelectorAll('div[class=avatar][onmouseover]');
	for (var i=0;i<avatar_Arr.length;i++)
	{
	  if(avatar_Arr[i].parentNode.querySelector('p>a>img'))
	  {
		if(show_flag>0)
			avatar_Arr[i].parentNode.querySelector('p>a>img').style.display='';
		else
			avatar_Arr[i].parentNode.querySelector('p>a>img').style.display='none';
	  }
	}
 }
 
 function hideLevel(show_flag)
 {
	var avatar_Arr=document.querySelectorAll('div[class=avatar][onmouseover]');
	for (var i=0;i<avatar_Arr.length;i++)
	{
	  if(avatar_Arr[i].parentNode.querySelector('p>em>a'))
	  {
		if(show_flag>0)
			avatar_Arr[i].parentNode.querySelector('p>em>a').style.display='';
		else
			avatar_Arr[i].parentNode.querySelector('p>em>a').style.display='none';
	  }
	}
 }
 function hideStar(show_flag)
 {
	var star_Arr=document.querySelectorAll('tbody>tr>td>p>img');
	for (var i=0;i<star_Arr.length;i++)
	{
		if(show_flag>0)	
		  star_Arr[i].style.display='';
		else	
		  star_Arr[i].style.display='none';
	}
 }
 
 function hideExceptNickName(show_flag)
 {
 	class_Arr=document.getElementsByClassName('pil cl')
	for (var i=0;i<class_Arr.length;i++)
	{
	  var children =class_Arr[i].childNodes;
	  for(j=2;j<children.length;j++){
	    if(show_flag>0)
		children[j].style.display='';
	      else
		children[j].style.display='none';
	  }
	}
 }
 
function hideNickName2Equipment(item_name,show_flag)
{var temp_Arr=document.querySelectorAll('div>table>tbody>tr>td>dl>dt');
	for (var i=0;i<temp_Arr.length;i++)
	{if(temp_Arr[i].innerText==item_name)
		{if(show_flag>0){temp_Arr[i].style.display=temp_Arr[i].nextSibling.style.display='';}
	     	else{temp_Arr[i].style.display=temp_Arr[i].nextSibling.style.display='none';}}}}
window.refreshHideState=function()
 {
	var position_now=getPageScrollPosition().posY;
	var inview_post=null;
	var offset_Y=null;
    var post_Arr=document.querySelectorAll('div[id=postlist]>div')
	for (var i=0;i< post_Arr.length;i++)
		{
		if(post_Arr[i].getBoundingClientRect().top > 0)
			{
				inview_post=post_Arr[i];
				offset_Y=post_Arr[i].getBoundingClientRect().top;
				break;
			}
		}
 
	 var state_1=0;
	 var state_2=1;
	if (localStorage['Autoscroll_checkbox_hide.98'] == '1')
		state_2=0;
	if (localStorage['Autoscroll_checkbox_hide.99'] == '1')
		state_1=1;	
	 
   localStorage['Autoscroll_checkbox_hide.1.1']=='0'?hideByClassName('wp a_t',state_1):hideByClassName('wp a_t',state_2)
   //顶端新手指南表格
   localStorage['Autoscroll_checkbox_hide.1.2']=='0'?hideByQuery('tbody>tr>td>div>div>div>a[rel]',state_1):hideByQuery('tbody>tr>td>div>div>div>a[rel]',state_2)
   //只看该作者
   localStorage['Autoscroll_checkbox_hide.1.3']=='0'?hideByClassName('sign',state_1):hideByClassName('sign',state_2)
   //签名栏
   localStorage['Autoscroll_checkbox_hide.1.4']=='0'?hideByClassName('po',state_1):hideByClassName('po',state_2)
   //回复、举报栏
   localStorage['Autoscroll_checkbox_hide.1.5']=='0'?hideByClassName('mtw mbm cl',state_1):hideByClassName('mtw mbm cl',state_2)
   //主楼下部按钮
	localStorage['Autoscroll_checkbox_hide.1.6']=='0'?hideByQuery('td[class=plc]>div[class=pi]>div[class=pti]>div[class=authi]>em',state_1):hideByQuery('td[class=plc]>div[class=pi]>div[class=pti]>div[class=authi]>em',state_2)
   //发表日期
   if ((localStorage['Autoscroll_checkbox_hide.1.2']=='0') && (localStorage['Autoscroll_checkbox_hide.1.6']=='0'))
		{hideByQuery('td[class=plc]>div[class=pi]>div[class=pti]>div[class=authi]',state_1)}
	else
		{hideByQuery('td[class=plc]>div[class=pi]>div[class=pti]>div[class=authi]',state_2)}
	if ((localStorage['Autoscroll_checkbox_hide.1.2']=='0') || (localStorage['Autoscroll_checkbox_hide.1.6']=='0'))
		{hideByQuery('td[class=plc]>div[class=pi]>div[class=pti]>div[class=authi]>span',state_1)}
	else
		{hideByQuery('td[class=plc]>div[class=pi]>div[class=pti]>div[class=authi]>span',state_2)}	
   //  根据之前规则隐藏   日期项
   
   localStorage['Autoscroll_checkbox_hide.1.7']=='0'?hideByQuery('td[class=plc]>div[class=pi]',state_1):hideByQuery('td[class=plc]>div[class=pi]',state_2)
   //楼层顶栏
   localStorage['Autoscroll_checkbox_hide.1.8']=='0'?hideByQuery('td[class=plc]>div[class=pct]>div[class=a_pt]',state_1):hideByQuery('td[class=plc]>div[class=pct]>div[class=a_pt]',state_2)
   //卡饭关注
   
   
	localStorage['Autoscroll_checkbox_hide.1.1.2']=='0'?hideByQuery('body>div>div[class=wp]>div>table>tbody>tr',state_1):hideByQuery('body>div>div[class=wp]>div>table>tbody>tr',state_2)
   //顶端广告
	localStorage['Autoscroll_checkbox_hide.1.1.3']=='0'?hideByQuery('div>div>form[name=f1]',state_1):hideByQuery('div>div>form[name=f1]',state_2)
   //临时搜索

   localStorage['Autoscroll_checkbox_hide.2.1']=='0'?hideLargeAvatar(state_1):hideLargeAvatar(state_2)
   //小头像
   localStorage['Autoscroll_checkbox_hide.2.2']=='0'?hideByClassName('tns xg2',state_1):hideByClassName('tns xg2',state_2)
   //主题 听众 积分
   localStorage['Autoscroll_checkbox_hide.2.3']=='0'?hideByQuery('div>table>tbody>tr>td>div>p>a>img',state_1):hideByQuery('div>table>tbody>tr>td>div>p>a>img',state_2)
	//牌子 
   localStorage['Autoscroll_checkbox_hide.2.4']=='0'?hideByQuery('div>table>tbody>tr>td>div>p>em>a',state_1):hideByQuery('div>table>tbody>tr>td>div>p>em>a',state_2)
   //用户组
   localStorage['Autoscroll_checkbox_hide.2.5']=='0'? hideByQuery('div>table>tbody>tr>td>p>img',state_1):hideByQuery('div>table>tbody>tr>td>p>img',state_2)
   //星星
   localStorage['Autoscroll_checkbox_hide.2.6']=='0'? hideByQuery('div>table>tbody>tr>td>div>p[class=xg1]',state_1):hideByQuery('div>table>tbody>tr>td>div>p[class=xg1]',state_2)
   //自定义头衔
   localStorage['Autoscroll_checkbox_hide.2.7.1']=='0'?hideNickName2Equipment('昵称',state_1):hideNickName2Equipment('昵称',state_2)
   //昵称
   localStorage['Autoscroll_checkbox_hide.2.7.2']=='0'?hideNickName2Equipment('积分',state_1):hideNickName2Equipment('积分',state_2)
   //积分
   localStorage['Autoscroll_checkbox_hide.2.7.3']=='0'?hideNickName2Equipment('技术',state_1):hideNickName2Equipment('技术',state_2)
   //技术
   localStorage['Autoscroll_checkbox_hide.2.7.4']=='0'?hideNickName2Equipment('魅力',state_1):hideNickName2Equipment('魅力',state_2)
   //魅力
   localStorage['Autoscroll_checkbox_hide.2.7.5']=='0'?hideNickName2Equipment('人气',state_1):hideNickName2Equipment('人气',state_2)
   //人气
   localStorage['Autoscroll_checkbox_hide.2.7.6']=='0'?hideNickName2Equipment('注册时间',state_1):hideNickName2Equipment('注册时间',state_2)
   //注册时间
   localStorage['Autoscroll_checkbox_hide.2.7.7']=='0'?hideNickName2Equipment('防御装备',state_1):hideNickName2Equipment('防御装备',state_2)
   //防御装备
   
   
   localStorage['Autoscroll_checkbox_hide.2.8']=='0'?   hideByClassName('xl xl2 o cl',state_1):hideByClassName('xl xl2 o cl',state_2)
   //收听TA，发消息//收听TA，发消息
  
   localStorage['Autoscroll_checkbox_hide.3.1']=='0'?   hideByQuery('body>div>center>div[display=banner]',state_1):hideByQuery('body>div>center>div[display=banner]',state_2)
   //底部广告
    localStorage['Autoscroll_checkbox_hide.3.2']=='0'?   hideByQuery('#f_pst',state_1):hideByQuery('#f_pst',state_2)
   //快速回复
   
   
   
   if (inview_post)
   {
	scroll(0,inview_post.offsetTop-offset_Y);
	}
	else
	{scroll(0,position_now)}
   
}
window.show_hide_setting=function()
{

if(document.getElementById('hide_setting_windows'))
	document.getElementById('hide_setting_windows').parentNode.removeChild(document.getElementById('hide_setting_windows'))
else
{
temp_node=document.createElement('div');
temp_node.innerHTML='<div id=\"fwin_rate\" class=\"fwinmask\" style=\"position: fixed; z-index: 201; left: 12px; top: 28px;\" initialized=\"true\"><style type=\"text/css\">object{visibility:hidden;}</style><table cellpadding=\"0\" cellspacing=\"0\" class=\"fwin\"><tbody><tr><td class=\"t_l\"></td><td class=\"t_c\" style=\"cursor:move\" onmousedown=\"dragMenu($(\'fwin_rate\'), event, 1)\" ondblclick=\"document.getElementById(\'hide_setting_windows\').parentNode.removeChild(document.getElementById(\'hide_setting_windows\'))\"></td><td class=\"t_r\"></td></tr><tr><td class=\"m_l\" style=\"cursor:move\" onmousedown=\"dragMenu($(\'fwin_rate\'), event, 1)\" ondblclick=\"document.getElementById(\'hide_setting_windows\').parentNode.removeChild(document.getElementById(\'hide_setting_windows\'))\" )\"=\"\">&nbsp;&nbsp;</td><td class=\"m_c\" id=\"fwin_content_rate\" style=\"\" fwin=\"rate\"><div class=\"tm_c\" id=\"floatlayout_topicadmin\" fwin=\"rate\"><h3 class=\"flb\" id=\"fctrl_rate\" style=\"cursor: move;\"><em id=\"return_rate\" fwin=\"rate\">设置面板</em><span><a href=\"javascript:;\" class=\"flbc\" onclick=\"document.getElementById(\'hide_setting_windows\').parentNode.removeChild(document.getElementById(\'hide_setting_windows\'))\" title=\"关闭\">关闭</a></span></h3><form id=\"rateform\" method=\"post\" autocomplete=\"off\" action=\"\" onsubmit=\"\" fwin=\"rate\"><table cellspacing=\"0\" cellpadding=\"0\" class=\"dt mbm\"><tbody><tr><th>顶端表格：&nbsp;&nbsp; </th><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_1\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.1\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.1\'] = \'1\';refreshHideState();\">顶端表格</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_1_2\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.1.2\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.1.2\'] = \'1\';refreshHideState();\">广告</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_1_3\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.1.3\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.1.3\'] = \'1\';refreshHideState();\">临时搜索</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><th> 楼层设置： &nbsp;&nbsp; </th><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_2\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.2\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.2\'] = \'1\';refreshHideState();\">只看此ID</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_6\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.6\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.6\'] = \'1\';refreshHideState();\">发表日期</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_7\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.7\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.7\'] = \'1\';refreshHideState();\">楼层顶栏</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_8\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.8\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.8\'] = \'1\';refreshHideState();\">关注卡饭</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_5\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.5\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.5\'] = \'1\';refreshHideState();\">主楼按钮</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_3\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.3\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.3\'] = \'1\';refreshHideState();\">签名栏</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_1_4\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.1.4\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.1.4\'] = \'1\';refreshHideState();\">回复举报</td></tr><tr><th> 左侧信息：&nbsp;&nbsp; </th><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_1\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.1\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.1\'] = \'1\';refreshHideState();\">小头像</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_2\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.2\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.2\'] = \'1\';refreshHideState();\">主题</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_3\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.3\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.3\'] = \'1\';refreshHideState();\">牌子</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_4\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.4\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.4\'] = \'1\';refreshHideState();\">组别</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_5\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.5\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.5\'] = \'1\';refreshHideState();\">星星&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_6\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.6\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.6\'] = \'1\';refreshHideState();\">头衔</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_8\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.8\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.8\'] = \'1\';refreshHideState();\">收听</td></tr><tr><th> 用户信息：&nbsp;&nbsp; </th><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_1\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.1\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.1\'] = \'1\';refreshHideState();\">昵称</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_2\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.2\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.2\'] = \'1\';refreshHideState();\">积分</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_3\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.3\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.3\'] = \'1\';refreshHideState();\">技术</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_4\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.4\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.4\'] = \'1\';refreshHideState();\">魅力</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_5\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.5\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.5\'] = \'1\';refreshHideState();\">人气</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_6\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.6\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.6\'] = \'1\';refreshHideState();\">注册时间</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_2_7_7\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.2.7.7\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.2.7.7\'] = \'1\';refreshHideState();\">装备</td></tr><th> 底部表格：&nbsp;&nbsp; </th><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_3_2\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.3.2\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.3.2\'] = \'1\';refreshHideState();\">快速回复</td><td><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_3_1\" class=\"pc\" value=\"1\" onclick=\"this.checked?localStorage[\'Autoscroll_checkbox_hide.3.1\'] = \'0\':localStorage[\'Autoscroll_checkbox_hide.3.1\'] = \'1\';refreshHideState();\">广告</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p class=\"o pns\"><label><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_98\" class=\"pc\" value=\"1\" onclick=\"this.checked?(localStorage[\'Autoscroll_checkbox_hide.98\'] = \'1\',document.getElementById(\'Autoscroll_checkbox_hide_99\').checked?document.getElementById(\'Autoscroll_checkbox_hide_99\').click():null):(localStorage[\'Autoscroll_checkbox_hide.98\']=\'0\');refreshHideState();\">全部隐藏</label><span class=\"pipe\">|</span><label><input type=\"checkbox\" id=\"Autoscroll_checkbox_hide_99\" class=\"pc\" value=\"1\" onclick=\"this.checked?(localStorage[\'Autoscroll_checkbox_hide.99\'] = \'1\',document.getElementById(\'Autoscroll_checkbox_hide_98\').checked?document.getElementById(\'Autoscroll_checkbox_hide_98\').click():null):localStorage[\'Autoscroll_checkbox_hide.99\'] = \'0\';refreshHideState();\">全部显示</label><span class=\"pipe\">|</span><button  value=\"true\" onclick=\"document.getElementById(\'hide_setting_windows\').parentNode.removeChild(document.getElementById(\'hide_setting_windows\'))\"  class=\"pn pnc\"><span>关闭</span></button></p></div></form></div></td><td class=\"m_r\" style=\"cursor:move\" onmousedown=\"dragMenu($(\'fwin_rate\'), event, 1)\" ondblclick=\"document.getElementById(\'hide_setting_windows\').parentNode.removeChild(document.getElementById(\'hide_setting_windows\'))\" \"=\"\"></td></tr><tr><td class=\"b_l\"></td><td class=\"b_c\" style=\"cursor:move\" onmousedown=\"dragMenu($(\'fwin_rate\'), event, 1)\" ondblclick=\"document.getElementById(\'hide_setting_windows\').parentNode.removeChild(document.getElementById(\'hide_setting_windows\'))\"></td><td class=\"b_r\"></td></tr></tbody></table></div>';
temp_node.id='hide_setting_windows';
document.getElementById('append_parent').insertBefore(temp_node,null);
if ( getViewport().width>980)
	document.getElementById('fwin_rate').style.left=(getViewport().width/2-200)+'px'
if ( getViewport().height>760)
	document.getElementById('fwin_rate').style.top=(getViewport().height/2-100)+'px'	
//document.getElementById('fwin_rate').style.left='40px'
temp_node=null;
for(var i=1;i<9;i++)
{
	if(localStorage['Autoscroll_checkbox_hide.1.'+i]=='0')
		document.getElementById('Autoscroll_checkbox_hide_1_'+i).checked=true;
}
for(var i=1;i<7;i++)
{
	if(localStorage['Autoscroll_checkbox_hide.2.'+i]=='0')
		document.getElementById('Autoscroll_checkbox_hide_2_'+i).checked=true;
}
for(var i=1;i<3;i++)
{
	if(localStorage['Autoscroll_checkbox_hide.3.'+i]=='0')
		document.getElementById('Autoscroll_checkbox_hide_3_'+i).checked=true;
}

for(var i=1;i<8;i++)
{
	if(localStorage['Autoscroll_checkbox_hide.2.7.'+i]=='0')
		document.getElementById('Autoscroll_checkbox_hide_2_7_'+i).checked=true;
}
if(localStorage['Autoscroll_checkbox_hide.2.8']=='0')
		document.getElementById('Autoscroll_checkbox_hide_2_8').checked=true;
if(localStorage['Autoscroll_checkbox_hide.98']=='1')
		document.getElementById('Autoscroll_checkbox_hide_98').checked=true;
if(localStorage['Autoscroll_checkbox_hide.99']=='1')
		document.getElementById('Autoscroll_checkbox_hide_99').checked=true;
////////////////////////////////////////////////
if(localStorage['Autoscroll_checkbox_hide.1.1.2']=='0')
		document.getElementById('Autoscroll_checkbox_hide_1_1_2').checked=true;
if(localStorage['Autoscroll_checkbox_hide.1.1.3']=='0')
		document.getElementById('Autoscroll_checkbox_hide_1_1_3').checked=true;		
		
}
}

//if(localStorage['Autoscroll_checkbox_hide.1.1.2']=='0')
//		document.getElementById('Autoscroll_checkbox_hide_1_1_2').checked=true;


//******************************************************************************************	KEY	listener

if (document.addEventListener) {
          document.addEventListener( "keyup" ,getKeyScrollFunc, false );
     } else if (document.attachEvent) {
          document.attachEvent( "onkeyup" ,getKeyScrollFunc);
     } else {
         document.onkeyup = getKeyScrollFunc;
}
//===============================================

 //==================================================
 //setting button
var setting_button=document.createElement('a')
setting_button.innerHTML='<a onclick="show_hide_setting()">页面精简设置</a>'
document.getElementById('sslct').parentNode.appendChild(setting_button.children[0])
 

refreshHideState()
window.setTimeout(function() { refreshHideState() }, 1000);
window.setTimeout(function() { refreshHideState() }, 5000);
window.setTimeout(function() { refreshHideState() }, 15000);