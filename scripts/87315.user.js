// ==UserScript==
// @name           Facebook Name Fixer
// @namespace      sg_06
// @include        *.facebook.com*
// @description    Changes your face in facebook chat to your name! Also works on your conversation partner! ("David" by default.)
// ==/UserScript==
n="David";
fix_side_bar_too = 1;
function m(){
	try{
	if(document.getElementsByTagName("body")[0].getAttribute("class").slice(0,12)=="fbChatPopout"){
		/*popout chat first*/
		a=document.getElementsByTagName("body")[0].getElementsByTagName("a");
		for(q in a){
			if(a[q].getAttribute("class")=="profileLink"){
				if(a[q].innerHTML.indexOf("<img ")!=-1){
					repvar = a[q].getElementsByTagName("img")[0].getAttribute("title").split(" ")[0];
					if(repvar=="You"){repvar = n;}
					a[q].innerHTML="<b>"+repvar+"</b>:&nbsp;";
				}
			}
		}
	} else{
		/*not popout? then apply to regular chat:*/
		a=document.getElementById("fbDockChatTabSlider").getElementsByTagName("a");
		for(q in a){
			if(a[q].getAttribute("class")=="profileLink"){
				if(a[q].innerHTML.indexOf("<img ")!=-1){
					repvar = a[q].getElementsByTagName("img")[0].getAttribute("title").split(" ")[0];
					if(repvar=="You"){repvar = n;}
					a[q].innerHTML="<b>"+repvar+"</b>:&nbsp;";
				}
			}
		}
	}
	}catch(e){
		/*no errors here!, nope.*/
	}
}
setInterval(m,200);



/*also, let's fix the sidebar on the front page:*/
function fixplist(){
	try{
	lilist = document.getElementById("chatFriendsOnline").getElementsByTagName("li");
	for(qq in lilist){
		thea = lilist[qq].getElementsByTagName("a")[0];
		if(thea.getAttribute("href")=="#"){
			thea.href="##";
			name = thea.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML;
			thea.innerHTML+="&nbsp;&nbsp;"+name+"&nbsp;&nbsp;<br>";
			lilist[qq].style.float="none";
			thea.removeChild(thea.getElementsByTagName("span")[0]);
		}
	}
	}catch(e){
		/*no errors here!, nope.*/
	}
}
if(fix_side_bar_too){setInterval(fixplist,200);}