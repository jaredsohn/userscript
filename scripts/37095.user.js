// ==UserScript==
// @name           parking
// @namespace      kaixin
// @include        http://www.kaixin001.com/app/app.php?aid=1040*
// ==/UserScript==
var vacancy_list=new Array()
var full_list=new Array()
var half_full_list=new Array()

var color_list=["white","silver","black","red","blue","yellow"]

var containers=document.evaluate(
    "//div[@class='hytc_area']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var container=containers.snapshotItem(0)

var uls=container.getElementsByTagName("ul");

for(j=0;j<uls.length;j++){
	ul=uls[j]
	li4=ul.getElementsByTagName("li")[3]
	re=/http:\/\/img.kaixin001.com.cn\/i2\/park\/(.*).gif/
	temp=li4.innerHTML.match(re)
	if(temp){
		    status=temp[1]
			if(status=='man'){
			     full_list.push(ul)
			}else if (status=='half_full'){
				half_full_list.push(ul)
			}
	}
	else{
		vacancy_list.push(ul)
	}
}

for(j=0;j<uls.length;j++){
	ul=uls[j]
	container.removeChild(ul)
}

while(vacancy_list.length>0){
	container.appendChild(vacancy_list.pop())
}

while(half_full_list.length>0){
	friend=half_full_list.pop()
	my_li=document.createElement("li");
	my_li.setAttribute("style","width:30px")
	
	re=/gotouser\((\d*)\)/
	temp=friend.firstChild.innerHTML.match(re)
	user_id=temp[1]
	
	color_div=document.createElement("div");
	color_div.setAttribute("user_id",user_id)
	color_index=GM_getValue(user_id,0)
	color_div.setAttribute("color_index",color_index)
	color_div.setAttribute("style","cursor:pointer;width:15px;height:15px;background-color:"+color_list[color_index%color_list.length]+";valign:bottom;border:1px dotted gray")
	color_div.wrappedJSObject.onclick=function(evt){
		target_obj=evt.target
		color_index=new Number(target_obj.getAttribute("color_index"))
		color_index=color_index+1
		evt.target.setAttribute("style","cursor:pointer;width:15px;height:15px;background-color:"+color_list[color_index%color_list.length]+";valign:bottom;border:1px dotted gray")
		target_obj.setAttribute("color_index",color_index)
		GM_setValue(target_obj.getAttribute("user_id"),color_index)
	}
	my_li.appendChild(color_div)
	
	friend.firstChild.setAttribute("style","width:45px")
	li1=friend.childNodes[1]
	li1.parentNode.insertBefore(my_li,li1)
	container.appendChild(friend)
}

while(full_list.length>0){
	container.appendChild(full_list.pop())
}

container.firstChid.focus()
