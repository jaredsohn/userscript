    // This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
    // More info: http://greasemonkey.mozdev.org/
    // ==UserScript==
    // @name         ModifyYupooAlbum
    // @author       sfufoet
    // @blog            http://blog.loland.net/
    // @description  Easy to select used often Yupoo album
    // @include      http://thws.yupoo.com/photos/upload
    // @namespace    http://blog.loland.net/2008/10/15/68.et
    // ==/UserScript==

    YupooInnerHTML();
    function YupooInnerHTML(){
        var enabling = document.createElement('div');
        enabling.innerHTML = '<script type=\"text/javascript\">function changeText(text){var x=document.getElementById(\"album_select\");for(i=0;i<x.length;i++){if(x.options[i].text==text)x.selectedIndex=i;}}</script>';
        enabling.innerHTML = enabling.innerHTML + '<input type="button" onclick="changeText(\'博客图片\')" value="博客图片" />';
        document.getElementById('create_album_trigger').parentNode.insertBefore(enabling, document.getElementById('create_album_trigger'));
    } 