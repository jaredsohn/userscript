// ==UserScript==
// @name           GLB Forum Quote Collapse
// @namespace      pbr/collapse
// @description    Collapse Quoted Messages In GLB Forum Posts
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.09.12
// ==/UserScript==

var depth = 2;

window.setTimeout(
    function() {
	main();
    }
,100);

function main() {
    var posts = document.getElementsByClassName("post_content_inner");
    for (var i=0; i<posts.length; i++) {
    	var count = doRecursion(posts[i], 0) - 1;
//    	console.log(i+" : "+count);
    }

    var posts = document.getElementsByClassName("post_content_inner");
    while (depth > 0) {
//		console.log("pass # : "+depth+" -- post length = "+posts.length);
	var quotes = new Array();
	for (var i=0; i<posts.length; i++) {
	    var collapse = getChildrenByClassName("collapse",posts[i]);
	    for (var j=0; j<collapse.length; j++) {
		var evt = document.createEvent("MouseEvent");
		evt.initMouseEvent("click",true,true,window,-1,-1,-1,-1,-1,false,false,false,false,0,null);
		quotes.push(collapse[j].nextSibling);
		collapse[j].dispatchEvent(evt);
	    }
	}
//		console.log(depth+" | quotes.length = "+quotes.length);
	posts = quotes;
	depth--;
    }
	    
    var buttons = document.getElementsByClassName("buttonSmall");
    for (var i=0; i<buttons.length; i++) {
	if (buttons[i].innerHTML == "<span>Quote</span>") {
	    var code = buttons[i].getAttribute("onclick");
	    code = code.split("'")[1];	   
	    buttons[i].setAttribute("id","quote_"+code);
	    buttons[i].setAttribute("onclick","");
//	    console.log("added for : "+code);
	    buttons[i].addEventListener("click", 
					function(e) { 
					    quoteButton(e); 
					}, false);
	}
    }
}

function doRecursion(post, num) {
    var str = "doRecursion : ";
    for (var i=0; i<num; i++) {
	str += "\t";
    }
	
    var children = getChildrenByClassName("quote", post);
    var count = new Array(children.length);
    for (var i=0; i<children.length; i++) {
//      console.log(str+num+" -- "+children[i].innerHTML.slice(0,40));
	count[i] = doRecursion(children[i], num+1);
	hideElement(children[i], count[i]);
    }	
    var sum = 1;
    for (var i=0; i<count.length; i++) {
	sum += count[i];
    }
    return sum;
}

function hideElement(el, len) {
    if (el == null) { 
	return; 
    }
    el.setAttribute("style","display: none;"); 
        
    var hspan = document.createElement("span");
    hspan.setAttribute("class","collapse");
    hspan.setAttribute("style","color: #A03C19; text-decoration: underline;");
    hspan.innerHTML = "-- "+len+" message";
    if (len > 1) {
	hspan.innerHTML += "s --";
    }
    else {
	hspan.innerHTML += " --";
    }
    	
    el.parentNode.insertBefore(hspan, el);
    hspan.addEventListener('click', function(e) { showElement(e); }, false);
}

function showElement(e) {
    var pressed = e.target;
    var parent = e.target.parentNode;
    var unquoted = e.target.nextSibling;
	
    unquoted.setAttribute("style",""); 
    parent.removeChild(pressed);
}

function quoteButton(evt) {
    var code = evt.target.parentNode.getAttribute("id").split("_")[1];
    var post = document.getElementById(code).parentNode;
//    console.log("1 : "+post.innerHTML);

    if (post.getElementsByClassName("collapse").length == 0) {
//	console.log("no collapse's found");
	while (post.innerHTML.indexOf(' style=""') != -1) {
	    post.innerHTML = post.innerHTML.replace(' style=""','');
	}
	unsafeWindow.reply(code);
	return;
    }

    while (post.getElementsByClassName("collapse").length > 0) {
	var el = post.getElementsByClassName("collapse")[0];
	el.parentNode.removeChild(el);
    }
//    console.log("2 : "+post.innerHTML);
    var q = post.getElementsByClassName("quote");
    for (i=0; i<q.length; i++) {
	q[i].style.display = "";
    }
    while (post.innerHTML.indexOf(' style=""') != -1) {
	post.innerHTML = post.innerHTML.replace(' style=""','');
    }
//    console.log("3 : "+post.innerHTML);
    var saved = post.innerHTML;
    
    unsafeWindow.reply(code);        
    
    post.innerHTML = saved;
    doRecursion(post, 0);
}

function getChildrenByClassName(classname, el) {
    var output = [];
    if (el != null) {
	if (el.childNodes == null) { console.log("is null"); return; }
	for (var i=0; i<el.childNodes.length; i++) {
//	    console.log(el.childNodes[i].tagName+" : "+el.childNodes[i].className);
	    var cls = null;
	    try {
		cls = el.childNodes[i].getAttribute("class");
	    }
	    catch (e) { }
	    if (cls != null) {
		if (cls.indexOf(classname) != -1) {
		    output.push(el.childNodes[i]);
//     		    console.log("+");
		}
	    }
	}
    }
    return output;
}

