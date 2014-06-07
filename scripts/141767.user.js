// ==UserScript==
// @name           DUChan_Assistant
// @description       Yet another ThunderAssistant copy apply to Baidupan
// @namespace      http://http://pan.baidu.com/
// @include        http://pan.baidu.com/share/link*
// @include        http://pan.baidu.com/disk/home*
// @updateURL    http://userscripts.org/scripts/source/141767.user.js
// @version 0.1.1
// ==/UserScript==

/*
0.1.0 ChangeLog

1: Use FileUtils API instead of doing ajax call to fetch back filelist
2: added Export filelist function to User's file management page (http://pan.baidu.com/disk/home*)
3: Some minor changes to auto_select label

*/

/*
0.1.1 ChangeLog
1: Fixed the long existed bug which reset the rule when new rule is prompt and user clicked cancel

*/
String.prototype.pmatch = function(reg){
        if( !(reg instanceof RegExp)) return 0;
        if( !reg.global ) {
                var a = this.match(reg);
                return a? [a.slice(1,a.length)] : 0;
        }
        var a=[],b;
        while(b=reg.exec(this)){
                b.shift();
                a.push(b);
        }
        return a.length>0?a:0;
}

function selectNode (node) {
    
    var selection, range, doc, win;
    if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof
    win.getSelection != 'undefined' && typeof doc.createRange != 'undefined'
    && (selection = window.getSelection()) && typeof
    selection.removeAllRanges != 'undefined') {
    range = doc.createRange();
    range.selectNode(node);
    selection.removeAllRanges();
    selection.addRange(range);
    } else if (document.body && typeof document.body.createTextRange !=
    'undefined' && (range = document.body.createTextRange())) {
    range.moveToElementText(node);
    range.select();
    }
}

if(typeof DUCHAN=='undefined'){DUCHAN=function(){this.init()}}
DUCHAN.prototype={
    init:function()
    {
        var o = this;
        this.api = unsafeWindow.FileUtils;
        // api have three usable functions
        // FileUtils.getListViewCheckedItems() returns all selected file infos
        // FileUtils.getElementData(i) returns the ith element of all
        // FileUtils._mInfiniteListView.getBackedData() get all of the element in the page
        this.isSafari = navigator.userAgent.match(/Safari/) ? true : false;
        this.auto_select = this.getAutoSelect(); 
        o.batchContent=[];
        o.links={};
        var has_no_path = window.location.href.match(/path=(.*)/)==null;
        //Is single file or file list
        this.is_not_single = $('.copy-outer-span').length === 0 ;
        //Rule only accept 2 variable $name $url
        //wget -O $name $url
        //localStorage.setItem('outputRule','wget -O "$name" "$url"');
        o.outputRule=localStorage.getItem('outputRule');
        o.pageNum=1000; //Result counts from single request
        o.outputRule= o.outputRule ? o.outputRule : 'default';
        o.returnData=new Array();
        o.showButton=this.is_not_single ? $('#barCmdDownload').clone().attr('id','showAddr').attr('onclick','javascript:return null').removeClass('disabled').find('b').html('显示已选地址').end() : $('#downFileButtom').clone().attr('id','showAddr').attr('onclick','javascript:return null').attr('href','javascript:return null').find('b').html('显示下载地址').end() ;
        o.buttonPoint=this.is_not_single ? $('#barCmdDownload').parent() : $('#shareqr').parent();
        o.buttonPoint.append(o.showButton);
        
        
        o.showButton.click(function(event)
        {
            if(o.now_href==undefined){
                o.now_href=window.location.href;
                o.fetchAll();
            }
            else if(o.now_href!=window.location.href)
            {
                o.now_href=window.location.href;
                o.clean_file_list()
                o.fetchAll();
            }
            o.showCheckedLinks();
            event.preventDefault();
        });
        
               
    //Fetch download links at current page
    
    if(has_no_path)
    {    
        o.parsePage();
    }

        // o.fetchAll(); //Link will not auto fetched when page is inited,link fetch will only happened when user click getLink button
        //Live bind function to address box
        $('#close_btn').live('click',function(){
                o.closeBox();
        });
        // $('#output_txt').live('click',function(){
        //         o.saveToDownList('normal');
        // });
        $('#batchedlink').live('click',function()
        {
            o.auto_select ? selectNode(this) : null;
        });
        $('#linkpage').live('click',function(){
                o.showLinkPage();
        });
        $('#reform').live('click',function(){
            o.promptForRule();
        })
        $('#reset').live('click',function(){
            var result=confirm("Reset export rule?");
            result ? o.resetRule() : null;
        })
        $('#reverse').live('click',function(){
            o.reverseResult(); 
        });
        $('#output_cmd').live('click',function(){
            o.outputCMD();
        });

        $('.auto_select').live('click',function(e){
            o.changeAutoSelect();
        });
    },
    clean_file_list:function()
    {
        this.links={};
    },
    sync_get_result:function(req_url,data){
        if(data===undefined)
        {
            var data={};
        }
        var tmp;
        $.ajax({ async:false,
            type:"get", 
            contentType:"application/json", 
            url:req_url,
            data:data,
            dataType:"json",
            success:function(result){ 
                if(result!=null)
                { 
                tmp = result; 
                }
            } 
        }); 
        return tmp; 
    },
    decode_unicode:function(x){
        var r = /\\u([\d\w]{4})/gi;
        x = x.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16)); } );
        return x
    },
    parseURL:function()
    {
        var loc=window.location.href;
        var uk=loc.match(/uk=(\d+)/)[1];
        var shareid=loc.match(/shareid=(\d+)/)[1];
        var path=loc.match(/path=(.*)/)[1].replace('%20','+');
        return 'dir='+path+'&uk='+uk+'&shareid='+shareid;
    },
    parsePage:function()
    {
        var o = this;
        var names=$('body').html().pmatch(/server_filename\\\":\\\"(.*?)\\\"/g);
        var dlinks=$('body').html().pmatch(/dlink\\\":\\\"(.*?)\\\"/g);
        var md5s=$('body').html().pmatch(/md5\\\":\\\"(.*?)\\\"/g);
        //To fix the issue when enter a link like http://pan.baidu.com/share/link?shareid=185047&uk=4261945349
        //It shows up a single folder at first but the script think it is just a simple page without folder sharing
        //so it will parse the page,because there will be names(name is the name of the shared folder),but without any dlinks
        //under this circumstands, just return without doing anything
        if(!dlinks)return;
        for(var i=0;i<names.length;i++)
        {
            names[i]=o.decode_unicode(names[i][0].replace(/\\\\/g,'\\'));
            dlinks[i]=dlinks[i][0].replace(/\\\\/g,'\\').replace(/\\\//g,'/');
            md5s[i]=md5s[i][0]
            o.links[names[i]]={
                'url':dlinks[i],
                'name':names[i],
                'md5':md5s[i]
            }
        }
    },
    fetchAll:function()
    {
        if(!this.is_not_single)return;
        var o = this;
       var fileList = this.api._mInfiniteListView.getBackedData() 
        $.each(fileList,function(i,f){
            var name=f.path.split('/');
            name=name[name.length-1];
            o.links[name]={
                'url':f.dlink,
                'name':name,
                'md5':f.md5,
            }
        });
    },
    showAddress:function(addrString,type,callback)
    {
        this.addrBox=$('<div id="batchPublish"></div>')
        .append('<div id="batchHeader"></div>')
        .append('<div id="batchContent" style="float:left;clear:both"></div>')
        .append('<div id="batchFooter" style="flolat:left;clear:both"></div>') ;
        this.addrBox.find('.mcTab').css('display','none');
            
        this.addrBox.find('#batchHeader')
        .append('<a style="float:left" id="output_txt" href="javascript:return null;">输出到文件    |    </a>')
        .append('<a style="float:left" id="linkpage" href="javascript:return null;">输出Linkpage    |    </a>')
        .append('<span>DuChan LIST</span>')
        .append('<a style="float:right" id="close_btn" href="javascript:return null;">关闭</a>')
        .append('<a style="float:right" id="reset" href="javascript:return null;">重置格式｜</a>')
        .append('<a style="float:right" id="reform" href="javascript:return null;">修改|</a>')
        .append('<a style="float:right" id="reverse" href="javascript:return null;">转序｜</a>');
            
        this.addrBox.find('#batchFooter')
        // .append('<a style="float:right" id="select_all_text" href="javascript:return null;">全选文本</a>')
        .append('<div  style="float:left"><input class="auto_select" type="checkbox"/><label class="auto_select">自动全选地址</label></div>')
        .append('<a style="float:right" id="output_cmd" href="javascript:return null;">输出为脚本</a>');


        var batchContent=this.addrBox.find('#batchContent')
        .append('<pre id="batchedlink"></pre>');
            
        this.addrBox.find('#batchedlink').css({'width':'500px','height':'250px','overflow':'scroll'})
        .html(addrString);   
            
        $.blockUI({message:this.addrBox,css:{width:"520px",height:"300px"}});
        this.saveToDownList();
        this.outputCMD();

        //Init auto_select
        $('.auto_select').filter('input').attr('checked',this.auto_select);
        if(typeof(callback)=='function')
        {
            callback();
        }
        
    },
    updateDownURL:function(text,urlId)
    {
        var uriContent = "data:application/octet-stream," + encodeURIComponent(text).replace(/%26amp%3B/g,'%26');
    console.log(uriContent);
        document.getElementById(urlId).href=uriContent;
    },
    saveToDownList:function()
    {
        var tempString="";
        var returnLinks=this.getCheckedArchors() ;
        var tempString=this.getPureAddress(returnLinks);
        this.updateDownURL(tempString,'output_txt');
    },    
    outputCMD:function()
    {
        var tempString=$('#batchedlink').html();
        this.updateDownURL(tempString,'output_cmd');
    },
    closeBox:function()
    {
        
        $.unblockUI();

    },
    restartBox:function()
    {
        this.closeBox();  
        this.showCheckedLinks() ;
    },

    getCheckedArchors:function()
    {
        var o=this;
        var checked=this.api.getListViewCheckedItems()
        var returnLinks=[];
        $.each(checked,
        function(i,info){
            if (info.hasOwnProperty('dir_empty')) return;
            var name=info['path'].split('/');
            name=name[name.length-1];
            if(name)
            {
                try
                {
                    var link=o.links[name];
                    returnLinks.push(link);
                }
                catch(e)
                {
                    console.log(e)
                }    
            }
        })
        return returnLinks
    },
    showCheckedLinks:function()
    {
        var o = this;
        if(this.is_not_single)
        {
            var returnLinks= this.getCheckedArchors();
        }
        else
        {
            var returnLinks = [];
            $.each(this.links,function(i,link)
            {
                returnLinks.push(link);
            });
        }
        var linkString=this.getLinkDetail(returnLinks);
        this.showAddress(linkString,'normal');
    },
    getLinkDetail:function(links){
        var o = this;
        var returnArray=[];
        if (o.outputRule == 'default')
        {
            $.each(links,function(i,link)
            {
            returnArray.push({'uri':link.url,'option':{'out':link.name}});
            });
            return JSON.stringify(returnArray)
        }
        else
        {
            $.each(links,function(i,link)
            {
                var filename=link.name;
                var tempString=o.outputRule
                .replace(/\\n/g,'\n')
                .replace(/&amp;/g,'&')
                .replace(/\$name/g,filename)
                .replace(/\$cookie/g,document.cookie)
                .replace(/\$url/g,link.url);
                returnArray.push(tempString);
            });
            o.batchContent=returnArray;
            return returnArray.join('\n');

        }
        
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
    getLinkPage: function () 
    {
        var o = this;
        var returnLinks= o.getCheckedArchors() ;
        var content = $('<div id="main"><h1>Link Page</h1></div>');
        var insertPoint = content.filter('#main');
        $.each(returnLinks, function (i, link) {    
            var archor = $('<a class="dlinks"></a>');
            archor.attr('href', link.url).html(link.name);
            insertPoint.append(archor).append('<br/>');
        });
        return content.html();
    },
    showLinkPage:function()
    {
        var content=this.getLinkPage();
        var my_window = window.open("", "flashgot", "status=1,width=400,height=450,scrollbars=1");
        my_window.document.write(content);
    },
    promptForRule : function()
    {
        var lastRule = localStorage.getItem('outputRule');
        var rule = prompt('Plz input your custom rule which $name stands for Filename and $url for Download URL',this.outputRule);
        // check if lastRule exist, if not, empty string will return default setting,otherwise lastRule will be used
        rule = rule ? rule : (lastRule ? lastRule : 'default');
        localStorage.setItem('outputRule',rule);  
        this.outputRule=rule;
        // console.log(rule);
        this.restartBox();
    },
    resetRule : function()
    {
        localStorage.setItem('output',null);
        this.outputRule='default';
        alert('Output rule has been reset');
        this.restartBox();
    },
    changeAutoSelect : function()
    {
        var flag=localStorage.getItem('auto_select') == "true" ? true : false ;
        localStorage.setItem('auto_select',!flag);
        this.auto_select=!flag;
        $('.auto_select').filter('input').attr('checked',this.auto_select);
    },
    getAutoSelect : function()
    {
        var flag=localStorage.getItem('auto_select');
        flag === null ? localStorage.setItem('auto_select',true) : null;
        return flag === "true" ? true : false ;
    },
    reverseResult : function()
    {
        $('#batchedlink').html(this.batchContent.reverse().join('\n'));
    },
}

loadJquery=function(){
    // if(typeof(unsafeWindow.jQuery)=='undefined' && typeof(unsafeWindow.jQuery.blockUI)!='function' )

    // if is single file page and jQuery loaded, run
    // or if not single file page and jQuery loaded and unsafeWindow.FileUtils._mInfiniteListView is not null, run)
    if((document.getElementsByClassName('copy-outer-span').length == 0 && typeof(unsafeWindow.jQuery)!='undefined' && unsafeWindow.FileUtils._mInfiniteListView!=null) || (document.getElementsByClassName('copy-outer-span').length > 0 && typeof(unsafeWindow.jQuery)!='undefined' ))
    {
        jQuery=unsafeWindow.jQuery;
        $=jQuery;
            (function(i){if(/1\.(0|1|2)\.(0|1|2)/.test(i.fn.jquery)||/^1.1/.test(i.fn.jquery)){alert("blockUI requires jQuery v1.2.3 or later!  You are using v"+i.fn.jquery);return}i.fn._fadeIn=i.fn.fadeIn;var c=function(){};var j=document.documentMode||0;var e=i.browser.msie&&((i.browser.version<8&&!j)||j<8);var f=i.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!j;i.blockUI=function(p){d(window,p)};i.unblockUI=function(p){h(window,p)};i.growlUI=function(t,r,s,p){var q=i('<div class="growlUI"></div>');if(t){q.append("<h1>"+t+"</h1>")}if(r){q.append("<h2>"+r+"</h2>")}if(s==undefined){s=3000}i.blockUI({message:q,fadeIn:700,fadeOut:1000,centerY:false,timeout:s,showOverlay:false,onUnblock:p,css:i.blockUI.defaults.growlCSS})};i.fn.block=function(p){return this.unblock({fadeOut:0}).each(function(){if(i.css(this,"position")=="static"){this.style.position="relative"}if(i.browser.msie){this.style.zoom=1}d(this,p)})};i.fn.unblock=function(p){return this.each(function(){h(this,p)})};i.blockUI.version=2.35;i.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg"};var b=null;var g=[];function d(r,F){var A=(r==window);var w=F&&F.message!==undefined?F.message:undefined;F=i.extend({},i.blockUI.defaults,F||{});F.overlayCSS=i.extend({},i.blockUI.defaults.overlayCSS,F.overlayCSS||{});var C=i.extend({},i.blockUI.defaults.css,F.css||{});var N=i.extend({},i.blockUI.defaults.themedCSS,F.themedCSS||{});w=w===undefined?F.message:w;if(A&&b){h(window,{fadeOut:0})}if(w&&typeof w!="string"&&(w.parentNode||w.jquery)){var I=w.jquery?w[0]:w;var P={};i(r).data("blockUI.history",P);P.el=I;P.parent=I.parentNode;P.display=I.style.display;P.position=I.style.position;if(P.parent){P.parent.removeChild(I)}}var B=F.baseZ;var M=(i.browser.msie||F.forceIframe)?i('<iframe class="blockUI" style="z-index:'+(B++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+F.iframeSrc+'"></iframe>'):i('<div class="blockUI" style="display:none"></div>');var L=i('<div class="blockUI blockOverlay" style="z-index:'+(B++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var K,G;if(F.theme&&A){G='<div class="blockUI '+F.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+B+';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(F.title||"&nbsp;")+'</div><div class="ui-widget-content ui-dialog-content"></div></div>'}else{if(F.theme){G='<div class="blockUI '+F.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+B+';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(F.title||"&nbsp;")+'</div><div class="ui-widget-content ui-dialog-content"></div></div>'}else{if(A){G='<div class="blockUI '+F.blockMsgClass+' blockPage" style="z-index:'+B+';display:none;position:fixed"></div>'}else{G='<div class="blockUI '+F.blockMsgClass+' blockElement" style="z-index:'+B+';display:none;position:absolute"></div>'}}}K=i(G);if(w){if(F.theme){K.css(N);K.addClass("ui-widget-content")}else{K.css(C)}}if(!F.applyPlatformOpacityRules||!(i.browser.mozilla&&/Linux/.test(navigator.platform))){L.css(F.overlayCSS)}L.css("position",A?"fixed":"absolute");if(i.browser.msie||F.forceIframe){M.css("opacity",0)}var y=[M,L,K],O=A?i("body"):i(r);i.each(y,function(){this.appendTo(O)});if(F.theme&&F.draggable&&i.fn.draggable){K.draggable({handle:".ui-dialog-titlebar",cancel:"li"})}var v=e&&(!i.boxModel||i("object,embed",A?null:r).length>0);if(f||v){if(A&&F.allowBodyStretch&&i.boxModel){i("html,body").css("height","100%")}if((f||!i.boxModel)&&!A){var E=m(r,"borderTopWidth"),J=m(r,"borderLeftWidth");var x=E?"(0 - "+E+")":0;var D=J?"(0 - "+J+")":0}i.each([M,L,K],function(t,S){var z=S[0].style;z.position="absolute";if(t<2){A?z.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+F.quirksmodeOffsetHack+') + "px"'):z.setExpression("height",'this.parentNode.offsetHeight + "px"');A?z.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):z.setExpression("width",'this.parentNode.offsetWidth + "px"');if(D){z.setExpression("left",D)}if(x){z.setExpression("top",x)}}else{if(F.centerY){if(A){z.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')}z.marginTop=0}else{if(!F.centerY&&A){var Q=(F.css&&F.css.top)?parseInt(F.css.top):0;var R="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+Q+') + "px"';z.setExpression("top",R)}}}})}if(w){if(F.theme){K.find(".ui-widget-content").append(w)}else{K.append(w)}if(w.jquery||w.nodeType){i(w).show()}}if((i.browser.msie||F.forceIframe)&&F.showOverlay){M.show()}if(F.fadeIn){var H=F.onBlock?F.onBlock:c;var q=(F.showOverlay&&!w)?H:c;var p=w?H:c;if(F.showOverlay){L._fadeIn(F.fadeIn,q)}if(w){K._fadeIn(F.fadeIn,p)}}else{if(F.showOverlay){L.show()}if(w){K.show()}if(F.onBlock){F.onBlock()}}l(1,r,F);if(A){b=K[0];g=i(":input:enabled:visible",b);if(F.focusInput){setTimeout(o,20)}}else{a(K[0],F.centerX,F.centerY)}if(F.timeout){var u=setTimeout(function(){A?i.unblockUI(F):i(r).unblock(F)},F.timeout);i(r).data("blockUI.timeout",u)}}function h(s,t){var r=(s==window);var q=i(s);var u=q.data("blockUI.history");var v=q.data("blockUI.timeout");if(v){clearTimeout(v);q.removeData("blockUI.timeout")}t=i.extend({},i.blockUI.defaults,t||{});l(0,s,t);var p;if(r){p=i("body").children().filter(".blockUI").add("body > .blockUI")}else{p=i(".blockUI",s)}if(r){b=g=null}if(t.fadeOut){p.fadeOut(t.fadeOut);setTimeout(function(){k(p,u,t,s)},t.fadeOut)}else{k(p,u,t,s)}}function k(p,s,r,q){p.each(function(t,u){if(this.parentNode){this.parentNode.removeChild(this)}});if(s&&s.el){s.el.style.display=s.display;s.el.style.position=s.position;if(s.parent){s.parent.appendChild(s.el)}i(q).removeData("blockUI.history")}if(typeof r.onUnblock=="function"){r.onUnblock(q,r)}}function l(p,t,u){var s=t==window,r=i(t);if(!p&&(s&&!b||!s&&!r.data("blockUI.isBlocked"))){return}if(!s){r.data("blockUI.isBlocked",p)}if(!u.bindEvents||(p&&!u.showOverlay)){return}var q="mousedown mouseup keydown keypress";p?i(document).bind(q,u,n):i(document).unbind(q,n)}function n(t){if(t.keyCode&&t.keyCode==9){if(b&&t.data.constrainTabKey){var r=g;var q=!t.shiftKey&&t.target===r[r.length-1];var p=t.shiftKey&&t.target===r[0];if(q||p){setTimeout(function(){o(p)},10);return false}}}var s=t.data;if(i(t.target).parents("div."+s.blockMsgClass).length>0){return true}return i(t.target).parents().children().filter("div.blockUI").length==0}function o(p){if(!g){return}var q=g[p===true?g.length-1:0];if(q){q.focus()}}function a(w,q,A){var z=w.parentNode,v=w.style;var r=((z.offsetWidth-w.offsetWidth)/2)-m(z,"borderLeftWidth");var u=((z.offsetHeight-w.offsetHeight)/2)-m(z,"borderTopWidth");if(q){v.left=r>0?(r+"px"):"0"}if(A){v.top=u>0?(u+"px"):"0"}}function m(q,r){return parseInt(i.css(q,r))||0}})(jQuery);
        du=new DUCHAN();
        unsafeWindow.du=du;
        $('html').css('-webkit-user-select','text').css('-moz-user-select','text');

    }
    else
    {
        setTimeout(loadJquery,500);
    }
}

loadJquery()
