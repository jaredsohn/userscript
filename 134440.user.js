// ==UserScript==
// @name        userscript updater
// @namespace   http://userscripts.org/scripts/show/134335
// @version     1
// ==/UserScript==
//DO NOT INSTALL THIS SCRIPT!!!
var script_updater = {
    default_options : {
        script_name:"emotions for douban group",
        script_version:"0.1",
        script_id:"134335",
        script_update_reason:"for update"
    },
    //only support like '1.5','0.2' style version
    check_version:function(src_version,dest_version){
        src_version = parseFloat(src_version);
        dest_version = parseFloat(dest_version);
        console.log(src_version,dest_version,src_version<dest_version);
        return src_version < dest_version;
    },
    update:function(options){
        var opt = options || this.default_options;
        var ret = {},_this = this;
        GM_xmlhttpRequest({
            method:'GET',
            url:"http://userscripts.org/scripts/source/"+opt.script_id+".meta.js",
            onload:function(xmlHttp){
                if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
                    if(/\/\/\s*@version\s*(\d.*)/.test(xmlHttp.responseText)){
                        var new_version = RegExp.$1;
                        if(_this.check_version(opt.script_version,new_version)){
                            var reason = "",                           
                            message = "New Update For "+opt.script_name +"To Version:"+new_version;
                            alert(message);
                            window.location.href = "http://userscripts.org/scripts/source/"+opt.script_id+".user.js";
                        }
                    }
                }
            },
            synchronous:false
        });
    }    
};
//script_updater.update();

