// ==UserScript==
// @name       Deal Dispute on Postbit
// @namespace  http://codeinstitution.net/DealDisputePostbit
// @version    1.1
// @description  Deal Disputes will be shown on postbit
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     *hackforums.net/*
// @copyright  2014+, Saad T (King of Hearts)
// ==/UserScript==

URL = window.location.href;
if(URL.indexOf("hackforums.net/showthread.php") > -1){    
    var x = document.querySelectorAll('.navigation > a');
    if(x[1].innerHTML == "Marketplace"){
        injectjs();
      posts = $("#posts").find("td[class='post_author']");
      authorInfo = $("#posts").find("td[class='smalltext post_author_info']");
        var l = posts.length;
        for(var i = 0; i < l; i++){
            username = $(posts[i]).find(".largetext");
          var res = username[0].innerHTML.match(/<a href="(.*)"><span (.*)="(.*)">(.*)<\/span>/);
            usernameN = res[4];
            authorInfo[i].innerHTML += '<br /><div id="dealdispute'+i+'"><a href="javascript:void(0)" onclick="document.getElementById(\'dealdispute'+i+'\').innerHTML = getScams(\''+usernameN+'\');">Check for Deal Disputes</a>';//getScams(usernameN);
        	
        }
    }
}else if(URL.indexOf("hackforums.net/disputedb.php?user=") > -1){
  var user = URL.split("?user=")[1];
  document.body.outerHTML = /<body.*?>([\s\S]*)<\/body>/.exec(getScams(user))[1];
    
}

function getScams(user){
    var data = null;
    $.ajax({
          type: "POST",
        async: false,
          url: "disputedb.php",
          data: {
            username:decodeURI(user),
              action: "do_search",
              submit: "search",
              my_post_key:document.documentElement.innerHTML.split('my_post_key = "')[1].split('";')[0]
          }}
          ).done(function( dataR ) {
            data = dataR;
          });
  return data;
}
function injectjs() {
    $('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" />"<script type="text/javascript">'+ 'function getScams(user){ var data = null;    $.ajax({          type: "POST",        async: false,          url: "disputedb.php",          data: {            username:user,              action: "do_search",              submit: "search",              my_post_key:document.documentElement.innerHTML.split("my_post_key = \\"")[1].split("\\";")[0]          }}).done(function(dataR) {            data = dataR;          }); if(data.indexOf("No Results") > -1){return "Deal Disputes: <span style=\\"color:green\\">None</span>";}else{tds = $(data).find(\'table:eq(1)\').find(\'td\');var count = 0;        for(var i = 5; i < tds.length; i+=5){            if($(tds).eq(i + 5).text() == "Open" &&$(tds).eq(i + 3).text() == user){                count++;            }        }if(count == 0){return "Deal Disputes: <span style=\\"color:green\\">None</span>";}else {return "Deal Disputes: <span style=\\"color:red\\"><a href=\\"/disputedb.php?user="+user+"\\">"+count + "</a></span>";}}}' +'</script>').appendTo($('head')); 
}