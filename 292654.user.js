// ==UserScript==
// @name       Locale Nickname System for diam.ngct.net
// @version    1.2
// @description  I am tired of not knowing who is who OAO
// @include		http://diam.ngct.net/*
// @copyright  2012+, XSK 
// ==/UserScript==

/*本程序由XSK開發，超包子更新1.2版。
 *更新內容：
 *1.修正無法使用ctrl+enter送出發言的bug
 *2.修正循環執行無法運作的bug
 *不負責任註解由超包子亂寫（O）
 */

//main函數用以增加擴充介面以及記錄輸入的trip
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

//highlight函數用以改變trip連結的value
function highlight(){
    var as = document.getElementsByTagName("a");
    for (var i=0;i<as.length;i++){
        as[i].innerHTML = GM_getValue(as[i].innerHTML,as[i].innerHTML);
    }
  }

//以下當載入網頁後將開始執行

//若是trip資料頁面，執行main以讓使用者輸入暱稱，不要問我為什麼這邊要循環執行，XSK的CODE就說這邊要循環，我只好照著做（？）
//但後來我發現這邊循環執行之後根本就超難用的，所以還是把他註解掉了，現在這邊不會循環執行
//拜託XSK告訴我您當初這裡為什麼會希望要循環吧QAQ
if(document.location.href.split("/")[3].split("&")[0]=="trip.php?go=trip"){
    /*window.setInterval(function(){
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
},5000);*/
    main();
} 
//當讀取到文字發送區的時候不執行任何函數，以修正1.1版ctrl+enter失效的bug
else if(document.location.href.split("_")[1]=="up.php?room"){}
//循環執行highlight以重複用暱稱取代原本的trip
else {
    window.setInterval(function(){
    var as = document.getElementsByTagName("a");
    for (var i=0;i<as.length;i++){
        as[i].innerHTML = GM_getValue(as[i].innerHTML,as[i].innerHTML);
    }
  },3000);
    highlight();
}