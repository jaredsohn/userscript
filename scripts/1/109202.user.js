// ==UserScript==
// @name memo in google+
// @author Tau Jiang
// @include https://plus.google.com/*
// @include http://plus.google.com/*
// @match https://plus.google.com/*
// @match http://plus.google.com/*
// ==/UserScript==
function addJquery(callback){
	var script = document.createElement("script");
		script.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"); //src
		script.addEventListener('load',function(){
			var script = document.createElement("script");
				script.textContent = "(" + callback.toString() +")();"//main
			document.body.appendChild(script); // create secondly
			//alert("1");
			},false);
	  document.body.appendChild(script);//create firstly
	  //alert("2");
}
 function main () { 
	(function() {
	
	$(".a-ia-Ff").live("mouseenter",function(){
	var verifyid ="gid_" + $(".a-ia-ba a").attr("o");
	var verifymeg = localStorage.getItem(verifyid);
	if(verifymeg){
		if(document.getElementById("beizhu"))
		{}
		else
		{$(".a-ia-ba").append(" <textarea style = 'height:\"8px\"' row = '1' onpropertychange=\"this.style.posHeight=this.scrollHeight\" id=\"beizhu\" value=\"\"></textarea>");
		$("#beizhu").attr("value",verifymeg)
		$("#beizhu").css(
				{
				
				"overflow-y": "hidden" ,
				"border-color":"initial",
				"border":"1px",
				"color":"red"
				});
		}}
	else{
		if(document.getElementById("beizhu"))
		{}
		else
		{
		$(".a-ia-ba").append(" <textarea style = 'height:\"8px\"' row = '1' onpropertychange=\"this.style.posHeight=this.scrollHeight\" id=\"beizhu\" value=\"Click to insert description\"></textarea>");
		$("#beizhu").live("click",
		function(){
			$("#beizhu").attr("value","")
			$("#beizhu").css(
				{
				
				"overflow-y":"hidden" ,
				"border-color":"initial",
				"border":"1px",
				"color":"red"
				});
		$(".a-ia-Ff").click(function(){
		var oid ="gid_" + $(".a-ia-ba a").attr("o");
		var appenname = $("#beizhu").attr("value");
		if(appenname !="")
		localStorage.setItem(oid,appenname);
		
		
		})
		}
	);
	}
	}
	}
	);
	})();
}	
addJquery(main);

