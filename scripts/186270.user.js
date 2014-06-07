// ==UserScript==
// @name       save as read
// @namespace  http://inn.co.il/
// @version    0.0.1
// @run-at         document-end
// @grant       none
// @description  enter something useful
// @match      http://*.inn.co.il/Forum/Forum.aspx/*
// @copyright  2012+, You
// ==/UserScript==

var func = 'if (this.event&&this.event.ctrlKey){\n\
\t\tINNData.Save("t"+tid,INNData.Load("t"+tid).replace(new RegExp(","+id, "g"),""));\n\
\t\t_("ForumMessageTitle"+id).style.color="";\n\
\t\ttopic.viewed=INNData.Load("t"+tid).split(",");\n\
\t}else{\n\
\t\tif($.inArray(message.id+"",topic.viewed)==-1) INNData.Save("t"+tid,INNData.Load("t"+tid)+","+id);\n\
\t\t_("ForumMessageTitle"+id).style.color="#003F70";\n\
\t}'
eval("DisplayMessage="+DisplayMessage.toString().replace('if($.inArray(message.id+"",topic.viewed)==-1) INNData.Save("t"+tid,INNData.Load("t"+tid)+","+id);','').replace('_("ForumMessageTitle"+id).style.color="#003F70";',func))