// ==UserScript==
// @name		图片粘贴上传正式版
// @namespace		http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include		http://tieba.baidu.com/*
// @grant		GM_xmlhttpRequest
// @grant		GM_addStyle
// @grant		unsafeWindow
// @updateURL		https://userscripts.org/scripts/source/155926.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155926.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		527836355、雨滴在心头
// @version		1.01
// ==/UserScript==
GM_addStyle("img[src='http://tieba.baidu.com']{display:none;}");
if(!(unsafeWindow.FlashImageLoader))
{
var sc=document.createElement('script');
sc.setAttribute('src','http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
document.body.appendChild(sc);
};
document.querySelector('td .tb-editor-editarea').addEventListener('paste',function(){setTimeout(function(){pasteImg()},200);},false);
function pasteImg()
{
var txt=document.querySelector('td .tb-editor-editarea').innerHTML;
if(txt.match(/data[^>]*\.gif/g))
{

var img=txt.match(/data[^>]*\.gif/g);
if(img)
{
var src=img[0].substring(0,img[0].length-4);
var doc=document.createElement('img');
doc.setAttribute('id','waitimage');
doc.src='data:image/gif;base64,R0lGODlhEAAQAOUdAOvr69HR0cHBwby8vOzs7PHx8ff397W1tbOzs+Xl5ebm5vDw8PPz88PDw7e3t+3t7dvb2+7u7vX19eTk5OPj4+rq6tbW1unp6bu7u+fn5+jo6N/f3+/v7/7+/ra2ttXV1f39/fz8/Li4uMXFxfb29vLy8vr6+sLCwtPT0/j4+PT09MDAwL+/v7m5ubS0tM7OzsrKytra2tTU1MfHx+Li4tDQ0M/Pz9nZ2b6+vgAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMAA5ACwAAAAAEAAQAAAGg8CcMAcICAY5QsEwHBYPCMQhl6guGM5GNOqgVhMPbA6y5Xq/kZwkN3Fsu98EJcdYKCo5i7kKwCorVRd4GAg5GVgAfBpxaRtsZwkaiwpfD0NxkYl8QngARF8AdhmeDwl4pngUCQsVHDl2m2iveDkXcZ6YTgS3kAS0RKWxVQ+/TqydrE1BACH5BAkwADkALAAAAAAQABAAAAZ+wJwwJ1kQIgNBgDMcdh6KRILgQSAOn46TIJVSrdZGSMjpeqtgREAoYWi6BFF6xCAJS6ZyYhEIUwxNQgYkFxwBByh2gU0kKRVHi4sgOQuRTRJtJgwSBJElihwMQioqGmw5gEMLKk2AEkSBq4ElQmNNoYG2OVpDuE6Lrzmfp0NBACH5BAUwADkALAAAAAAQABAAAAaFwJwwJ1kQCDlCwTAcMh6KhDQnVSwYTkJ1un1gc5wtdxsh5iqaLbVKyVEWigq4ugZgTyiA9CK/JHIZWCsICCxpVWV/EzkHhAgth1UPQ4OOLXpScmebFA6ELHAZclBycXIULi8VZXCZawplFG05flWlakIVWravCgSaZ1CuksBDFQsAcsfFQQAh+QQJMAA5ACwAAAAAEAAQAAAGQcCccEgsGo/IpHLJzDGaOcKCCUgkAEuFNaFRbq1dJCxX2WKRCFdMmJiiEQjRp1BJwu8y5R3RWNsRBx9+SSsxgzlBACH5BAkwADkALAAAAAAQABAAAAaJwJwwJ1kQCDlCwTAcMh6KhDQnVSwYTkJ1un1gc5wtdxsh5iqaLbVKyTEWigq4ugZglRXpRX5J5DJYAFIAaVVlfhNrURqFVQ9DYhqCgzkzCGdnVQBwGRU0LQiXCRUAORQJCwAcOTChoYplBXIKLq6vUXRCCQ22olUEcroJB66KD8FNCjUrlxWpTUEAIfkEBTAAOQAsAAAAABAAEAAABobAnDAnWRAIOULBMBwyHoqENCdVLBhOQnW6fWBznC13G8nZchXNllql5Bg2xA1cZQOwShwCMdDkLgk5GVgAUgAie3syVDkTbFIaiIkIJ0NiGnp7HiNonRVVAHEuFjlQFVQVAI0JCzYjrKCPZQWnf1unYkMVWrFbBLVoUIaPD8C6CwCnAMhNQQA7';
document.querySelector('td .tb-editor-editarea').appendChild(doc);
upload(src); 
}
}
	
};
 function upload(f) {//f是base64数据

			function uploadedHandler(a, d)
				{try{
                        var c =JSON.parse(d);//d是返回的text c是json对象
                        if (c.error_code != 0) {
                                alert("图片化失败")
                        } else 
						{
                                var b = c.info.pic_id_encode;//c是json数据;b是地址信息；
                                var e ='http://imgsrc.baidu.com/forum/pic/item/' + b + '.png';//e是img完整地址;
								  document.querySelector('td .tb-editor-editarea').focus();
								  unsafeWindow.rich_postor._editor.execCommand("insertimage", e);
                                  unsafeWindow.FlashImageLoader.unbind('uploadComplete', arguments.callee)
                                  document.querySelector('td .tb-editor-editarea').removeChild(document.querySelector('#waitimage'));
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
		
	
		
