// ==UserScript==
// @name           ACF temp Quick Reply
// @namespace      .
// @description    Adds a quick reply box to topics. Disable when quick reply is present.
// @include        http://acforums.megadoomer.com/viewtopic.php*
// ==/UserScript==

wdata=document.getElementsByTagName('a');
pelement=document.getElementById('bottom');

if(pelement==null){pelement=document.getElementById('wrapfooter')}

maxl=wdata.length
i=0;
for (a=1;a<wdata.length;a++){

if (wdata[a].href!=null){

if (wdata[a].href.match(/acforums\.megadoomer\.com\/ucp\.php\?mode=logout/)){
wdata2=wdata[a].href.replace(/&amp;/g,'&');
wdata2=wdata2.split('&');
sid=wdata2[1].substring(4);
}

if (wdata[a].href.match(/acforums\.megadoomer\.com\/posting\.php\?mode=reply/)){
if (i<1){i++;continue;}

wurl=wdata[a].href;
wdiv=document.createElement('div');
wurl=wurl.replace(/&amp;/g,'&');
wdata2=wurl.split('&');
t=wdata2[2].substring(2);
f=wdata2[1].substring(2);
break;
}

}

}

function GetXmlHttpObject(){
var xmlHttp=null;
xmlHttp=new XMLHttpRequest();
return xmlHttp;
}

function stateChanged() { 
if (xmlHttp.readyState==4){ 
moo=xmlHttp.responseText;
token=moo.match(/name="form_token" value="\w+"/);
token+='';
token=token.replace(/name="form_token" value="/,'');
token=token.replace(/"/,'');
topic_cur_id=moo.match(/name="topic_cur_post_id" value="\w+"/);
topic_cur_id+='';
topic_cur_id=topic_cur_id.replace(/name="topic_cur_post_id" value="/,'');
topic_cur_id=topic_cur_id.replace(/"/,'');
creation_time=moo.match(/name="creation_time" value="\w+"/);
creation_time+='';
creation_time=creation_time.replace(/name="creation_time" value="/,'');
creation_time=creation_time.replace(/"/,'');
wdiv.style.margin='17px';
o='';

if(moo.match(/<input type="\w+"(\s|\sclass="\w+"\s)name="attach_sig"(\s|\sid="\w+"\s)checked="checked" \/>/)){o+='<input type="hidden" name="attach_sig" checked="checked">'}
if(moo.match(/<input type="\w+"(\s|\sclass="\w+"\s)name="notify"(\s|\sid="\w+"\s)checked="checked" \/>/)){o+='<input type="hidden" name="notify" checked="checked" />'}
if(moo.match(/<input type="\w+"(\s|\sclass="\w+"\s)name="disable_bbcode"(\s|\sid="\w+"\s)checked="checked" \/>/)){o+='<input type="hidden" name="disable_bbcode" checked="checked">'}
if(moo.match(/<input type="\w+"(\s|\sclass="\w+"\s)name="disable_magic_url"(\s|\sid="\w+"\s)checked="checked" \/>/)){o+='<input type="hidden" name="disable_magic_url" checked="checked">'}
if(moo.match(/<input type="\w+"(\s|\sclass="\w+"\s)name="disable_smilies"(\s|\sid="\w+"\s)checked="checked" \/>/)){o+='<input type="hidden" name="disable_smilies" checked="checked" />'}
wdiv.innerHTML='<form action="./posting.php?mode=reply&amp;t='+t+'&amp;f='+f+'&amp;sid='+sid+'" method="post" name="postform">'+o+'<input type="text" name="subject"><input type="hidden" name="topic_cur_post_id" value="'+topic_cur_id+'"><br><textarea name="message" style="width:400px;height:200px;" id="moo" onClick="if(document.getElementById(\'moo\').innerHTML==\'Quick Reply!\'){document.getElementById(\'moo\').innerHTML=\'\'}">Quick Reply!</textarea><br><input type="submit" value="Submit" name="post"><br><input type="hidden" name="creation_time" value="'+creation_time+'"><input type="hidden" name="form_token" value="'+token+'"></form>';
pelement.parentNode.insertBefore(wdiv,pelement.nextSibling);
}}

xmlHttp=GetXmlHttpObject();
xmlHttp.onreadystatechange=stateChanged;
xmlHttp.open("GET",'http://acforums.megadoomer.com/posting.php?mode=reply&f='+f+'&t='+t,true);
xmlHttp.send(null);

