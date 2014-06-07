// ==UserScript==
// @name       Draft Saver
// @namespace  http://forum.projanmo.com/
// @version    0.5
// @description  Chrome/Firefox Draft Saver for Projanmo Forum
// @match      http://forum.projanmo.com/*
// @copyright  2012+, Zelal (zelalbd@gmail.com)
// @updateURL  https://userscripts.org/scripts/source/150736.user.js
// @downloadURL  https://userscripts.org/scripts/source/150736.user.js
// ==/UserScript==

var item_list_container = document.createElement("div");
item_list_container.id = "items_display_container";
item_list_container.style.position = "absolute";
item_list_container.style.width = "auto";
item_list_container.style.height = "auto";
item_list_container.style.display = "none";
item_list_container.style.backgroundColor = "white";
item_list_container.style.border = "2px solid grey";
item_list_container.style.zIndex = "999";
item_list_container.style.left = "25%";
item_list_container.style.top = "5%";
item_list_container.style.padding = "10px";
item_list_container.innerHTML = "<span style = 'float: right; color: blue; cursor: pointer' onclick = 'this.parentNode.style.display = \"none\"; this.parentNode.removeChild(document.getElementById(\"items_list\")); this.parentNode.removeChild(document.getElementById(\"draft_insert_button\")); this.parentNode.removeChild(document.getElementById(\"draft_delete_button\")); this.parentNode.removeChild(document.getElementById(\"draft_delete_all_button\"));'>বাতিল করুন</span><br />";
item_list_container.innerHTML += "<b>নিচের তালিকা থেকে খসড়া নির্বাচন করুন:<br /></b>";
var parent_div = document.getElementById("post-form") || document.getElementById("brd-qpost");

parent_div.style.position = "relative";
parent_div.appendChild(item_list_container);



var draft_area = document.getElementsByClassName("txt-input")[0];

var draft_saver_btn = document.createElement("input");
draft_saver_btn.type = "button";
draft_saver_btn.style.marginLeft = "15px";
draft_saver_btn.style.marginTop = "15px";
draft_saver_btn.value = "খসড়া সংরক্ষণ করুন";
//draft_saver_btn.onclick = new Function (function "save_draft()");
draft_saver_btn.onclick = function(){
    
	var topic_title = document.getElementsByTagName("title")[0].innerHTML;
	var draft_title_prompt = prompt("Save this draft as:", topic_title);
	if(draft_title_prompt != null)
	{
		var draft_title = "[প্রজন্ম ফোরাম]: " + draft_title_prompt;
		var draft_field = document.getElementById("fld3") || document.getElementById("fld1");
		var draft_value = draft_field.value;
		localStorage.setItem(draft_title, draft_value);
	}
    
    
}
draft_area.appendChild(draft_saver_btn);

var draft_retriever_btn = document.createElement("input");
draft_retriever_btn.type = "button";
draft_retriever_btn.style.marginLeft = "10px";
draft_retriever_btn.value = "সংরক্ষিত খসড়াসমূহ";
//draft_retriever_btn.onclick = new Function (function "retrieve_drafts()");
draft_retriever_btn.onclick = function(){
    
    	var item_list_container = document.getElementById("items_display_container");
	item_list_container.style.display = "block";

	var item_list = document.createElement("select");
	item_list.id = "items_list";
	item_list.size = "10";
	item_list.style.display = "block";
	item_list.style.marginBottom = "10px";
	document.getElementById("items_display_container").appendChild(item_list);

	for(i = 0, ls_length = localStorage.length; i < ls_length; i++)
	{
		var item_title = localStorage.key(i);
		var item_value = localStorage[item_title];

		var individual_item = document.createElement("option");
		individual_item.text = item_title;
		individual_item.value = item_title;
		if(item_title.indexOf("[প্রজন্ম ফোরাম]: ") == 0)
		{
			document.getElementById("items_list").options.add(individual_item);
		}
	}


	var insert_btn = document.createElement("input");
	insert_btn.type = "button";
	insert_btn.style.fontWeight = "bold";
	insert_btn.id = "draft_insert_button";
	insert_btn.value = "নির্বাচিত খসড়াটির কপি নিন";
	document.getElementById("items_display_container").appendChild(insert_btn);

	insert_btn.onclick = function() { var selected_key = document.getElementById("items_list").options[document.getElementById("items_list").options.selectedIndex].value; var insertable_item = localStorage.getItem(selected_key); var text_field = document.getElementById("fld3") || document.getElementById("fld1"); text_field.value = insertable_item; document.getElementById("items_display_container").style.display = "none"; document.getElementById("items_display_container").removeChild(document.getElementById("items_list")); document.getElementById("items_display_container").removeChild(document.getElementById("draft_insert_button")); document.getElementById("items_display_container").removeChild(document.getElementById("draft_delete_button")); document.getElementById("items_display_container").removeChild(document.getElementById("draft_delete_all_button")); };

	var delete_btn = document.createElement("input");
	delete_btn.type = "button";
	delete_btn.style.marginLeft = "10px";
	delete_btn.id = "draft_delete_button";
	delete_btn.value = "নির্বাচিত খসড়াটি মুছে ফেলুন";
	document.getElementById("items_display_container").appendChild(delete_btn);


	delete_btn.onclick = function() { var selected_key = document.getElementById("items_list").options[document.getElementById("items_list").options.selectedIndex].value; var current_index = document.getElementById("items_list").selectedIndex; localStorage.removeItem(selected_key); document.getElementById("items_list").remove(document.getElementById("items_list").selectedIndex); document.getElementById("items_list").selectedIndex =  current_index;};

	var delete_all_btn = document.createElement("input");
	delete_all_btn.type = "button";
	delete_all_btn.style.marginLeft = "10px";
	delete_all_btn.style.color = "red";
	delete_all_btn.id = "draft_delete_all_button";
	delete_all_btn.value = "সকল খসড়া মুছে ফেলুন";
	document.getElementById("items_display_container").appendChild(delete_all_btn);
    

	delete_all_btn.onclick = function() {

		for (j=0, ls_length = localStorage.length; j < ls_length; j++)
		{
			var local_item_title = localStorage.key(j);
			if(local_item_title.indexOf("[প্রজন্ম ফোরাম]: ") == 0)
			{
				localStorage.removeItem(local_item_title);
			}
			document.getElementById("items_list").options.length = 0;
		}

	};
    
}
draft_area.appendChild(draft_retriever_btn);


var draft_box_reset_btn = document.createElement("input");
draft_box_reset_btn.type = "button";
draft_box_reset_btn.style.marginLeft = "15px";
draft_box_reset_btn.value = "নতুন করে শুরু করুন";
draft_box_reset_btn.onclick = function(){
    
	if(document.getElementById("fld1")) document.getElementById("fld1").value = "";
	if(document.getElementById("fld3")) document.getElementById("fld3").value = "";
}
draft_area.appendChild(draft_box_reset_btn);
