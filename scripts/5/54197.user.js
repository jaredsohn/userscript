// ==UserScript==
// @name            GoldShine
// @description     Watch some Silverlight video without Silverlight (even with VLC). This script find Silverlight <object/> tag, look for mms:.*wmv urls in his params, and replace with a MediaPlayer <object/> tag pointing to that url. If you have VLC plugin installed, then VLC plays the video.
// @namespace       http://kirgroup.com/
// @include         http://www.microsoft.com/*
// @require         http://code.jquery.com/jquery-latest.js
// ==/UserScript==


$(document).ready(function(){
     $("[type='application/x-silverlight-2']").each(function(){
         var replace="";
         var w=this.getAttributeNode("width").value;
         var h=this.getAttributeNode("height").value;
         $(this).children("param").each(function(){
            m=this.value.match(/mms:.*wmv/)
            if (m!=null){
             vurl=m[0];
             vid=rand_no = Math.floor(Math.random()*1000);
             console.info(vid);
             replace += '<object id="'+vid+'" name="'+vid+'" width="'+w+'" height="'+h+'" classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" standby="Loading Windows Media Player components…" type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112">';
             replace += '<param name="filename" value="'+vurl+'">';
             replace += '<param name="Showcontrols" value="True">';
             replace += '<param name="autoStart" value="False">';
             replace += '<embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" version="VideoLAN.VLCPlugin.2" src="'+vurl+'" id="'+vid+'" name="'+vid+'" width="'+w+'" height="'+h+'"></embed>';
             replace += '</object>';
            }
         });
         $(this).after(replace).remove();
         
     });
 
 });
