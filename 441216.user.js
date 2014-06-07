// ==UserScript==
// @name			Ask.fm Auto-Like 25 like/click by kReeDz
// @namespace       @Kvnshavargo
// @version			2.0
// @copyright		http://ask.fm/Kvnshavargo
// @description		Auto Like Ask.fm 25 likes 
// @author			(http://fb.com/kreedzro)
// @include		http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// @updateURL  http://userscripts.org/scripts/source/293612.user.js
// Ask.fm Auto-like by kReeDz
// Version 6.9
// Igraet @Kvnshavargo  
 // fb.com/dan.sterovsky
// ==/UserScript==
// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+95px";
	div.style.left = "+5.9px";
	div.style.backgroundColor = "#ffffff";
	div.style.padding = "2px";
	div.innerHTML = "<center> <a href='/Kvnshavargo' title='Cipri â™¥ '><img src=''  align='absmiddle' /></a>"

	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#FFFFFF";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<center> <a href='http://fb.com/kreedzro' title='Cipri â™¥ '><img src=''  align='absmiddle' /></a> "
	
	div3 = document.createElement("div");
	div3.style.position = "fixed";
	div3.style.top = "37px";
	div3.style.left = "-3px";
	div3.style.padding = "2px";
	div3.innerHTML = "<center> <a href='/Kvnshavargo' title='Cipri â™¥'><img src='http://static.tumblr.com/yu2orom/P2Vlyxtt7/j-566.png'  align='absmiddle' /></a> "
	
	body.appendChild(div);
	body.appendChild(div2);
	body.appendChild(div3);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center> <a href='http://fb.com/kreedzro' title=':D â™¥ '><img src='http://im33.gulfup.com/8XpXY.png'  align='absmiddle' /></a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='25 likes'> 25 likes &raquo;</a>"
		}
	}
	};
}

// ==============
// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFFFFF";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&nbsp;<a onclick='OtomatisLike()'><img src='http://im34.gulfup.com/ZMwRQ.png'  align='absmiddle' /></a>&nbsp;"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
		document.getElementsByClassName("submit-button-more")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}

var thisScriptVersion = GM_info.script.version;
//Date-Objects
var time = new Date();
//Firefox doesn't allow toString() with URLs
var isfirefox = false;
//Update-Check
var update_avaible = false;
    function showUpdate() {
    if (update_avaible==true) {
    if (document.getElementsByClassName("adremoverupdateinfo")[0]!=null) {
         document.getElementsByClassName("adremoverupdateinfo")[0].style.display="block";
        }
    if (document.getElementsByClassName("adremoverupdateinfo")[1]!=null) {
         document.getElementsByClassName("adremoverupdateinfo")[1].style.display="block";
        }
} else {
    if (document.getElementsByClassName("adremoverupdateinfo")[0]!=null) {
         document.getElementsByClassName("adremoverupdateinfo")[0].style.display="none";
        }
    if (document.getElementsByClassName("adremoverupdateinfo")[1]!=null) {
        document.getElementsByClassName("adremoverupdateinfo")[1].style.display="none";
        }
}
    }
document.undoPlaceholderRemoval = function(info1) {
    for (var o = 0;o<document.elements_array_optimized.length;o++) {
     document.elements_array_optimized[o].style.display="block"; 
        console.log("Undo placeholder removal: [class] "+ document.elements_array_optimized[o].className + " [id] "+ document.elements_array_optimized[o].getAttribute("id") + " [element] "+document.elements_array_optimized[o]);
    }
    document.getElementById("adremover_undo_link").innerHTML=info1;
    document.getElementById("adremover_undo_link").setAttribute("href","#");
};
function handleContent() {
   if (xmlHttpObject.readyState == 4) {
        var thisScriptVersion = GM_info.script.version;
        var currentVersion = parseFloat(xmlHttpObject.responseText.substr( xmlHttpObject.responseText.search(/@version/) + 12, 3));
	if (currentVersion > thisScriptVersion){
        update_avaible = true;
        showUpdate();
        GM_setValue("updateAvaible_AR","true");
    } else {
        update_avaible = false;
        GM_setValue("updateAvaible_AR","false");
    }
GM_setValue("lastUpdateDay_AR",t_time.getDay());    
}
}
function testForForbiddenKeywords(words) {
    var h_Regexp = new RegExp("ead|add|oad|pad|advanced|grad");
    if (words.search(h_Regexp)>-1) {
     return true;   
    } else {
     return false;   
    }
    
}
function getElementsByClassNames(pattern)