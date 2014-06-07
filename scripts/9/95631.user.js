// ==UserScript==
// @name			android market
// @namespace		ben-or.net
// @include			http://market.android.com/publish/Home#COMMENTS?pkg=*
// @include			http://market.android.com/publish/Home?pli=*#ViewCommentPlace:p=*
// @include			http://market.android.com/publish/Home#ViewCommentPlace:p=*
// ==/UserScript==
//alert("start");
//setTimeout("alert('time out this='+this);",100);
window.addEventListener ("load", work, false);
function work(){
	try{
//alert("started");
		var list=document.getElementsByClassName("GOM05DHNL")[1].getElementsByTagName("tr");
		var sum=0;
		var count=0;
		for(var i=0;i<5;++i){
			//alert((5-i)+")"+list[i].getElementsByTagName("td")[2].innerHTML);
			sum+=parseInt(5-i)*parseInt(list[i].getElementsByTagName("td")[2].innerHTML)
			count+=parseInt(list[i].getElementsByTagName("td")[2].innerHTML);
		}
		list=document.getElementsByClassName("GOM05DHNL")[1].getElementsByTagName("tbody")[0];
		list.innerHTML+='<tr><td style="">'+(sum/count)+'</td><td><div class="GFW0W1RBDM"><div class="GFW0W1RBCM" style="width: '+(sum/count*20)+'%;"> </div></div></td><td>'+count+'</td></tr>'
	}catch(err){
		setTimeout(work,100);
//		alert(err);
	}
}