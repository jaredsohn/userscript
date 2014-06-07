// ==UserScript==
// @name          UrlMod
// @description	  Displays a small toolbar to directly access different parts of this site using the given URL. Press Ctrl+Shift+U to show the toolbar.
// @namespace     http://www.openjs.com/
// @include       http://*/*
// @include       https://*/*

//by Binny V A (http://www.openjs.com/)
//Versions : 1.00.B
// ==/UserScript==

///////////////////////////// UrlMod //////////////////////////////
function UrlModInit() {
	var url = document.location.href.toString();
	var domain = url.match(/^((https?\:\/\/)?[^\/\\]+)/i)[0] + "/"; //Get the domain name.
	var path = url.substring(domain.length); //Stuff after the domain name.
	var folders = path.split("\/");
	var command = folders[folders.length-1];
	var parts = command.split("?");
	var file = parts[0];
	var arguments = parts[1];
	folders = folders.slice(0,-1);
	
	var code = "<a href='"+domain+"'>"+domain+"</a>";
	var cur_path = "";
	for(var i=0;i<folders.length;i++) {
		cur_path = folders.slice(0,i+1).join("/");
		code += " / <a href='"+domain+cur_path+"/'>"+folders[i]+"</a>";
	}
	code += " / <a href='"+domain+cur_path+"/"+file+"'>"+file+"</a>";
	
	if(file) {
		code += " &sect; <a href='"+domain+cur_path+"/'>Up</a>";
	} else { //If the current url is a folder pointer use all folders above current
		code += " &sect; <a href='" + domain+folders.slice(0,folders.length-1).join('/') +"/'>Up</a>";
	}
	
	//Number Play - searches out number in the url and gives the user the option to increment/decrement them
	var numbers = url.match(/(\d+)/g);
	if(numbers) {
		var text= "";
		var pos = 0;
		var all_colors = new Array("#99FFCC","#CCFFFF","#FF9999","#FFFFCC","#33CC99","#99CC99","#0099CC") 
		for(var i=0;i<numbers.length;i++) {
			var num = numbers[i];
			var len = num.length;
			if(num) { //Only if the number is more than 0 - we don't need -1,-2 etc in the url.
				var look_in_url = url.slice(pos+len); //The part of the url that must be checked for the number
				var dont_look_in_url = url.slice(0,pos+1);//The part that must not be checked for the number
			
				//Find the number, and make it 1 more and 1 less and get the url.
				var new_url_plus = dont_look_in_url + look_in_url.replace(/\d+/,(Number(num)+1));
				var new_url_minus= dont_look_in_url + look_in_url.replace(/\d+/,(Number(num)-1));

				pos = url.indexOf(num);
				var color = all_colors[(i<7)?i:2]; //No list out of bounds for us
				text += " <span style='background-color:"+color+";'>"+url.slice(pos-5,pos);
				if((Number(num)-1) >= 0) text += " <a href='"+new_url_minus+"'>&laquo;</a> ";
				text += num +" <a href='"+new_url_plus+"'>&raquo;</a> " + url.slice(pos+len,pos+5) + "</span>";
			}
		}
		code += " &sect; " + text
	}
	code += "&nbsp; &sect; <a href=\"#\" onclick=\"document.getElementById('url-mod-display').style.display='none'\">Hide</a>";
	
	var ele = document.createElement("div");
	ele.setAttribute("id","url-mod-display");
	ele.innerHTML = code;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(ele);

	//Display Style
	ele.style.font=".7em tahoma,sans-serif";
	ele.style.background="#eee";
	ele.style.display="inline";
	ele.style.padding="5px 5px 5px 5px";
	ele.style.position="fixed";
	ele.style.left="0px";
	ele.style.top="0px";
}

//Turn on the UrlMod function when Ctrl+Shift+M key is pressed
function UrlModKeyDown(e) {
	if (e.shiftKey && e.ctrlKey) {
		if(e.keyCode == 85) {//77 - M key  : 85 - U key
			UrlModInit();

			//Prevent the key to be handled by the browser
			e.stopPropagation();
			e.preventDefault();
		}
	}
}
window.addEventListener("keydown", UrlModKeyDown, true);
//window.addEventListener("load", UrlModInit, true); //This should be fun.
