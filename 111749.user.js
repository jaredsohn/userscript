// ==UserScript==
// @name           ThunderAssistant_For_Safari
// @namespace      http://dynamic.cloud.vip.xunlei.com
// @include        http://dynamic.cloud.vip.xunlei.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://mcpub.googlecode.com/files/jquery.blockUI.js
// @version 0.1.0
// ==/UserScript==
//
// For 	Safari
//
if (document.title.length == 0) return; 

var XL=function(){
    this.init();	
}
XL.prototype={
    init:function()
    {
        var o = this;
	this.isSafari = navigator.userAgent.match(/Safari/) ? true : false;
        //http://dynamic.cloud.vip.xunlei.com/interface/get_cloud_list?p=(page=1-......10)
        o.cloudBase='http://dynamic.cloud.vip.xunlei.com/interface/get_cloud_list?p=';
        o.cloudtrans={};
        o.links={};
        o.links['normal']={};
        o.links['bt']={};
        o.links['cloud']={};
        o.returnData=new Array();
        o.showButton=$('#li_task_save').clone().attr('id','showAddr').find('em').html('显示地址');
        o.cloudButton=$('#li_task_save').clone().attr('id','showAddr').find('em').html('云转地址');
        o.buttonPoint=$('#li_task_save').parent();
        o.buttonPoint.append(o.showButton);
        o.showButton.after(o.cloudButton);
        o.showButton.click(function()
        {
            o.showCheckedLinks();
        });
        o.cloudButton.click(function(){
            o.showCloudLinks();
        });
       
        //Fetch download links at current page

        o.fetchAll();
        o.fetchCloudTrans(); 
        //Live bind function to address box
        $('#close_btn').live('click',function(){
                o.closeBox();
        });
        $('#output_txt').live('click',function(){
                o.saveToDownList('normal');
        });
        $('#linkpage').live('click',function(){
                o.showLinkPage('normal');
        });
        $('#cloud_txt').live('click',function(){
                o.saveToDownList('cloud');
        });
        $('#cloud_linkpage').live('click',function(){
                o.showLinkPage('cloud');
        })
    },
    fetchAll:function()
    {
        var o = this;
        //Trigger stands for BT Folder to be parsed.
        //o.triggers=$('a[onclick*=bt_task_down]');
        //Normal stands for Emule/http links which had already been parsed.
        o.triggers=$('a[onclick*=bt_list_show]');
        o.normals=$('input[value*=gdl][id*=dl]');
        o.normals.each(function(i,down)
        {
            var tid=down.id.split('dl_url');
            var tid= tid ? tid[1] : null;
            if (tid)
            {
                var fname=$(down).siblings('input[id^=durl]')[0].value;
                var furl=down.value;
                o.links['normal'][tid]={'url':furl,'name':fname};
            }
        });
        o.triggers.each(function(i,link)
        {
                    //var args=$(link).attr('onclick').toString().match(/bt_task_down\((.*)\)/)[1];
            var args=$(link).attr('onclick').toString().match(/bt_list_show\((.*)\)/)[1];
            var args=args.split(',');
            var infoid=args[0].trim();
            var tid=args[1].trim();
                    var G_section= o.isSafari ? $('html').html().match(/G_section = (.*?);/)[1] : unsafeWindow.G_section;
                    var G_USERID= o.isSafari ? location.href.match(/userid=(\d+)/)[1] : unsafeWindow.G_USERID;
                console.log("infoid="+infoid);
                console.log("tid="+tid);
                var req = "/interface/fill_bt_list?callback=bt_task_down_resp&tid="+tid+"&infoid="+infoid+"&g_net="+G_section+"&p=0&uid="+G_USERID+"&t="+new Date();
                $.get(req,function(data){
                if(data)
                    {
                        o.pushData(data,tid);
                    }
                });
            });

    },
    fetchCloudTrans:function()
    {
        var o = this;
        $.get(o.cloudBase+'1',function(r){
            var baseInfo=JSON.parse(r);
            o.cloudtrans.maxPage=parseInt(baseInfo.max_page);
            $.each(baseInfo.list.records,function(i,record){
                if (record.status=="2")
                {
                    o.links['cloud'][record.cid]={name:record.taskname,url:record.lixian_url};
                }
            }); 
            o.fillLeftCloudFiles(2);      
        });

    },
    fillLeftCloudFiles:function(page)
    {
        var o = this;
        var nextPage=String(parseInt(page)+1);
        if(page<=this.cloudtrans.maxPage)
        {
             $.get(o.cloudBase+page,function(r){
                var baseInfo=JSON.parse(r);
                $.each(baseInfo.list.records,function(i,record){
                    if (record.status=="2")
                    {
                        o.links['cloud'][record.cid]={name:record.taskname,url:record.lixian_url};
                    }
                });
                o.fillLeftCloudFiles(nextPage);    
            });
        }
    },
    getCloudFiles:function()
    {
        var returnLinks=[];
        $.each(this.links.cloud,function(i,link){
            returnLinks.push({url:link.url,name:link.name});
        });
        return returnLinks
    },
    isBt:function(tid)
    {
            return this.links.bt.hasOwnProperty(tid);
    },
    isNormal:function(tid)
    {
            return this.links.normal.hasOwnProperty(tid);
    },
    parseArgs:function(archor)
    {
            var args=$(archor).attr('onclick').toString().match(/bt_task_down\((.*)\)/)[1];
            var args=args.split(',');
            var infoid=args[0].trim();
            var tid=args[1].trim();
            return {'infoid':infoid,'tid':tid} ;
    },
    getLinkByTid:function(tid)
    {
             if (this.links.bt.hasOwnProperty(tid))
            {
                return this.links.bt[tid];
            }

    },
    showAddress:function(addrString,type)
    {
    	if(type=='normal')
        {
            this.addrBox=$('<div id="batchPublish"></div>')
            .append('<div id="batchHeader"></div>')
            .append('<div id="batchContent" style="float:left;clear:both"></div>');
            
            this.addrBox.find('.mcTab').css('display','none');
            
            this.addrBox.find('#batchHeader')
            .append('<a style="float:left" id="output_txt" href="javascript:return null;">输出到文件    |    </a>')
            .append('<a style="float:left" id="linkpage" href="javascript:return null;">输出Linkpage    |    </a>')
            .append('<span>ZhaLei LIST</span>')
            .append('<a style="float:right" id="close_btn" href="javascript:return null;">关闭</a>');
            
            var batchContent=this.addrBox.find('#batchContent')
            .append('<textarea readonly="true" id="batchedlink"></textarea>');
            
            this.addrBox.find('#batchedlink').css({'width':'500px','height':'250px'})
            .val(addrString);	
            
            $.blockUI({message:this.addrBox,css:{width:"520px",height:"300px"}});
        }
        else if(type=='cloud')
        {
            this.addrBox=$('<div id="batchCloudPublish"></div>')
            .append('<div id="batchHeader"></div>')
            .append('<div id="batchContent" style="float:left;clear:both"></div>');
            
            this.addrBox.find('.mcTab').css('display','none');
            
            this.addrBox.find('#batchHeader')
            .append('<a style="float:left" id="cloud_txt" href="javascript:return null;">输出到文件    |    </a>')
            .append('<a style="float:left" id="cloud_linkpage" href="javascript:return null;">输出Linkpage    |    </a>')
            .append('<span>ZhaLei Cloud Encoding LIST</span>')
            .append('<a style="float:right" id="close_btn" href="javascript:return null;">关闭</a>');
            
            var batchContent=this.addrBox.find('#batchContent')
            .append('<textarea readonly="true" id="batchedlink"></textarea>');
            
            this.addrBox.find('#batchedlink').css({'width':'500px','height':'250px'})
            .val(addrString);	
            
            $.blockUI({message:this.addrBox,css:{width:"520px",height:"300px"}});

        }
    },
    saveToDownList:function(type)
    {
    	var tempString="";
    	var returnLinks=type=='normal' ? this.getCheckedArchors() : this.getCloudFiles();
        var tempString=this.getPureAddress(returnLinks);
    	var uriContent = "data:application/octet-stream," + encodeURIComponent(tempString);
    	newWindow=window.open(uriContent, 'downLst');
    },    
    closeBox:function()
    {
        $.unblockUI();
    },
    getCheckedArchors:function()
    {
	var o=this;
        var checkboxs=$(':checked');
        var returnLinks=[];
        checkboxs.each(function(i,cb)
        {
            var tid=cb.value;
            var flag=o.isBt(tid);
            if(flag)
            {
                    var dlinks=o.getLinkByTid(tid);
                    $.each(dlinks,function(i,link){
                        returnLinks.push(link);
                    });
            }
            else
            {
                if(o.isNormal(tid))
                {
                    returnLinks.push(o.links.normal[tid]);
                }
            }
        });
        return returnLinks;     
    },
    showCheckedLinks:function()
    {
            var returnLinks=this.getCheckedArchors();
            var linkString=this.getLinkDetail(returnLinks);
            this.showAddress(linkString,'normal');
    },
    showCloudLinks:function()
    {
        var returnLinks=this.getCloudFiles();
        var linkString=this.getLinkDetail(returnLinks);
        this.showAddress(linkString,'cloud');
    },
    pushData:function(data,tid)
    {
            var data=data.match(/bt_task_down_resp\((.*)\)/);
            var rt=JSON.parse(data[1]);
            this.returnData.push(rt);
            var tempArray=[];
            $.each(rt['Result'],function(i,down)
            {
                var fname=down.title;
                var furl=down.downurl;
                tempArray.push({'name':fname,'url':furl});
            });  
            this.links['bt'][tid]=tempArray;          
    },
    getLinkDetail:function(links){
        var returnArray=[];
        $.each(links,function(i,link)
        {
        returnArray.push({'uri':link.url,'option':{'out':link.name}});
        });
        return JSON.stringify(returnArray)
    },
    getPureAddress:function(links)
    {
            var tempString="";
            $.each(links,function(i,link)
            {
                tempString+=link.url+"\n";
            });    
            return tempString;
    },
    getLinkPage: function (type) 
    {
        var o = this;
        var returnLinks= type=='normal' ? o.getCheckedArchors() : o.getCloudFiles();
        var content = $('<div id="main"><h1>Link Page</h1></div>');
        var insertPoint = content.filter('#main');
        $.each(returnLinks, function (i, link) {    
            var archor = $('<a class="dlinks"></a>');
            archor.attr('href', link.url).html(link.name);
            insertPoint.append(archor).append('<br/>');
        });
        return content.html();
    },
    showLinkPage:function(type)
    {
        var content=this.getLinkPage(type);
        var my_window = window.open("", "flashgot", "status=1,width=400,height=450,scrollbars=1");
	my_window.document.write(content);
    },
}

loadJquery=function(){
	if(typeof(jQuery)=='undefined' && typeof(jQuery.blockUI)!='function' )
	{
		setTimeout(loadJquery,500);
	}
	else
	{
		xlob=new XL();
		unsafeWindow.XL=xlob;
	}
}
loadJquery();

