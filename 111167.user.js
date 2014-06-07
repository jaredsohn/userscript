// ==UserScript==
// @name           SaveMBlog
// @include        http://t.sina.com.cn/*
// @include        http://weibo.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==



function savemblog(i,mid){

  var li = $("#feed_list li")[i];

  var msg = $(li).find("p.sms").attr("mid",mid).text();
  alert(msg);

}



function addInfo(){

  var ul = document.getElementById("feed_list");

  var li = ul.getElementsByTagName("li");

  var length = li.length;

  for(var i=0; i<length; i++){

    var img = li[i].getElementsByTagName("img")[0];

    var uid = img.getAttribute("uid");

    var mid = $(li[i]).find("p.sms").attr("mid");

    var p = li[i].getElementsByTagName('div')[0].getElementsByTagName('p');

    if(p.length == 0){

      var unfo = document.createElement('p');

      var div = li[i].getElementsByTagName('div')[0];

      unfo.innerHTML = "<a href='javascript:savemblog(\""+i+"\",\""+mid+"\");'>收录</a>";

      unfo.setAttribute("style","text-align:center; margin-top:5px;");

      if(div.className == "head_pic"){

        div.appendChild(unfo);

      }

    }

  }

}


addInfo();


