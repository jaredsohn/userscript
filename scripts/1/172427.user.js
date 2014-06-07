// ==UserScript==
// @name        GT Timer Show
// @description Timer on your tab
// @include     *http://www.ghost-trappers.com/*
// @version     1
// ==/UserScript==
var angka=1;
function update(){
    var minutesid = document.getElementById('topHuntMinutes').innerHTML
    var secondsid = document.getElementById('topHuntSeconds').innerHTML
    var timeid=minutesid+":"+secondsid
    if(minutesid<=0&&secondsid<=0){
        if(angka==1){
        document.title="HUNT!"
        angka++;
        }
        else{
        document.title="GT | Ready to HUNT!"
        angka--;
        }
    }
    else{
    document.title=timeid
    }
    setTimeout(update, 1000);
}
update();