// ==UserScript==
// @name       bin forum
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @run-at         document-body
// @description  enter something useful
// @match      http://*.inn.co.il/Forum/Forum.aspx/*
// @copyright  2012+, You
// ==/UserScript==

unsafeWindow.eval(unsafeWindow.DisplayMessage.toString().replace("תגובה</span>');","תגובה</span>');\nif(message.num==0&&iIsManager == 1) p('<span class=\"ForumMinButton\" onclick=\"moveto('+tid+','+id+');\">העבר פורום</span>');"));

unsafeWindow.moveto=function(mtopic,message){
    var fid= window.prompt("הזן מספר פורום להעברה","");
    if (!fid||fid=="") return false;
    unsafeWindow.$.post('/Forum/JS.ashx?ajax=1&action=Topic&forum_id='+fid+'&topic_id=0&message_id=0',{anon:false,txtSubject:"זמני",txtMessage:""},function(data){
        unsafeWindow.eval(data);msg=unsafeWindow.msg;
        unsafeWindow.$.post('/Forum/Admin/Admin.ashx',{action:"append",topic:msg.topic,topic_id:mtopic,forum_id:fid},function(){
            unsafeWindow.$.post('/Forum/Admin/Admin.ashx',{js:1,action:"split",forum_id:fid,topic_id:msg.topic,message_id:message},function(){
                unsafeWindow.$.post('/Forum/Admin/Admin.ashx',{js:1,action:"מחק",forum_id:fid,Topic_ID:msg.topic});
                unsafeWindow.$.post('/Forum/Admin/Admin.ashx',{js:1,action:"מחק",forum_id:unsafeWindow.Forum.ID,Topic_ID:mtopic});
                
            });
        });
    });
    
    
}