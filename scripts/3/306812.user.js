// ==UserScript==
// @name           Nob正方教务系统改造器
// @include        http://202.192.18.182/*
// @namespace      Nob_zf
// @description   为正方教务系统增加更多功能
// @version        3.0
// @author         Twwy
// ==/UserScript==
//-------------改造器安装-----------------
nowConfigSystem = GM_getValue("config-system",false);  //如果config-system为空，就进行配置信息安装
if (nowConfigSystem == false){
        systemConfig = new Object;
        includeArray = new Array;
        includeArray[0] = 'http://loremy.net/nob/install/';
        includeArray[1] = 'http://202.192.18.182/';
        systemConfig.include		= includeArray;
        systemConfig.name 			= 'NOB正方教务系统改造器(通用版)';
        systemConfig.version 		= '3.0beta';
        systemConfig.remark 	 	= '1.此版本为通用版本,各个学校的正方教务系统均可以兼容<br />2.此脚本为平台性质,之后专注于开发平台中兼容各学校的应用,平台将不会有大的更新,会在修复完BUG后推出3.0正式版<br />3.各个不同学校只需要填写不同的更新地址即可，最新更新地址可至我博客(<a href="http://loremy.net" target="_blank">http://loremy.net</a>)获取';
        systemConfig.notice 		= '暂无';
        systemConfig.noticeUpdate 	= 'http://loremy.net/nob/update.php';
        systemConfig.userName		= '';
        systemConfig.passWord		= '';
        systemConfig.appSource		= '';
        systemConfig.constant		= '';
        GM_setValue("config-system",JSON.stringify(systemConfig));
}
//----include作用域判定--------------------
matchInclude = readConfigSystem('include').join('|');
if (document.location.href.match(matchInclude) == null) return;   //domain作用域判定
var matchPath = matchAppInclude(getLocation());
if(matchPath){
        for(j = 0; j < matchPath.length; j++){
                var appName = matchPath[j]['appName'];
                if(matchPath[j]['rewrite'] == true){
                        appIncludeArray = readConfig(appName, 'include');
                        for(i = 0; i < appIncludeArray.length; i++){
                                if(appIncludeArray[i]['URL'] == getLocation()){
                                        document.documentElement.innerHTML = appIncludeArray[i]['rewrite'];
                                        break;
                                }
                        }
                }
                if(readConfig(appName, 'type') == 1){
                        function setValue(name, value){
                                nowValue = readConfig(appName, 'value');
                                if(nowValue == false) nowValue = new Object;
                                nowValue[name] = value;
                                updateConfig(appName, 'value', nowValue);
                        }
                        function readValue(name){
                                nowValue = readConfig(appName, 'value');
                                if(nowValue == false) return false;
                                return nowValue[name];
                        }
                        function delValue(name){
                                nowValue = readConfig(appName, 'value');
                                if(nowValue == false) return false;
                                delete nowValue[name];
                                updateConfig(appName, 'value', nowValue);
                        }
                        function stuUsername(){
                                var username = readConfigSystem('userName');
                                return username;
                        }
                        function stuPassword(){
                                var password = readConfigSystem('passWord');
                                return password;
                        }
                        eval(readApp(appName));
                }
        }
}


//--------------基础函数-----------------------------------------------------
//---config-system/config-include为关键离线变量---------
String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
}
Array.prototype.del = function(n) {  //n表示第几项，从0开始算起。
//prototype为对象原型，注意这里为对象增加自定义方法的方法。
        if(n<0)  //如果n<0，则不进行任何操作。
        return this;
        else
    return this.slice(0,n).concat(this.slice(n+1,this.length));
    /*
      concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
      　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
     　　　　　　组成的新数组，这中间，刚好少了第n项。
      slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
    */
}
function readConfigSystem(name){
        nowConfigSystem = GM_getValue("config-system",false);
        if (nowConfigSystem == false) return;
        systemConfig = JSON.parse(nowConfigSystem);
        return systemConfig[name];	
}
function updateConfigSystem(name,value){
        nowConfigSystem = GM_getValue("config-system",false);
        if (nowConfigSystem == false) return;
        systemConfig = JSON.parse(nowConfigSystem);
        systemConfig[name] = value;	
        GM_setValue("config-system",JSON.stringify(systemConfig));
}
function updateInclude(appName, includeArray){
        nowInclude = GM_getValue("config-include",false);
        var updateInclude = new Array;
        if (nowInclude != false){
                updateInclude = JSON.parse(nowInclude);
        }
        for(i = 0; i < updateInclude.length; i++){
                if(updateInclude[i].appName == appName){
                        updateInclude = updateInclude.del(i);
                }
        }
        for(i = 0; i < includeArray.length; i++){
                includeArray[i]['appName'] = appName;
        }
        GM_setValue("config-include", JSON.stringify(updateInclude.concat(includeArray)));
}
function matchAppInclude(path){
        nowInclude = GM_getValue("config-include",false);
        if(nowInclude == false) return false;
        matchInclude = JSON.parse(nowInclude);
        j = 0;
        returnArray = new Array;
        for(i = 0; i < matchInclude.length; i++){
                if(matchInclude[i]['URL'] == path || matchInclude[i]['URL'] == '*'){
                        returnArray[j] = matchInclude[i];
                        j++;
                }
        }
        if(returnArray.length == 0) return false;
        return returnArray;
}
function updateConfig(appName, configName, configValue) {
        nowAppConfig = GM_getValue("AppConfig-" + appName, false);
        var updateAppConfig = new Object;
        if (nowAppConfig != false){
                updateAppConfig = JSON.parse(nowAppConfig);
        }
        updateAppConfig[configName] = configValue;
        GM_setValue("AppConfig-" + appName, JSON.stringify(updateAppConfig));
}
function readConfig(appName, configName){
        nowAppConfig = GM_getValue("AppConfig-" + appName, false);
        if (nowAppConfig == false) return false;
        showAppConfig = JSON.parse(nowAppConfig);
        return showAppConfig[configName];
}

function install(appName){
        appList = readConfigSystem('appSource');
        for(i = 0; i < appList.length; i++){
                if(appList[i].name == appName){
                        GM_xmlhttpRequest({
                                method: 'GET',
                                url: appList[i].source,
                                onload: function (responseDetails){
                                        installInfo = JSON.parse(responseDetails.responseText);
                                        if(installInfo.name != appName){
                                                smallWindow('OPEN', '安装失败!应用名称不匹配');
                                                return;
                                        }
                                        if(readConfig(appName, 'value') == false){
                                                updateConfig(appName, 'value', false);
                                        }
                                        updateConfig(appName, 'include', installInfo.include);
                                        updateConfig(appName, 'type', installInfo.type);
                                        updateConfig(appName, 'AppChName', installInfo.AppChName);
                                        updateConfig(appName, 'nav', installInfo.nav);
                                        updateConfig(appName, 'about', installInfo.about);
                                        if(installInfo.type == 1) GM_setValue("App-" + appName, installInfo.script);  //安装script
                                        appList = readConfigSystem('appSource');
                                        for(i = 0; i < appList.length; i++){
                                                if(appList[i].name == appName){
                                                        appList[i].install = true;
                                                        appList[i].newVersion = false;
                                                        appList[i].version = installInfo.version;
                                                        appList[i].AppChName = installInfo.AppChName;
                                                }
                                        }
                                        insertInclude = new Array;
                                        for(i = 0; i < installInfo.include.length; i++){
                                                insertInclude[i] = installInfo.include[i];
                                                if(installInfo.include[i]['rewrite']) insertInclude[i]['rewrite'] = true;
                                        }
                                        updateInclude(appName, insertInclude);      //更新include域
                                        updateConfigSystem('appSource', appList);  //更新appSource
                                        smallWindow('OPEN', '安装成功<br />' + installInfo.AppChName + '(v' + installInfo.version + ')');
                                },
                                onerror: function(){
                                        smallWindow('OPEN', '安装失败!服务器异常');
                                }
                        });		
                }
        }
        
}
function uninstall(appName){
        if(readConfig(appName, 'type') == 1){
                GM_deleteValue("App-" + appName);
        }
        GM_deleteValue("AppConfig-" + appName);
        nowInclude = JSON.parse(GM_getValue("config-include",false));
        for(i = 0; i < nowInclude.length; i++){
                if(nowInclude[i]['appName'] == appName){
                        nowInclude = nowInclude.del(i);
                }
        }
        GM_setValue("config-include", JSON.stringify(nowInclude));
        /*nowAppSource = readConfigSystem('appSource');
        for(i = 0; i < nowAppSource.length; i++){
                if(nowAppSource[i]['name'] == appName){
                        nowAppSource[i]['install'] = false;
                }
        }
        updateConfigSystem('appSource', nowAppSource);*/
}
function block(appName){
        appList = readConfigSystem('appSource');
        for(i = 0; i < appList.length; i++){
                if(appList[i].name == appName){
                        appList[i].block = true;
                }
        }
        updateConfigSystem('appSource', appList);
}
function unblock(appName){
        appList = readConfigSystem('appSource');
        for(i = 0; i < appList.length; i++){
                if(appList[i].name == appName){
                        appList[i].block = false;
                }
        }
        updateConfigSystem('appSource', appList);
}
function readApp(appName){
        return GM_getValue("App-" + appName, false);
}

function getLocation(){
        var nowURL = document.location.href.split("/");
        targetPath = nowURL[nowURL.length-1];
        targetPath = targetPath.split("?")[0];
        return targetPath;
}
function sourceCatch(){
        GM_xmlhttpRequest({
                method: 'GET',
                url: readConfigSystem('noticeUpdate'),
                onload: function (responseDetails){
                        updateInfo = JSON.parse(responseDetails.responseText);
                        updateConfigSystem('notice', updateInfo.news);
                        updateInfoRead = readConfigSystem('appSource');
                        if(updateInfoRead.length != 0){
                                for(i = 0; i < updateInfo.apps.length; i++){
                                        var found = false;
                                        for(j = 0; j < updateInfoRead.length; j++){
                                                if(updateInfoRead[j].name == updateInfo.apps[i].name){
                                                        found = true;
                                                        if(updateInfoRead[j].version < updateInfo.apps[i].version){
                                                                updateInfoRead[j].newVersion = updateInfo.apps[i].version;
                                                                updateInfoRead[j].source = updateInfo.apps[i].source;
                                                        }
                                                        break;
                                                }
                                        }
                                        if(found == false){
                                                updateInfo.apps[i]['block'] = false;
                                                updateInfo.apps[i]['install'] = false;
                                                updateInfo.apps[i]['newVersion'] = false;
                                                updateInfoRead = updateInfoRead.concat(updateInfo.apps[i]);
                                        }
                                }
                                updateConfigSystem('appSource', updateInfoRead);
                        }else{
                                for(i = 0; i < updateInfo.apps.length; i++){   //第一次..初始化
                                        updateInfo.apps[i]['block'] = false;
                                        updateInfo.apps[i]['install'] = false;
                                        updateInfo.apps[i]['newVersion'] = false;
                                        updateConfigSystem('appSource', updateInfo.apps);
                                }
                        }
                        document.getElementById("noticeText").innerHTML = readConfigSystem('notice');
                        smallWindow('OPEN', '更新成功!');
                },
                onerror: function(){
                        smallWindow('OPEN', '更新失败!服务器异常');
                }
        });
}
function catchConstant(){
        constant = new Object;
        xhxm = document.getElementById("xhxm").innerHTML;
        constant['xh'] = xhxm.split(' ')[0];
        constant['xm'] = xhxm.replace('同学', '').split(' ')[2];
        updateConfigSystem('constant', constant);
}
function appsList(isBlock){
        var requestApps = readConfigSystem('appSource');
        var blockCount = 0;
        if(isBlock) blockHtml = '<a class="blockButton" style="display:none;">屏蔽</a><a class="unblockButton" >取消屏蔽</a>';
        else blockHtml = '<a class="blockButton">屏蔽</a><a class="unblockButton" style="display:none;">取消屏蔽</a>';
        for(i = 0; i < requestApps.length; i++){
                if(requestApps[i]['block'] == isBlock){
                        appTab = document.createElement("div");
                        appTab.style.background = '#EEE';
                        appTab.style.padding = '2px 4px 2px 4px';
                        appTab.style.textAlign = 'left';
                        appTab.style.margin = '0px 0px 2px 0px';   
                        appTab.innerHTML = '应用名称:' + requestApps[i]['AppChName'] + '(v' + requestApps[i]['version'] +')<div class="clear"></div><span style="float:right;"><a class="updateButton" style="display:none;">更新</a>&nbsp;<a class="aboutButton" style="display:none;">说明</a>&nbsp;<a class="installButton">安装</a>&nbsp;<a class="zfButton" style="display:none;">重新安装</a>&nbsp;<input type="hidden" value="' + requestApps[i]['name'] + '"/>' + blockHtml + '</span><div style="height:16px;">&nbsp;</div>';
                        document.getElementById("mainWindow").appendChild(appTab);
                        if(requestApps[i]['install'] == true){
                                if(requestApps[i]['newVersion']){
                                        appTab.getElementsByTagName("a")[0].style.display = 'inline';
                                        appTab.getElementsByTagName("a")[0].innerHTML = '新版本' + requestApps[i]['newVersion'] + '更新';
                                }else{
                                        appTab.getElementsByTagName("a")[3].style.display = 'inline';
                                }
                                appTab.getElementsByTagName("a")[2].style.display = 'none';
                                appTab.getElementsByTagName("a")[1].style.display = 'inline';
                                appTab.getElementsByTagName("a")[1].addEventListener('click', function(){
                                        smallWindow('OPEN', readConfig(this.parentNode.getElementsByTagName("input")[0].value, 'about'));
                                }, false);
                        }       //如果已经安装则不显示"安装"选项，只显示重新安装
                        appTab.getElementsByTagName("a")[0].addEventListener('click', function(){
                                install(this.parentNode.getElementsByTagName("input")[0].value);  //更新
                        }, false);
                        appTab.getElementsByTagName("a")[2].addEventListener('click', function(){   
                                install(this.parentNode.getElementsByTagName("input")[0].value);  //安装
                                this.parentNode.getElementsByTagName("a")[1].style.display = 'inline';
                                this.parentNode.getElementsByTagName("a")[3].style.display = 'inline';
                                this.style.display = 'none';
                        }, false);
                        appTab.getElementsByTagName("a")[3].addEventListener('click', function(){
                                install(this.parentNode.getElementsByTagName("input")[0].value);  //重新安装
                        }, false);
                        appTab.getElementsByTagName("a")[4].addEventListener('click', function(){   
                                block(this.parentNode.getElementsByTagName("input")[0].value);   //屏蔽
                                this.style.display = 'none';
                                this.parentNode.getElementsByTagName("a")[5].style.display = 'inline';
                        }, false);
                        appTab.getElementsByTagName("a")[5].addEventListener('click', function(){   
                                unblock(this.parentNode.getElementsByTagName("input")[0].value);   //取消屏蔽
                                this.style.display = 'none';
                                this.parentNode.getElementsByTagName("a")[4].style.display = 'inline';
                        }, false);
                }else{
                        blockCount++;
                }
        }
        return blockCount;
}
function navApps(){
        constant = readConfigSystem('constant');
        navAppsList = readConfigSystem('appSource');
        navElement = document.createElement("li");
        navElement.className = 'top';
        navElementHtml = '<a class="top_link" href="#"><span class="down">应用列表</span></a><ul class="sub">';
        for(i = 0; i < navAppsList.length; i++){
                if(navAppsList[i].install == true){
                        appHref = readConfig(navAppsList[i].name, 'include')[0];
                        appHrefArray = new Array;
                        j = 0;
                        for(key in appHref['param']){
                                appHrefArray[j] = key + '=' + constant[appHref['param'][key].replace('{', '').replace('}', '')];
                                j++;
                        }
                        showHref = appHref['URL'] + '?' + appHrefArray.join('&');
                        navElementHtml += '<li><a target="zhuti" href="' + showHref + '">' + navAppsList[i]['AppChName'] + '</a></li>';
                }
        }
        navElementHtml += '</ul>';
        navElement.innerHTML = navElementHtml;
        document.getElementById("headDiv").getElementsByTagName("ul")[1].appendChild(navElement);
}
function setWindow(action){
        switch(action) {
                case 'OPEN':
                if (document.getElementById("transformWindow") == null) {   //如果没有插入window则进行插入
                        transformWindow = document.createElement("div");
                        transformWindow.id = 'transformWindow';
                        transformWindow.setAttribute("style","position:absolute; height:324px; width:480px; text-align:center; border:5px solid #BBB;  background:#FFF; z-index:999999;") ; 
                        transformWindow.style.left = (window.innerWidth - 480) / 2 +'px';
                        transformWindow.style.top = (window.innerHeight - 324) / 3 +'px';
                        transformWindow.innerHTML = '<div id="leftWindow" style="float:left; height:100%; width:144px; border-right:1px solid #BBB;"><div style="height:40px;width:100%;"></div><ul id="leftList" style="cursor:pointer;"><li id="appListButton"><a>应用列表</a></li><li id="settingButton"><a>全局设置</a></li><li id="versionButton"><a>版本信息</a></li></ul></div><div id="closeWindow" style="float:right; padding:0 3px; position:absolute; z-index:999999; background-color:#CCCCCC; cursor:pointer;">关闭</div><div id="notice" style="text-align:left;background:#eee; float:right; width:329px; padding:3px 3px 3px 3px;">通知:<span id="noticeText"></span><a style="float:right;cursor:pointer;" id="noticeUpdate">更新</a></div><div id="mainWindow" style="padding:3px 3px 3px 3px; width:329px;float:left;overflow-x: hidden;overflow-y: scroll;height:295px;">NOB正方教务系统改造器(通用版)<br>作者:Twwy</div>';
                        document.getElementsByTagName("body")[0].appendChild(transformWindow);
                        
                        document.getElementById("closeWindow").addEventListener('click', function(){
                                setWindow('CLOSED');
                        }, false);      //关闭按键触发隐藏window

                        document.addEventListener('keydown', function(event){
                                if(event.keyCode == 27) setWindow('CLOSED');		
                        }, false);   //ESC键触发隐藏window
                        
                        for (i=0;i<document.getElementById("leftList").childNodes.length;i++){
                                document.getElementById("leftList").childNodes[i].addEventListener('click', function(i){
                                        for (j=0;j<document.getElementById("leftList").childNodes.length;j++){
                                                document.getElementById("leftList").childNodes[j].style.background = '#fff';
                                        }
                                        this.style.background = '#eee';
                                }, false);
                        }     //对当前的选中的button进行高亮提示
                        
                        document.getElementById("noticeText").innerHTML = readConfigSystem('notice');   //显示通知

                        document.getElementById("noticeUpdate").addEventListener('click', function(){     //"通知更新"按键
                                sourceCatch();
                        }, false); 				
                                                
                        document.getElementById("appListButton").addEventListener('click', function(){     //"应用列表"按键
                                document.getElementById("mainWindow").innerHTML = '';
                                var blockCount = appsList(false);
                                appBlocks = document.createElement("div");
                                appBlocks.style.textAlign = 'right';
                                appBlocks.innerHTML = '<a id="showBlock">显示已屏蔽的应用(' + blockCount + ')</a>';
                                document.getElementById("mainWindow").appendChild(appBlocks);
                                document.getElementById("showBlock").addEventListener('click', function(){
                                        this.style.display = 'none';
                                        appsList(true);
                                }, false);
                        }, false); 			

                        document.getElementById("settingButton").addEventListener('click', function(){     //"全局设置"按键
                                document.getElementById("mainWindow").innerHTML = '';
                                setIncludeList = document.createElement("ul");
                                setIncludeList.style.textAlign = 'left';
                                document.getElementById("mainWindow").appendChild(setIncludeList);
                                showIncludeList();
                                function showIncludeList(){
                                        setInclude = readConfigSystem('include');
                                        setIncludeLi = '作用域:&nbsp;<a style="cursor:pointer;" id="addInclude">+添加</a><br/>';
                                        for(i = 0; i < setInclude.length; i++){
                                                setIncludeLi += '<li style="padding-top:1px;">';
                                                setIncludeLi += '<a style="cursor:pointer;">编辑</a>&nbsp;<span>'+setInclude[i]+'</span>';
                                                setIncludeLi += '<a style="cursor:pointer;">删除</a>';
                                                setIncludeLi += '<input type="hidden" value="'+setInclude[i]+'" style="width:250px;"/>';
                                                setIncludeLi += '&nbsp;<a style="cursor:pointer;display:none;">取消</a>';
                                                setIncludeLi += '<input type="hidden" value="'+i+'" />';
                                                setIncludeLi += '</li>';
                                        }
                                        setIncludeLi += '<hr style="border:1px solid #ccc;"/>';
                                        setIncludeList.innerHTML = setIncludeLi;
                                        for(i = 0; i < setInclude.length; i++){
                                                setIncludeList.getElementsByTagName("li")[i].getElementsByTagName("a")[0].addEventListener('click', function(event){
                                                        this.parentNode.getElementsByTagName("a")[2].addEventListener('click',function editCancel(){
                                                                this.parentNode.getElementsByTagName("a")[0].innerHTML = '编辑';
                                                                this.parentNode.getElementsByTagName("span")[0].style.display = 'inline';
                                                                this.parentNode.getElementsByTagName("input")[0].type = 'hidden';
                                                                this.parentNode.getElementsByTagName("a")[1].style.display = 'inline';
                                                                this.parentNode.getElementsByTagName("a")[2].style.display = 'none';
                                                                return;
                                                        }, false);
                                                        this.parentNode.getElementsByTagName("input")[0].value = this.parentNode.getElementsByTagName("input")[0].value.trim();
                                                        if (this.parentNode.getElementsByTagName("input")[0].type != 'text'){
                                                                this.innerHTML = '保存';
                                                                this.parentNode.getElementsByTagName("span")[0].style.display = 'none';
                                                                this.parentNode.getElementsByTagName("input")[0].type = 'text';
                                                                this.parentNode.getElementsByTagName("a")[1].style.display = 'none';
                                                                this.parentNode.getElementsByTagName("a")[2].style.display = 'inline';
                                                        }else{
                                                                if (this.parentNode.getElementsByTagName("span")[0].innerHTML == this.parentNode.getElementsByTagName("input")[0].value){
                                                                        this.innerHTML = '编辑';
                                                                        this.parentNode.getElementsByTagName("span")[0].style.display = 'inline';
                                                                        this.parentNode.getElementsByTagName("input")[0].type = 'hidden';
                                                                        this.parentNode.getElementsByTagName("a")[1].style.display = 'inline';
                                                                        this.parentNode.getElementsByTagName("a")[2].style.display = 'none';
                                                                        return;
                                                                };
                                                                for (i=0;i<setInclude.length;i++) {
                                                                        if (setInclude[i] == this.parentNode.getElementsByTagName("input")[0].value){
                                                                                alert('无法保存，修改后作用域与现有作用域重复，如有需要请按"删除"');
                                                                                this.parentNode.getElementsByTagName("input")[0].value = this.parentNode.getElementsByTagName("span")[0].innerHTML;
                                                                                return;
                                                                        };
                                                                }
                                                                if (confirm('是否将 '+this.parentNode.getElementsByTagName("span")[0].innerHTML+' 更换为'+this.parentNode.getElementsByTagName("input")[0].value+'\n错误修改有可能导致改造器无法正常显示，情谨慎') == true){
                                                                        this.innerHTML = '编辑';
                                                                        setInclude[this.parentNode.getElementsByTagName("input")[1].value] = this.parentNode.getElementsByTagName("input")[0].value;
                                                                        updateConfigSystem('include',setInclude);
                                                                        this.parentNode.getElementsByTagName("span")[0].innerHTML = this.parentNode.getElementsByTagName("input")[0].value;
                                                                        this.parentNode.getElementsByTagName("span")[0].style.display = 'inline';
                                                                        this.parentNode.getElementsByTagName("input")[0].type = 'hidden';
                                                                        this.parentNode.getElementsByTagName("a")[1].style.display = 'inline';
                                                                        this.parentNode.getElementsByTagName("a")[2].style.display = 'none';								
                                                                }
                                                        }
                                                }, false);
                                                setIncludeList.getElementsByTagName("li")[i].getElementsByTagName("a")[1].addEventListener('click', function(event){
                                                        if (confirm('是否将 '+this.parentNode.getElementsByTagName("span")[0].innerHTML+' 删除'+'\n错误删除有可能导致改造器无法正常显示，情谨慎') == true){
                                                                setInclude.splice(this.parentNode.getElementsByTagName("input")[1].value,1);
                                                                updateConfigSystem('include',setInclude);
                                                                showIncludeList();
                                                        }
                                                }, false);
                                        }
                                        
                                        document.getElementById("addInclude").addEventListener('click', function(i){
                                                includeTypeIn = prompt("请输入需要添加的作用域","http://");
                                                includeTypeIn = includeTypeIn.trim();
                                                if (includeTypeIn == null) return;
                                                if (includeTypeIn.charAt(includeTypeIn.length-1) != '/') includeTypeIn = includeTypeIn.concat('/');
                                                if (includeTypeIn.match('https://') == null){
                                                                if (includeTypeIn.match('http://') == null ){
                                                                str = 'http://';
                                                                includeTypeIn = str.concat(includeTypeIn);
                                                        };
                                                };
                                                for (i=0;i<setInclude.length;i++) {
                                                        if (setInclude[i] == includeTypeIn) return alert('该作用域已存在');
                                                }
                                                setInclude[setInclude.length] = includeTypeIn;
                                                updateConfigSystem('include',setInclude);
                                                showIncludeList();
                                        }, false);
                                }
                                noticeDiv = document.createElement("div");
                                noticeDiv.style.textAlign = 'left';
                                noticeDiv.innerHTML ='应用更新地址:&nbsp;<a class="zfButton" id="sourceEdit">编辑</a>&nbsp;<a class="zfButton" id="sourceSave" style="display:none;">保存</a>&nbsp;<a class="zfButton" id="sourceCancel"  style="display:none;">取消</a><br /><span id="sourceText">' + readConfigSystem('noticeUpdate') + '</span><input type="hidden" value="'+readConfigSystem('noticeUpdate')+'" style="width:250px;"/><hr style="margin-top:4px;border:1px solid #ccc;"/>';
                                document.getElementById("mainWindow").appendChild(noticeDiv);
                                document.getElementById("sourceEdit").addEventListener('click', function(){
                                        this.style.display = 'none';
                                        this.parentNode.getElementsByTagName("input")[0].type = 'text';
                                        document.getElementById("sourceText").style.display = 'none';
                                        document.getElementById("sourceSave").style.display = 'inline';
                                        document.getElementById("sourceCancel").style.display = 'inline';
                                        document.getElementById("sourceSave").addEventListener('click', function(){
                                                if(this.parentNode.getElementsByTagName("input")[0].value.trim() != document.getElementById("sourceText").innerHTML){
                                                        if (confirm('请确认进行应用更新地址更改，\n错误更改有可能导致无法更新。\n如遇无法更新，请至loremy.net查询正确的更新地址。') == true){
                                                                updateConfigSystem('noticeUpdate', this.parentNode.getElementsByTagName("input")[0].value.trim());
                                                        }else{
                                                                return;
                                                        }
                                                }
                                                document.getElementById("sourceSave").style.display = 'none';
                                                document.getElementById("sourceText").innerHTML = this.parentNode.getElementsByTagName("input")[0].value.trim();
                                                document.getElementById("sourceText").style.display = 'inline';
                                                document.getElementById("sourceEdit").style.display = 'inline';
                                                this.parentNode.getElementsByTagName("input")[0].type = 'hidden';
                                        }, false);
                                        document.getElementById("sourceCancel").addEventListener('click', function(){
                                                this.parentNode.getElementsByTagName("input")[0].type = 'hidden';
                                                this.style.display = 'none';
                                                document.getElementById("sourceSave").style.display = 'none';
                                                document.getElementById("sourceText").style.display = 'inline';
                                                document.getElementById("sourceEdit").style.display = 'inline';
                                        }, false);
                                }, false);
                                
                                personDiv = document.createElement("div");
                                personDiv.style.margin = '3px 0px 0px 0px';
                                personDiv.innerHTML ='账号:<input type="text" style="width:100px;"value="' + readConfigSystem('userName') + '" />' + '密码:<input type="password" style="width:100px;" value="' + readConfigSystem('passWord') + '" /><a id="personSave" style="cursor:pointer;">保存</a><br />注:部分应用实现需要授权使用教务系统的登陆账号及密码' + '<hr style="margin-top:4px;border:1px solid #ccc;"/>';
                                document.getElementById("mainWindow").appendChild(personDiv);
                                document.getElementById("personSave").addEventListener('click', function(){     //"个人账号保存"按键
                                        updateConfigSystem('userName',this.parentNode.getElementsByTagName("input")[0].value);
                                        updateConfigSystem('passWord',this.parentNode.getElementsByTagName("input")[1].value);
                                        alert('账户信息已保存');
                                }, false);
                                
                                initDiv = document.createElement("div");
                                initDiv.style.margin = '3px 0px 0px 0px';
                                initDiv.innerHTML = '<a class="zfButton" id="allInit">[平台应用重置]</a><br />注:测试期间，不同的学校的应用将有所不同，为了防止无效应用冗余，特开启本功能方便测试';
                                document.getElementById("mainWindow").appendChild(initDiv);
                                document.getElementById("allInit").addEventListener('click', function(){
                                        if (confirm('将清除所有应用，请确认') == true){
                                                requestApps = readConfigSystem('appSource');
                                                for(k = 0; k < requestApps.length; k++){
                                                        if(requestApps[k]['install'] == true){
                                                                uninstall(requestApps[k]['name']);
                                                                requestApps[k]['install'] = false;
                                                        }
                                                }
                                                updateConfigSystem('appSource', requestApps);
                                                updateConfigSystem('appSource', '');
                                                smallWindow('OPEN', '已经清除所有应用');
                                        }
                                }, false);
                                
                        }, false); 

                        document.getElementById("versionButton").addEventListener('click', function(){     //"版本信息"按键
                                document.getElementById("mainWindow").innerHTML = readConfigSystem('name')+'<br />'+'版本:'+readConfigSystem('version')+'<br />'+'备注:<br />'+ readConfigSystem('remark');				
                        }, false); 			

                        
                }
                document.getElementById("windowSwitch").setAttribute("value", "true");
                document.getElementById("transformWindow").style.display = 'block';

                break;
                case 'CLOSED':
                document.getElementById("transformWindow").style.display = 'none';
                document.getElementById("windowSwitch").setAttribute("value", "false");
                break;
        }
}
function transformSign(){
        signBox = document.createElement("li");
        signBox.setAttribute("id", "signBox");
        windowSwitch = document.createElement("input");
        windowSwitch.setAttribute("id", "windowSwitch");
        windowSwitch.setAttribute("type", "hidden");
        windowSwitch.setAttribute("value", "false");
        signBox.innerHTML = 'NOB正方教务系统改造器&nbsp;<a id="SwitchWindow" style="cursor:pointer;">选项</a>';
        signBox.appendChild(windowSwitch);

        switch(getLocation()) {
                case '':case '#':case 'default2.aspx':case "default.aspx":case 'default2.aspx#':case 'default.aspx#':
                document.getElementsByTagName("form")[0].parentNode.appendChild(signBox);
                document.getElementById("SwitchWindow").addEventListener('click', function(){
                        if (document.getElementById("windowSwitch").value == 'false') {
                                setWindow('OPEN');
                        }else{
                                setWindow('CLOSED');
                        }
                }, false);
                break;
                
                case 'xs_main.aspx':case 'js_main.aspx':
                document.getElementsByTagName("ul")[0].insertBefore(signBox,document.getElementsByTagName("ul")[0].firstChild);
                GM_addStyle('.info{width:auto;} .nav *:hover ul.sub {width: auto;} .nav *:hover ul.sub li {width: 100%;padding:0px 24px 0px 0px;}'); 
                document.getElementById("SwitchWindow").addEventListener('click', function(){
                        if (document.getElementById("windowSwitch").value == 'false') {
                                setWindow('OPEN');
                        }else{
                                setWindow('CLOSED');
                        }
                }, false);
                catchConstant();
                navApps();
                break;
        }
        
}
function smallWindow(action, content, setWidth){
        if(!arguments[2]) setWidth = "500";
        switch(action) {
                case 'OPEN':
                if (document.getElementById("smallWindow") == null) {
                        smallWindowDivOut = document.createElement("div");
                        smallWindowDivOut.id = 'smallWindowOut';
                        smallWindowDivOut.setAttribute("style","display:none;height:"+document.getElementsByTagName("body")[0].scrollHeight+"px;width:"+document.getElementsByTagName("body")[0].scrollWidth+"px;position: absolute;left:0px;top:0px;z-index:99999999;") ; 
                        smallWindowDiv = document.createElement("div");
                        smallWindowDiv.id = 'smallWindow';
                        smallWindowDiv.setAttribute("style","padding:15px;position:absolute;text-align:center; border:2px solid #BBB;  background:#FFF; z-index:99999999;max-width:" + setWidth + "px;") ; 
                        smallWindowDivOut.appendChild(smallWindowDiv);
                        document.getElementsByTagName("body")[0].appendChild(smallWindowDivOut);			
                }else{
                        smallWindowDiv = document.getElementById("smallWindow");
                }
                smallWindowDiv.innerHTML = content;
                document.getElementById("smallWindowOut").style.display = 'block';
                smallWindowDiv.style.left = (window.innerWidth - smallWindowDiv.offsetWidth) / 2 +'px';
                smallWindowDiv.style.top = (window.innerHeight - smallWindowDiv.offsetHeight) / 3 +'px';
                document.getElementById("smallWindowOut").addEventListener('click', function(event){
                        smallWindow('CLOSED','');			
                }, false);
                document.getElementById("smallWindow").addEventListener('click', function(event){
                        event.stopPropagation();
                }, false);
                break;
                
                case 'CLOSED':
                document.getElementById("smallWindowOut").style.display = 'none';
                break;
        }
}
//----页面上进行的操作-------------------------------------------
transformSign();  //添加标志
//----改造器CSS---------------------------------
GM_addStyle('.installButton,.blockButton,#showBlock,.unblockButton,.aboutButton,.updateButton,.zfButton{cursor:pointer;}.clear{clear:both;}'); 
//------------------------------------------------------