// ==UserScript==
// @name        tiebaShareByDrag
// @include     http://tieba.baidu.com/*
// @updateURL      http://userscripts.org/scripts/source/175448.meta.js
// @downloadURL    http://userscripts.org/scripts/source/175448.user.js
// @author      猫酱
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     2013.11.16
// ==/UserScript==

var $=unsafeWindow.$;
var userdata=GM_getValue('userdata','{}');
userdata=JSON.parse(userdata);
var path='';
var shareUrl='';

var website="http://dplink.duapp.com";
var files,bdstoken,uk,sid,infos_md5=[],infos_fid=[],infos_name=[],container="";
var user=unsafeWindow.PageData.user.name;

//GM保存的数据，多账号支持
var postDiv="#ueditor_replace";
(function l_init()
{
	container = document.querySelector(postDiv); 
	if(container)
	{
    	// rewriteGetContent();
    	//ctrl+鼠标左键弹出设置框
		GM_registerMenuCommand("贴吧拖拽分享设置",setting);
		// container.onclick=function(e)
		// {
		//   if(e.ctrlKey)
		//   {
		//     setting();
		//   }
		// }
		// 拖拽结束时触发
		container.addEventListener("drop", function(event)
		{
		  if(userdata[user])
			{
				path=userdata[user].path;
				shareUrl=userdata[user].shareUrl;
			}
		  else
			userdata[user]={shareUrl:'',path:''};
		  i,j=0;
		  if(!(shareUrl&&path))
		  {
		  	alert('首次使用会自动进行设置，以后需要修改的话<ctrl+鼠标左键>弹出设置\n\n确定后请等待设置完成（一般几秒后就会提示完成设置）');
		  	GM_xmlhttpRequest(//获取token
		    {
		        method: "GET",
		        url:"http://pan.baidu.com/disk/home",
		        //synchronous:true,
		        onload:function(res)
		        {
		        	bdstoken=res.responseText.match(/bdstoken="(.{1,50})";/)[1];
		            init_createFolderAndShare();
		        }
		    });
		    //throw(-1);
		  }
		  else
		  {
			uk=shareUrl.match(/uk=(\d*)/)[1];
			sid=shareUrl.match(/shareid=(\d*)/)[1];
			files = event.dataTransfer.files;
			//console.log(files[0].type);
			GM_xmlhttpRequest(//获取token
			{
			    method: "GET",
			    url:"http://pan.baidu.com/disk/home",
			    //synchronous:true,
			    onload:function(res)
			    {
			        bdstoken=res.responseText.match(/bdstoken="(.{1,50})";/)[1];
			    }
			});
			getShareInfo(1);  //获取分享页面信息
			for(var i=0;i<files.length;i++)
			{
			  if((!files[i].type.match(/image/))&&(!(files[i].name.match(/zip$|7z$|rar$|tar$/)&&files[i].size<1000000)))
			      uploadFile(i); //上传文件
		    }
		  }
		}, false);

	}
	else
	{
		setTimeout(l_init,100)
	}
})();


function uploadFile(i)
{
  var fd=new FormData;    //post数据
    fd.append('file', files[i]);
    var xhr=GM_xmlhttpRequest(
    {
      method: "POST",
      data: fd,
      onprogress:uploadProgress,
      upload:{onprogress:uploadProgress},
      url: "http://c.pcs.baidu.com/rest/2.0/pcs/file?method=upload&type=tmpfile&app_id=250528",    //上传给度娘获取md5
      //synchronous:true,
      onload: function(res) 
      {
        //console.log(res.responseText);
        var md5=JSON.parse(res.responseText).md5;
        var cindex=infos_md5.indexOf(md5);
        fd = new FormData;
        fd.append('path', path + files[i].name);
        fd.append('block_list', '["' + md5 + '"]');
        fd.append('method', 'post');
        fd.append('size', files[i].size);
        if(cindex==-1)  //如果文件不存在
        {
          GM_xmlhttpRequest({
              method: "POST",
              data: fd,
              url:'http://pan.baidu.com/api/create?a=commit&channel=chunlei&clienttype=0&web=1&bdstoken='+bdstoken,    //根据md5值保存到自己的网盘
              onload: function(res)
              {
                  var fid=JSON.parse(res.responseText).fs_id;
                  var name=JSON.parse(res.responseText).server_filename;
                  insertContent(name,fid,i);
              }
          });
        }
        else
        {
          var name=infos_name[cindex];
          var fid=infos_fid[cindex];
          insertContent(name,fid,i);
        }
        var bar=document.querySelector('#progressBar');
        bar.parentNode.removeChild(bar);  //移除进度条
      }
    });
}

function uploadProgress(evt)  //进度条
{ 
  if(!document.querySelector('#progressBar'))
  {
    var progressBar=document.createElement('progress');
    progressBar.id='progressBar';
    progressBar.value=0;
    progressBar.setAttribute('style','position:absolute;left:20%;top:50px;z-index:auto;');
    document.querySelector('.edui-editor-body').appendChild(progressBar);
  }
  if (evt.lengthComputable) 
  {  
    document.querySelector('#progressBar').value= evt.loaded  / evt.total; 
  }  
  else 
  {  
    document.querySelector('.editor_title_txt').innerHTML = '上传失败';  
  }  
 } 
var cr_flash=new Array();
 function getShareInfo(page)
 {
    GM_xmlhttpRequest({
      method:'POST',
      url:'http://pan.baidu.com/share/list?channel=chunlei&clienttype=0&web=1&num=100&page='+page+'&dir='+encodeURIComponent(path)+'&uk='+uk+'&shareid='+sid+'&order=time&desc=1',
      synchronous:true,
      onload:function(res)
      {
        var info=JSON.parse(res.responseText).list;
        for(var i=0;i<info.length;i++)
        {
          infos_md5.push(info[i].md5);
          infos_fid.push(info[i].fs_id);
          infos_name.push(info[i].server_filename);
        }
        if(info.length>=100)
          getShareInfo(page+1);
      }
    });
 }

 function insertContent(name,fid,i)
 {
  var link=website+'/'+uk+'/'+sid+'/'+fid;
  var panlink='http://pan.baidu.com/share/link?shareid='+sid+'&uk='+uk+'&fid='+fid;
  var html=document.querySelector("#ueditor_replace").innerHTML;
  if(html=='<br>')
    html='';
  else
    html+='<br>';
  html=html+name+':<br>';
  // if(files[i].type.match(/audio/))
  // {
  
  //   html=html+'<br>'+'<img class="BDE_Music" src="http://tieba.baidu.com/tb/editor/v2/music.png" title="http://box.baidu.com/widget/flash/bdspacesong.swf?from=tiebasongwidget&amp;url='
  //   +encodeURIComponent(link)+'&amp;name='+encodeURIComponent(name)+'&amp;artist=&amp;extra=&amp;autoPlay=false&amp;loop=true" data-width="400" data-height="95">'
  //   +'<br>';
  // }
  html+=panlink;
  document.querySelector("#ueditor_replace").innerHTML=html;
 }

function setting()    //设置path和shareUrl
{
  alert('设置path和shareUrl');
  var p,s;
  p=prompt('输入你要保存到度盘的目录路径，例如：/test/',userdata[user]&&userdata[user].path||"");
  path=p;
  s=prompt('输入目录的分享链接，例如：http://pan.baidu.com/share/link?shareid=3441776982&uk=958565640',userdata[user]&&userdata[user].shareUrl||"");
  userdata[user]={shareUrl:s,path:p};
  GM_setValue('userdata',JSON.stringify(userdata));
}

function init_createFolderAndShare()
{
	GM_xmlhttpRequest(
	{
		method:'GET',
		url:'http://pan.baidu.com/api/list?channel=chunlei&clienttype=0&web=1&num=100&page=1&dir=%2Fapps&order=time&desc=1',
		onload:function(res)
		{
			var info=JSON.parse(res.responseText).list;
			var is_exist=false,
				cfid=0;
        	for(var i=0;i<info.length;i++)
        	{
        	  if(info[i].server_filename=='拖拽脚本')
        	  {
        	  	is_exist=true;
        	  	cfid=info[i].fs_id;
        	  }
        	}
        	if(is_exist)
        		folderShare(cfid);
        	else 	//创建目录
        	{
        		var cfd = new FormData;
    			cfd.append('path', '/apps/拖拽脚本');
    			cfd.append('block_list', '[]');
    			cfd.append('method', 'post');
    			cfd.append('size', '');
    			cfd.append('isdir', '1');
        		GM_xmlhttpRequest(
        		{
        			method:'POST',
        			url:'http://pan.baidu.com/api/create?a=commit&channel=chunlei&clienttype=0&web=1&bdstoken='+bdstoken+'&block_list=%5B%5D&isdir=1&method=post&path=%2F53135&size=',
        			data:cfd,
        			onload:function(res)
        			{
        				var info=JSON.parse(res.responseText);
        				folderShare(info.fs_id);
        			}
        		});
        	}
		}
	});
}

// var cr_flash=new Array();
//度娘处理函数改写 for 音乐外链
// function rewriteGetContent()
// {
//   var b = unsafeWindow.test_editor.getContent;
//   unsafeWindow.test_editor.getContent = function() 
//   {
//     cr_flash=[];
//     var d = b.call(unsafeWindow.test_editor);
//     d = d.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/(^(<br\/>)+)|((<br\/>)+$)/g, "");
//     var embeds=d.match(/<embed[^>]*>/g);
//     if(embeds)
//     {
//       var f = '<embed allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" scale="noborder" src="#{url}" class="BDE_Music" width="400" height="95"/>';
//       $('#ueditor_replace .BDE_Music').each(function()
//       {
//       var g=$.tb.format(f, {
//               url: $(this).attr('title')
//             });
//           cr_flash.push(g);
//         });
//       for(var i=0;i<embeds.length;i++)
//       d=d.replace(embeds[i],cr_flash[i]);
//     }
//     return d;
//   };
// }

function folderShare(cfid)
{
	var cfd = new FormData;
    cfd.append('channel_list', '[]');
    cfd.append('schannel', '0');
    cfd.append('fid_list', '['+cfid+']');
	GM_xmlhttpRequest(
	{
		method:'POST',
		url:'http://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&bdstoken='+bdstoken,
		data:cfd,
		onload:function(res)
		{
			var info=JSON.parse(res.responseText);
			console.log(info);
			userdata[user]={shareUrl:info.link,path:'/apps/拖拽脚本/'}
			GM_setValue('userdata',JSON.stringify(userdata));
			alert('设置完成，刷新生效');
		}
	});
}

//检查更新
function checkUpdate(name,jsId,hour) //脚本名字，脚本id，检查根新间隔（小时）
{
  var ctime=Math.round((new Date().getTime())/1000/60/60);
  if(ctime-GM_getValue('updateTime',0)>=hour)
  {
    GM_xmlhttpRequest({
      method:'get',
      url:'http://userscripts.org/scripts/source/'+jsId+'.meta.js',
      onload:function(res)
      {
        var ctime=Math.round((new Date().getTime())/1000/60/60);
        GM_setValue('updateTime',ctime);//更新时间
        var hash=res.responseText.match(/uso:hash\s*(.*)/)[1];
        if(GM_getValue('is_first',true))
        {
          GM_setValue('is_first',false);
          GM_setValue('hash',hash);
        }
        if(hash!=GM_getValue('hash'))
        {
          if(confirm(name+'  有新版本，是否跳转到脚本页面更新'))
          {
            GM_setValue('hash',hash);
            location.href='http://userscripts.org/scripts/show/'+jsId;
          }
          else if(confirm('不再提醒此次更新？'))
            GM_setValue('hash',hash);
        }
      }
    });
  }
}
checkUpdate('贴吧拖拽分享','175448',4);