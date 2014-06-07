// ==UserScript==
// @name           GLB Real Date and Time
// @namespace      GLB
// @description    Adds Date and Time to Homepage of when the page was loaded
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
// 


window.setInterval(function(){
    
    var obj = document.getElementById('season');
    var seasonholder = '';
    if (obj.innerHTML.indexOf('(')>0) {
        seasonholder = obj.innerHTML.substring(obj.innerHTML.indexOf('(')+1, obj.innerHTML.indexOf(')'));
    }else{
        seasonholder = obj.innerHTML;
    }
    var currentdate = new Date();
    var fulldaynum = currentdate.getDay();
    switch (fulldaynum) {
    case 0:
        var fullday = 'Sunday';
        break;
    case 1:
        var fullday = 'Monday';
        break;
    case 2:
        var fullday = 'Tuesday';
        break;
    case 3:
        var fullday = 'Wednesday';
        break;
    case 4:
        var fullday = 'Thursday';
        break;
    case 5:
        var fullday = 'Friday';
        break;
    case 6:
        var fullday = 'Saturday';
        break;
    }
    
    var month = currentdate.getMonth();
    month = month +1;
    var day = currentdate.getDate();
    var year = currentdate.getFullYear();
    var hours = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var seconds = currentdate.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    obj.innerHTML = fullday + ' ' + month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' (' + seasonholder + ')';
},1000);
