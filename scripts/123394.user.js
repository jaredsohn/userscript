    1 Unread Message
    syera
    Logout

Userscripts.org

    Scripts
    Tags
    Forums
    People
    Blog
    Groups
    Guides

STATUS UNLIMITED
By dwi wahyu — Last update 14 hours ago — Installed 28 times.

    About
    Source Code
    Reviews 0
    Discussions 0
    Fans 0
    Issues
    Share

// ==UserScript==
// @name           Bom
// @namespace      Bom 
// @description    BBBBBBB
// @author         - 
// @homepage       http://www.facebook.com/
// @include        htt*://www.facebook.com/* 
// @version        9.1 
// @exclude        htt*://*static*.facebook.com* 
// @exclude        htt*://*channel*.facebook.com* 
// @exclude        htt*://developers.facebook.com/* 
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html 
// @exclude        htt*://*onnect.facebook.com/* 
// @exclude        htt*://*acebook.com/connect* 
// @exclude        htt*://www.facebook.com/plugins/* 
// @exclude        htt*://www.facebook.com/l.php* 
// @exclude        htt*://www.facebook.com/ai.php* 
// @exclude     htt*://www.facebook.com/extern/* 
// @exclude     htt*://www.facebook.com/pagelet/* 
// @exclude     htt*://api.facebook.com/static/* 
// @exclude     htt*://www.facebook.com/contact_importer/* 
// @exclude     htt*://www.facebook.com/ajax/* 
// @exclude     htt*://apps.facebook.com/ajax/* 
// @exclude	   	htt*://www.facebook.com/advertising/* 
// @exclude	   	htt*://www.facebook.com/ads/* 
// @exclude	   	htt*://www.facebook.com/sharer/*
// ==/UserScript==
body=document.body;if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.bottom="+10px";div.style.left="+60px";div.style.backgroundColor="rgba(255, 255, 255, 0.8)";div.style.border="5px solid";div.style.padding="1px";div.innerHTML=" <a style=\"font-weight:bold;color:##3860BB\" href=\"JavaScript:FloodWal()\"> BOOM WALL</a>        <a style=\"font-weight:bold;color:#F40000\"><blink></blink></a>";body.appendChild(div);unsafeWindow.FloodWal=function(){var a=document.body.innerHTML;var Num=prompt("","Masukkan Jumlah Pesan Seng Arep Dikirim");var msg=prompt("","Masukkan Isi Pesan");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+"&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i<Num){with(newx=new XMLHttpRequest)open("POST","/ajax/updatestatus.php?__a=1"),setRequestHeader("Content-Type","application/x-www-form-urlencoded"),send(pst);i+=1;void 0}}}body=document.body;if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.bottom="+8px";div.style.left="+6px";div.style.backgroundColor="#";div.style.border="0px solid #94a3c4";div.style.padding="0px";div.innerHTML='<a style="font-weight:bold;color:#19D63F" href= </a>';body.appendChild(div);unsafeWindow.AutoUnLikeComments=function(){buttons=document.getElementsByTagName("button");for(i=0;i<buttons.length;i++){myClass=buttons[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("")>=0)if(buttons[i].getAttribute("title")=="Unlike this comment")buttons[i].click()}}}

Because it's your web | Donate

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
