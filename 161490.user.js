// ==UserScript==
// @name        Auto-reply for tieba
// @namespace   http://www.baidu.com
// @description make tieba use easily 
// @include     http://tieba.baidu.com/p/*
// @version     1
// ==/UserScript==


var objDiv = document.getElementsByTagName("div");

for(var i = 0; i < objDiv.length; i++) {
	if(objDiv[i].className === "new_tiezi_tip") {
		var current = objDiv[i];
		var newDiv = document.createElement("div");
		
	    newDiv.innerHTML = "\
			<div>\
				<select id = 'rpSet' style = 'width : 400px'>\
					<option>  专业挽尊  </option>\
					<option>  楼主好人  </option>\
					<option>  给楼主跪了  </option>\
					<option>  只要你知道去处，全宇宙都会为你让路！  </option>\
					<option>  catch one's heart and never be apart~  </option>\
				</select>\
				<b>次数</b>\
				<input id = 'rpText' type = 'text' style = 'width : 50px' >\
				<button id = 'rpBtn' > press it </button>\
			</div>\
			"
		current.insertBefore(newDiv, current.firstChild);
		}
	}
	
var the_rpBtn = document.getElementById("rpBtn");
the_rpBtn.addEventListener("click", rp_Pose);


function rp_Pose() {
	var the_rpSet = document.getElementById("rpSet");
	var test = the_rpSet.value;
	
    var the_Content = unsafeWindow.rich_postor._getData();
    the_Content.content = test;
	var count = parseInt(document.getElementById("rpText").value);
    for(var i = 0; i < count; i++) 
		unsafeWindow.PostHandler.post(unsafeWindow.rich_postor._option.url,the_Content,function(to_Post) {unsafeWindow.rich_postor.showAddResult(to_Post)},function(to_Post) {});  
}
	
	
	
	


	
	