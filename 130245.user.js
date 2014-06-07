// ==UserScript==
// @name           fetchQQ
// @namespace      http://mail.qq.com
// @include        http://*mail.qq.com/cgi-bin/frame_html*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require http://mcpub.googlecode.com/files/jquery.blockUI.js
// @version 0.9.7
// ==/UserScript==

/*
Fixed list_count input bug
Fixed next page bug(with more elegant way than using setInterval)
Fixed problem with transfer files
*/

//Initialize Main page


QF=function()
{
  var o = this;
  o.sid=unsafeWindow.getSid();
  o.tempCMD=[];
  o.files=[];

  o.outputRule=localStorage.getItem('outputRule');
  o.outputRule= o.outputRule ? o.outputRule : 'default';

  o.list_count=localStorage.getItem('list_count');
  o.list_count= o.list_count ? o.list_count : 50;
  o.rename_dict={};
  o.initRenameDict();
  $(function(){
    o.load();
  })

}
//Define a new class including basic informations about individual file
QF.prototype={
  initPage:function()
  {
    var o = this;
    this.default_dict_update_url='http://api.misuzi.me/rename_dict.json?callback=?';
    this.insertPoint=$('.left').find('.addrtitle');
    var cmdButton=this.insertPoint.append(' | <a id="showCMD" href="#"> 提取文件</a> ');
    var transButton=this.insertPoint.append(' | <a id="transFiles" href="#"> 转存文件</a> ');
    var showAndFade=this.insertPoint.append(' | <a id="showAndFade" href="#"> 显示提取栏</a>');
    var handleZZZFile=this.insertPoint.append(' | <a id="showZZZFile"> 提取中转文件</a>');
    var changeListCountButton=this.insertPoint.append(' | <a id="changeListCount"> 中转站列表长度</a>');
    o.changeListCount(o.list_count);
    $.ajaxSetup({async: false});
    $('#reform').live('click',function(){
        o.promptForRule();
    })
    $('#changeListCount').live('click',function(){
      o.promptListCount();
    });
    $('#reset').live('click',function(){
        o.resetRule();
    });
    $('#reverse').live('click',function(){
        o.reverseResult(); 
    });
    $('#output_cmd').live('click',function(){
        o.outputCMD();
    });
    
    $('#ic_watchnow').live('click',function(){
        o.watchOnline();
    });
    $('#close_btn').live('click',function(){
            o.closeBox();
    });
    //setInterval(function(){o.update_next_page_link()},5000);
    this.backUpMarkTime=unsafeWindow.MarkTime;
    unsafeWindow.MarkTime=this.interceptedMarkTime;
  },
  interceptedMarkTime:function(){
    var o = unsafeWindow.QF;
    var mail_flag=$('#mainFrame').contents().find('#mainmail');
    if(mail_flag.length)
    {
      o.recruitTransButton();
    }
    o.update_next_page_link();
    o.backUpMarkTime.apply(arguments);
  },
  initRenameDict:function()
  {
    var default_dict={
    黒:'黑',
    };
    var cloud_dict=localStorage.getItem('rename_dict') ;
    this.rename_dict=  cloud_dict ? JSON.parse(cloud_dict) : default_dict;
  },

  updateRenameDict:function(url)
  {
    var cloud_dict;
    if(! url )
    {
      url=this.default_dict_update_url;
    }
    $.getJSON(url,function(data){
      if(data.hasOwnProperty('rename_dict'))
      {
        cloud_dict=data['rename_dict'];
        if (cloud_dict != {})
        {
          localStorage.setItem('rename_dict',JSON.stringify(cloud_dict));
          this.rename_dict=cloud_dict;
        }
      }
    })
  },
  filterName:function(name)
  {
    $.each(this.rename_dict,function(i,n){
      if(name.indexOf(i) != -1 )
      {
        name=name.replace(new RegExp(i,'g'),n);
      }
    });
    return name
  },
  showAddress:function(addrString,callback)
    {
        if(!addrString)
        {
          //addrString=this.tempCMD;
          addrString=this.getLinkDetail();
        }
        this.addrBox=$('<div id="batchPublish"></div>')
        .append('<div id="batchHeader"></div>')
        .append('<div id="batchContent" style="float:left;clear:both"></div>')
        .append('<div id="batchFooter" style="flolat:left;clear:both"></div>') ;
        this.addrBox.find('.mcTab').css('display','none');
        
        this.addrBox.find('#batchHeader')
        .append('<span>Tencent LIST</span>')
        .append('<a style="float:right" id="close_btn" href="javascript:return null;">关闭</a>')
        .append('<a style="float:right" id="reset" href="javascript:return null;">重置格式｜</a>')
        .append('<a style="float:right" id="reform" href="javascript:return null;">修改|</a>')
        .append('<a style="float:right" id="reverse" href="javascript:return null;">转序｜</a>');
        
        this.addrBox.find('#batchFooter')
        .append('<a style="float:right" id="output_cmd" href="javascript:return null;">输出为脚本</a>');

        var batchContent=this.addrBox.find('#batchContent')
        .append('<pre id="batchedlink"></pre>');
        
        this.addrBox.find('#batchedlink').css({'width':'500px','height':'250px','overflow':'scroll'})
        .html(addrString);   
        
        $.blockUI({message:this.addrBox,css:{width:"520px",height:"300px"}});

        this.outputCMD();
        if(typeof(callback)=='function')
        {
            callback();
        }
    },
  outputCMD:function()
  {
      var tempString=$('#batchedlink').html();
      this.updateDownURL(tempString,'output_cmd');
  },
  updateDownURL:function(text,urlId)
  {
    var uriContent = "data:application/octet-stream," + encodeURIComponent(text).replace(/%26amp%3B/g,'%26');
    // console.log(uriContent);
    document.getElementById(urlId).href=uriContent;
  },
  closeBox:function()
  {
      
      $.unblockUI();
  },
  restartBox:function()
  {
      this.closeBox();  
      this.showAddress() ;
  },
  promptForRule : function()
  {
      var rule = prompt('Plz input your custom rule which $name stands for Filename and $url for Download URL',this.outputRule);
      rule = rule ? rule : 'default';
      localStorage.setItem('outputRule',rule);  
      this.outputRule=rule;
      // console.log(rule);
      this.restartBox();
  },
  changeListCount : function(list_count)
  {
    var node=document.getElementById('folder_ftn');
    var href=node.href.replace(/pagesize=\d+/,'pagesize='+list_count);
    node.href=href;
  },
  promptListCount : function()
  {
      var rule = prompt('请输入中转站想要显示条目的数目',this.list_count);
      rule= isNaN(rule) ? 50 : parseInt(rule);
      try
      {
        if(!rule || rule==0 || rule<0 || rule > 2000 || rule==NaN)
        {
          rule=50
        }
      }
      catch(e)
      {
        console.log(e)
        rule=50
      }
      try
      {
        localStorage.setItem('list_count',rule);
        this.list_count=rule;
        this.changeListCount(this.list_count);
      }
      catch(e)
      {
        console.log(e);
      }
  },
  update_next_page_link:function()
  {
    var o = this;
    if($('#mainFrame').contents().find('a[href*="/cgi-bin/ftnExs_files"]').length >0 )
    {
      $('#mainFrame').contents().find('a[href*="/cgi-bin/ftnExs_files"]').each(function(i,link){
          link.href=link.href.replace(/pagesize=.*?&/,'pagesize='+o.list_count+'&');
        })
    }
    
  },
  resetRule : function()
  {
      localStorage.setItem('output',null);
      this.outputRule='default';
      alert('Output rule has been reset');
      this.restartBox();
  },
  reverseResult : function()
  {
      $('#batchedlink').html(this.tempCMD.reverse().join('\n'));
  },
  File:function()
  {

    this.filename="defaultName";
    this.ref="defaultRef";
    //Reference to downloading link
    this.filekey="defaultKey";
    //qm_ftn_key
    this.filehref="defaultHref";
    this.request="defaultRequest";
    this.content="defaultContent"
    this.status=false;
    //Downloadable or not
  },
  getLinkDetail:function(files){
        var o = this;
        var returnArray=[];
        if(! files || files.length==0)
        {
          files=o.files;
        }
        if (o.outputRule == 'default')
        {
            $.each(files,function(i,file)
            {
              if(file.status==true)
              {
                returnArray.push({'uri':file.filehref,'option':{'out':file.filename,'cookie':'Cookie: qm_ftn_key='+file.filekey}});
              }
            });
            return JSON.stringify(returnArray)
        }
        else
        {
            $.each(files,function(i,file)
            {
              if(file.status==true)
              {
                var tempString=o.outputRule
                .replace(/\\n/g,'\n')
                .replace(/&amp;/g,'&')
                .replace(/\$name/g,file.filename)
                .replace(/\$cookie/g,'Cookie: qm_ftn_key='+file.filekey)
                .replace(/\$referer/g,file.ref)
                .replace(/\$url/g,file.filehref);
                returnArray.push(tempString);
              }
              else
              {
                returnArray.push('文件'+file.filename+'暂时无法下载');
              }
            });
            o.tempCMD=returnArray;
            return returnArray.join('\n');
        }   
    },
  showFalse:function(filename)
  {
    var temp="文件"+filename+"获取失败，请转用中转站或改天再试";
    return temp;
  },
  getZZZFirstFile:function(){ 
  var result;
  var raw;
  $.ajax({ 
          async:false,
          type:"get", 
          url:document.getElementById('folder_ftn').href.replace(/pagesize=\d+/,'pagesize=1'), 
          success:function(r){ 
              if(r!=null){ 
                  raw=r;
                  result=r.match(/ConcreteFileList\(([\S|\s]*?)\)/)[1].replace(/\s/g,'').split(',');                
              } 
          } 
    }); 
  return {'file':result,'raw':raw};
  },
  HandleZZZDownResponse:function(response)
  {
    var link=response.split('|');
    return {
            'referer':window.location.href,
            'uri':link[0],
            'filename':link[0].match(/.*\/(.*?)\?/)[1],
            'cookie':"Cookie: qm_ftn_key="+link[1],
            'key':link[1]
    }
  },
  getZZZDownData:function(link_archor){
    var o = this;
    var argRegex=/\'(.*?)\'/g;
    var arg=link_archor.getAttribute('onclick').toString().match(argRegex);
    var base='/cgi-bin/ftnGetDownload?t=exs_ftn_getfiledownload';
    var fid=arg[0].replace(/#/g,"%23").replace(/\'/g,'');
    var code=arg[2].replace(/\'/g,'');
    var key=arg[3].replace(/\'/g,'');
    var request=base+'&fid='+fid+'&sid='+o.sid+'&code='+code+'&k='+key+'&r='+Math.random();
    $.ajax({ 
            async:false,
            type:"get", 
            url:request, 
            success:function(data)
            {
              var r=o.HandleZZZDownResponse(data);
              var file=new o.File();
              //r.filename会导致文件名被阉割
              file.filename=arg[1];
              file.ref=r.referer;
              file.filekey=r.key;
              file.filehref=r.uri;
              file.status=true;
              o.files.push(file);
            } 
      }); 
  },
  renameFile:function(fid,ori_name,new_name)
  {
    var result="";
    var o = this;
    new_name=this.filterName(new_name);
    var data={
      'sid':o.sid,
      'oper':'filealter',
      'bus':2,
      'filename':new_name,
      'fid':fid,
      't':'re_ftnfilefunc',
      'resp_charset':'UTF8'
      };
    $.ajax({
      async:false,
      type:'post',
      url:'/cgi-bin/ftnTagMgr?sid='+o.sid,
      data:data,
      success:function(r)
      {
        if(r)
        {
          result=r
        }
      }
    })
      // console.log($.each(data,function(i,n){console.log(n+":"+data[n])}));
      // console.log(result);
      if(parseInt(result.match(/error.*?:.*?"(.*?)"/)[1])==0)
      {
        return true
      }
      else
      {
        return false
      }
  },
  fetchRef:function()
  {
      //Initialize Mail Page
      if($('#mainFrame').contents().find('#bigAttachContainer_bottom').length==0)
      {
        alert('该功能仅在拥有大附件邮件页面中使用，用于批量提取全部大附件文件');
        return
      }
      var o=this;
      o.files=[];     
      o.tempCMD=[]; 
      o.list=$('#mainFrame').contents().find('body').find('.name_big').children().filter('a');
      for(var i=0;i<o.list.length;i++)
      {
          var file=new o.File();
          file.filename=o.list[i].innerHTML;
          file.ref=o.list[i].href;
          var regEx1=/(http:\/\/)(mail\.qq\.com)(.*)/;
          file.request=file.ref.match(regEx1)[3];
          $.get(file.request,function(data)
          {
              file.content=data;
              try
              {
                var temp_key=file.content.match(/key = "(\w+)"/)[1];
                var temp_url=file.content.match(/url = "(.*)"/)[1];
              }
              catch(e)
              {
                console.log(e);
              }
              console.log(temp_key)
              if(temp_key&&temp_key!=null)
              {
                file.filekey=temp_key;
                file.status=true;
              }
              if(temp_url&&temp_url!=null)
                {
                  file.filehref=temp_url;
                }
          },"html");
              o.files.push(file);
        }

      //Write CMD to TextArea
      o.showAddress()
  },

  fuckZZZ:function()
  {
    if($('#mainFrame').contents().find('#fileListContainer').length==0)
    {
      alert('该功能仅在中转站页面中可以使用，用于提取勾选文件的批量下载');
      return
    }
    var o = this;
    o.files=[];
    o.tempCMD=[];
    o.ZZZFiles=$('#mainFrame').contents().find('input:checked').parents('.ft_file').find('a[id*=downloadFile]');
    // o.ZZZInsertPoint.find('textarea').val('');
    o.ZZZCmdline=[];
    $.each(o.ZZZFiles,function(i,n)
    {  
      o.getZZZDownData(n);
    });
    o.tempCMD=o.ZZZCmdline.join('');
    o.showAddress();
  },
  //保存邮件下所有文件到自己的中转站
  Task:function(name,link)
  {
       this.name=name;
       this.link=link;
       var tempOrder=name.match(/[p|part]+(\d+)\.rar/)
       this.order=parseInt(tempOrder ? tempOrder[1] : 0 ,10);
       return this;
  },
  orderTask:function(t1,t2)
  {
       return t1.order-t2.order
  },
  checkResult:function(r)
  {
       var flag=r.match(/[\s|\S]*[文件保存成功|您已经保存过该文件]/);
       return flag?true:false;
  },
  batchRenew:function(tasks)
  {
    var o = this;
    if(tasks.length>0)
    {
        $.get(tasks[0].link,function(r){
             var flag=o.checkResult(r);
             if(flag)
             {
                var firstfile=o.getZZZFirstFile();
                var file=firstfile.file;
                var filename=file[3];
                var fid='Ft_L_downInfo_'+file[2].replace(/"/g,'');
                var new_name=tasks[0].name.replace(/"/g,'');
                var down_count=parseInt(file[8].replace(/"/g,''));
                //console.log(new_name);
                //console.log(filename);
                //console.log(down_count);
                if(down_count==0)
                {
                //如果下载次数为0,则说明刚刚加入中转站
                  if(filename != new_name)
                  {
                    var res=o.renameFile(fid,filename,new_name);
                  }
                  //此处未来应添加检测改名失败的情况（清除队列，告诉失败位置
                  if(res)
                  {
                      var base='/cgi-bin/ftnGetDownload?t=exs_ftn_getfiledownload';
                      var fid=file[2].replace(/"/g,'');
                      var code=file[5].replace(/"/g,'');
                      var key=file[6].replace(/"/g,'');
                      var request=base+'&fid='+fid+'&sid='+o.sid+'&code='+code+'&k='+key+'&r='+Math.random();
                      $.get(request,function(){
                        tasks.shift();
                        //console.log('剩余任务:'+tasks.length);
                      })
                  }
                }
                else
                {
                  tasks.shift();
                  //console.log('剩余任务:'+tasks.length);
                }
             }
             o.batchRenew(tasks);
        })
       }
       else
       {
            //console.log('批量续期成功');
       }
  },
  batchTransfer:function()
  {
    var o = this;
    var links=$('#mainFrame').contents().find('a[title="保存到我的中转站"]');
    var tasks=[];
    links.each(function(i,n){
         var name=$(n).parent().siblings('a').html();
         var link=n.href;
         tasks.push(new o.Task(name,link));
    })
    tasks=tasks.sort(o.orderTask);
    o.batchRenew(tasks);
  },
  recruitTransButton:function()
  {
    var o = this;
    var name_bigs=$('#mainFrame').contents().find('.name_big').find('.graytext:contains("已过期")');
    var template='<div class="down_big"><a href="$down_url" target="_blank">下载</a>&nbsp;&nbsp;<a href="$trans_url" target="actionFrame" title="保存到我的中转站">转存到中转站</a></div>'
    name_bigs.each(function(i,name)
    {
      var link=$(name).prev();
      try
      {
        var reg=link.attr('href').match(/(.*?)\?k=(.*?)&t=(.*?)&code=(.*)/);
        var k=reg[2];
        var code=reg[4];
        var down_url=link.attr('href');
        var trans_url='http://m107.mail.qq.com/cgi-bin/ftnStoreFile?k=$k&code=$code&sid=$sid&action=save&t=autosave'
                        .replace('$k',k)
                        .replace('$code',code)
                        .replace('$sid', o.sid);
        $(name).parent().append(template.replace('$down_url',down_url).replace('$trans_url',trans_url));
      }
      catch(error)
      {
        console.log('mail attachment parsed failed')
      }
    })
  },
  load:function()
  {
    var o = this;
    this.initPage();
    $('#showCMD').bind('click',function(){o.fetchRef()});
    $('#showAndFade').bind('click',function(){
                o.showAddress();
                });        
    $('#showZZZFile').bind('click',function(){o.fuckZZZ()});
    $('#transFiles').bind('click',function(){o.batchTransfer()});
  }
}
/////////
//Execution of page

$(function()
{
  unsafeWindow.QF=new QF();
});