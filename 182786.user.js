// ==UserScript==
// @name           bloodcat direct
// @description    直接通过bloodcat下载，不用输入号码了→_→
// @match          http://osu.ppy.sh/b/*
// @include        http://osu.ppy.sh/b/*
// @include        https://osu.ppy.sh/b/*
// @author         橙橙@lolimilk.com
// @version        1.0
// ==/UserScript==

(function(){
    var iSpan = document.createElement("span");
	iSpan.innerHTML = "<form action='http://1.bloodcat.sinaapp.com/osu.php' method='post' target='_blank'><input type='hidden' name='url' value='"+document.URL+"' ><input type='submit' value='Click Here to Download the Map!!' style='width: 99%;height: 25px;position: absolute;font-weight: bold;color: red;border: 2px dashed #C7BFAB;cursor:pointer'></form>";
    document.getElementById("songinfo").appendChild(iSpan);
})();