// ==UserScript==
// @name       百度云盘转存助手
// @namespace  supertrans
// @version    0.1
// @description  绕开百度云盘的转存文件/文件夹100的数目限制
// @match      http://pan.baidu.com/*
// @copyright  2012+, Superfei stormslowly@gmail.com
// @require    https://raw.github.com/JacksonTian/eventproxy/master/lib/eventproxy.js
// @icon data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAADV1er/c3Pb/9fX6P////7//Pz/////9/+3t+D/b27l/29v5f+4ud7////4//z8//////7/1NXo/3Jz2//X1+v/Zmfc/wAA+f8aGOP/yMjm//7/9P9dXdz/AADv/wEB/P8BAf3/AADu/19g3P////X/xcXm/xcX5P8AAPn/bG3d/0tK6P8AAP//AAD//ycm3v9LTMr/AAD//wMD//8DA/7/AwP+/wMD//8AAP//TE3J/yIj3/8AAP//AAD//1FQ5P9OTuL/AAD//wAA/P9oaN//rq7b/wAA7/8CAv7/AAD+/wAB/f8BAf//AQHw/6+w3P9kZeD/AAD7/wAA/v9VU93/Z2fX/wAA//8bG+X/5OXr//////94d9r/AAD5/wQD/v8DA///AAD5/3t72v//////4eLr/xkZ5f8AAP//cG/g/5+e5P8AAPP/iIfd/////f/6+v//+vry/zs74P8AAP//AAD//z8+4f/7+/P/+fn//////f+Dhd3/AADy/6Ch4f/Ky+v/GRnX/+Xl7v//////+vr8///////Q0OT/Bwfq/woK6v/U1OX///////r6/P//////4eLs/xkY2P/Pz+3/7O3y/5eYy/////7//f3+//7+/v/6+v7//////4eG1/+Kitj///////v6/v/+/v7//f3+/////v+amsn/7+/2/+zt9P+en8r////+//39/v/+/v7/+/v9//////+XmNT/mpvW///////6+v3//v7+//39/v////7/n6DK/+/u9f/Jy+z/HB7V/+jp7v//////+/v9///////d3eX/Dg/p/xER6f/f3+b///////v7/f//////5eXu/x0c1v/Pz+3/oKHk/wAA8f+Ojdz////+//j4//////T/Skrb/wAA/v8AAP7/TU3b////9f/5+P/////+/4qK3f8AAPL/oqTi/2pq2v8AAP//ICDj/+no6///////jIzb/wAA9v8DA///AwT//wAA9f+Pjtv//////+bl6/8eHuP/AAD//3Fx3/9PT+X/AAD//wAA+f9xcd//wsPf/wcH6/8AAP//AQH9/wEB/f8AAP//CQnq/8XG3/9sbeH/AAD6/wAA//9TU+L/TUvu/wAA/v8AAP//Hh7c/0NDxf8AAP//AwT+/wID/v8DA/7/AwP//wAA//9GRcP/HRze/wAA//8AAP7/T1Dm/11d3f8AAP7/DAzn/7e34//29/H/TEzZ/wAA9P8BAf7/AQH//wAA9f9OTtr/+Pnw/7Kz4v8KC+j/AAD+/2Nk3v/Gx+X/UlLb/8PE5P////3//v7///v79P+lpd3/V1bh/1ZW4v+lpt7/+/z0//79//////z/wcHj/1NS2//Ky+j/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
// ==/UserScript==

function flash_notice(message){
    return Utilities.useToast({toastMode: disk.ui.Toast.MODE_LOADING,msg:message,sticky: false});
}

function stick_notice(message){
    return Utilities.useToast({toastMode: disk.ui.Toast.MODE_LOADING,msg:message,sticky: true});
}

function async_transfer(files,to_path,user_key,share_id,update){
    var ep = new EventProxy();
    var url_base = "/share/transfer?channel=chunlei&clienttype=0&web=1";
    
    var post_url = disk.api.RestAPI.normalize(
        url_base  + 
        "&from=" + encodeURIComponent(user_key) + 
        "&shareid="+share_id, 
        FileUtils.bdstoken);
    if( "function"!==typeof update){
        update_func = function(){};
    }else{
        update_func = update;
    }
    
    
    ep.after('transfered', files.length, function (list) {
        update( files.length);
    });
    var ajax_callback = function(message) {
        ep.emit('transfered', message);
        console.log(message);
        update_func();
    }
    
    for (var i = 0; i < files.length; i++) {
        console.log(files[i].path,to_path,user_key,share_id);
        $.ajax({
            type: "post",
            url: post_url,
            data: {
                path: to_path,
                filelist: $.stringify([files[i].path])
            },
            timeout: 100000,
            success:ajax_callback
        });
    }
}

function sync_transfer(file,to_path,user_key,share_id){
    var url_base = "/share/transfer?channel=chunlei&clienttype=0&web=1";
    console.log(file.path,to_path,user_key,share_id);
    
    var post_url = disk.api.RestAPI.normalize(
        url_base  + 
        "&from=" + encodeURIComponent(user_key) + 
        "&shareid="+share_id, 
        FileUtils.bdstoken);
    console.log(post_url);
    $.ajax({
        async: false,
        type: "post",
        url: post_url,
        data: {
            path: to_path,
            filelist: $.stringify([file.path])
        },
        timeout: 100000,
        success: function(message) {
            console.log(message);
        } 
    });
}

if($('#barSuperTransfer').length===0){
    $('#barAllCmdTransfer').before('<a class="new-sbtn" hidefocus="true" href="javascript:;" id="barSuperTransfer" ><em class="icon-share-save"></em><b>转存助手</b></a>')
}

$('#barSuperTransfer').click(function(event){
    
    var file_list = FileUtils.getListViewCheckedItems();
    if(file_list.length === 0){
        flash_notice("请选择需要转存的文件");
        return ;
    }
    
    var user_key = FileUtils.sysUK;
    if(user_key ===null){
        flash_notice("无法获得用户信息");
        return;
    }
    
    var share_id = FileUtils.share_id;
    if(share_id ===null){
        flash_notice("无法获得共享资源信息");
        return;
    }
    
    if (!FileUtils._mMoveSaveDialog) {
        FileUtils._mMoveSaveDialog = new disk.ui.MoveSaveDialog();
    }
    FileUtils._mMoveSaveDialog.onConsent = function(selected_path) {
        console.log("selected_path",selected_path);
        FileUtils._mMoveSaveDialog.setVisible(false);
        notice = stick_notice("正在努力转存 0/"+file_list.length );
        notice.setGravity(disk.ui.Panel.CENTER);
        var l = file_list.length;
        var message;
        var i =0;
        var update = function(){
            message = "正在努力转存 " + (i+1) +"/" +l;
            notice.setMessage(disk.ui.Toast.MODE_LOADING,message);
            i+= 1;
            if(i===l){
                flash_notice("保存成功");
            }
        }
        async_transfer(file_list,selected_path,user_key,share_id,update);
        
        /*
         *  the sync style way 
            for(var i=0;i<l;i+=1 ){
            console.log(i);
            sync_transfer(file_list[i],selected_path,user_key,share_id);
            
            message = "正在努力转存 " + (i+1) +"/" +l;
            notice.setMessage(disk.ui.Toast.MODE_LOADING,message);
        }
        */
    };
    FileUtils._mMoveSaveDialog.setVisible(true);
    
    
});
