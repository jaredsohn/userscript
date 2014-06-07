// ==UserScript==
// @name                Youtube HTTPS iframe
// @namespace	        http://developerarea.blogspot.com
// @description	        Https connection for Youtube Iframe videos
// @version             1.6
// @include		        http://*
// ==/UserScript==

changeToHttpsbyTagname('iframe', 'src');

changeToHttpsbyTagname('object', 'data');

changeToHttpsbyName("movie");

changeToHttpsbyTagname("embed", "src");  

changeToHttpsbyTagname("a", "href");  

function changeToHttpsbyName(name){
    var array = document.getElementsByName(name);
    for(i=0; i < array.length; i++){
       var data = array[i].getAttribute("value");
       if(data != null && data != "null"){
          if(data.search("youtube") != -1){
              data = data.replace("http", "https");
              data = data.replace("httpss", "https");
              array[i].value = data;
              array[i].setAttribute("value", data);
              console.log('Youtube link : ' + data);
          }
       }
    }
}

function changeToHttpsbyTagname(name, val){
    var array = document.getElementsByTagName(name);
    for(i=0; i < array.length; i++){
       var data = array[i].getAttribute(val);
       if(data != null && data != "null"){
          if(data.search("youtube") != -1){
              data = data.replace("http", "https");
              data = data.replace("httpss", "https");
              array[i].setAttribute(val, data);
              console.log('Youtube link : ' + data);
          }
       }
    }
}