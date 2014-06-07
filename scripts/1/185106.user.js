// ==UserScript==
// @name       Fanfou Drag to upload
// @namespace  http://fanfou.com/
// @version    0.1
// @description  Type words and then drag picture to box to upload it automatically 
// @match      http://fanfou.com/*
// @copyright  2012+, http://fanfou.com/Singularity
// ==/UserScript==

(function(){

    jQuery(".ui-autocomplete-input").on({
            dragleave:function(e){
                e.preventDefault();
                jQuery(this).css("backgroundColor","rgb(255,255,255)");
            },
            drop:function(e){
                e.preventDefault();
                e.dataTransfer = e.originalEvent.dataTransfer;
                jQuery(this).css("backgroundColor","rgb(255,255,255)");
                var fileList = e.dataTransfer.files;
                
                //检测是否是拖拽文件到页面的操作
                if(fileList.length == 0){
                    return;
                }
                
                //检测文件是不是图片
                if(fileList[0].type.indexOf('image') === -1){
                    return;
                }
                var desc = (jQuery(".ui-autocomplete-input")[0].value != "") ? jQuery(".ui-autocomplete-input")[0].value : jQuery(".ui-autocomplete-input")[1].value;
		var token = jQuery("input[name=token]:first")[0].value;
                var ajax = jQuery("input[name=ajax]:first")[0].value;
                var in_reply_to_status_id = jQuery("input[name=in_reply_to_status_id]:first")[0].value;
                var repost_status_id = jQuery("input[name=repost_status_id]:first")[0].value;
                
                jQuery("#upload-filename").text(fileList[0].name);
                
                var fd = new FormData();
                fd.append('desc',desc);
                fd.append('picture', fileList[0]);
                fd.append('action','photo.upload');
                fd.append('ajax',ajax);
                fd.append('in_reply_to_status_id',in_reply_to_status_id);
                fd.append('repost_status_id',repost_status_id);
                fd.append('token',token);
                
                var xhr = new XMLHttpRequest();
                xhr.open("post", "http://fanfou.com/home/upload", true);
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");     
                xhr.addEventListener("load", function(e){
               		location.reload();
            	}, false);
                xhr.send(fd);    
            },
            dragenter:function(e){
                jQuery(this).css("backgroundColor","rgb(255,247,119)");
                e.preventDefault();

            },
            dragover:function(e){
                e.preventDefault();

            }
        });  
 
})();
