// ==UserScript==
// @name        browser_sync_injecter
// @namespace   jazzhuang
// @description browser sync injecter
// @require     file:///c:/BrowserSync/utils/loadfile.js
// @resource    config file:///c:/BrowserSync/_browser_sync_config.xml
// @include     *
// @exclude     https://*:8081/*
// @version     2.0
// ==/UserScript==

// Load the xml config
var config = GM_getResourceText('config');
if(config == null || config == '') {
	alert('Please check the config file is correct.');
	return;
}
initDocum(config);

// set the port for syncing, setting in loadfile.js
var port = sync_port; 

// 设置请求超时时间，单位为毫秒
var timeout = 2000
// update the urls for syncing
var urls = getUrls(); // the method defined in loadfile.js

var consoleInfo = document.createElement('div');
        consoleInfo.setAttribute('id', 'automanConsoleID');
        consoleInfo.setAttribute('style', 'z-index: 100000; position: absolute; top:5px; left:5px; word-wrap: break-word;border: 2px dotted #AAAAAA;border-radius: 5px 5px 5px 5px;background-color:#fff;text-align: left; padding:0 5px;');
        document.body.appendChild(consoleInfo);var automanSync = document.createElement('input');
        automanSync.type='hidden';
        automanSync.id = 'automanSync';
        document.getElementById('automanConsoleID').appendChild(automanSync);
	var automanTitle = document.createElement('p');
		automanTitle.setAttribute('style','font-size:20px;color:#FF0000');
        automanTitle.id = 'automanDrag';
        automanTitle.setAttribute('style','background-color: #ddd; margin: 5px 0 5px 0; font-weight:bold; font-size:20px; cursor: move; border-radius: 3px; text-indent:5px;text-align:left;');
		automanTitle.textContent = "BrowserSync";
        document.getElementById('automanConsoleID').appendChild(automanTitle);
	var automanTips = document.createElement('p');
        automanTips.id = 'automanTips';
		automanTips.textContent = "欢迎使用Browser Sync工具";
		automanTips.setAttribute('style','font-size:15px;color:#FF0000');
        document.getElementById('automanDrag').appendChild(automanTips);		
    var automanUrl = document.createElement('input');
        automanUrl.type='text';
        automanUrl.id = 'automanUrl';
		automanUrl.placeholder = '请输入同步的URL,按回车键进行同步。';
        automanUrl.maxLength = '150';
        automanUrl.setAttribute('style','width:340px;height:20px;border: inset 2px #AAAAAA;padding:0');
        document.getElementById('automanConsoleID').appendChild(automanUrl);
    var automanRefresh = document.createElement('button');
        automanRefresh.id = 'automanRefresh';
		automanRefresh.onmouseover=showButtonTip;
        automanRefresh.textContent='Refresh';
        automanRefresh.setAttribute('style','width:80px;height:25px;');
        document.getElementById('automanConsoleID').appendChild(automanRefresh);
    var automanGoto = document.createElement('button');
        automanGoto.id = 'automanGoto';
        automanGoto.textContent='Sync Page';
		automanGoto.onmouseover=showButtonTip;
        automanGoto.setAttribute('style','width:88px;height:25px;');
        document.getElementById('automanConsoleID').appendChild(automanGoto);
	var automanCheck = document.createElement('button');
        automanCheck.id = 'automanCheck';
        automanCheck.textContent='Check';
        automanCheck.setAttribute('style','width:80px;height:25px;');
		automanCheck.onclick=checkUrlsAvailable;
		automanCheck.onmouseover=showButtonTip;
        document.getElementById('automanConsoleID').appendChild(automanCheck);
    var automanOutput = document.createElement('div');
        automanOutput.id = 'automanOutput';
        automanOutput.textContent='Output：';
        document.getElementById('automanConsoleID').appendChild(automanOutput);	
    
		document.getElementById('automanSync').value = (port);
		
        function creatXMLHTTPRequests(num){
           var xlmhttps = [num];
           if(window.ActiveXObject){
              for(var i=0; i< num; i++) {
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				xmlhttp.onreadystatechange = HandleStateChange;
				xmlhttp.timeout = timeout;
				// TODO add the ontimeout process
				xmlhttp.isTimeout = false;
				xmlhttp.isChecking = false;
				xmlhttp.index = i;
                xlmhttps[i] = xmlhttp;
              }
           }
           else if(window.XMLHttpRequest) {
              for(var i=0; i< num; i++) {
                xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = HandleStateChange;
				xmlhttp.timeout = timeout;
				xmlhttp.ontimeout = function(){
					try{
						this.isTimeout = true;
						document.getElementById('automanOutputLine_'+this.index).setAttribute('style','width:50px;height:25px;color:#FF0000');
						document.getElementById('automanOutputLine_'+this.index).textContent='Timeout for ' + urls[this.index] + ', please check it.';
						} catch(e){
						alert(e);
					}
				};
				xmlhttp.isTimeout = false;
				xmlhttp.isChecking = false;
				xmlhttp.index = i;
                xlmhttps[i] = xmlhttp;
              }
            }
           return xlmhttps;
        };
        
		function masterGoAhead(){
			if(input_sync_url != ""){ // 如果input_sync_url已被赋值
				window.location.href = input_sync_url;
				//input_sync_url = ""; // 还原成初始值
			} else if(isRefresh) {
				document.location.reload();
			} 
		};
		
		function showOutput(){
			var action = "同步";
			if(input_sync_url != ""){
				action = "跳转";
			} else if(isRefresh) {
				action = "刷新";
			} 
			if(window.isChecking){
				document.getElementById('automanOutputTopLine').textContent = "正在校验配置的URL是否可用。 请求超时时间为：" + timeout + "毫秒";
			} else {
				document.getElementById('automanOutputTopLine').textContent = "等待所有的浏览器接收到同步请求后，本页面将进行【" + action + "】。 请求超时时间为：" + timeout + "毫秒";
			}
		}
		
        var xmlhttps = creatXMLHTTPRequests(urls.length);
		
        function createAutomanOutputLine(){
			var automanOutputTopLine = document.createElement('label');
			automanOutputTopLine.id = 'automanOutputTopLine';
			automanOutputTopLine.textContent = '亲，这里显示公共的输出信息';
			automanOutputTopLine.setAttribute('style','width:50px;height:25px;color:#FF0000');
			document.getElementById('automanOutput').appendChild(automanOutputTopLine);
            for(var i=0;i<urls.length;i++){
                    if(document.getElementById('automanOutputLine_'+i)==null){
                            var newline = document.createElement('br');
                            document.getElementById('automanOutput').appendChild(newline);
							
							var automanRestart = document.createElement('button');
							automanRestart.textContent = "Restart";
							automanRestart.id = 'automanRestart_'+i;
							automanRestart.setAttribute('style','width:80px;height:25px;');
							automanRestart.onmouseover=showButtonTip;
							var automanVNCButton = document.createElement('button');
							automanVNCButton.textContent = "View";
							automanVNCButton.id = 'automanVNCButton_'+i;
							automanVNCButton.setAttribute('style','width:80px;height:25px;');
							automanVNCButton.onmouseover=showButtonTip;
							var automanSyncBrowsers = document.createElement('label');
							automanSyncBrowsers.textContent = "SyncBrowsers.";
							automanSyncBrowsers.id = 'automanSyncBrowsers_'+i;
							automanSyncBrowsers.setAttribute('style','height:25px;font-weight:bold;');
							var url = urls[i];
							var host = url.substring(url.indexOf('/')+2, url.lastIndexOf(':'));
							automanVNCButton.host = host;
							automanVNCButton.onclick=function(){window.open('https://'+this.host+':8081')};
							document.getElementById('automanOutput').appendChild(automanRestart);
							document.getElementById('automanOutput').appendChild(automanVNCButton);
							document.getElementById('automanOutput').appendChild(automanSyncBrowsers);
                            var automanOutputLine = document.createElement('label');
                            automanOutputLine.id = 'automanOutputLine_'+i;
                            automanOutputLine.setAttribute('style','width:50px;height:25px;color:#01A9DB');
                            document.getElementById('automanOutput').appendChild(automanOutputLine);
							
                    }
                    document.getElementById('automanOutputLine_'+i).textContent='Ready to sync for ' + urls[i];
					// set the sync browsers
					document.getElementById('automanSyncBrowsers_'+i).textContent='[' + getSlaveBrowsers(host) + ']';
            }
        };
        createAutomanOutputLine();
		
		function showButtonTip(){
			if(this.id == "automanCheck"){
				document.getElementById('automanTips').textContent = "Check按钮：校验配置的URL是否可用。";
			} else if(this.id == "automanRefresh"){
				document.getElementById('automanTips').textContent = "Refresh按钮：刷新同步页面，本页面也会被刷新。";
			} else if(this.id == "automanGoto"){
				document.getElementById('automanTips').textContent = "Sync Page按钮：同步当前页面。";
			} else if(this.id.indexOf("automanVNCButton") > -1){
				document.getElementById('automanTips').textContent = "View按钮：打开新的TAB页，通过web vnc显示远端机器。";
			} else if(this.id.indexOf("automanRestart") > -1){
				document.getElementById('automanTips').textContent = "(敬请期待)Restart按钮：重新启动远端浏览器。";
			}
		}
		
		var input_sync_url = "";
		var isRefresh = false;
		window.isChecking = false;
		window.complete_flag = 0;
        function HandleStateChange(){
			if (xmlhttps[this.index].readyState == 1)
			{
				if(xmlhttps[this.index].isChecking == false){
					document.getElementById('automanOutputLine_'+this.index).setAttribute('style','width:50px;height:25px;color:#0000CD');
					document.getElementById('automanOutputLine_'+this.index).textContent='Syncing to ' + urls[this.index];
				} else {
					document.getElementById('automanOutputLine_'+this.index).setAttribute('style','width:50px;height:25px;color:#0000CD');
					document.getElementById('automanOutputLine_'+this.index).textContent='Checking for ' + urls[this.index];
				}
			}
			if (xmlhttps[this.index].readyState == 2)
			{
				if(xmlhttps[this.index].isChecking == true){
					document.getElementById('automanOutputLine_'+this.index).setAttribute('style','width:50px;height:25px;color:#01A9DB');
					document.getElementById('automanOutputLine_'+this.index).textContent= urls[this.index] + " is available.";
				}
			}
			if (xmlhttps[this.index].readyState == 4)
			{
				showOutput();
				window.complete_flag = window.complete_flag + 1; // 注意， 需要在有请求发起的地方window.complete_flag = 0;   checkUrlsAvailable 和 xmlhttp_start
				//console.log(complete_flag);
				if(window.complete_flag == urls.length){ // 最后一个请求readyState为2, 即服务器已经收到请求，并且已向客户端传回了被请求的原始数据
					masterGoAhead();
					if(window.isChecking){
						document.getElementById('automanOutputTopLine').textContent = "校验配置URL是否可用完毕。 请求超时时间为：" + timeout + "毫秒";
						window.isChecking = false;
					} else {
						document.getElementById('automanOutputTopLine').textContent = "同步操作完毕。 请求超时时间为：" + timeout + "毫秒";
					}
				} 
						
				if(xmlhttps[this.index].isTimeout == false){ 
					if(xmlhttps[this.index].isChecking == false){ 
						document.getElementById('automanOutputLine_'+this.index).setAttribute('style','width:50px;height:25px;color:#32CD32');
						document.getElementById('automanOutputLine_'+this.index).textContent='Sync to ' + urls[this.index] + ' is done.';
					} 
				} else {
					
				}
				xmlhttps[this.index].abort();
				//console.debug("request id:" + this.index + " readyState is 4.");
				//console.debug(xmlhttps[this.index].getResponseHeader("Server") + ";" + xmlhttps[this.index].responseText);
			}
			//console.log('request id:' + this.index + " readyState:" + xmlhttps[this.index].readyState);
        };
		
		/*
		校验配置的URL是否可用
		*/
        function checkUrlsAvailable(){
			window.isChecking = true;
			window.complete_flag = 0;
            for(var i=0;i<urls.length;i++){
              try{
				 xmlhttps[i].isChecking = true;
				 xmlhttps[i].open('POST',urls[i],true);
                 xmlhttps[i].send('automan@check\nEOF\n');
              } catch(e) {
                alert(urls[i] + " is not available.\n" + e);
              }
            }
        };
        //checkUrlsAvailable();

		/*
		同步时调用，启动http请求
		*/
		function xmlhttp_start(i){
		    xmlhttps[i].abort();
			xmlhttps[i].isTimeout = false; // 设置超时标记为false
			xmlhttps[i].isChecking = false; // 设置校验标记为false
			window.complete_flag = 0;
			xmlhttps[i].open('POST',urls[i],true);
		};
		
		var focusOnElement = null;	
        function a_down(e) {
			var e_target = e.target;
			var c = e_target.tagName.toLowerCase();
			if ((c == 'input' && e_target.type == 'text') || (c == 'input' && e_target.type == 'password')){
				// TODO 
				focusOnElement = e_target;
				console.log(focusOnElement.value);
			}
			else{
				for(var i=0;i<urls.length;i++){                   
				  if(getElementXPath(e_target) == 'button#automanRefresh') {
					  xmlhttp_start(i);
					  xmlhttps[i].send(getElementXPath(e_target) +'@refresh'+ '\nEOF\n');
					  isRefresh = true;
				  } else if(getElementXPath(e_target) == 'button#automanGoto') {
					  xmlhttp_start(i);
					  xmlhttps[i].send(getElementXPath(e_target) +'@'+ document.location.href +'@goto'+ '\nEOF\n');
				  } else if((getElementXPath(e_target).indexOf('#automan')==-1)) { // ignore some control in the console
					  xmlhttp_start(i);
					  xmlhttps[i].send(getElementXPath(e_target) +'@click'+ '\nEOF\n');
				  } else {
					  return;   // return directly, avoid suspending request when click the console again
				  }
				}
			}
        };

        function key_up(e) {
            var keyCode = e.keyCode;
			if(getElementXPath(e.target) == 'input#automanUrl' && keyCode != 13){
				return; // 直接返回
			}
			
            for(var i=0;i<urls.length;i++){
			  xmlhttp_start(i);
              if (keyCode == 13) { // 回车处理
                   if (getElementXPath(e.target) == 'input#automanUrl'){
					   var goto_url = e.target.value;
					   if(goto_url.indexOf('http') != 0){
							input_sync_url = 'http://' + goto_url;
					   }
					   
                       xmlhttps[i].send(getElementXPath(e.target) +'@'+ goto_url +'@gotourl'+ '\nEOF\n');
					   //window.location.href = goto_url;
					}
                    else{
					   // 当事件源的value为空时，取光标定位的控件value
					   if(encodeURI(e.target.value) != "undefined") {
					        //alert(getElementXPath(e.target)+ '@'+ encodeURI(e.target.value) + '@enter' + '\nEOF\n');
							xmlhttps[i].send(getElementXPath(e.target)+ '@'+ encodeURI(e.target.value) + '@enter' + '\nEOF\n');
					   } else if(focusOnElement != null){
							//alert(getElementXPath(e.target) + " enter:" + encodeURI(e.target.value));
							xmlhttps[i].send(getElementXPath(focusOnElement)+ '@'+ encodeURI(focusOnElement.value) + '@enter' + '\nEOF\n');
					   } else {
							console.error('enter could not sync');
					   }
					}
              }
              else if(keyCode == 27 || keyCode == 120) {
                    xmlhttps[i].send('F9'+ '@' + e.keyCode + '\nEOF\n');
              }
              else if(keyCode == 36) {
                    xmlhttps[i].send('up'+'@scroll'+'\nEOF\n');
              }
              else if(keyCode == 35) {
                    xmlhttps[i].send('down'+'@scroll'+'\nEOF\n');
              } else { // 其它输入
			        //console.log("target value:" + e.target.value);
					if(focusOnElement != null) {
						//console.log("focus element value:" + focusOnElement.value);
					}
					xmlhttps[i].send(getElementXPath(e.target)+ '@'+ encodeURI(e.target.value) + '@edit' + '\nEOF\n');
			  }
           }
        };
		
        function getElementXPath(elt)
        {
          var path = '';
          for (; elt && elt.nodeType == 1; elt = elt.parentNode){
               if(elt.id != '') {
                  if (getElementdiffId(elt)>1) {
                       idx = getElementIdx(elt);
                       path = elt.tagName.toLowerCase()+'#' + elt.id.replace(':','\\:') + ':eq(' + idx + ')' + path;
                       path = '>' + path;
                   }
                  else {
                       path = elt.tagName.toLowerCase()+ '#' + elt.id.replace(':','\\:') + path;
                       break;
                     }
                }      
                else {
                    idx = getElementIdx(elt);
                    name = elt.tagName.toLowerCase();
                    xname = name + ':eq(' + idx + ')';
                    path = xname + path;
                    if(name=='body'){
                       break;
                    }
                    else{
                      path = '>' + path;
                    }
                }
          }
          path = encodeURI(path);
          return path;
        };
        function getElementIdx(elt)
        {
            var count = 0;
            for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)
            {
                if(sib.nodeType == 1 && sib.tagName == elt.tagName)        count++;
            }
            return count;
        };
        function getElementdiffId(elt)
        {
            var count = 0;
            var p = elt.parentNode;
            var len = p.children.length;
            for (var i = 0; i < len ;  i = i+1)
            {
                if(p.children[i].id == elt.id) count++;
            }
            return count;
        };window.addEventListener('mousedown',a_down,false);window.addEventListener('keyup',key_up,true);
		

/*
 Grag control
 */
Control = { 
	Drag : {
		o: null,
		z: 0,
		allControl: "",
		init: function(o, minX, maxX, minY, maxY) {
			o.onmousedown = this.start;
			o.onmouseover = this.over;
			o.onmouseout = this.out;
			o.minX = typeof minX != 'undefined' ? minX : null;
			o.maxX = typeof maxX != 'undefined' ? maxX : null;
			o.minY = typeof minY != 'undefined' ? minY : null;
			o.maxY = typeof maxY != 'undefined' ? maxY : null;
		},
		over: function(e) {
			//$(this).children(".set").show();
		},
		out: function(e) {
			//$(this).children(".set").hide();
		},
		start: function(e) {
			var o;
			e = Control.Drag.fixEvent(e);
			//Control.Drag.o = o = this;
			Control.Drag.o = o = this.parentNode;
			o.x = e.clientX - Control.Drag.o.offsetLeft;
			o.y = e.clientY - Control.Drag.o.offsetTop;
			document.onmousemove = Control.Drag.move;
			document.onmouseup = Control.Drag.end;
			//var z = $(o).css("z-index");
			//Control.Drag.z = z > Control.Drag.z ? z : Control.Drag.z;
			//$(o).css({ "opacity": 0.7, "z-index": Control.Drag.z++ });
			return false;
		},
		move: function(e) {
			e = Control.Drag.fixEvent(e);
			var oLeft, oTop, ex, ey, o = Control.Drag.o;
			ex = e.clientX - o.x;
			ey = e.clientY - o.y;
			if (o.minX != null) ex = Math.max(ex, o.minX);
			if (o.maxX != null) ex = Math.min(ex, o.maxX - o.offsetWidth);
			if (o.minY != null) ey = Math.max(ey, o.minY);
			if (o.maxY != null) ey = Math.min(ey, o.maxY - o.offsetHeight);
			o.style.left = ex + 'px';
			o.style.top = ey + 'px';
	
			//$(o).children(".content").text("Div { left: " + ex + "px, top: " + ey + "px } ");
			return false;
		},
		end: function(e) {
			e = Control.Drag.fixEvent(e);
			//$(Control.Drag.o).css({ "opacity": 1 });
			Control.Drag.o = document.onmousemove = document.onmouseup = null;
		},
		fixEvent: function(e) {
			if (!e) {
				e = window.event;
				e.target = e.srcElement;
				e.layerX = e.offsetX;
				e.layerY = e.offsetY;
			}
			return e;
		}
	}
} 
Control.Drag.init(document.getElementById("automanDrag"));