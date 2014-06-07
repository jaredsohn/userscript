// ==UserScript==
// @name        图片粘贴上传正式版
// @namespace   http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include     http://tieba.baidu.com/*
// @version     1
// @updateURL   https://userscripts.org/scripts/source/149159.meta.js
// @downloadURL https://userscripts.org/scripts/source/149159.user.js
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// ==/UserScript==
if(!unsafeWindow.window.FlashImageLoader)
{
var sc=document.createElement('script');
sc.setAttribute('src','http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
document.body.appendChild(sc);
};

document.querySelector('td .tb-editor-editarea').addEventListener('paste',function(){setTimeout(function(){pasteImg()},200);},false);
function pasteImg()
{
var txt=document.querySelector('td .tb-editor-editarea').innerHTML;
var img=txt.match(/data[^>]*\.gif/g);
var src=img[0].substring(0,img[0].length-4);
upload(src); 
	
};
 function upload(f) {//f是base64数据
 
			function uploadedHandler(a, d)
				{try{
                        var c =JSON.parse(d);//d是返回的text c是json对象
                        if (c.error_code != 0) {
                                alert("图片化失败")
                        } else {
                                var b = c.info.pic_id_encode;//c是json数据;b是地址信息；
                                var e ='http://imgsrc.baidu.com/forum/pic/item/' + b + '.png';//e是img完整地址;
								document.querySelector('td .tb-editor-editarea').focus();
                                unsafeWindow.rich_postor._editor.execCommand("insertimage", e);
                               unsafeWindow.FlashImageLoader.unbind('uploadComplete', arguments.callee)
								document.querySelector('td .tb-editor-editarea').innerHTML=document.querySelector('td .tb-editor-editarea').innerHTML.replace(/data[^>]*\.gif/g,'');

						}
					}catch(err){alert(err);}
                }
                function callback(a) 
				{try{
                        unsafeWindow.FlashImageLoader.bind('uploadComplete', uploadedHandler);
                        unsafeWindow.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic', f.replace(/^.*?base64,/, ''), {
                                tbs: a
                        })
					}catch(err){alert(err);};
                }//事先返回一个图片ID再返回
              GM_xmlhttpRequest({ method:'GET',
                        url: 'http://tieba.baidu.com/dc/common/imgtbs',
                        onload: function(response) 
						{
                               
								callback(JSON.parse(response.responseText).data.tbs);
                                     
                                
                        }
								});

        }
		
	
		
