// ==UserScript==
// @name       Htra
// @version    0.5
// @description  enter something useful
// @run-at         document-body
// @match      http://*.inn.co.il/Forum/Forum.aspx/*
// @copyright  2012+, Shmuelj
// ==/UserScript==
unsafeWindow.TUnderTrack=[];
unsafeWindow.$.ajax({type: "POST",url:"http://innme.aspnet45.cytanium.com/TrackTopics.ashx",data:{Uid:unsafeWindow.User.ID,Forum:unsafeWindow.Forum_ID},
                success: function(data) {
                    eval(data);
                    if (unsafeWindow.Topic_ID&&unsafeWindow.TUnderTrack[unsafeWindow.Topic_ID])
                        unsafeWindow.$("#TAstat"+unsafeWindow.Topic_ID)[0].innerHTML="בטל מעקב";
                },
                 error: function(o){
                     //unsafeWindow.alert((o.responseText.length<100?:o.responseText:"אירעה שגיאה"));
                     
                 }});
unsafeWindow.eval(unsafeWindow.DisplayMessage.toString().replace("תגובה</span>');","תגובה</span>');\nif(message.num==0) p('<span id=\"TAstat'+tid+'\" class=\"ForumMinButton\" onclick=\"TrackAction('+id+',this);\">'+(TUnderTrack[tid]?'בטל מעקב':'עקוב')+'</span>');"));
TUnderTrack=unsafeWindow.TUnderTrack;
unsafeWindow.TrackAction = function(id,sender){
    var topic=unsafeWindow.Forum.Messages[id].topic;
    if (TUnderTrack[topic])
    {
              
              unsafeWindow.$.ajax({type: "POST",url:"http://innme.aspnet45.cytanium.com/TrackAction.ashx?act=Del",data:{Uid:unsafeWindow.User.ID,Forum:unsafeWindow.Forum_ID,Topic:topic},
                success: function(data) {
                    TUnderTrack[topic]=false;
                    sender.innerHTML="עקוב";
                },
                 error: function(o){
                     unsafeWindow.alert((o.responseText.length<100?o.responseText:"אירעה שגיאה"));
                 }});
    }
    else 
    {
        
         unsafeWindow.$.ajax({type: "POST",url:"http://innme.aspnet45.cytanium.com/TrackAction.ashx?act=Add",data:{Uid:unsafeWindow.User.ID,Topic:topic,Forum:unsafeWindow.Forum_ID,Tit:unsafeWindow.Forum.Messages[id].title},
                success: function(data) {
                    TUnderTrack[topic]=true;
                    sender.innerHTML="בטל מעקב";
                },
                 error: function(o){
                     if (o.responseText=="משתמש לא רשום"){
                         unsafeWindow.$.ajax({type: "POST",url:"http://innme.aspnet45.cytanium.com/TrackAction.ashx?act=User",data:{Uid:unsafeWindow.User.ID,Topic:topic,Forum:unsafeWindow.Forum_ID,Tit:unsafeWindow.Forum.Messages[id].title,name:unsafeWindow.User.Name},
                success: function(data) {
                    TUnderTrack[topic]=true;
                    sender.innerHTML="בטל מעקב";
                },
                 error: function(o){
                     unsafeWindow.alert((o.responseText.length<100?o.responseText:"אירעה שגיאה"));
                     
                 }});
                         
                     }
                     unsafeWindow.alert((o.responseText.length<100?o.responseText:"אירעה שגיאה"));
                     
                 }});
                 
    }
}