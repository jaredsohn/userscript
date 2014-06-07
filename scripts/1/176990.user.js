// ==UserScript==
// @name        voteforsina
// @namespace   voteforsina
// @description voteforsina
// @include     http://zj.sina.com.cn/zt/news/2013zuimeiqg/*
// @version     1
// @grant       none
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.addVote1 = function() {
	$.JSONP('http://act.city.sina.com.cn/interface/activity/json_add_vote.php', {
id : '93842',
t : 'jsonp'
}, function(json) {
if (json.error == 0){
//alert(json.errmsg);
$("h5")[0].innerHTML="success";
}else{
//alert(json.errmsg);
$("h5")[0].innerHTML=json.errmsg;
}
}); 
	}


window.setTimeout(function(){
      //  /interface/activity/json_add_vote.php?callback=jsonp3001377637632961&id=93842&t=jsonp
    addVote1();
 },5000);

window.setTimeout(function(){
//    alert(1);
	history.go(0);
},60000);