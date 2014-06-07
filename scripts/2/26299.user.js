// ==UserScript==
// @name           login to tud
// @namespace      http://rokdd.de/eml
// @include        https://sws.zih.tu-dresden.de/wlan/login.html?switch_url=*
// @include        https://wlauth.net.tu-dresden.de/*
// ==/UserScript==


var duser = "<your number>@tu-dresden.de";
var dpwd = "<your key>";

GM_xmlhttpRequest({ method:"GET",url:"https://webauth.net.tu-dresden.de/login.html?"+ "buttonClicked=4&redirect_url=google.de&err_flag=0&info_flag=0&info_msg=0&username="+encodeURIComponent(duser)+"&password="+encodeURIComponent(dpwd)});

/*GM_xmlhttpRequest({ method:"GET",url:"https://webauth.net.tu-dresden.de/login.html?"+ "buttonClicked=4&redirect_url=google.de&err_flag=0&info_flag=0&info_msg=0&username="+encodeURIComponent(duser)+"&password="+encodeURIComponent(dpwd), onload: function(responseDetails) {
        alert('Request for Atom feed returned ' + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Feed data:\n' + responseDetails.responseText);
    }
});
  */
alert('you are logged in now!');