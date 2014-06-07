// ==UserScript==
// @name		GM图片化完美版
// @namespace		http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include		http://tieba.baidu.com/*
// @grant		GM_xmlhttpRequest
// @grant		GM_deleteValue
// @grant		GM_addStyle
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		unsafeWindow
// @require		http://code.jquery.com/jquery-1.6.js
// @updateURL		https://userscripts.org/scripts/source/155920.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155920.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		527836355 、林小鹿吧、雨滴在心头 
// @version		1.1.1.1.1
// ==/UserScript==
if(!GM_getValue('family'))
{GM_setValue('family','微软雅黑');} 
if(!unsafeWindow.FlashImageLoader)
{
var sc=document.createElement('script');
sc.setAttribute('src','http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
document.body.appendChild(sc);
};
var color='#333333';//默认字体颜色
GM_addStyle('#edit_parent{width:600px!important;}');//解决按钮排列
GM_addStyle('td .tb-editor-editarea img{vertical-align:sub!important;}');
GM_addStyle('#fontchange{background:rgb(65,137,244)!important;}');
GM_addStyle('td .tb-editor-editarea{width:560px!important;}');
GM_addStyle('.subbtn_bg{margin-right:4px!important;margin-bottom:3px!important;}');
$('.pt_submit').append('<input id="only"  class="subbtn_bg" type="button" value="图片化" />');
$('.pt_submit').append('<input id="kai" style="width:32px;" class="subbtn_bg" type="button" value=">>" />');
$('#kai').toggle(function(){this.value="<<";$('#fontchange,#la,#cochange,#colorboard').fadeIn();},
				function(){this.value='>>';$('#fontchange,#la,#cochange,#colorboard').fadeOut();});
$('.pt_submit').append('<input id="cochange"  type="button" style="color:white;background:#333333;width:50px;height:26px;display:none;border:none;" />');//换色按钮
$('.pt_submit').append('<select id="fontchange"  style="display:none" class="subbtn_bg" ><option selected="selected">'+GM_getValue('family')+'</option><option id="diy">添加字体</option><option id="move">删除字体</option><option id="size">自定义默认大小</option><option id="morenziti">自定义默认字体</option></select>');
$('.pt_submit').append('<span style="display:none" id="la"><input   id="fontSize" style="width:30px!important;margin-right:2px;height:26px!important;"  type="text"  value="14" /></span>');
$('#fontchange').change(function(){$('td .tb-editor-editarea').css('font-family',this.value);});
$('td .tb-editor-editarea').css('font-family',document.getElementById('fontchange').value);
$('#size').click(function(){var moren=prompt('请输入你默认的字体大小（纯数字)');if(moren){GM_setValue('defaultsize',moren);}});
if(!GM_getValue('defaultsize')){GM_setValue('defaultsize','14');} else document.getElementById('fontSize').value=GM_getValue('defaultsize');
$("#fontSize").change(function(){$('.tb-editor-editarea').css('font-size',this.value+'px');$('.tb-editor-editarea').css('line-height',Math.round(1.5*this.value)+'px')});
$("#fontSize").keydown(function(e){if(e.keyCode==13){e.preventDefault();e.stopPropagation();this.blur();}});
$('#morenziti').click(function (){var t=prompt("请输入默认字体");GM_setValue('family',t);});
document.getElementById('fontSize').addEventListener('DOMMouseScroll',function(e)
																			{	e.preventDefault();
																				e.stopPropagation();
																			
																			if(e.detail>0)
																				{if(Number(this.value)<50)
																				this.value=Number(this.value)-2;
																				 else
																				this.value=Number(this.value)-5;
																				}
																			else 
																			{if(Number(this.value)<50)
																			this.value=Number(this.value)+2;
																			else this.value=Number(this.value)+5;
																			}
																			if(Number(this.value)<=0)
																			this.value='14';
																			$('.tb-editor-editarea').css('font-size',this.value+'px');
																			$('.tb-editor-editarea').css('line-height',Math.round(1.5*this.value)+'px')
																			},false);
																		;
document.getElementById('fontchange').addEventListener('DOMMouseScroll',function(e)
																{				e.preventDefault();
																				e.stopPropagation();
																			
																			
																			if(e.detail>0&&this.selectedIndex<=(GM_getValue('allfont').split('|').length-1))
																			 {this.selectedIndex++;if(this.selectedIndex==GM_getValue('allfont').split('|').length-1) this.selectedIndex=0;}
																			else {if(this.selectedIndex>=1) this.selectedIndex--;else this.selectedIndex=GM_getValue('allfont').split('|').length-2}
																			$('td .tb-editor-editarea').css('font-family',this.value);
																			


																},false);
																			
$('#only').click(function()
				{
					var sel=window.getSelection();
					if(sel.toString().length>0)
					{
					var range=sel.getRangeAt(0);
					var arr=document.createElement('span');
					range.surroundContents(arr);
					
					$('.tb-editor-editarea').css('color','#333333');
					$('td .tb-editor-editarea span').css('color',color);
					
					toIGM(document.getElementById('fontSize').value,color,arr.innerHTML,false,arr);
					}
					else
					{
					if(document.querySelector('td .tb-editor-editarea').innerHTML!='<br>')
					toIGM(document.getElementById('fontSize').value,color,document.querySelector('td .tb-editor-editarea').innerHTML,true,null);
					}

				});//部分图片化程序
	
$('.tb-editor-editarea').css('font-size',document.getElementById('fontSize').value+'px');
$('.tb-editor-editarea').css('line-height',Math.round(1.5*document.getElementById('fontSize').value)+'px');
if(!GM_getValue('allfont'))
{GM_setValue('allfont','|');};renew();

if(document.getElementById('old_version'))
GM_addStyle("#edit_parent{width:680px!important;}");//解决按钮排列问题不够问题

$('#diy').click(function()
{
var newfont=prompt('请输入你要添加的字体\n请确保你其他的样式或脚本或网页设置没有限制字体');
if(newfont)
	{
var oldfont=GM_getValue('allfont');
if(!(oldfont.match(newfont))&&newfont)
		{
	GM_setValue('allfont',oldfont+newfont+'|');
	$('#diy').before('<option>'+newfont+'</option>');
		} 

else 
		{alert('该字体已存在或你输入有误');
		}
	}
});
$('#move').click(function()
{var xin=prompt('请输入你要删除的字体'); 
	if(xin)
	{
	var old=GM_getValue('allfont');
	if(old.match(xin))
	{
	GM_setValue('allfont',old.replace((xin+'|'),''));
	}
	
	}
});

function renew()
{if(GM_getValue('allfont'))
	{var font=GM_getValue('allfont').split('|');
	for(x in font)
		{	if(font[x].length>0)
			
			{
			$('#diy').before('<option>'+font[x]+'</option>')
			}
		}
	}
};

document.getElementById('cochange').style.marginLeft='2px';document.getElementById('cochange').style.marginRight='2px';
//功能函数
function toIGM(font_size,fontcolor,neirong,bull,node)
{		 var italic=(document.getElementById('italic').checked);
			 var bold=(document.getElementById('bold').checked);
			
		var half=Math.round(font_size/2);
			var  tb=neirong+'|';
			if(bold) font_size=Math.round(1.1*font_size);
		  var line=tb.replace(/<[^>]*>/g,'').replace(/<br>/g,'|').replace(/\|{2,}/g,'|').replace(/&nbsp;/g,' ');
		  var  width=0;
		  var maxwidth=0;
		  var str='';
		  var  man=0;
		  var full=Number(font_size);
		  var halff=Math.ceil(full/2);
		  for(i=0;i<line.length;i++)
		{	
			if(line[i]=="|")
			{width=0;man++;}
			else if(line[i].match(/[a-z]/g))
			width+=halff;
			else if(line[i].match(/[A-Z]/g))
			width+=halff;
			else if(line[i].match(/[.|,|@|#|$|%|^|&|*|?|'|"|\|\|;|`|~|=|)|(|_|+]/g))
			width+=halff;
			else 
			width+=full;
		
			if(width>555)
			{str+=("|"+line[i]);width=full;man++;maxwidth=555;}
			else
			{str+=line[i];var newmax=maxwidth;maxwidth=Math.max(width,newmax)}
			
		}
		
		var lineHeight=0;
	 if(man<=1) man=1;
	var brNums =str.split("|");
	lineHeight=Math.round(1.5*font_size);
if(lineHeight>200){lineHeight=Math.round(lineHeight*1.2/1.5);}//行高
var canvas=document.createElement('canvas');
if(italic)
canvas.width = maxwidth+Math.round(font_size/4);
else canvas.width=maxwidth+5;//设置允许的最大图片宽度
canvas.height = (man)*lineHeight;//此处不再限制长度了，听天由命吧，不要太长哦
				var cxt=canvas.getContext('2d');
				cxt.fillStyle=color;
				cxt.strokeStyle=color;
				if(document.getElementById('shadow').checked)
				{cxt.shadowColor='gray';
				cxt.shadowOffsetX=Math.ceil(font_size/25);
				cxt.shadowOffsetY=Math.ceil(font_size/25);
				cxt.shadowBlur=Math.ceil(font_size/25);
				}
			
		fontsss=(italic?'italic ':'')+(bold?'bold ':'')+font_size+'px'+' '+document.getElementById('fontchange').value;
		cxt.font=fontsss;
		for(x in brNums)
		{	
			if(font_size==14)
			{
				if(document.getElementById('kong').checked)
						cxt.strokeText(brNums[x],0,19+21*x);
				else 	cxt.fillText(brNums[x],0,19+21*x);
			}

			else 
			{ 	if(document.getElementById('kong').checked)
					cxt.strokeText(brNums[x],1,lineHeight*x+full);
				else 	
					cxt.fillText(brNums[x],1,lineHeight*x+full);
			}

			
		}	 
			
			var src=canvas.toDataURL();
			upload(src,bull,node,neirong);
			

}

 function upload(f,bu,nodes,txt) {//f是base64数据
	
			function uploadedHandler(a, d)
				{
                        var c =JSON.parse(d);//d是返回的text c是json对象
                        if (c.error_code != 0) 
						{
                                alert("图片化失败");
                        } else {
									
								var b = c.info.pic_id_encode;//c是json数据;b是地址信息；
                                var e ='http://imgsrc.baidu.com/forum/pic/item/' + b + '.png';//e是img完整地址;
								var l1=document.querySelector('td .tb-editor-editarea').innerHTML.length;
								var l2=txt.length
								if(bu&&(l2==l1))
									{
									
									var ele=txt.match(/<img[^>]*?>/g);
									if(ele)
									document.querySelector('td .tb-editor-editarea').innerHTML=ele.join('');
									else document.querySelector('td .tb-editor-editarea').innerHTML='';
									$("td .tb-editor-editarea").append("<img  class='BDE_Image' src ="+e+"><br>");
									}
								else{
									
									var img=document.createElement('img');
										img.setAttribute('class','BDE_Image');
										img.src=e;
									$(nodes).replaceWith(img);
									}
								}
					
                }
                function callback(a) 
				{
                        unsafeWindow.FlashImageLoader.bind('uploadComplete', uploadedHandler);
                        unsafeWindow.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic', f.replace(/^.*?base64,/, ''), {
                                tbs: a
                        })
					
                }//事先返回一个图片ID再返回
              GM_xmlhttpRequest({ method:'GET',
                        url: 'http://tieba.baidu.com/dc/common/imgtbs',
                        onload: function(response) 
						{
                               
								callback(JSON.parse(response.responseText).data.tbs);
                                     
                                
                        }
								});

        }

//做颜色框了
var panel=document.createElement('div');
panel.style.position='absolute';
panel.style.border='1px solid gray';
panel.style.padding='5px';
panel.style.width='185px';
panel.style.background='white';
yanse='<table id="tiao" style="width:180px;height:150px;padding-top:3px;position:relative;left:3px;"><tbody><tr><td style="border:1px solid gray;margin:1px;background:#FFFFFF" color="#FFFFFF"></td><td style="border:1px solid gray;margin:1px;background:#CCCCCC" color="#CCCCCC"></td><td style="border:1px solid gray;margin:1px;background:#C0C0C0" color="#C0C0C0"></td><td style="border:1px solid gray;margin:1px;background:#999999" color="#999999"></td><td style="border:1px solid gray;margin:1px;background:#666666" color="#666666"></td><td style="border:1px solid gray;margin:1px;background:#333333" color="#333333"></td><td style="border:1px solid gray;margin:1px;background:#000000" color="#000000"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#FFCCCC" color="#FFCCCC"></td><td style="border:1px solid gray;margin:1px;background:#FF6666" color="#FF6666"></td><td style="border:1px solid gray;margin:1px;background:#FF0000" color="#FF0000"></td><td style="border:1px solid gray;margin:1px;background:#CC0000" color="#CC0000"></td><td style="border:1px solid gray;margin:1px;background:#990000" color="#990000"></td><td style="border:1px solid gray;margin:1px;background:#660000" color="#660000"></td><td style="border:1px solid gray;margin:1px;background:#330000" color="#330000"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#FFCC99" color="#FFCC99"></td><td style="border:1px solid gray;margin:1px;background:#FF9966" color="#FF9966"></td><td style="border:1px solid gray;margin:1px;background:#FF9900" color="#FF9900"></td><td style="border:1px solid gray;margin:1px;background:#FF6600" color="#FF6600"></td><td style="border:1px solid gray;margin:1px;background:#CC6600" color="#CC6600"></td><td style="border:1px solid gray;margin:1px;background:#993300" color="#993300"></td><td style="border:1px solid gray;margin:1px;background:#663300" color="#663300"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#FFFF99" color="#FFFF99"></td><td style="border:1px solid gray;margin:1px;background:#FFFF66" color="#FFFF66"></td><td style="border:1px solid gray;margin:1px;background:#FFCC66" color="#FFCC66"></td><td style="border:1px solid gray;margin:1px;background:#FFCC33" color="#FFCC33"></td><td style="border:1px solid gray;margin:1px;background:#CC9933" color="#CC9933"></td><td style="border:1px solid gray;margin:1px;background:#996633" color="#996633"></td><td style="border:1px solid gray;margin:1px;background:#663333" color="#663333"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#FFFFCC" color="#FFFFCC"></td><td style="border:1px solid gray;margin:1px;background:#FFFF33" color="#FFFF33"></td><td style="border:1px solid gray;margin:1px;background:#FFFF00" color="#FFFF00"></td><td style="border:1px solid gray;margin:1px;background:#FFCC00" color="#FFCC00"></td><td style="border:1px solid gray;margin:1px;background:#999900" color="#999900"></td><td style="border:1px solid gray;margin:1px;background:#666600" color="#666600"></td><td style="border:1px solid gray;margin:1px;background:#333300" color="#333300"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#99FF99" color="#99FF99"></td><td style="border:1px solid gray;margin:1px;background:#66FF99" color="#66FF99"></td><td style="border:1px solid gray;margin:1px;background:#33FF33" color="#33FF33"></td><td style="border:1px solid gray;margin:1px;background:#33CC00" color="#33CC00"></td><td style="border:1px solid gray;margin:1px;background:#009900" color="#009900"></td><td style="border:1px solid gray;margin:1px;background:#006600" color="#006600"></td><td style="border:1px solid gray;margin:1px;background:#003300" color="#003300"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#99FFFF" color="#99FFFF"></td><td style="border:1px solid gray;margin:1px;background:#33FFFF" color="#33FFFF"></td><td style="border:1px solid gray;margin:1px;background:#66CCCC" color="#66CCCC"></td><td style="border:1px solid gray;margin:1px;background:#00CCCC" color="#00CCCC"></td><td style="border:1px solid gray;margin:1px;background:#339999" color="#339999"></td><td style="border:1px solid gray;margin:1px;background:#336666" color="#336666"></td><td style="border:1px solid gray;margin:1px;background:#003333" color="#003333"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#CCFFFF" color="#CCFFFF"></td><td style="border:1px solid gray;margin:1px;background:#66FFFF" color="#66FFFF"></td><td style="border:1px solid gray;margin:1px;background:#33CCFF" color="#33CCFF"></td><td style="border:1px solid gray;margin:1px;background:#3366FF" color="#3366FF"></td><td style="border:1px solid gray;margin:1px;background:#3333FF" color="#3333FF"></td><td style="border:1px solid gray;margin:1px;background:#000099" color="#000099"></td><td style="border:1px solid gray;margin:1px;background:#000066" color="#000066"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#CCCCFF" color="#CCCCFF"></td><td style="border:1px solid gray;margin:1px;background:#9999FF" color="#9999FF"></td><td style="border:1px solid gray;margin:1px;background:#6666CC" color="#6666CC"></td><td style="border:1px solid gray;margin:1px;background:#6633FF" color="#6633FF"></td><td style="border:1px solid gray;margin:1px;background:#6600CC" color="#6600CC"></td><td style="border:1px solid gray;margin:1px;background:#333399" color="#333399"></td><td style="border:1px solid gray;margin:1px;background:#330099" color="#330099"></td></tr><tr><td style="border:1px solid gray;margin:1px;background:#FFCCFF" color="#FFCCFF"></td><td style="border:1px solid gray;margin:1px;background:#FF99FF" color="#FF99FF"></td><td style="border:1px solid gray;margin:1px;background:#CC66CC" color="#CC66CC"></td><td style="border:1px solid gray;margin:1px;background:#CC33CC" color="#CC33CC"></td><td style="border:1px solid gray;margin:1px;background:#993399" color="#993399"></td><td style="border:1px solid gray;margin:1px;background:#663366" color="#663366"></td><td style="border:1px solid gray;margin:1px;background:#330033" color="#330033"></td></tr></tbody></table>';
yanse+='<hr><span id="all" style="position:relative;padding-top:3px;left:20px;" ><span id="bolds"><input id="bold"  type="checkbox"/><label for="bold">加粗</label></span><span id="italics" ><input id="italic" type="checkbox"/><label for="italic">斜体</label></span><span id="shadows" ><input id="shadow"  type="checkbox"  /><label for="shadow">阴影</label></span><span id="kongs" ><input id="kong"  type="checkbox"/><label for="kong">镂空</label></span></span></div>';
panel.innerHTML=yanse;
document.body.appendChild(panel);
panel.setAttribute('id','panel');
var colors=document.querySelectorAll('#tiao td');
for(x=0;x<colors.length;x++)
{
colors[x].addEventListener('mousedown',function()
							{this.style.outline='1px dashed white';
							},false);
colors[x].addEventListener('mouseup',function()
							{color=this.getAttribute('color');
							 $('#tiao td').css('outline','none');
							document.querySelector('#cochange').style.background=color;
							document.querySelector('td .tb-editor-editarea').style.color=color;
							},false);
colors[x].addEventListener('mouseout',function()
					{this.style.border='1px solid gray';
					},false);
};
$('#cochange').toggle(function(){$(panel).fadeIn();position();},
						function(){	$(panel).fadeOut();});
$(panel).mouseleave(function(){$(this).fadeOut();$('#cochange').click();});
function getAbsoluteLeft( ob )
{
 if(!ob){return null;}
   var obj = ob;
   var objLeft = obj .offsetLeft;
   while( obj != null && obj .offsetParent != null && obj .offsetParent.tagName != "BOinDY" ){
     objLeft += obj .offsetParent.offsetLeft;
     obj = obj .offsetParent;
   }
 return objLeft ;
}
function getAbsoluteTop( ob ){
 if(!ob){return null;}
 var obj = ob;
 var objTop = obj .offsetTop;
 while( obj != null && obj .offsetParent != null && obj .offsetParent.tagName != "BODY" ){
   objTop += obj .offsetParent.offsetTop;
   obj = obj .offsetParent;
 }
 return objTop ;
}
panel.style.display='none';

function position()
{
var dingwei=document.getElementById('only');
var offx=getAbsoluteLeft(dingwei)+110;
var offy=getAbsoluteTop(dingwei)-215;
panel.style.left=offx+'px';
panel.style.top=offy+'px';
}
$('#italic').change(function(){$('td .tb-editor-editarea').css('font-style',(this.checked)?'italic':'normal');});
$('#bold').change(function(){$('td .tb-editor-editarea').css('font-weight',(this.checked)?'bold':'400');});
GM_addStyle('#panel{padding-bottom:20px !important;}#all > span > input{display:none;}#all > span > input+label{position:relative;border:1px solid #444;background:#E4EEFF;color:#111;padding:1px 3px;margin:0 8px 2px 0;}#all > span > input:checked+label{box-shadow:0 0 2px 1px #555 inset;}');