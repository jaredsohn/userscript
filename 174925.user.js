// ==UserScript==
// @name        GT Timer Show Alternative
// @namespace   Timer
// @description Timer
// @include     *http://www.ghost-trappers.com/*
// @version     1.1
// ==/UserScript==
var angka=1;
var min3=0;
var sec3=0;
var sectotal1=0;
var sectotal2=0;
var minutesid = document.getElementById('topHuntMinutes').innerHTML;
var secondsid = document.getElementById('topHuntSeconds').innerHTML;
today=new Date();
min1=today.getMinutes();
sec1=today.getSeconds();
function update(){
    today2=new Date();
    min2=today2.getMinutes();
    sec2=today2.getSeconds();
    
    if(min2<min1){
        min3=min2+60-min1;
        sec3=sec2-sec1;
    }
    else{
    min3=min2-min1;
    sec3=sec2-sec1;
    }

    sectotal1=min3*60+sec3;
    sectotal2=Number(minutesid)*60+Number(secondsid);
    sectotal=sectotal2-sectotal1;

    minfinal=Math.floor(sectotal/60);
    secfinal=sectotal-(minfinal*60);

    if(minfinal<=9){
        minfinal2="0"+minfinal;
    }
    else{
    minfinal2=minfinal;
    }
    
    if(secfinal<=9){
        secfinal2="0"+secfinal;
    }
    else{
    secfinal2=secfinal;
    }

    var timeid=minfinal2+":"+secfinal2;   
    if(minfinal<=-1){
        if(angka==1){
        document.title="HUNT!";
        angka++;
        }
        else{
        document.title="GT | Ready to HUNT!";
        angka--;
        }
    }
    else{
    document.title=timeid;
    }
    setTimeout(update, 1000);
}
update();