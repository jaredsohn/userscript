// ==UserScript==
// @name        图片粘贴&拖放二合一增强版
// @author    527836355
// @id     pasteAndDragImageIntoTiebaEditor
// @namespace   http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include     http://tieba.baidu.com/*
// @version     1
// @updateURL   https://userscripts.org/scripts/source/162380.meta.js
// @downloadURL https://userscripts.org/scripts/source/162380.user.js
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_log
// ==/UserScript==
const editorId='ueditor_replace';//发帖框ID
const parentId='tb_rich_poster_container';//父节点监听
var editor=null;//初始化发贴框
var preview=null;//进度预览
if(!unsafeWindow.FlashImageLoader)//flash上传还是必须的
				{
					var sc=document.createElement('script');
					sc.id='flashUpload';
					sc.setAttribute('src','http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
					document.body.appendChild(sc);
				};
if(document.getElementById(editorId))//检测是否存在这个元素
	{
		init();
	
	}
else  //不存在则监听节点变动
	{
		var target=document.getElementById(parentId);
		var observer = new MutationObserver(function(mutations) 
											{
												if(document.getElementById(editorId))
													{
													observer.disconnect();//停止监听
													init();
													
													}
																			
											})
		var config = { attributes: true, childList: true, characterData: true };
			observer.observe(target, config);	
	}

function init()//初始化，添加事件
			{
				editor=document.getElementById(editorId);

				
				editor.addEventListener('paste',function (e)//添加事件处理
					{
						var data=e.clipboardData.getData('text/unicode');
						if(!data)
						e.stopPropagation();//好吧，如果不是图片，我们也不能随便阻止其他事情吧。
						setTimeout(function ()
									{
									pasteImg()
									}, 200);//给图片解码留出时间
						// 
					}, true);
				//添加拖入拖出时的效果处理
				document.body.addEventListener('dragenter',function(e){e.preventDefault();e.stopPropagation();},false);
				editor.addEventListener('dragover',function(e){editor.style.border='2px dotted red'},false);
				editor.addEventListener('drop',function(e){e.preventDefault();e.stopPropagation();editor.style.border='1px solid gray';dragHandle(e);},false);//处理拖放事件
				editor.addEventListener('dragleave',function(e){e.preventDefault();e.stopPropagation();editor.style.border='1px solid gray';},false);
				addProgressBar();
			}
function addProgressBar()
			{
			var container=document.querySelector('.edui-container');
			var div=document.createElement('div');
			div.id='progressBar';
			div.style.cssText='position:absolute;right:-215px;top:45px;width:200px;height:280px;';
			container.appendChild(div);
			preview=div;
			}
function dragHandle(evt)//处理拖放
		{	
			var files=evt.dataTransfer.files;
			var data=evt.dataTransfer.getData('text/html');//插入数据
			if(files.length>0)
			for(i=0;i<files.length;i++)
			{	
				var file=files[i];
				var type=file.type;
				var name=file.name;
				var size=file.size/1024+'';
				size=size.substring(0,4);
				var reader=new FileReader();
				if(type.match('image'))//测试是否是图片文件
				{
				reader.onload=function(e)
								{
							var dataURL=e.target.result;//base64编码
							//处理数据
							new uploader(dataURL,false,null).init();
								}
				reader.readAsDataURL(file);	
				}			
			}
		 if(data.length>0)
	unsafeWindow.test_editor.execCommand("inserthtml",data);
		}
function pasteImg()
			{
			var imgs=document.querySelectorAll('#ueditor_replace img');	
			for(i=0;i<imgs.length;i++)
				{	
				if(imgs[i].hasAttribute('uploading')||imgs[i].src.indexOf('data:image')!=0)
				continue;
				imgs[i].setAttribute('uploading','true');
				var src=imgs[i].src;
				var nwidth=imgs[i].width;
				var height=imgs[i].height;
				width=nwidth>560?560:nwidth;
				height=width/nwidth*height;
				imgs[i].src='data:image/gif;base64,R0lGODlhEAAQAOUdAOvr69HR0cHBwby8vOzs7PHx8ff397W1tbOzs+Xl5ebm5vDw8PPz88PDw7e3t+3t7dvb2+7u7vX19eTk5OPj4+rq6tbW1unp6bu7u+fn5+jo6N/f3+/v7/7+/ra2ttXV1f39/fz8/Li4uMXFxfb29vLy8vr6+sLCwtPT0/j4+PT09MDAwL+/v7m5ubS0tM7OzsrKytra2tTU1MfHx+Li4tDQ0M/Pz9nZ2b6+vgAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMAA5ACwAAAAAEAAQAAAGg8CcMAcICAY5QsEwHBYPCMQhl6guGM5GNOqgVhMPbA6y5Xq/kZwkN3Fsu98EJcdYKCo5i7kKwCorVRd4GAg5GVgAfBpxaRtsZwkaiwpfD0NxkYl8QngARF8AdhmeDwl4pngUCQsVHDl2m2iveDkXcZ6YTgS3kAS0RKWxVQ+/TqydrE1BACH5BAkwADkALAAAAAAQABAAAAZ+wJwwJ1kQIgNBgDMcdh6KRILgQSAOn46TIJVSrdZGSMjpeqtgREAoYWi6BFF6xCAJS6ZyYhEIUwxNQgYkFxwBByh2gU0kKRVHi4sgOQuRTRJtJgwSBJElihwMQioqGmw5gEMLKk2AEkSBq4ElQmNNoYG2OVpDuE6Lrzmfp0NBACH5BAUwADkALAAAAAAQABAAAAaFwJwwJ1kQCDlCwTAcMh6KhDQnVSwYTkJ1un1gc5wtdxsh5iqaLbVKyVEWigq4ugZgTyiA9CK/JHIZWCsICCxpVWV/EzkHhAgth1UPQ4OOLXpScmebFA6ELHAZclBycXIULi8VZXCZawplFG05flWlakIVWravCgSaZ1CuksBDFQsAcsfFQQAh+QQJMAA5ACwAAAAAEAAQAAAGQcCccEgsGo/IpHLJzDGaOcKCCUgkAEuFNaFRbq1dJCxX2WKRCFdMmJiiEQjRp1BJwu8y5R3RWNsRBx9+SSsxgzlBACH5BAkwADkALAAAAAAQABAAAAaJwJwwJ1kQCDlCwTAcMh6KhDQnVSwYTkJ1un1gc5wtdxsh5iqaLbVKyTEWigq4ugZglRXpRX5J5DJYAFIAaVVlfhNrURqFVQ9DYhqCgzkzCGdnVQBwGRU0LQiXCRUAORQJCwAcOTChoYplBXIKLq6vUXRCCQ22olUEcroJB66KD8FNCjUrlxWpTUEAIfkEBTAAOQAsAAAAABAAEAAABobAnDAnWRAIOULBMBwyHoqENCdVLBhOQnW6fWBznC13G8nZchXNllql5Bg2xA1cZQOwShwCMdDkLgk5GVgAUgAie3syVDkTbFIaiIkIJ0NiGnp7HiNonRVVAHEuFjlQFVQVAI0JCzYjrKCPZQWnf1unYkMVWrFbBLVoUIaPD8C6CwCnAMhNQQA7';
				new uploader(src,true,imgs[i]).init();
				}
			
			
			}
function uploader(dataURL,isPaste,oldImage)//第一次尝试模板
			{
				this.dataURL=dataURL;
				this.isPaste=isPaste;
				this.oldImage=oldImage;
				this.progressBar=null;
				this.tbs=null;
				this.blob=null;
				this.init=function()	//进条度创建在此
							{	var now=this;
								var div=document.createElement('DIV');//父节点
								div.style.cssText="background:rgba(33,33,33,0.8);width:200px;height;40px;border:1px solid red;border:2px solid gray;border-radius:10px;margin:5px;padding:5px;"
								var img=document.createElement('img');
								img.src=this.dataURL;
								img.style.cssText='height:auto;width:auto;max-width:200px;max-height:40px;';
								var bar=document.createElement('progress');
								bar.style.cssText='width:180px;height:15px;display:position:absolute;';
 								div.appendChild(img);
								div.appendChild(document.createElement('hr'));
								div.appendChild(bar);
								preview.appendChild(div);
								this.progressBar=bar;
								var xhr = new XMLHttpRequest();
								xhr.open('GET', 'http://tieba.baidu.com/dc/common/imgtbs?t=' + new Date().getTime(), false);
								xhr.onload = function () 
											{
												var res=JSON.parse(xhr.responseText);
												var tbs = res.data.tbs;
												now.upload(tbs);
											}
								xhr.send();
							};
				this.upload=function(tbs)
							{
							//到这步是正常的
							var now=this;
							var blob=dataUrlToBlob(this.dataURL);
							var data=new FormData();
							data.append('Filename','333333.png');
							data.append('tbs',tbs);
							data.append('fid',unsafeWindow.PageData.forum.id);
							data.append('file',blob);
							//上传模块
							GM_xmlhttpRequest({
												synchronous:false,
												method:'POST',
												url:'http://upload.tieba.baidu.com/upload/pic?is_wm=1',
												data:data,
												onprogress:function(e)//处理进度条
																{
													
															    if ( !e.lengthComputable )
																	{ 
																	now.progressBar.value=1;																
																	}
																else
																	{
																		now.progressBar.style.display='';
																		now.progressBar.value=(e.loaded/e.total);
																	}

																},
												onload:function(d)//可以正常运行至此
															{
															now.onload(d);
															}		
												});
							}
				this.onload=function(res)//下载完毕处理。
							{
						var mes=JSON.parse(res.responseText);//{"err_no":0,"err_msg":"","no":0,"error_code":0,"info":{"cur_time":1386817416,"pic_id":"9732578534","fullpic_width":264,"fullpic_height":149,"pic_type":4,"full_datalen":1953,"full_sign0":93043670,"full_sign1":3974064591,"pic_id_encode":"b2aab951f8198618d026c1f048ed2e738ad4e696","pic_desc":"blob","err_no":0,"pic_water":"http:\/\/imgsrc.baidu.com\/tieba\/pic\/item\/cefc1e178a82b901accced47718da9773912ef65.jpg"}}
						var fullWidth=mes.info.fullpic_width;//真实宽度
						var fullHeight=mes.info.fullpic_height;//真实高度
						var picId=mes.info.pic_id_encode;
						var picType=mes.info.pic_type;
						var picWater=mes.info.pic_water;
						var e ='http://imgsrc.baidu.com/forum/pic/item/' + picId + '.png';//图片地址
						var cache=new Image();//先下载再响应
						cache.src=e;
						var old=this.oldImage;
						var bar=this.progressBar;
							var nwidth=fullWidth
											var height=fullHeight;
											width=nwidth>560?560:nwidth;
											height=parseInt(width/nwidth*height);
											cache.setAttribute('width',width);
											cache.setAttribute('height',height);
											cache.setAttribute('class','BDE_Image');
											if(isPaste)//如果是粘贴的就替换，否则直接插入图片
											old.parentNode.replaceChild(cache,old);
											else
											editor.appendChild(cache);
											unsafeWindow.$(bar.parentNode).slideUp('slow');//动画效果
											bar.parentNode.removeChild(bar);//移除预览框
											
										

							}
			}
	
//以下三个函数可把dataURL转换成BLOB对象,研究fawave的收获，哈哈
function binaryToBlob(data)
	{
		var arr=new Uint8Array(data.length);
		for(var i=0,l=data.length;i<l;i++)
		{
		arr[i]=data.charCodeAt(i);
		}
		var buffer=arr;
		return buildBlob([buffer]);
	}
function dataUrlToBlob(dataurl)
{
var datas=dataurl.split(',',2);
var blob=binaryToBlob(atob(datas[1]));
blob.fileType=datas[0].split(';')[0].split(':')[1];
blob.name='xxx.png';
return blob;
};

function buildBlob(parts)
{
blob=new Blob(parts);
return blob;
}	
