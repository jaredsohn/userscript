// ==UserScript==
// @name           Kraweznikor
// @description    Niszczy kurahen
// @version        1.1
// @include        http://www.karachan.org/*
// @include        http://karachan.org/*
// ==/UserScript==

var hiddenthreads = getCookie('hiddenthreads').split('!');

function getCookie(a) {
    
var Utf8 = {
    encode: function (a) {
        a = a.replace(/\r\n/g, "\n");
        var b = "";
        for (var n = 0; n < a.length; n++) {
            var c = a.charCodeAt(n);
            if (c < 128) {
                b += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                b += String.fromCharCode((c >> 6) | 192);
                b += String.fromCharCode((c & 63) | 128)
            } else {
                b += String.fromCharCode((c >> 12) | 224);
                b += String.fromCharCode(((c >> 6) & 63) | 128);
                b += String.fromCharCode((c & 63) | 128)
            }
        }
        return b
    },
    decode: function (a) {
        var b = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < a.length) {
            c = a.charCodeAt(i);
            if (c < 128) {
                b += String.fromCharCode(c);
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = a.charCodeAt(i + 1);
                b += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2
            } else {
                c2 = a.charCodeAt(i + 1);
                c3 = a.charCodeAt(i + 2);
                b += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3
            }
        }
        return b
    }
};
    with(document.cookie) {
        var b = new RegExp("(^|;\\s+)" + a + "=(.*?)(;|$)");
        var c = b.exec(document.cookie);
        if (c && c.length > 2) return Utf8.decode(unescape(replaceAll(c[2], '+', '%20')));
        else return ''
    }
}

function set_cookie(a, b, c) {
    if (c) {
        var d = new Date();
        d.setTime(d.getTime() + (c * 24 * 60 * 60 * 1000));
        var e = "; expires=" + d.toGMTString()
    } else e = "";
    document.cookie = a + "=" + b + e + "; path=/"
}



function replaceAll(a, b, c) {
    var d = a.indexOf(b);
    while (d > -1) {
        a = a.replace(b, c);
        d = a.indexOf(b)
    }
    return a
}



var cook = getCookie('antyrak');
var isDeleted = 0;

flag_greyed = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJkSURBVHjajJI9SBxBGIafmZu92+6EEysVkyLIgU3AziZlCBfSBEuLIOGwSAoLWyGITcBWrAOBVLE3CSmEoCAi+J9cQL14d7Lu3p53m11nJoXseabyhYHhneGZ7/veEbOzs58zmczzWq32oVqtfjfGvLbWPgaw1iKEQAjxV0q5BMylPoAQAmWMeTo2NsbW1tbL4eHhF8Vi0R0dHWVkZIRUOzs7uZWVlTdSyjlr7QPgkdb6lVLqiQKcTCaD1jo7Pz+f3dzcxPM8Dg4OUEqhtWZycpLl5WXXGPOzv78/57pudmpqKr+4uJhVaUnWWlqtFmtrawBorclms1hr8X0fYwwLCwsPC4UCAH19fRhjUGkvQghqtRq+75PL5XAcB2MMAJ7nYa0lCAI2NjaIoohSqQRwA0gVhiFSyi5QCNH1AdbX17m8vKTdbjMxMQGA7AU0m83uXgiBlPKO3263u36r1boFpC9FUYRSCsdxkFKitcZxHJIkuVMRQBAEty2kh/v7+3Q6HeI47g62N/NUUkqiKEJKeQOI4xgpJXt7exdhGP4+PT39k14eHBwsNRoNpJTdVOI45ujoCCFEXQEkSYLruhweHi6FYfjt7OxsOwUMDQ39UEoVlVIEQcD19TXNZrN5fHz8q1qtflTWWhzHYXx8nNXV1fdA1DvYSqXytlAovAMyJycn6R/56nnep/Pz820FYIzB930GBgaier3Of4AvlUrlGSB67DZwdScFYwzT09Pk83ny+XwvQwMXQKNnXXUHmn5bIQSdTodyuUy5XMZ1Xe4jKaVkd3e3G2WSJCRJwszMzL0A/wYAa1Azu/IyaRAAAAAASUVORK5CYII='

flag_green = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKOSURBVHjajJFLSFRhHMV/32Pu3Jmx1NAkysgWCWYgQ4U9Nq3Dlm2iVYtoV4uoTUSUEIThJnJlqyB6SIa0qSyCHkYUPcEpe2hqOo42Oldn5t77fS1mzFl24L/8/845HHHn3J5+beSBcZ253hf7/FSGHDWGpLFgLQgBWlFwNN3AaWPBWMCCViBun91VbN2WjBz71lPcurHRb2tsd1vW71BNa1vQwgLw5uczuvo7844iFliajGVL0edIlcs+DUSUUnhh6JzpuO+kMjfxxTAfMn1UxSC0Pu2br1HwO92Cz8iGNQ3RqE44h/eer744cMjRANZYhIF8OM3L0R7i8SXc6ALVIQTWssmdxA/g8qF7m9dUrUMrQ11NDUEIGkBQ6pr2RsgWfqMccKOlnljI5scwBuo3POdr5gWzc4Y9sTNAGQACASwWM0QUaAlSgJQgLCz5aQC+e1cZ97JMzkFr3QQCkCxHAHLFqVIaSs9agRKwWEwjgbyfJSrB1eD5mRWAoOQY2CwxF1YlIKLB9yERB6GzyHKqZQOvOLVSQSCQEoanXjCzAHM5wEBowDGw2n2OKgMAlILA/kGpMqBgAwIFQ8OfZnIT/Ei9ZHK5WmM7HfHYR5wIVCXAD2F2AVLp1yjFtLZAkYCkX8/DgXS3N8GTX694R1nNuxmKurREYzA8Cl4exsaZ//zhzbefr7mhweIozUGvjSt3H3QBeSr09RHH65u5YEFdelaamwKPsyPcmnjLO22BEENG5mhal8h/n/Qq//kyyOCXQfavbAXAIuDxbwUhCIWl50SShlqXhlq3khECM0C64v65SAGEYQgI5r2A3pPb6T25nVVxzf9ICilJvX+PkAIhBUu+Yck3XDu1878AfwcApBoNCf3KsWcAAAAASUVORK5CYII='

function hidethread(a) {
  
   if (hiddenthreads.toString().indexOf(a) === -1) {
     document.getElementById('unhidethread' + a).style.display = 'block';
     document.getElementById('thread' + a).style.display = 'none'; 
     hiddenthreads.push(a); 
     set_cookie('hiddenthreads', hiddenthreads.join('!'), 30);
   }
    
   return false;
}


function DeleteHidden() {


  if(isDeleted) {
    
    re = new RegExp(/thread/);
    b = document.getElementById('delform').childNodes;

    for (i=0; i<b.length;i++) {
  
       if (b[i].tagName == 'DIV') {
         match = re.exec(b[i].id);
         if(match != null && b[i].getAttribute('style') == 'display: none;') {
           b[i-2].setAttribute('style', 'display: block;');
           b[i+2].removeAttribute('style');
           b[i+4].removeAttribute('style');
         }
       }
    }

    isDeleted = 0;

    } else {
    
    re = new RegExp(/unhidethread/);
    b = document.getElementById('delform').childNodes;

    for (i=0; i<b.length;i++) {
  
       if (b[i].tagName == 'SPAN') {
         match = re.exec(b[i].id);
         if(match != null && b[i].getAttribute('style') == 'display: block;') {
           b[i].setAttribute('style', 'display: none;');
           b[i+4].setAttribute('style', 'display: none;');
           b[i+6].setAttribute('style', 'display: none;');
         }
       }
    }

  isDeleted = 1;
  }
}


function HideAll() {

  var thread;
  var match;
  var h = document.getElementsByClassName("hidethread");
  var Threads = document.getElementsByTagName("div");
  var re = new RegExp(/thread(.*)/);
  var c = getCookie('antyrak').split('!');


  for(i=0; i<Threads.length; i++) {

    match = re.exec(Threads[i].id);

    if (match != null && c.indexOf(match[1]) === -1) {
  
        hidethread(match[1]);
    }
  }

  DeleteHidden();

}

function markGood() {

 var c = getCookie('antyrak').split('!');


 if (cook != '') {
    if (c.indexOf(this.name) === -1) {

      this.getElementsByTagName("img")[0].setAttribute("src", flag_green);
      c.push(this.name);
      set_cookie("antyrak", c.join('!'), 30);

    } else {

      this.getElementsByTagName("img")[0].setAttribute("src", flag_greyed);
      c.splice(c.indexOf(this.name), 1);
      set_cookie("antyrak", c.join('!'), 30);

   }

  } else {
    this.getElementsByTagName("img")[0].setAttribute("src", flag_green);
    set_cookie("antyrak", this.name, 30);
  }

 return false;
}



// Button add
var dzie=document.getElementById('nav');
dzie.innerHTML+='<a href="#" onclick="return false" id="kraweznik"><li>Kraweznikuj/</li></a>';


// Mark button add
var b = document.getElementsByClassName("extrabtns");
var re = new RegExp(/thread(.*)/)
var match;
var threads = getCookie('antyrak').split('!');

for (i=0; i<b.length; i++) {
   match = re.exec(b[i].parentNode.id);
   if (match != null) {
     b[i].innerHTML+="<a href='#' onclick='return false' class='markgood' name='"+match[1]+"' title='Mark as good thread'><img src='"+flag_greyed+"' class='markgoodimg' border='0'></a>";
     if (threads.length != 0 && threads.indexOf(match[1]) !== -1) {
       b[i].getElementsByClassName("markgoodimg")[0].setAttribute("src", flag_green);
     } 
   }
}


DeleteHidden();
isDeleted = 0;


window.addEventListener("load", function(e) {

  var button = document.getElementById("kraweznik");
  button.addEventListener('click', HideAll, false);
  var g = document.getElementsByClassName("markgood");
  for (i=0; i<g.length; i++) {
    g[i].addEventListener('click', markGood, false);
  }

}, false);
 

