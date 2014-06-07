// ==UserScript==
// @name           Newegg to BBcode
// @namespace      http://userscripts.org/scripts/show/87115
// @description    Converts the newegg shopping cart to a bbcode table ready to be pasted across various boards
// @date           2010-10-01
// @creator        mkey
// @include        http://secure.newegg.com/Shopping/ShoppingCart.aspx?Submit=view
// ==/UserScript==

	var d=document, byId=d.getElementById, create=d.createElement, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName;
	
(function (){
	var item= byClass("cartDescription");
	var price= byClass("cartPrice");
	var pcs= byClass("cartQty");
	var t, t1, t2;
	var text= "[tableb][tr][th]-[/th][th]Item[/th][th]Pcs[/th][th][align=right]Price[/align][/th][/tr]";
	// var text= "[tableb]";
	for (var i=1; i<item.length; i++){
		t= item[i].getElementsByTagName("a");
		t1= price[i].getElementsByTagName("dd");
		t2= pcs[i].getElementsByTagName("input");
		if (t2.length==0) t2=pcs[i].textContent.trim();
		else t2= t2[0].value;
		
		if (t1.length==1) t1= t1[0].textContent;
		else if (t1.length==2 && price[i].getElementsByClassName("cartOrig").length>0) t1= t1[1].textContent;
		else if (t1.length==2 && price[i].getElementsByClassName("cartUnit").length>0) t1= t1[0].textContent;
		else t1= "ERROR";
		
		text+= "[tr][td][center]"+i+"[/center][/td][td][url="+t[0].href+"]"+t[0].textContent.trim()+"[/url][/td][td][center]"+t2+"[/center][/td][td][align=right]"+t1.trim()+"[/align][/td][/tr]";
	}
	t= byClass("cartSubtotal cartHeader");
	if (!t.length) return;
	t= t[0].getElementsByTagName("td");
	text+= "[tr][td][center]-[/center][/td][td][size=3][b][align=right]Subtotal[/align][/b][/size][/td][td][center]-[/center][/td][td][size=3][b]"+t[1].textContent.trim()+"[/b][/size][/td][/tr][/tableb]";
	byClass("space")[0].innerHTML= "<td align=\"center\" colspan=\"5\" ><textarea cols=\"160\" rows=\"8\" style=\"font-size:12px;\" onclick=\"this.select();\" >"+text+"</textarea></td>";
})()

