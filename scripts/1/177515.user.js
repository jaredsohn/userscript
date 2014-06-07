// ==UserScript==
// @id             TabunBS
// @name           TabunBigSister
// @version        1.1
// @namespace      
// @author         Zayka
// @description    
// @include        http://tabun.everypony.ru/*
// @run-at         document-end
// @require		   http://code.jquery.com/jquery-1.10.2.min.js
// @updateURL	   http://userscripts.org/scripts/source/177515.user.js
// ==/UserScript==
function MyLittleCallback(msg)
{
	names = $("<div>", { class: "names"});
	for (var i = 0;i<msg.length;i++)
	{
		color = "grey";
		if (msg[i].event.result>0) color = "green"
		else if (msg[i].event.result<0) color = "red" 
		var name = $("<font>",{color:color});
		//console.log(name);
		name.append("<b>"+msg[i].event.autor+"</b> ");		
		names.append(name);
	}
	$("header").find(".topic-info").append(names);
}
pattern = /http[\w\W\s\S]+?([\d]+)[\.]/g;
var topicN=pattern.exec(document.URL);
$.ajax({
	type:"POST",
	dataType: "json",
	data:"id="+topicN[1],
	url:"http://zaelza.tk/events/", //
	success: function (msg){MyLittleCallback(msg)},
	error: function (jqXHR, textStatus, errorThrown ) 
	{
		console.log("jqXHR:"+jqXHR);
		console.log("textStatus:"+textStatus);
		console.log("errorThrown:"+errorThrown);
	}
});