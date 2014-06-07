// ==UserScript==
// @author         haoyayoi
// @name           Search AutoPagerize SiteInfo
// @namespace      http://wedata.net/
// @description    Search siteinfo of your viewing website from wedata.
// @include        http://*
// @include        https://*
// ==/UserScript==
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 20080829 :: 0.0.1 :: First Release.
// 20080902 :: 0.0.2 :: Add these menu-command
//                       - Check
//                       - Clear Cache
//                       - Close/Open
//                      Cache siteinfo.
//                      Add Minibuffer command.
// 20080902 :: 0.0.3 :: Remove unsafeWindow for security

(function(){
    if(!window.Minibuffer) return;   

    var SITEINFOURL = 'http://wedata.net/databases/AutoPagerize/items.json';
    var Keeper = [];
    var _switch = false;
    var _updated = false;
    
    var SearchUrl = function(info){ 
        if(_switch){
            var oldnode = document.getElementById('SAS_SiteInfoCheck');
            document.body.removeChild(oldnode);
        }        
        for(var i=0;i<info.length;i++){
            var loc = location.href.match(info[i].data.url)
            if(loc != null && info[i].data.url != '^https?://.'){
                Keeper = info[i];
                var self = document.createElement("div");
                self.setAttribute("id","SAS_SiteInfoCheck");
                self.innerHTML = '&lt;wedata&gt;';
                with (self.style) {
                    textAlign  = 'left'
                    background = '#cccccc'
                    fontSize   = '10px'
                    position   = 'fixed'
                    padding    = '0 5px 0 5px'
                    top        = '30px'
                    right      = '0px'
                    width      = 'auto'
                    height     = 'auto'
                    border     = '0px'
                    zindex     = '257'
                }; 
                document.body.appendChild(self);
                self.addEventListener('mouseover',changeStatusView,false); 
                self.addEventListener('mouseout',changeStatusClose,false);
                changeStatusClose('mouseout'); 
                _switch = true;
                return;
            }
        }
    };
    
    var setMinibuffer = function(){
        window.Minibuffer.addCommand({
            name: 'SITEINFO::View-AutoPagerize',
            command: function(){ 
                window.Minibuffer.status('Siteinfochecker','Checked', 1000); 
                setTimeout(checkData,1000);
            }, 
        }); 
        
        window.Minibuffer.addShortcutkey({
            key: 'c',
            description: 'View AutoPagerize-SITEINFO',
            command: function(){
                window.Minibuffer.execute('SITEINFO::View-AutoPagerize');
            }
        }); 
    }
    
    var changeStatusClose = function(e){
        var self = document.getElementById("SAS_SiteInfoCheck"); 
        var style = document.defaultView.getComputedStyle(self, '');
        var changeStyle = ['top', 'left', 'height', 'width'].map(function(i) {
            return parseInt(style.getPropertyValue(i)) });
        if(e.clientX < changeStyle[1] || e.clientX > (changeStyle[1] + changeStyle[3]) ||
           e.clientY < changeStyle[0] || e.clientY > (changeStyle[0] + changeStyle[2])){
            self.innerHTML = '&lt;wedata&gt;';
            with (self.style) {
                background = '#cccccc'
                fontSize   = '10px'
                padding    = '0 5px 0 5px'
                border     = '0px'
            }
        }
    };
    
    var changeStatusView = function(){
        var self = document.getElementById("SAS_SiteInfoCheck"); 
        var regularBG = 'background:#ccffcc;font-size:11px;text-indent:1em;';
        self.innerHTML = '*pageElement<div style="' + regularBG + '">' + Keeper.data.pageElement + '</div>'; 
        self.innerHTML += '*url<div style="' + regularBG + '">' + Keeper.data.url + '</div>';
        self.innerHTML += '*nextLink<div style="' + regularBG + '">' + Keeper.data.nextLink + '</div>';
        with (self.style) {
            background = 'white'
            fontSize   = '11px'
            padding    = '5px'
            border     = '1px solid #cccccc'
        } 
    };
    
    var viewPopRemove = function(){
        if(_switch){
            var oldnode = document.getElementById('SAS_SiteInfoCheck');
            document.body.removeChild(oldnode);
            _switch = false;
        }else{
            checkData();
        }
    }
    
    var setCache = function(info){
        GM_setValue('cacheInfo',info);
    };
    
    var getCache = function(){
        return eval(GM_getValue('cacheInfo','[]'));
    };
    
    var clearCache = function(){
        GM_setValue('cacheInfo','[]');
    }
    
    var checkData = function(){
        var info = getCache();
        if(info.length > 0){
            SearchUrl(info);            
        }else{
            var opt = {
                url:    'http://wedata.net/databases/AutoPagerize/items.json',
                method: 'GET',
                onload: function(res){ getJson(res) },
            };
            GM_xmlhttpRequest(opt);
        }
    };
    
    var getJson = function(res){
        clearCache();
        setCache(res.responseText);
        var info = eval(res.responseText);
        SearchUrl(info);
    };
    
    GM_registerMenuCommand("SiteInfo View(AutoPagerize) - Check", checkData);
    GM_registerMenuCommand("SiteInfo View(AutoPagerize) - Clear Cache", clearCache);
    GM_registerMenuCommand("SiteInfo View(AutoPagerize) - Close/Open ", viewPopRemove);
    setMinibuffer(); 
})();
