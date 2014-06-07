src_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name			天涯精灵(TianYa Wizard)
// @namespace		Starrow
// @author			Starrow Pan
// @description		为天涯论坛提供辅助功能，如仅显示某位用户的帖子、快速回帖、左右键翻页
// @version			0.3.3
// @date			2010-11-04
// @require        http://userscripts.org/scripts/source/78952.user.js
// @updates        更新：恢复快速回帖功能，请参看脚本主页上的功能说明。
// @include        file:///*
// @include        http://*.tianya.cn/*publicforum/content*
// @include        http://*.tianya.cn/*techforum/content*
// @include        http://*.tianya.cn/*tianyacity/content*
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below metadata
/*
 * For security and privacy reasons, Firefox doesn't allow copy/paste data with js
 * this can be overwritten via signed.applets.codebase_principal_support
 * Dispatch a keypress event of Ctrl+A,C,X doesn't take effects either
 * textarea values cannot be set in an event handler due to different thread
 * I have tried all the possible ways to restore last faild submission but failed:(
 */
//Update this script, the following function is revised and translated based on AnotherAutoUpdater
var $j = jQuery.noConflict();
$j.extend($j.expr[':'], {
    matches: "$(a).text() === m[3]"
});

(function updateMe(){
    var AnotherAutoUpdater = {
        // Config values, change these to match your script
        id: '75428', // Script id on Userscripts.org
        days: 7, // Days to wait between update checks
        // Don't edit after this line, unless you know what you're doing ;-)
		localMeta:{},
		serverMeta:{},
        name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(src_meta)[1],
        version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(src_meta)[1].replace(/\./g, ''),
        time: new Date().getTime(),

		parseHeaders:function(metadataBlock) {
		var source = metadataBlock;
		var headers = {};
		var tmp = source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
		if (tmp) {
			var result;
			var key, value;
			while((result=/\/\/\s*@(.*?)\s+(.*?)\s*\n/ig.exec(tmp[0]))){
				key=result[1];
				value=result[2];
				if (headers[key]){
					if (headers[key] instanceof Array){
						headers[key].push(value);
					}else{
						headers[key]=[headers[key], value];
					}
				}else{
					headers[key] = value;
				}
			}
		}
		return headers;
	},
	   call: function(response){
			localMeta=AnotherAutoUpdater.parseHeaders(src_meta);
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://userscripts.org/scripts/source/' + this.id + '.meta.js',
                onload: function(xpr){
                    AnotherAutoUpdater.compare(xpr, response);
                }
            });
        },
        compare: function(xpr, response){
            if (xpr.responseText.match("the page you requested doesn't exist")) {
					GM_setValue('updated_' + this.id, 'off');
					return false;
				}
				serverMeta=AnotherAutoUpdater.parseHeaders(xpr.responseText);
            
            if (serverMeta.version && serverMeta.version!==localMeta.version ) {
				var changedReq='';
				var req=[serverMeta.require, localMeta.require];
				req=req.map(function(elem){
					var r=elem?elem:'';
					if (!(r instanceof Array)) return [r];
				});
				var sr=req[0],lr=req[1];
				for (var i=0; i<sr.length; i++){
					if (sr[i]!=='' && lr.indexOf(sr[i])===-1){
						changedReq=sr[i];
						break;
					}
				}
				if (changedReq!==''){
					alert(serverMeta.name+'需要脚本'+changedReq+', 您需要卸载当前脚本再重新安装。');
					return;
				}
				var msg=serverMeta.name + '已经更新到' + serverMeta.version + '。' + 
				(serverMeta.updates?'\n'+serverMeta.updates+'\n':'') +
				'是否更新（建议）？';
				if (confirm(msg)) {
					GM_setValue('updated_' + this.id, this.time + '');
					top.location.href = 'https://userscripts.org/scripts/source/' + this.id + '.user.js';
				}else{
					//turning off updating NOT enabled
                /*
                 if(confirm('Do you want to turn off auto updating for this script?')) {
                 GM_setValue('updated_'+this.id, 'off');
                 GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
                 alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                 } else {
                 GM_setValue('updated_'+this.id, this.time+'');
                 }
                 */
				}
            }else {
                    if (response) 
                        alert(this.name + '没有更新。');
                    GM_setValue('updated_' + this.id, this.time + '');
                }
        },
        check: function(){
            if (GM_getValue('updated_' + this.id, 0) === "off") 
                GM_registerMenuCommand("启用" + this.name + "的自动更新", function(){
                    GM_setValue('updated_' + this.id, new Date().getTime() + '');
                    AnotherAutoUpdater.call(true)
                });
            else {
                if (+this.time > (+GM_getValue('updated_' + this.id, 0) + 1000 * 60 * 60 * 24 * this.days)) {
                    GM_setValue('updated_' + this.id, this.time + '');
                    this.call();
                }
                GM_registerMenuCommand("检查" + this.name + "的更新", function(){
                    GM_setValue('updated_' + this.id, new Date().getTime() + '');
                    AnotherAutoUpdater.call(true)
                });
            }
        }
    };
    if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') 
        AnotherAutoUpdater.check();
})();

function Tianya_Wizard(){
    const STORY_CLASS = 'tw_story';
    const CSS_CLASS_STORY = '.tw_story {font-size:16px; line-height:25px;}' +
    '.tw_lighted_story {font-weight:bold; background-color: green}';
    const ID_INSERTED_CSS = 'tw_css';
    const ID_DIV_CONTENT = 'pContentDiv';
    const ID_DIV_FIRST_AUTHOR = 'firstAuthor';
    const HOVEING_USER = "hoveing_user";
    const TRIMMED_VIEW = "trimmed_view";
    const ID_DIV_MY_MENU = "myMenu";
    const QUOTE_LEN = 100;
    const URL_PARAM = 'tw_param';
    
    var myMenu; //the menu div
    var divContent; //div content
    var viewTrimmed = false; //whether the view is trimmed;
    var pagerHtml; //original pager html
    
	//constant for the page-turning function
    const CODE_NEXT = 0x27;
    const CODE_PREVIOUS = 0x25;
    const ID_DIV_TOP_PAGER = 'pageDivTop';
    const ID_DIV_BOTTOM_PAGER = 'pageDivBottom';
    
    //constants for the quick reply function
    const ID_FRAME_REPLY = 'tw_replypage';
    const HEIGHT_TIANYA_REPLY_PAGE = '351px';
	//the textarea for input, previously being "strContent"
	//图画人生:adsp_content_replybox_box
    const ID_REPLY_AREA = 'adsp_content_replybox_area';
    const REPLY_LINK_TEXT = "末页";
    const ID_FORM = 'FormResponse';
	const TXT_SUBMIT=' 发 表 ';
    
	Date.prototype.getTimeString = function(){
        var d = ":";
        var result = this.getHours() + d + this.getMinutes() + d + this.getSeconds() + d + this.getMilliseconds();
        return result;
    };
    
    String.prototype.contains = function(part){
        if (!(this instanceof String)) 
            return;
        
        if (part instanceof Array) {
            for (var i = 0; i < part.length; i++) {
                if (this.indexOf(part[i]) > -1) 
                    return true;
            }
            return false;
        }
        return (this.indexOf(part) > -1);
    }
    Array.prototype.removeAt = function(position){
        if (position < 0 || position > this.length - 1) 
            return this;
        if (position == this.length - 1) {
            /*
             if (this.length == 1) {
             this[0] = undefined;
             }
             else {
             */
            this.length--;
            //}
            return this;
        }
        for (var i = position; i < this.length - 1; i++) {
            this[i] = this[i + 1];
        }
        this.length--;
        return this;
    }
    Array.prototype.remove = function(item){
        var position = this.indexOf(item);
        if (position > -1) {
            return this.removeAt(position);
        }
        else {
            return this;
        }
    }
    //check if an object has no property
    //when set as a prototype function of Object,
    //this function will conflict with the access function in jQuery
    //TypeError: this.hasOwnProperty is not a function
    /*
Object.prototype.isEmpty = function(){
        for (var n in this) {
            if (this['hasOwnProperty'](n)) 
                return false;
        }
        return true;
    }
*/
    //check if an object's property equals or contains(array) a value
    Object.prototype.propertyContains = function(property, value){
        var p = this[property];
        if (p === undefined) 
            return false;
        if (p instanceof Array) {
            for (var i = 0; i < p.length; i++) {
                if (isIdentical(p[i], value)) {
                    return true;
                }
            }
            return false;
        }
        return isIdentical(p, value);
        function isIdentical(a, b){
            if ((a instanceof Date) && (b instanceof Date)) {
                return a.toString() === b.toString();
            }
            else {
                return a === b;
            }
        }
    }
    //create an object based on the current one
    Object.prototype.beget = function(){
        var F = function(){
        };
        F.prototype = this;
        return new F();
    }
    //log
    function log(msg){
        if (GM_log) {
            GM_log(new Date().getTimeString() + ' >> ' + msg);
        }
    };
    
    //public methods
    //this.Log = log;
    
    //get an element given its id
    function $(id, docNode){
        var doc = docNode || document;
        return doc.getElementById(id);
    };
    
    //get elements given its name, tag name
    function $$(name, docNode){
        var doc = docNode || document;
        var r = name.match(/<(\S+)>/i);
        if (r) {
            var tagName = r[1];
            return doc.getElementsByTagName(tagName);
        }
        return document.getElementsByName(name);
    };
    
    //XPath query
    //document.constructor can be referenced in firebug but not here because of the wrappedJSObject
    //document.constructor.prototype.xpathQuery=function (path, resultType, context) failed
    function xpathQuery(path, resultType, context, docElem){
        try {
            log(path);
            var contextNode = context || document;
            var _resultType = resultType || XPathResult.ANY_UNORDERED_NODE_TYPE;
            var doc = docElem || document;
            var result = doc.evaluate(path, contextNode, null, _resultType, null);
            switch (result.resultType) {
                case XPathResult.BOOLEAN_TYPE:
                    return result.booleanValue;
                    break;
                case XPathResult.NUMBER_TYPE:
                    return result.numberValue;
                    break;
                case XPathResult.STRING_TYPE:
                    return result.stringValue;
                    break;
                case XPathResult.ANY_UNORDERED_NODE_TYPE:
                case XPathResult.FIRST_ORDERED_NODE_TYPE:
                    return result.singleNodeValue;
                    break;
                default:
                    return result;
            }
        } 
        catch (e) {
            log(e);
        }
    }
    var eventHost = {
        _listeners: {},
        addListener: function(type, listener){
            if (typeof this._listeners[type] === "undefined") {
                this._listeners[type] = [];
            }
            
            this._listeners[type].push(listener);
        },
        
        fire: function(event){
            if (typeof event === "string") {
                event = {
                    type: event
                };
            }
            if (!event.target) {
                event.target = this;
            }
            
            if (!event.type) { //falsy
                throw new Error("Event object missing 'type' property.");
            }
            
            if (this._listeners[event.type] instanceof Array) {
                var listeners = this._listeners[event.type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].call(this, event);
                }
            }
        },
        
        removeListener: function(type, listener){
            if (this._listeners[type] instanceof Array) {
                var listeners = this._listeners[type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
        
    };
	function ProcessParameter(){
		 //add a parameter value
        this.addParamValue = function(pName, pValue){
            if (pName in this.param) {
                var prop = this.param[pName];
                if (prop instanceof Array) {
                    this.param[pName].push(pValue);
                }
                else {
                    this.param[pName] = [prop, pValue];
                }
            }
            else {
                this.param[pName] = pValue;
            }
            //fire a propChanged event
            this.fire({
                type: 'propChanged',
                propName: pName,
                propValue: pValue
            });
        };
        //delete a parameter value;
        this.deleteParamValue = function(pName, pValue){
            if (pName in this.param) {
                var prop = this.param[pName];
                if (prop instanceof Array) {
                    this.param[pName].remove(pValue);
                    if (this.param[pName].length === 0) {
                        delete this.param[pName];
                    }
                }
                else {
                    if (this.param[pName] === pValue) {
                        delete this.param[pName];
                    }
                }
            }
            //fire a propChanged event
            this.fire({
                type: 'propChanged',
                propName: pName,
                propValue: pValue
            });
        };
        //change a parameter
        this.changeParamValue = function(pName, pValue){
            this.param[pName] = pValue;
            //fire a propChanged event
            this.fire({
                type: 'propChanged',
                propName: pName,
                propValue: pValue
            });
        }
        //update the parameter object
        this.updateParam = function(property, value){
            if (paramObj.propertyContains(property, value)) {
                this.deleteParamValue(property, value);
            }
            else {
                if (property === 'shownUser') {
                    this.changeParamValue(property, value);
                }
                else {
                    this.addParamValue(property, value);
                }
            }
        }
	}
	
    function ParamObject(stem){
        var param = {};
		//check if a user is highlighted
		stem.contains=contains;
		stem.isEmpty=isEmpty;
		stem.toUrlParam = toUrlParam;
		stem.fromUrlParam = fromUrlParam;
		stem.addHighlight = addHighlight;
		stem.changeHighlight = changeHighlight;
		stem.deleteHighlight = deleteHighlight;
		stem.changeShown = changeShown;
		stem.deleteShown = deleteShown;
		
		function contains(user){
			return param['lightUser'] && param['lightUser'].indexOf(user) > -1;
		}
		//check if the param object is empty
		function isEmpty(){
			try{
				return $j.isEmptyObject(param);
			        } 
        catch (e) {
            log(e.toString() + ":" + e.lineNumber)
        }

		}
        //create an URL parameter string from an object
        function toUrlParam(){
            var url = URL_PARAM + "=" + param.toSource();
            url = "#" + encodeURIComponent(url);
            return url;
            /*
             var param = "#" + URL_PARAM + "={", pValue = "";
             for (var prop in obj) {
             if (obj[prop] instanceof Array) {
             pValue = "['" + obj[prop].join("','") + "']";
             }
             else {
             pValue = "'"+obj[prop]+"'";
             }
             param += prop + ":" + pValue + ",";
             }
             param += "}";
             */
        };
        //create an object from an URL parameter string
        function fromUrlParam(){
            var re = new RegExp(URL_PARAM + "=(\\(\\{.*\\}\\))");
            var r = decodeURIComponent(top.location.toString()).match(re);
            if (r) {
                var obj;
                eval("var obj=" + r[1] + ";");
                if (obj.shownUser) {
                    changeShown(obj.shownUser);
                }
                if (obj.lightUser) {
                    changeHighlight(obj.lightUser);
                }
            }
        };
        //add a highlight user
        function addHighlight(user){
            var p = param;
            if (p['lightUser']) {
                p['lightUser'].push(user);
            }
            else {
                p['lightUser'] = [user];
            }
            
            stem.fire({
                type: 'lightUserChanged',
                highlight: true,
                user: user
            });
        }
        //change the highlight users
        function changeHighlight(user){
            var p = param;
            p['lightUser'] = user;
            
            stem.fire({
                type: 'lightUserChanged',
                highlight: true,
                user: user
            });
        }
        //delete a highlight user
        function deleteHighlight(user){
            var p = param;
            p['lightUser'].remove(user);
            if (p['lightUser'].length === 0) {
                delete p['lightUser'];
            }
            
            stem.fire({
                type: 'lightUserChanged',
                highlight: false,
                user: user
            });
        }
        //change the Shown user
        function changeShown(user){
            var p = param;
            p['shownUser'] = user;
            
            try {
                stem.fire({
                    type: 'shownUserChanged',
                    trim: true,
                    user: user
                });
            } 
            catch (e) {
                log(e);
            }
            
            
        }
        //delete the Shown user
        function deleteShown(user){
            delete param['shownUser'];
            
            stem.fire({
                type: 'shownUserChanged',
                trim: false,
                user: user
            });
        }
       return stem;
    };
    //object to store parameter;
    var paramObj = eventHost.beget();
    paramObj=ParamObject(paramObj);
    paramObj.addListener('lightUserChanged', highlight);
    paramObj.addListener('lightUserChanged', modifyLinks);
    
    paramObj.addListener('shownUserChanged', trimView);
    paramObj.addListener('shownUserChanged', modifyLinks);
    
	//create an object to store view items
	function ViewData(stem){
		//an internal array to store view items
		var items=[];
		//each item consists of a text label, a function handler and an optional argument object
		function addItem(label, handler, arg){
			items.push({label:label,handler:handler,arg:arg});
		}
		//remove all the existed items
		function clear(){
			items.length=0;
		}
		stem.items=items;
		stem.addItem=addItem;
		stem.clear=clear;
		return stem;
	}
	//create an object to render a view using a ViewData object
	function ViewRenderer(stem){
		//render a view
		function render(viewData){
			var ul = document.getElementById(ID_DIV_MY_MENU);
        	ul.innerHTML = '';
			var item, li, link;
        	for (var i=0; i<viewData.items.length; i++) {
				item=viewData.items[i];
				li = document.createElement('li');
		        link = document.createElement('a');
		        link.innerHTML = item.label;
		        link.href = "javascript:void(0);";
		        link.addEventListener('click', 
					function(item){
						return function(event){
							item.handler.call(link, item.arg);
							hideMenu();
						}
		        	}(item),//use closure to remember the current item
					false);
		        li.appendChild(link);
		        ul.appendChild(li);

			};
		}
		stem.render=render;
		return stem;
	}
    //hide the menu
    function hideMenu(){
        document.getElementById('myMenuDiv').style.visibility = "hidden";
    };
    //singleton method to get the context menu div
    function initMenu(){
        if (myMenu === undefined) {
            myMenu = document.createElement("div");
            myMenu.id = "myMenuDiv";
            myMenu.style.cssText = "border-color:black; "+ 
			"border-style:solid; "+
			"padding:2px; "+
			"background-color:aliceblue; "+
			"text-align:left; "+
			"font-size:14px; "+
			"font-weight:normal; "+
			"line-height:20px; "+
			"border:0 none; "+
			"list-style:none outside none; "+
			"margin:0;";
            myMenu.style.position = "absolute";
            myMenu.style.opacity = "1.0";
            myMenu.style.zIndex = 10;
            myMenu.innerHTML = "<ul id='" + ID_DIV_MY_MENU + "' style='list-style-type:none;'><li><a href='document.getElementById(\'myMenuDiv\').style.visibility=hidden;'>link</a></li></ul>";
            myMenu.style.visibility = "hidden";
            //mouseout in Firefox vs mouseleave in IE
            
            myMenu.addEventListener("mouseout", function(event){
                wrapMouseOut(event, hideMenu)
            }, false);
            
            
            document.body.appendChild(myMenu);
        }
    }
    //show the menu
    function showMenu(event){
        initMenu();
        //a hovering user change will affect both the content(user parameter) and position of the menu;
        //a view toggle will affect both the content(text) and position of the menu as well;
        //the current user can be obtained dynamically, however current view status needs storing manually
        //by flagging the menu as clean here and mark it as stained after the view is toggled.
        var user = this.innerHTML;
        //the newer TianYa page has used user code instead of user name in links
        //user = this.href.split('/').pop();
        //build the menu
		var vd=ViewData({});
		var owner=unsafeWindow['chrAuthorName']; //楼主
        if (viewTrimmed)
        {
            /*
             use specified property modifiers e.g. deleteShown instead
             item = buildMenuItem('看所有', paramObj.deleteParamValue, {
             name: 'shownUser',
             value: user
             });
             */
            vd.addItem('看所有', paramObj.deleteShown, user);
		}
        else // the page shows all users' posts -- original view
        {
			if (owner!==''){
				vd.addItem('只看楼主', paramObj.changeShown, owner)
			}
            vd.addItem('只看Ta', paramObj.changeShown, user);
        }
		
		if (owner!==user){
				vd.addItem('高亮楼主', paramObj.addHighlight, owner);
		}
        
        if (paramObj.contains(user)) {
            vd.addItem('取消高亮', paramObj.deleteHighlight, user);
        }
        else {
			vd.addItem('高亮Ta', paramObj.addHighlight, user);
        }
		//hide the reply function for the moment
        /*
         var area = getDocNode().getElementsByTagName('textarea')[0];
         if (area) {
         item = buildMenuItem('回复Ta', reply, null);
         ul.appendChild(item);
         }
         */
		//render the view
		ViewRenderer({}).render(vd);
		
        this.parentNode.appendChild(myMenu);
        var left2Body = 0, top2Body = 0, pointer = this;
        while (pointer != myMenu.offsetParent) {
            left2Body += pointer.offsetLeft;
            top2Body += pointer.offsetTop;
            pointer = pointer.offsetParent;
        }
        //1. offsetLeft and offsetTop are read-only properties
        //2. style.left/top is relative to the nearest absolute positioned container(if it exists) or <body>/<html>(depends the html rendering mode)
        //3. style.left/top needs a string value that ends with a unit like px; setting it a number value has no effect
        //4. a static(default) positioned element, like <a> here, returns auto for many properties like style.left/height;
        //thus setting myMenu these values has no effect
        //5. taking all above into account, we have to calculate offsetLeft of <a> to <body> and set myMenu.style.left this value.
        
        //cannot get the actual height of <a>, use the number value(12) in its fontSize property plus 1
        //because firebug shows the visual height of <a> is 13
        myMenu.style.top = top2Body + 12 + 1 + 'px';
        myMenu.style.left = left2Body + 'px';
        myMenu.style.visibility = "visible";
        //hide the menu after some time
        window.setTimeout(hideMenu, 4000);
    }
    
    //build a menu item
    function buildMenuItem(text, handler, data){
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.innerHTML = text;
        link.href = "javascript:void(0);";
        link.addEventListener('click', function(event){
            //handler(this, event); here 'this' equals event.currentTarget
            handler.call(data.thisObj, data.user);
            hideMenu();
        }, false);
        /*
         //use jQuery event methods to pass parameters
         $j(link).bind('click', data, function(event){
         handler(event);
         hideMenu();
         });
         
         */
        item.appendChild(link);
        return item;
    }
    //only when the mouse moves out the designated target, the handler is called
    //to avoid the following two issues:
    //1. mouse moves out of the target into one of its child element.
    //2. mouse moves out of one of its child element.
    function wrapMouseOut(event, handler){
        //avoid case 2
        // !== cannot be used here. two identical objects are deemed different if they come from different properties 
        if (event.target != event.currentTarget) {
            return;
        }
        //avoid case 1. relatedTarget gets the element the mouse moves into in event mouseout
        var container = event.relatedTarget;
        while (container != document && container != event.currentTarget) {
            container = container.parentNode;
        }
        if (container == event.currentTarget) {
            return;
        }
        
        handler();
    }
    //this obsolete method has a rigorous check on the links, 
    //which failed after TianYa modified its page
    //add event handlers
    function anchorMenu(){
        var contentDiv = document.getElementById("pContentDiv");
        if (contentDiv === null) {
            return;
        }
        var links = contentDiv.getElementsByTagName("A");
        log((links.length + 1) + ' stories');
        var link, counter = 0;
        for (var i = 0; i < links.length; i++) {
            link = links[i];
            if (link.href.indexOf("Listwriter.asp") > -1 || link.href.indexOf("my.tianya.cn\/") > -1) {
                link.addEventListener("mouseover", showMenu, false);
            }
        }
        //anchor the menu to the table #firstAuthor
        //the event listener is still effective after the node is inserted to another place
        var fa = $(ID_DIV_FIRST_AUTHOR);
        if (fa) {
            // use relative instead of absolute path when there is a context node
            // the context node's part should not be included e.g. "/tbody/tr/td[2]/font/a"
            var path = "tbody/tr/td[2]/font/a";
            var result = xpathQuery(path, XPathResult.ANY_UNORDERED_NODE_TYPE, fa);
            //log(result.innerHTML);
            result.addEventListener('mouseover', showMenu, false);
        }
        
        
    }
    //prepare the menu and anchor
    function prepareMenu(){
        initMenu();
        //anchorMenu();
        $j("a[href*='Listwriter.asp'], a[href*='my.tianya.cn\/']").bind('mouseover', showMenu);
    }
    
    //prints mouse event info
    function onMouseEvent(e){
        var msg = e.type + ': ' + 'Target: ' + e.target + '\r' + 'CurrentTarget: ' + e.currentTarget;
        log(msg);
    }
    
    //toggle a style property of an element
    //Element.style[name] is valid to read and write values in firebug
    //but only 'display' can be used here, others e.g. font-weight always get undefined
    function toggle(elem, style){
        if (style instanceof Array) {
            for (var i = 0; i < style.length; i++) {
                toggle(elem, style[i]);
            }
        }
        else {
            var styleArr = style.split(':');
            if ($j(elem).css(styleArr[0]) === styleArr[1]) {
                $j(elem).css(styleArr[0], styleArr[2]);
            }
            else {
                $j(elem).css(styleArr[0], styleArr[1]);
            }
        }
    }
    
    //toggle a style property of a ORDERED_NODE_SNAPSHOT_TYPE
    function toggleXR(result, style){
        if (result.resultType === XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
            var node;
            for (var i = 0; i < result.snapshotLength; i++) {
                node = result.snapshotItem(i);
                toggle(node, style);
            }
        }
    };
    //toggle a style property for elements in an array
    function toggleArray(list, style){
        if (list instanceof Array) {
            for (var i = 0; i < list.length; i++) {
                ;
                toggle(list[i], style);
            }
        }
    }
	//parepare the page.
	//boards have different layout, so a normal wrapStory is not enough
	function preparePage(){
		//remove the EMBED objects to speed up the loading
		$j("embed").remove();
		//莲蓬鬼话 each original story is wrapped in a div.item
		var jq=$j("div.item");
		if (jq.length>0){
			jq.addClass(STORY_CLASS);
			return true;
		}
		//other boards
		return wrapStory();
	}
    //wrap each story with a div
    //@param container: an element(div) containing all the stories
    //besides the old wrapStory, wrap table #firstAuthor and the first reply
    function wrapStory(){
        //divContent = document.getElementsByClassName('content')[0];
		//针对图画人生的不规则html，.content的子节点要先被放到#pContentDiv中
		$j("#"+ID_DIV_CONTENT).append($j(".content > *"));
		$j("table:has(font:contains('楼主'))").remove();
        divContent = $j("#" + ID_DIV_CONTENT).get(0);
        if (divContent === null) {
			log('div#' + ID_DIV_CONTENT + 'does not exist.');
            return false;
        }
        var curNode, nextNode, wrapper, i = 1;
        curNode = divContent.firstChild;
        nextNode = curNode.nextSibling; //assume the divContent has at least one child
        wrapper = document.createElement('div');
        wrapper.className = STORY_CLASS;
        var fa = $(ID_DIV_FIRST_AUTHOR);
        if (fa) {
            //div ID_DIV_FIRST_AUTHOR is absent in some boards e.g. 图画人生
            wrapper.appendChild(fa);
        }
        while (nextNode != null) {
            if (curNode.nodeName == 'TABLE') {
                //insert the previous wrapper into the document
                divContent.insertBefore(wrapper, curNode);
                //create a new wrapper
                wrapper = document.createElement('div');
                wrapper.className = STORY_CLASS;
                wrapper.appendChild(curNode);
            }
            else {
                //add the current node to the wrapper
                wrapper.appendChild(curNode);
            }
            curNode = nextNode;
            nextNode = nextNode.nextSibling;
            
        }
        //wrap the last element in the parameter divContent
        wrapper.appendChild(curNode);
        divContent.appendChild(wrapper);
		return true;
    }

	//disable 天涯百宝箱
	function disableTreasure(){
		$j("div.treasure a").removeAttr('href')
			.each(function(){
			this.removeAttribute('onclick');
			this.style.color='grey';
		});
		$j("td#__ty_vip_from_td *").removeAttr('href')
			.each(function(){
				this.disabled=true;
				this.removeAttribute('onclick');
				this.style.color='grey';
		});
	}    
    //result is a node
    function addTextContainer(result){
        var node;
        var wrapper; //a wrapper element for the text node.
        var pointer; //the next sibling of the text node.
        for (var i = 0; i < result.childNodes.length; i++) {
            node = result.childNodes[i];
            if (node.nodeType === Node.TEXT_NODE) {
                pointer = node.nextSibling;
                wrapper = document.createElement('p');
                wrapper.appendChild(node);
                wrapper.style.display = 'none';
                pointer == null ? result.appendChild(wrapper) : result.insertBefore(wrapper, pointer);
            }
        }
    }
    
    //modify the links to other pages
    function modifyLinks(){
            var topPager = $(ID_DIV_TOP_PAGER);
            var bottomPager = $(ID_DIV_BOTTOM_PAGER);
            if (topPager && bottomPager) {
                if (paramObj.isEmpty()) {
                    topPager.innerHTML = pagerHtml;
                    bottomPager.innerHTML = pagerHtml;
                }
                else {
                    //preserve the unmodified pager html
                    if (pagerHtml === undefined) {
                        pagerHtml = topPager.innerHTML;
                    }
                    var p = topPager.innerHTML;
                    var param = paramObj.toUrlParam();
                    p = p.replace(/href="[^"]+"/gi, function(sMatch){
                        sMatch = decodeURIComponent(sMatch);
                        var pos = sMatch.indexOf('#');
                        if (pos === -1) {
                            pos = sMatch.length - 1;
                        }
                        return sMatch.substring(0, pos) + param + '"';
                    });
                    topPager.innerHTML = p;
                    bottomPager.innerHTML = p;
                    
                }
                
            }
        
        
        
    }
    //the page only shows one user's posts -- trimmed view
    /*
     __ty_vip.lookByAuthor(user);
     __ty_vip_fn_look_by_author(user);
     */
    function trimView(event){
        //use CSS selector instead of XPath to select the elements.
        var user = event.user;
        
        var needTrim = true;
        if (!viewTrimmed) {
            //needTrim = ($j("a[href*=" + user + "]").parents("." + STORY_CLASS).size() > 0);
            needTrim = ($j("." + STORY_CLASS + " a:contains('" + user + "')").size() > 0);
        }
        //:not(:has div is invalid, use :not(div directly
        //$j("." + STORY_CLASS + ":not(:has(a:contains('" + user + "')))")
        //log($j("." + STORY_CLASS).size());
        //log($j("." + STORY_CLASS + ":has(a:contains('" + user + "'))").size());
        //log($j("." + STORY_CLASS + ":not(a:contains('" + user + "'))").size());
        
        if (needTrim) {
            /*
             if (event.trim) {
             $j("." + STORY_CLASS + ":not(a:contains('" + user + "'))").hide();
             }
             else {
             $j("." + STORY_CLASS + ":not(a:contains('" + user + "'))").show();
             }
             */
            $j("." + STORY_CLASS).toggle();
            //$j("a[href*=" + user + "]").parents("." + STORY_CLASS).toggle();
            $j("." + STORY_CLASS + ":has(a:contains('" + user + "'))").toggle();
            //store the view status
            viewTrimmed = !viewTrimmed;
            //scroll to the top if the view is trimmed to leave the possible blank area
            if (myMenu) {
                myMenu.parentNode.scrollIntoView();
            }
        }
        else {
            alert('当前页没有' + user + '的帖子！');
        }
    };
    //highlight someone's stories
    function highlight(event){
        var user = event.user;
        if (!(user instanceof Array)) {
            user = [user];
        }
        var properties;
        if (event.highlight) {
            properties = {
                "font-weight": "bold"
            };
        }
        else {
            properties = {
                "font-weight": "normal"
            };
        }
        for (var i = 0, u; i < user.length; i++) {
            u = user[i];
            $j("." + STORY_CLASS + ":has(a:contains('" + u + "'))").css(properties);
            //result = $j("a[href*=" + user + "]").parents("." + STORY_CLASS).get();
            //toggleArray(result, 'font-weight:bold:normal');
        }
    }
    
    //reply somebody
    function reply(event){
        var divStory = event.currentTarget;
        while (divStory.className != STORY_CLASS) {
            divStory = divStory.parentNode;
        }
        //use innerHTML instead of textContent to get preciser content e.g. <br>
        var text = divStory.innerHTML.replace(myMenu.innerHTML, '');
        text = text.replace(/<br>/g, '\n'); //preserve line breakers
        text = text.replace(/<.+?>/g, ''); //remove html tags
        text = text.replace(/\n{2,}/g, '\n'); //remove duplicated new lines
        text = text.replace(/(&nbsp;?)|(&#160;?)/g, ' '); //remove &#160 and &nbsp;
        text = text.replace(/^\n/, ''); //remove the possible starting new line        
        var more = text.length > QUOTE_LEN ? '......' : '';
        text = text.substr(0, 200) + more;
        
        var area = getDocNode().getElementsByTagName('textarea')[0];
        area.value = text;
        area.focus();
    }
    //set a hidden field value
    function setFieldValue(fid, fvalue){
        var f = document.getElementById(fid);
        if (!f) {
            f = document.createElement('input');
            f.type = 'hidden';
            f.id = fid;
            f.value = fvalue;
            document.body.appendChild(f);
        }
    };
    
    //get a hidden field value
    function getFieldValue(fid, fvalue){
        var f = $(fid);
        if (f) {
            return f.value;
        }
        else {
            return null;
        }
    };
    
    //obsolete
    //check if current page should be trimmed via hash
    function loadView(){
        //log('loadView user: ' + user);
        if (paramObj.shownUser !== undefined) {
            trimView(null, paramObj.shownUser);
        }
        if (paramObj.lightUser !== undefined) {
            highlight(null, paramObj.lightUser, true);
        }
        
    };
    
    function turnPage(e){
        var url = null; //the address we need
        var NEXT = ["下一页", "后一页"];
        var PREVIOUS = ["上一页", "前一页"];
        var VALID_HREF = "http";
        //ensure the focus is not in a editable element e.g. a textbox or text area
        var editable = false;
        var focused = document.activeElement || e.currentTarget; //activeElement is a HTML 5 property
        if (['input', 'textarea'].indexOf(focused.nodeName.toLowerCase()) != -1) {
            editable = true;
        }
        else {
            if (focused.isContentEditable != undefined) {
                //isContentEditable is supported in Firefox 3.7 or later
                editable = focused.isContentEditable;
            }
            else 
                if (focused.contentEditable != undefined) {
                    //contentEditable is supported in Firefox 3.0 or later
                    //this property return 'inherited' if it's not defined,
                    //thus means true for text-box and false for the others
                    //so i omit this property for text-box. 
                    editable = (['true', ''].indexOf(focused.contentEditable.toLowerCase()) != -1);
                }
            //log('focused: ' + focused.nodeName);
        }
        //log('editable: ' + editable);
        if (editable) {
            return;
        }
        //the key press to turn page may occur on the inserted iframe
        //so the document in the top window should be searched.
        var doc = top.document;
        
        //find the page turning link
        if (e.keyCode == CODE_NEXT) {
            keyword = NEXT;
        }
        else 
            if (e.keyCode == CODE_PREVIOUS) {
                keyword = PREVIOUS;
                //check the number pager for the link to the previous page
                var divPager = $j("#" + ID_DIV_TOP_PAGER, doc);
                if (divPager.length>0 && $j("a:contains('首页')", divPager).length>0) {
					//the second condition ensures the current page is not the first page
                    var pageNums = [], result = null;
                    //find the links whose texts contain a number
                    $j("a", divPager).get().forEach(function(link){
                        if ((result = link.textContent.match(/\[?(\d+)\]?/))) {
                            pageNums.push(parseInt(result[1]));
                        }
                    });
                    //sort the number
                    if (pageNums.length > 0) {
                        pageNums.sort(function(a, b){
                            return a - b;
                        });
                        //log(pageNums);
                        for (var i = 0; i < pageNums.length; i++) {
                            if (pageNums[i] - i > pageNums[0]) {
                                break;
                            }
                        }
                        //the link may appears like 3 or [3]
                        var prev = $j("a:contains('" + pageNums[--i] + "')", doc);
                        if (prev.length > 0) {
                            url = prev.get(0).href;
                        }
                    }
                    
                }
            }
            else {
                return;
            }
        for (i = 0; i < doc.links.length; i++) {
            if (doc.links[i].innerHTML.contains(keyword)) {
                url = doc.links[i].href;
                //link.focus();
                break;
            }
        }
        
        if (url === null) {
            return;
        }
        
        //load the address in the link
        if (url.indexOf(VALID_HREF) > -1) {
            top.location = url;
        }
    }
	function enableWizard(){
        if (window.top === window.self) {
            //process the page for future usage
            if (preparePage()) {
				disableTreasure();
                paramObj.fromUrlParam();
                prepareMenu();
                GM_addStyle(CSS_CLASS_STORY);
            }
        }
		if (GM_getValue('QuickReply',true)){
			prepareReply();			
		}
		GM_registerMenuCommand('切换快速回帖功能的状态',function(){
			var enabled=!GM_getValue('QuickReply',true);
			GM_setValue('QuickReply',enabled);
			var msg='快速回帖功能已经';
			if (enabled){
				msg+='打开。';
			}else{
				msg+='关闭。';
			}
			alert(msg);
		});
		
		window.addEventListener("keypress", onKeyPress, true);
    }
    
    function prepareReply(){
        if (window.top == window.self) {
            if ($j("textarea#"+ID_REPLY_AREA).length === 0) {
                addReplyBox();
            }
        }
        else {
            //remove all the images to speed up
            //jQuery('img').empty() has no effect
            $j('img, embed').remove();
            var divReply = $('adsp_content_replybox_frame_1');
            var divWrapper = document.createElement('div');
            divWrapper.id = 'tw_replypage_wrapper';
            var nodeA, nodeB;
            nodeA = document.body.childNodes[0];
            nodeB = nodeA.nextSibling;
            while (nodeB != null) {
                divWrapper.appendChild(nodeA);
                nodeA = nodeB;
                nodeB = nodeB.nextSibling;
            }
            divWrapper.appendChild(nodeA);
            divWrapper.style.cssText = "display:none;";
            
            //scripts run after the containing node is added to DOM
            document.body.appendChild(divWrapper);
            var formReply = divReply.getElementsByTagName('form')[0];
            if (formReply != null) {
                //page in boards like free, funinfo
                document.body.appendChild(divReply);
            }
            else {
                //page in boards like no04
                var form = xpathQuery("//form[//textarea]");
                formReply = form.cloneNode(false);
                formReply.appendChild(divReply);
                
                var inputs = form.getElementsByTagName('input');
                for (i = 0; i < inputs.length; i++) {
                    if (inputs[i].type == 'hidden') {
                        formReply.appendChild(inputs[i]);
                    }
                }
                document.body.appendChild(formReply);
            }
        }
        btnSubmit = $j("input[value='"+TXT_SUBMIT+"']").get(0);
        //modify the click event handler of the submitting button to avoid some original validation causing errors
		//in the updated tianya boards, the original submit function can pass
		
//        if (btnSubmit) {
//			//btnSubmit.removeAttribute('onclick');
//			//$j(btnSubmit).unbind('click');
//            btnSubmit.addEventListener('click', function(event){
//				var form = this.form;
//                if (form.action == ''){
//					//form.action = '/new/PublicForum/content_submit_mem.shtml'; //in boards like free, the submitting form has no action value
//                    form.action='http://802.tianya.cn/new/Publicforum/content_submit.asp?idwriter='+unsafeWindow.idWriter+'&key='+unsafeWindow.key+'&flag='+unsafeWindow.vflag+'&ttitem=funinfo'; 
//                } 
//                form.submit();
//                event.preventDefault();
//            }, true);
//        }
    }
    
    function getDocNode(){
        //check if a textarea exists
        var frameReply = $(ID_FRAME_REPLY);
        if (frameReply) {
            return frameReply.contentDocument;
            //the result form a xpath query will get the the topmost form rather than the nearmost one
            //form= xpathQuery("//form[//textarea and count(//form)=0]", null, frameReply.contentDocument, frameReply.contentDocument);
            //form = frameReply.contentDocument.getElementById(ID_FORM);			
        }
        else {
            return document;
        }
    }
    /*
     * Firefox use keyCode and charCode to store a character and control key separately
     * property 'which' is not valid as mentioned in Mozilla docs
     */
    //event listener
    function onKeyPress(event){
        //if (top.location!=window.location) return;
        //quick reply
        if (event.ctrlKey && event.keyCode == 13) {
			quickReply(event);
        }
        //turn page
        //avoid a combination with a function key e.g. CTRL, ALT, SHIFT
        if (!(event.ctrlKey || event.altKey || event.shiftKey) &&
        (event.keyCode == CODE_NEXT || event.keyCode == CODE_PREVIOUS)) {
			turnPage(event);
        }
        
    }
    //when my reply box is not focused, get it focused.
    //otherwise, submit
    function quickReply(event){
        var doc = getDocNode();
        var area = $j("textarea#"+ID_REPLY_AREA, doc).get(0);
        var btnSubmit = $j("input[value='"+TXT_SUBMIT+"']", doc).get(0);
        if (area && btnSubmit) {
            var form = area.parentNode;
            while (form.tagName.toLowerCase() != 'form') {
                form = form.parentNode;
            }
            if (event.target.tagName.toLowerCase() == 'textarea') {
                //form.submit();
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                btnSubmit.dispatchEvent(evt);
            }
            else {
                area.focus();
            }
        }
    }
    //REMARKS ABOUT SUBMITTING
    //boards like funinfo & free don't have a action value on the form
    //funinfo page uses an extra check function checkUser
    //free page directly calls CheckSubmit
    //failed to use xmlhttprequest due to security error
    
    //add a reply textarea
    function addReplyBox(replyUrl){
        /*
         //need not fake a form
         //use the existing hidden form
         //<input> name and value mapping
         //idArticle: idArticle, flag: vflag, strItem: strItem
         */
        var linkReply = getElementByText('a', REPLY_LINK_TEXT);
        if (linkReply == null) 
            return;
        var replyLocation = replyUrl || linkReply.href;
        var ifContainer = document.createElement('iframe');
        ifContainer.id = ID_FRAME_REPLY;
        ifContainer.setAttribute('src', replyLocation);
        ifContainer.style.cssText = "height: " + HEIGHT_TIANYA_REPLY_PAGE + "; width: 100%; border: 0;";
        //var divBottom = $('adsp_content_bottom_1');
        //divBottom.parentNode.insertBefore(ifContainer, divBottom);
		$j(ifContainer).insertBefore("div.foot");
        //the inserted frame cannot be accessed via window.frames[name]
        //the iframe needs some time to load the url specified in src property
        //so the modification of the iframe page is done in its own domcontentloaded event
        
        return;
        
        GM_xmlhttpRequest({
            method: "GET",
            url: replyLocation,
            /*
             headers: {
             "User-Agent": "Mozilla/5.0", // If not specified, navigator.userAgent will be used.
             "Accept": "text/xml" // If not specified, browser defaults will be used.
             },
             */
            onload: function(response){
                /*
                 if (response.finalUrl!=null){
                 addReplyBox(response.finalUrl);
                 return;
                 }
                 */
                GM_log([response.status, response.statusText, response.readyState, response.responseHeaders, response.responseText.substring(0, 1000), response.finalUrl].join("\n"));
                //ifContainer.innerHTML=response.responseText;//.replace(/<script(.|\s)*?\/script>/gi, '');
                /*
                 var divs = ifContainer.getElementsByTagName('div');
                 for (var i=0; i<divs.length; i++){
                 if (divs.item(i).id=='adsp_content_replybox_frame_1'){
                 var divReply=divs.item(i);
                 }
                 }
                 */
                //var area=dom.getElementsByTagName('textarea')[0];
            }
            /*,
             onreadystatechange: function(response){
             log([response.status, response.statusText, response.readyState, response.responseHeaders, response.finalUrl].join("\n"));
             }*/
        });
        var html = '<table width="100%"><tbody><tr>' +
        '<td width="500" valign="top">' +
        '<div style="font-size: 14px;" id="DisplayLoginInfoDiv">' +
        '<input type="hidden" value="' +
        unsafeWindow.__ttgwriter +
        '" size="14" id="strWriter" name="userName">' +
        '作者：<font color="green">' +
        unsafeWindow.__ttgwriter +
        '</font>' +
        '</div><input type="hidden" name="Submit" value="Response">' +
        '<textarea class="input" style="font-family: 宋体,Arial; font-size: 12pt; height: 195px;" cols="60" rows="8" errmsg="回复内容" id="adsp_content_replybox_box" name="resContent"></textarea>' +
        '</td><td width="120" id="adsp_content_click"></td>' +
        '<td><span id="adsp_content_replybox_img_1"></span></td></tr></tbody></table>';
        
        if (!$('adsp_content_replybox_frame_1')) {
            var div = document.createElement('div');
            div.id = 'adsp_content_replybox_frame_1';
            div.innerHTML = html;
            
            //var form=ID_FORM.map($).filter(function(elem){return elem!==null;});
            var form = $('form1');
            if (form) {
                form.appendChild(div);
            }
        }
        return;
        var tableHtml = '<tbody><tr><td width="500">' +
        '<div id="DisplayLoginInfoDiv">' +
        '<input name="ckey" id="ckey" value="' +
        unsafeWindow.key +
        '" type="hidden">' +
        '<input name="cidWriter" id="cidWriter" value="' +
        unsafeWindow.idWriter +
        '" type="hidden">' +
        '作者：<font color="green">' +
        unsafeWindow.strWriter +
        '</font></div>' +
        '<input value="Response" name="Submit" type="hidden">' +
        '<textarea name="strContent" rows="8" cols="60" style="font-family: ﾋﾎﾌ・Arial; font-size: 12pt; height: 180px;" class="input"></textarea>' +
        '</td>' +
        '<td id="adsp_content_click" width="120"></td>' +
        '<td><span id="adsp_content_replybox_img_1"></span></td>' +
        '</tr>' +
        '<script language="JavaScript">' +
        '</tbody>';
        
        
        if ($$("idArticle_bottom")[0]) {
            var f = $(ID_FORM);
            f.removeChild($$("idArticle")[0]);
            $$("idArticle_bottom")[0].name = "idArticle";
            var table = document.createElement("table");
            table.innerHTML = tableHtml;
            f.appendChild(table);
            //f.action = 
            //obsolete free:"http://post.tianya.cn/new/Publicforum/content_submit.asp?idwriter=" + unsafeWindow.idWriter + "&key=" + unsafeWindow.key + "&flag=" + unsafeWindow.vflag + "&ttitem=" + unsafeWindow.strItem;
            //obsolete funinfo: 'content_submit_mem.asp?idwriter='+idWriter+'&key='+key+'&flag='+vflag+'&ttitem='+strItem;
        
        }
    }
    
    //get the first element containing certain text
    function getElementByText(tag, text){
        var elements = document.getElementsByTagName(tag);
        for (i = 0; i < elements.length; i++) {
            if (elements[i].textContent.contains(text)) {
                return elements[i];
            }
        }
        return null;
    }
    
    //enable the functions
    enableWizard();
    
}

//insert a scriptlet to the head element of current page
function insertScript(obj){
    var s = document.getElementById('tianya_wizard_script');
    if (!s) {
        s = document.createElement('script');
        s.id = 'tianya_wizard_script';
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    //var text;
    if ((typeof obj) == 'string') //literal text
    {
        s.innerHTML += obj;
    }
    else 
        if (obj instanceof Function) //function
        {
            s.innerHTML += obj.toString();
        }
        else 
            if (obj instanceof Array) //array of functions
            {
                s.innerHTML += obj.join('\r');
            }
}



const CSS_TEXT = '.tianya_block {display: block;} .tianya_none {display:none;}';

//insertScript([Tianya_Wizard, System]);
//insertScript('var _tw=new Tianya_Wizard();');

//inserted scripts from greasemonkey will not be executed at once as from a script in the page
//however, inserted functions can be called
//1. on schedule by setTimeout
//2. later from the page
//option 1 can be used to initialize the objects constructed with the inserted functions.
//example: var cmd = "var _tw=new Tianya_Wizard();var _s=new System();_tw.loadView();";
//unsafeWindow.setTimeout(cmd, 100);
unsafeWindow._tw = new Tianya_Wizard();
