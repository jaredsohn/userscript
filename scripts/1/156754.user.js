// ==UserScript==
// @name       rak nezch
// @namespace  http://use.i.E.your.homepage/
// @run-at         document-body
// @version    0.3
// @description  enter something useful
// @match      http://*.inn.co.il/Forum/Forum.aspx/*
// @copyright  2012+, You
// ==/UserScript==
if (unsafeWindow.Forum_ID==394){
unsafeWindow.eval(unsafeWindow.DisplayMessage.toString().replace("תגובה</span>');","תגובה</span>');\nif(message.num==0) p('<span class=\"ForumMinButton\" onclick=\"conTo('+tid+');\">רק נצח</span>'); else p('<span class=\"ForumMinButton\" onclick=\"SplitNcon('+tid+','+id+');\">רק נצח</span>');"));
unsafeWindow.SplitNcon=function(topic,message) { Forum.SplitTopic(topic,message, function() { unsafeWindow.onEndA(message)}) }
unsafeWindow.onEndA=function(mid){
var ifr=document.createElement('iframe');
    var script=document.createElement('script');
    script.innerHTML="conTo(Forum.Messages["+mid+"].topic);";
    ifr.style.display="none";
    ifr.src="/Forum/Forum.aspx/f394";
    

    ifr.onload=function(){this.contentDocument.body.appendChild(script);};

document.body.appendChild(ifr);
    

   
}
unsafeWindow.conTo=function(topic){
    if (parent==unsafeWindow){if (!confirm("האם אתה בטוח?")) return false;}
    unsafeWindow.$.post('/Forum/Admin/Admin.ashx',{action:"append",topic_id:topic,forum_id:394,topic:506921},function(){parent.location.reload()})
}
}