// ==UserScript==
// @name           Dynamic Post Threshold
// @author         Stasik0
// @namespace      Nothing
// @description    
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// ==/UserScript==

function check_cookie(){
	if(document.cookie.indexOf('d3.userscrpit.threshold=')>0){
		var dup_temp = document.cookie.split('d3.userscrpit.threshold=');
		dup_temp = dup_temp[1].split(";");
		return dup_temp[0];
	}
	else return "neg";
}

function set_cookie(param){
	document.cookie = "d3.userscrpit.threshold="+escape(param)+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
}

function isNumeric(input)
{
	return (input - 0) == input && input.length > 0;
}
		 
function changed(){
	var v = field.value;
	if(v == "all" || v == "gaz" || isNumeric(v)){
		set_cookie(field.value);
		if(v >= 250){
			selector.value=250;
		}else if(v >= 100){
			selector.value=100;
		}else if(v >= 25){
			selector.value=25;
		}else if(v >= 0){
			selector.value=25;
		}else if(v >= -25){
			selector.value = -25;
		}else if(v >= -100){
			selector.value = -100;
		}else if(v == "all"){
			selector.value = "all";
		}else if(v == "gaz"){
			selector.value = "canceled";
		}
		form.submit();
	}
}
	
form = document.getElementById('posts-threshold');
	if(form != null){
	var field = document.createElement('input');
	field.setAttribute('size', '4');

	var l1 = document.createElement('span');
	l1.innerHTML = "Вы смотрите от ";

	var l2 = document.createElement('span');
	l2.innerHTML = " и выше";

	form.parentNode.insertBefore(field,form);
	form.parentNode.insertBefore(l1,field);
	form.parentNode.insertBefore(l2,field.nextSibling);
	var rss = form.children[1];
	rss.style.marginLeft = "15px";
	form.parentNode.insertBefore(form.children[1],l2.nextSibling);

	var selector = document.getElementById('post_status');
	selector.style.display = 'none';
	form.style.display = 'none';

	//init cookie
	if(check_cookie()=="neg")set_cookie(selector.value);

	//read value
	var value = check_cookie();
	field.value = value;

	function press(e) {
    if (e.keyCode == 13) {
        changed();
        return false;
    }
	}

	//onchange handler
	field.addEventListener("change", changed, false); 
	field.addEventListener('keypress', press, false); 

	//now filter posts on fly
	var posts = document.getElementsByClassName("post", "div");
	if(isNumeric(field.value)){
		for(var i=0;i<posts.length;i++){
			rating = posts[i].getElementsByClassName("rating", "span")
			rating = rating[0].innerHTML;
			rating = rating.replace(/<\/em>/i,'');	
			rating = rating.replace(/<em(.*)>/i,'');	
			if(parseInt(rating)<parseInt(field.value)){
				posts[i].style.display="none";
			}
		}
	}
}

