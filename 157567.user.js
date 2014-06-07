// ==UserScript==
// @name       Locale Nickname System for diam.ngct.net
// @version    1.1
// @description  I am tired of not knowing who is who OAO
// @include		http://diam.ngct.net/*
// @copyright  2012+, XSK
// ==/UserScript==

function main(){
    var tr = document.getElementsByTagName("tr")[1];
    tr.deleteCell(1);
    var td = tr.insertCell(1);
    td.align = "center";
    td.width = 180;
    var trip = document.location.href.split("=")[2];
    var nick = GM_getValue(trip,trip);
    td.innerHTML = "<input type='text' id='XSKNick' size='10' value='"+nick+"'></input><input type='button' id='XSKBtnSetNick' onclick='setNick();' value='確認'></input>";
    document.getElementById("XSKBtnSetNick").onclick = function(){
        GM_setValue(trip,document.getElementById("XSKNick").value);
    };
}

function highlight(){
    var as = document.getElementsByTagName("a");
    for (var i=0;i<as.length;i++){
        as[i].innerHTML = GM_getValue(as[i].innerHTML,as[i].innerHTML);
    }
}

if(document.location.href.split("/")[3].split("&")[0]=="trip.php?go=trip"){
    window.setInterval("main()",5000);
    main();
} else {
    window.setInterval("highlight()",5000);
    highlight();
}