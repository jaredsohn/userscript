// ==UserScript==
// @name           Newegg Shopping Cart BBcode for LTT Forums
// @namespace      http://userscripts.org/scripts/show/
// @description    Converts Newegg shopping cart to BBcode used by LinusTechTips.com Forums
// @date           May 26, 2013
// @creator        Glenwing
// @include        http://secure.newegg.com/Shopping/ShoppingCart.aspx?Submit=view
// ==/UserScript==

	var d=document, byId=d.getElementById, create=d.createElement, byTag=d.getElementsByTagName;
	
(function (){
	if (d.URL.indexOf("egg")>0) Newegg();
})()

function Newegg(){
	var item= document.getElementsByClassName("cartDescription"),
	price= document.getElementsByClassName("cartPrice"),
	pcs= document.getElementsByClassName("cartQty"),
	promo, promocode, t, t1, t2,
	text= "[left][b]Item" + "\t" + "Qty." + "\t" + "Price[/b]";
	
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
		
		text+= "\n" + "[b]" + i + "." + "\t" + "(x" + t2 + ")" + "\t" + "(" + t1 + ")[/b]" + "\t" + t.textContent.trim() + " — " + "([url=" + t.href + "]Newegg[/url])" + "\n";
	}
	promocode= document.getElementsByClassName("cartItem");
	if (!promocode.length) return;
	promocode= promocode[0].getElementsByTagName("td");
	text+= "----------------------------------------" + "\n" + "Discount from promo code [b]" + promocode[1].textContent.trim(" Discount From Promo Code") + "[/b]:" + " [b]";
	
	promo= document.getElementsByClassName("cartItem");
	if (!promo.length) return;
	promo= promo[0].getElementsByTagName("td");
	text+= promo[1].textContent.trim() + "[/b]" + "\n";

	t= document.getElementsByClassName("cartTotal cartHeader");
	if (!t.length) return;
	t= t[0].getElementsByTagName("td");
	text+= "========================================" + "\n" + "[b]Total:" + "\t" + t[1].textContent.trim() + "[/b][/left]" + "\n";
	document.getElementsByClassName("space")[0].innerHTML= '<td align="left" colspan="2"><span>BBcode:&nbsp;</span></td><td align="left" colspan="2"><textarea cols="50" rows="1" style="font-size:12px;" onclick="this.select();" >' + text + '</textarea></td>';
}