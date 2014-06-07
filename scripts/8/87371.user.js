// ==UserScript==
// @name           Shopping cart to BBcode
// @namespace      http://userscripts.org/scripts/show/
// @description    Converts the newegg, ebuyser, tigerdirect shopping cart to a bbcode table ready to be pasted across various boards
// @date           2010-10-01
// @creator        mkey
// @include        http://secure.newegg.com/Shopping/ShoppingCart.aspx?Submit=view
// @include        http://orders.ebuyer.com/customer/shopping/index.html?action=*
// @include        http://www.tigerdirect.com/cgi-bin/ShoppingCart.asp*
// ==/UserScript==

	var d=document, byId=d.getElementById, create=d.createElement, byTag=d.getElementsByTagName;
	
(function (){
	if (d.URL.indexOf("egg")>0) NewEgg();
	else if (d.URL.indexOf("buy")>0) Ebuyer();
	else TigerDirect();
})()

function NewEgg(){
	var item= document.getElementsByClassName("cartDescription"),
	price= document.getElementsByClassName("cartPrice"),
	pcs= document.getElementsByClassName("cartQty"),
	t, t1, t2,
	text= "[tableb][tr][th]-[/th][th]Item[/th][th]Pcs[/th][th][align=right]Price[/align][/th][/tr]";
	// var text= "[tableb]";
	
	for (var i=1; i<item.length; i++){
		t= item[i].getElementsByTagName("a");
		if (t[0].textContent.trim()=='') t= t[1];
		else t= t[0];
		
		t1= price[i].getElementsByTagName("dd");
		if (t1.length==1) t1= t1[0].textContent;
		else if (t1.length==2 && price[i].getElementsByClassName("cartOrig").length>0) t1= t1[1].textContent;
		else if (t1.length==2 && price[i].getElementsByClassName("cartUnit").length>0) t1= t1[0].textContent;
		else t1= "ERROR";
		t1= t1.trim();
		if (t1=="") t1=0;
		
		t2= pcs[i].getElementsByTagName("input");
		if (t2.length==0) t2=pcs[i].textContent.trim();
		else t2= t2[0].value;
		
		text+= "[tr][td][center]"+i+"[/center][/td][td][url="+t.href+"]"+t.textContent.trim()+"[/url][/td][td][center]"+t2+"[/center][/td][td][align=right]"+t1+"[/align][/td][/tr]";
	}
	t= document.getElementsByClassName("cartSubtotal cartHeader");
	if (!t.length) return;
	t= t[0].getElementsByTagName("td");
	text+= "[tr][td][center]-[/center][/td][td][size=3][b][align=right]Subtotal[/align][/b][/size][/td][td][center]-[/center][/td][td][size=3][b]"+t[1].textContent.trim()+"[/b][/size][/td][/tr][/tableb]";
	document.getElementsByClassName("space")[0].innerHTML= "<td align=\"center\" colspan=\"5\" ><span>BBcode for your build</span><br/><br/><textarea cols=\"160\" rows=\"8\" style=\"font-size:12px;\" onclick=\"this.select();\" >"+text+"</textarea></td>";
}

function Ebuyer(){
	var t= byId("shopping_cart");
	if (!t) return;
	var a= t.getElementsByClassName("shortdesc");
	var inp= t.getElementsByTagName("input");
	var inc= t.getElementsByClassName("inc");
	var i=0;
	var text= "[tableb][tr][th]-[/th][th]Item[/th][th]Pcs[/th][th][align=right]Price[/align][/th][/tr]";
	
	for (i=0; i<a.length; i++) text+= "[tr][td][center]"+(i+1)+"[/center][/td][td][url="+a[i].href+"]"+a[i].textContent.trim()+"[/url][/td][td][center]"+inp[i].value+"[/center][/td][td][align=right]"+inc[i*3+2].textContent.trim()+"[/align][/td][/tr]";
	
	text+= "[tr][td][center]-[/center][/td][td][size=3][b][align=right]Subtotal[/align][/b][/size][/td][td][center]-[/center][/td][td][size=3][b]"+inc[i*3+1].textContent.trim()+"[/b][/size][/td][/tr][/tableb]";
	
	var div= create("div"); div.align= "center";
	t.appendChild(div);
	div.innerHTML= "<span>BBcode for your build</span><br/><br/><textarea cols=\"120\" rows=\"8\" style=\"font-size:12px;\" onclick=\"this.select();\" >"+text+"</textarea>";
}

function TigerDirect(){
	var t= document.getElementsByClassName("maintbl")[0];
	var t1= t.getElementsByClassName("cartfont");
	var a, inp, div;
	var text= "[tableb][tr][th]-[/th][th]Item[/th][th]Pcs[/th][th][align=right]Price[/align][/th][/tr]";
	
	for (var i=5; i<t1.length-4; i+=3){
		a= t1[i].getElementsByTagName("a");
		inp= t1[i].getElementsByTagName("input");
		div= t1[i].getElementsByTagName("div");
		div= div[div.length-1].textContent.trim().split("$");
		
		text+= "[tr][td][center]"+((i-5)/3+1)+"[/center][/td][td][url="+a[1].href+"]"+a[1].textContent.trim()+"[/url][/td][td][center]"+inp[inp.length-1].value+"[/center][/td][td][align=right]$"+div[div.length-1]+"[/align][/td][/tr]";
	}
	
	text+= "[tr][td][center]-[/center][/td][td][size=3][b][align=right]Subtotal[/align][/b][/size][/td][td][center]-[/center][/td][td][size=3][b]"+t.getElementsByClassName("price")[0].value+"[/b][/size][/td][/tr][/tableb]";
	
	div= t1[t1.length-1].parentNode.parentNode.getElementsByTagName("td");
	div= div[div.length-1];
	div.align= "center";
	div.innerHTML=  "<br/><span style=\"font-size:12px;\" >BBcode for your build</span><br/><br/><textarea cols=\"100\" rows=\"8\" style=\"font-size:12px;\" onclick=\"this.select();\" >"+text+"</textarea>";
}