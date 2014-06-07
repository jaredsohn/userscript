// ==UserScript==
// @name           ThunderAssistant
// @namespace      http://dynamic.cloud.vip.xunlei.com
// @include        http://dynamic.cloud.vip.xunlei.com/*
// @updateURL	   http://userscripts.org/scripts/source/111748.user.js
// @version 0.3.4
// ==/UserScript==
//
// For Firefox & Chrome & Safari
// Added $gdrive
// Will fix script malfunction when choosing between download categories next release.
// Fixed position problem 1/24/2013
// Fixex Rule Reset problem when press cancel button on rule prompting
// Fixed shiftCheck not working after the update of Xunlei(async loading problem)
// Some minor changes to code
// Fixed onclick problem 9/24/2013

if (document.title.length == 0) return; 

// var s=document.createElement('script');
//s.setAttribute('src', 'http://mcpub.googlecode.com/files/jquery.blockUI.js');
// s.setAttribute('src', 'http://us.misuzi.me/jquery.blockUI.js');
// document.body.appendChild(s);

function selectNode (node) {
    //This is a third party function written by Martin Honnen
    //In comp.lang.javascript

    //http://groups-beta.google.com/group/comp.lang.javascript/browse_thread/thread/2b389e61c7b951f2/99b5f1bee9922c39?lnk=gst&q=(doc+%3D+node.ownerDocu ment)+%26%26+(win+%3D+doc.defaultView)&rnum=1&hl=e n#99b5f1bee9922c39
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

var XL=function(){
       this.init();    
}
XL.prototype={
    init:function()
    {
        var o = this;
        this.isSafari = navigator.userAgent.match(/Safari/) ? true : false;
        this.auto_select = this.getAutoSelect(); 
        o.batchContent=[];
        o.links={};
        o.links['normal']={};
        o.links['bt']={};
        o.nowType=null;
        //Rule only accept 2 variable $name $url
        //wget -O $name $url
        //localStorage.setItem('outputRule','wget -O "$name" "$url"');
        o.outputRule=localStorage.getItem('outputRule');
        o.outputRule= o.outputRule ? o.outputRule : 'default';
        o.returnData=new Array();
	o.showButton=$('.saveside:first').clone().attr('id','showAddr').css('clear','both').html('<a></a>').find('a').attr('href','#').html('<em class="ic_sf ic_xl"></em>显示地址').end();
        o.watchButton=$('.saveside:first').clone().attr('id','ic_watchnow').html('<a></a>').find('a').attr('href','#').html('<em class="ic_yun"></em>在线观看').end();
        o.buttonPoint=$('.saveside:last').parent();
		//o.buttonPoint=$('#antherpt');
        o.buttonPoint.append(o.showButton).append(o.watchButton);
        $('.ic_xl').css('background','url(data:image/gif;base64,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)');
        
	$('#showAddr a').click(function()
	{
	    o.showCheckedLinks();
	});
	/*
        $('#showAddr a').live('click',function(){

            o.showCheckedLinks();
        });
	*/
        //Fetch download links at current page

        o.fetchAll();
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
                o.showLinkPage('normal');
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
        
        $('#ic_watchnow a').click(function(){
            o.watchOnline();
        });
        $('.auto_select').live('click',function(e){
            o.changeAutoSelect();
        });

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
            var tid=args[1].match(/\d+/)[0].trim();
                    var G_section= o.isSafari ? $('html').html().match(/G_section = (.*?);/)[1] : unsafeWindow.G_section;
                    var G_USERID= o.isSafari ? location.href.match(/userid=(\d+)/)[1] : unsafeWindow.G_USERID;
                /*console.log("infoid="+infoid);
                console.log("tid="+tid);*/
                var req = "/interface/fill_bt_list?callback=bt_task_down_resp&tid="+tid+"&infoid="+infoid+"&g_net="+G_section+"&p=0&uid="+G_USERID+"&t="+new Date();
                $.get(req,function(data){
                if(data)
                    {
                        o.pushData(data,tid);
                    }
                });
            });

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
    showAddress:function(addrString,type,callback)
    {
        if(type=='normal')
        {
            this.nowType='normal';
            this.addrBox=$('<div id="batchPublish"></div>')
            .append('<div id="batchHeader"></div>')
            .append('<div id="batchContent" style="float:left;clear:both"></div>')
            .append('<div id="batchFooter" style="flolat:left;clear:both"></div>') ;
            this.addrBox.find('.mcTab').css('display','none');
            
            this.addrBox.find('#batchHeader')
            .append('<a style="float:left" id="output_txt" href="javascript:return null;">输出到文件    |    </a>')
            .append('<a style="float:left" id="linkpage" href="javascript:return null;">输出Linkpage    |    </a>')
            .append('<span>ZhaLei LIST</span>')
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
        }

        this.saveToDownList('normal');
        this.outputCMD();
        $('.auto_select').filter('input').attr('checked',this.auto_select);
        if(typeof(callback)=='function')
        {
            callback();
        }
        
    },
    updateDownURL:function(text,urlId)
    {
        var uriContent = "data:application/octet-stream," + encodeURIComponent(text).replace(/%26amp%3B/g,'%26');
	/*console.log(uriContent);*/
        document.getElementById(urlId).href=uriContent;
    },
    saveToDownList:function(type)
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
        this.nowType=null;

    },
    restartBox:function()
    {
        var nowType=this.nowType;
        this.closeBox();  
        this.showCheckedLinks() ;
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
    watchOnline:function(){
        var checkboxs=$(':checked');
        if (checkboxs.length==0)
        {
            alert('请至少选择一个视频(文件夹不允许');
            return false
        }
        else if(checkboxs.length>1)
        {
            alert('目前仅允许选择一个视频文件');
            return false
        }
        var addr=$(checkboxs[0]).parents('.rw_inter').html().match(/\"(http.*?gdl.*?)\"/)[1].replace(/&amp;/g,'&');
        var videoDiv=$('<div id="watch_video"><video autoplay controls src="'+addr+'"><p>動画を再生するには、videoタグをサポートしたブラウザが必要です。</p></video></div>');
        $.blockUI({message:videoDiv});
        return false;
    },
    showCheckedLinks:function()
    {
            var returnLinks=this.getCheckedArchors();
            var linkString=this.getLinkDetail(returnLinks);
            this.showAddress(linkString,'normal');
    },
    pushData:function(data,tid)
    {
            var data=data.match(/bt_task_down_resp\((.*)\)/);
            var rt=JSON.parse(data[1]);
            this.returnData.push(data);
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
                var name=link.name.split('\\\*');
                var filename=name.pop();
                var dir = name.length == 0 ? '/' : +'/'+name.join('/');
                var tempString=o.outputRule
                .replace(/\\n/g,'\n')
                .replace(/&amp;/g,'&')
                .replace(/\$name/g,filename)
                .replace(/\$dir/g,dir)
                .replace(/\$cookie/g,document.cookie)
                .replace(/\$gdrive/g,document.cookie.match(/(gdriveid=.*?);/)[1])
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
    getLinkPage: function (type) 
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
    showLinkPage:function(type)
    {
        var content=this.getLinkPage(type);
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
    var triggers=document.getElementsByClassName('rwbtn ic_open');
    var normals=[];
    var nl=document.getElementsByTagName('input');
    for(var i=0;i<nl.length;i++){if(nl[i].hasAttribute('value') && nl[i].value.match(/http:\/\/gdl/) ){normals.push(nl[i])}}
    /*console.log("Triggers:"+triggers.length);
    console.log("Normals:"+normals.length);*/
    // if(typeof(unsafeWindow.jQuery)=='undefined' && typeof(unsafeWindow.jQuery.blockUI)!='function' )
    if((triggers.length==0 && normals.length==0) || typeof(unsafeWindow.jQuery)=='undefined' )
    {
        setTimeout(loadJquery,3000);
        return
    }
    else
    {

        jQuery=unsafeWindow.jQuery;
        $=jQuery;
  
        //Shiftclick support
        //Required jquery&thickbox

        (function($) {
            $.fn.shiftClick = function() {
                var lastSelected;
                var checkBoxes = $(this);

                this.each(function() {
                    $(this).click(function(ev) {
                        if (ev.shiftKey) {
                            var last = checkBoxes.index(lastSelected);
                            var first = checkBoxes.index(this);

                            var start = Math.min(first, last);
                            var end = Math.max(first, last);

                            var chk = lastSelected.checked;
                            for (var i = start; i < end; i++) {
                                checkBoxes[i].checked = chk;
                            }
                        } else {
                            lastSelected = this;
                        }
                    })
                });
            };
        })(jQuery);
        var loadCheckbox = function(){
            if( $('.in_ztclick').length == 0  )
            {setTimeout(loadCheckbox,30);return}
            $('input[type=checkbox]').shiftClick();
        };
        loadCheckbox();

        //var helloSimple=function(){alert('Hello Grease!')};
        //GM_registerMenuCommand("Hello, world! (again)", helloSimple, "e", "shift alt", "w");

        (function($) {

            if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
                alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
                return;
            }

            $.fn._fadeIn = $.fn.fadeIn;

            var noOp = function() {};

            // this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
            // retarded userAgent strings on Vista)
            var mode = document.documentMode || 0;
            var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
            var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

            // global $ methods for blocking/unblocking the entire page
            $.blockUI   = function(opts) { install(window, opts); };
            $.unblockUI = function(opts) { remove(window, opts); };

            // convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
            $.growlUI = function(title, message, timeout, onClose) {
                var $m = $('<div class="growlUI"></div>');
                if (title) $m.append('<h1>'+title+'</h1>');
                if (message) $m.append('<h2>'+message+'</h2>');
                if (timeout == undefined) timeout = 3000;
                $.blockUI({
                    message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
                    timeout: timeout, showOverlay: false,
                    onUnblock: onClose, 
                    css: $.blockUI.defaults.growlCSS
                });
            };

            // plugin method for blocking element content
            $.fn.block = function(opts) {
                return this.unblock({ fadeOut: 0 }).each(function() {
                    if ($.css(this,'position') == 'static')
                        this.style.position = 'relative';
                    if ($.browser.msie)
                        this.style.zoom = 1; // force 'hasLayout'
                    install(this, opts);
                });
            };

            // plugin method for unblocking element content
            $.fn.unblock = function(opts) {
                return this.each(function() {
                    remove(this, opts);
                });
            };

            $.blockUI.version = 2.35; // 2nd generation blocking at no extra cost!

            // override these in your code to change the default behavior and style
            $.blockUI.defaults = {
                // message displayed when blocking (use null for no message)
                message:  '<h1>Please wait...</h1>',

                title: null,      // title string; only used when theme == true
                draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)
                
                theme: false, // set to true to use with jQuery UI themes
                
                // styles for the message when blocking; if you wish to disable
                // these and use an external stylesheet then do this in your code:
                // $.blockUI.defaults.css = {};
                css: {
                    padding:    0,
                    margin:     0,
                    width:      '30%',
                    top:        '40%',
                    left:       '35%',
                    textAlign:  'center',
                    color:      '#000',
                    border:     '3px solid #aaa',
                    backgroundColor:'#fff',
                    cursor:     'wait'
                },
                
                // minimal style set used when themes are used
                themedCSS: {
                    width:  '30%',
                    top:    '40%',
                    left:   '35%'
                },

                // styles for the overlay
                overlayCSS:  {
                    backgroundColor: '#000',
                    opacity:         0.6,
                    cursor:          'wait'
                },

                // styles applied when using $.growlUI
                growlCSS: {
                    width:      '350px',
                    top:        '10px',
                    left:       '',
                    right:      '10px',
                    border:     'none',
                    padding:    '5px',
                    opacity:    0.6,
                    cursor:     'default',
                    color:      '#fff',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius':    '10px',
                    'border-radius':         '10px'
                },
                
                // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
                // (hat tip to Jorge H. N. de Vasconcelos)
                iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

                // force usage of iframe in non-IE browsers (handy for blocking applets)
                forceIframe: false,

                // z-index for the blocking overlay
                baseZ: 1000,

                // set these to true to have the message automatically centered
                centerX: true, // <-- only effects element blocking (page block controlled via css above)
                centerY: true,

                // allow body element to be stetched in ie6; this makes blocking look better
                // on "short" pages.  disable if you wish to prevent changes to the body height
                allowBodyStretch: true,

                // enable if you want key and mouse events to be disabled for content that is blocked
                bindEvents: true,

                // be default blockUI will supress tab navigation from leaving blocking content
                // (if bindEvents is true)
                constrainTabKey: true,

                // fadeIn time in millis; set to 0 to disable fadeIn on block
                fadeIn:  200,

                // fadeOut time in millis; set to 0 to disable fadeOut on unblock
                fadeOut:  400,

                // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
                timeout: 0,

                // disable if you don't want to show the overlay
                showOverlay: true,

                // if true, focus will be placed in the first available input field when
                // page blocking
                focusInput: true,

                // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
                applyPlatformOpacityRules: true,
                
                // callback method invoked when fadeIn has completed and blocking message is visible
                onBlock: null,

                // callback method invoked when unblocking has completed; the callback is
                // passed the element that has been unblocked (which is the window object for page
                // blocks) and the options that were passed to the unblock call:
                //   onUnblock(element, options)
                onUnblock: null,

                // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
                quirksmodeOffsetHack: 4,

                // class name of the message block
                blockMsgClass: 'blockMsg'
            };

            // private data and functions follow...

            var pageBlock = null;
            var pageBlockEls = [];

            function install(el, opts) {
                var full = (el == window);
                var msg = opts && opts.message !== undefined ? opts.message : undefined;
                opts = $.extend({}, $.blockUI.defaults, opts || {});
                opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
                var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
                var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
                msg = msg === undefined ? opts.message : msg;

                // remove the current block (if there is one)
                if (full && pageBlock)
                    remove(window, {fadeOut:0});

                // if an existing element is being used as the blocking content then we capture
                // its current place in the DOM (and current display style) so we can restore
                // it when we unblock
                if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
                    var node = msg.jquery ? msg[0] : msg;
                    var data = {};
                    $(el).data('blockUI.history', data);
                    data.el = node;
                    data.parent = node.parentNode;
                    data.display = node.style.display;
                    data.position = node.style.position;
                    if (data.parent)
                        data.parent.removeChild(node);
                }

                var z = opts.baseZ;

                // blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
                // layer1 is the iframe layer which is used to supress bleed through of underlying content
                // layer2 is the overlay layer which has opacity and a wait cursor (by default)
                // layer3 is the message content that is displayed while blocking

                var lyr1 = ($.browser.msie || opts.forceIframe) 
                    ? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
                    : $('<div class="blockUI" style="display:none"></div>');
                var lyr2 = $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
                
                var lyr3, s;
                if (opts.theme && full) {
                    s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">' +
                            '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
                            '<div class="ui-widget-content ui-dialog-content"></div>' +
                        '</div>';
                }
                else if (opts.theme) {
                    s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">' +
                            '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
                            '<div class="ui-widget-content ui-dialog-content"></div>' +
                        '</div>';
                }
                else if (full) {
                    s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:'+z+';display:none;position:fixed"></div>';
                }           
                else {
                    s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:'+z+';display:none;position:absolute"></div>';
                }
                lyr3 = $(s);

                // if we have a message, style it
                if (msg) {
                    if (opts.theme) {
                        lyr3.css(themedCSS);
                        lyr3.addClass('ui-widget-content');
                    }
                    else 
                        lyr3.css(css);
                }

                // style the overlay
                if (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform)))
                    lyr2.css(opts.overlayCSS);
                lyr2.css('position', full ? 'fixed' : 'absolute');

                // make iframe layer transparent in IE
                if ($.browser.msie || opts.forceIframe)
                    lyr1.css('opacity',0.0);

                //$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
                var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
                $.each(layers, function() {
                    this.appendTo($par);
                });
                
                if (opts.theme && opts.draggable && $.fn.draggable) {
                    lyr3.draggable({
                        handle: '.ui-dialog-titlebar',
                        cancel: 'li'
                    });
                }

                // ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
                var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
                if (ie6 || expr) {
                    // give body 100% height
                    if (full && opts.allowBodyStretch && $.boxModel)
                        $('html,body').css('height','100%');

                    // fix ie6 issue when blocked element has a border width
                    if ((ie6 || !$.boxModel) && !full) {
                        var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
                        var fixT = t ? '(0 - '+t+')' : 0;
                        var fixL = l ? '(0 - '+l+')' : 0;
                    }

                    // simulate fixed position
                    $.each([lyr1,lyr2,lyr3], function(i,o) {
                        var s = o[0].style;
                        s.position = 'absolute';
                        if (i < 2) {
                            full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
                                 : s.setExpression('height','this.parentNode.offsetHeight + "px"');
                            full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
                                 : s.setExpression('width','this.parentNode.offsetWidth + "px"');
                            if (fixL) s.setExpression('left', fixL);
                            if (fixT) s.setExpression('top', fixT);
                        }
                        else if (opts.centerY) {
                            if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
                            s.marginTop = 0;
                        }
                        else if (!opts.centerY && full) {
                            var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
                            var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
                            s.setExpression('top',expression);
                        }
                    });
                }

                // show the message
                if (msg) {
                    if (opts.theme)
                        lyr3.find('.ui-widget-content').append(msg);
                    else
                        lyr3.append(msg);
                    if (msg.jquery || msg.nodeType)
                        $(msg).show();
                }

                if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
                    lyr1.show(); // opacity is zero
                if (opts.fadeIn) {
                    var cb = opts.onBlock ? opts.onBlock : noOp;
                    var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
                    var cb2 = msg ? cb : noOp;
                    if (opts.showOverlay)
                        lyr2._fadeIn(opts.fadeIn, cb1);
                    if (msg)
                        lyr3._fadeIn(opts.fadeIn, cb2);
                }
                else {
                    if (opts.showOverlay)
                        lyr2.show();
                    if (msg)
                        lyr3.show();
                    if (opts.onBlock)
                        opts.onBlock();
                }

                // bind key and mouse events
                bind(1, el, opts);

                if (full) {
                    pageBlock = lyr3[0];
                    pageBlockEls = $(':input:enabled:visible',pageBlock);
                    if (opts.focusInput)
                        setTimeout(focus, 20);
                }
                else
                    center(lyr3[0], opts.centerX, opts.centerY);

                if (opts.timeout) {
                    // auto-unblock
                    var to = setTimeout(function() {
                        full ? $.unblockUI(opts) : $(el).unblock(opts);
                    }, opts.timeout);
                    $(el).data('blockUI.timeout', to);
                }
            };

            // remove the block
            function remove(el, opts) {
                var full = (el == window);
                var $el = $(el);
                var data = $el.data('blockUI.history');
                var to = $el.data('blockUI.timeout');
                if (to) {
                    clearTimeout(to);
                    $el.removeData('blockUI.timeout');
                }
                opts = $.extend({}, $.blockUI.defaults, opts || {});
                bind(0, el, opts); // unbind events
                
                var els;
                if (full) // crazy selector to handle odd field errors in ie6/7
                    els = $('body').children().filter('.blockUI').add('body > .blockUI');
                else
                    els = $('.blockUI', el);

                if (full)
                    pageBlock = pageBlockEls = null;

                if (opts.fadeOut) {
                    els.fadeOut(opts.fadeOut);
                    setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
                }
                else
                    reset(els, data, opts, el);
            };

            // move blocking element back into the DOM where it started
            function reset(els,data,opts,el) {
                els.each(function(i,o) {
                    // remove via DOM calls so we don't lose event handlers
                    if (this.parentNode)
                        this.parentNode.removeChild(this);
                });

                if (data && data.el) {
                    data.el.style.display = data.display;
                    data.el.style.position = data.position;
                    if (data.parent)
                        data.parent.appendChild(data.el);
                    $(el).removeData('blockUI.history');
                }

                if (typeof opts.onUnblock == 'function')
                    opts.onUnblock(el,opts);
            };

            // bind/unbind the handler
            function bind(b, el, opts) {
                var full = el == window, $el = $(el);

                // don't bother unbinding if there is nothing to unbind
                if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
                    return;
                if (!full)
                    $el.data('blockUI.isBlocked', b);

                // don't bind events when overlay is not in use or if bindEvents is false
                if (!opts.bindEvents || (b && !opts.showOverlay)) 
                    return;

                // bind anchors and inputs for mouse and key events
                var events = 'mousedown mouseup keydown keypress';
                b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

            // former impl...
            //     var $e = $('a,:input');
            //     b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
            };

            // event handler to suppress keyboard/mouse events when blocking
            function handler(e) {
                // allow tab navigation (conditionally)
                if (e.keyCode && e.keyCode == 9) {
                    if (pageBlock && e.data.constrainTabKey) {
                        var els = pageBlockEls;
                        var fwd = !e.shiftKey && e.target === els[els.length-1];
                        var back = e.shiftKey && e.target === els[0];
                        if (fwd || back) {
                            setTimeout(function(){focus(back)},10);
                            return false;
                        }
                    }
                }
                var opts = e.data;
                // allow events within the message content
                if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0)
                    return true;

                // allow events for content that is not being blocked
                return $(e.target).parents().children().filter('div.blockUI').length == 0;
            };

            function focus(back) {
                if (!pageBlockEls)
                    return;
                var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
                if (e)
                    e.focus();
            };

            function center(el, x, y) {
                var p = el.parentNode, s = el.style;
                var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
                var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
                if (x) s.left = l > 0 ? (l+'px') : '0';
                if (y) s.top  = t > 0 ? (t+'px') : '0';
            };

            function sz(el, p) {
                return parseInt($.css(el,p))||0;
            };

        })(jQuery);
        xlob=new XL();
        unsafeWindow.XL=xlob;
        
    }
}

loadJquery();
