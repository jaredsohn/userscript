// ==UserScript==
// @name           Erep : Restoration Project
// @description    Erep : Restoration Project script has the goal to fix various Erepublik bugs. And when it's so easy to do reversed, how come game creators can't do it themselves?
// @date           2010-22-06
// @creator        mkey
// @namespace      http://userscripts.org/scripts/show/79882
// @include        http://www.erepublik.com/en*
// ==/UserScript==

	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	var country= new Array("27", "Argentina", "ARS", "50", "Australia", "AUD", "33", "Austria", "ATS", "32", "Belgium", "BEF", "76", "Bolivia", "BOB", "69", "Bosnia and Herzegovina", "BAM", "9", "Brazil", "BRL", "42", "Bulgaria", "BGN", "23", "Canada", "CAD", "64", "Chile", "CLP", "14", "China", "CNY", "78", "Colombia", "COP", "63", "Croatia", "HRK", "34", "Czech Republic", "CZK", "55", "Denmark", "DKK", "70", "Estonia", "FEK", "39", "Finland", "FIM", "11", "France", "FRF", "12", "Germany", "DEM", "44", "Greece", "GRD", "13", "Hungary", "HUF", "48", "India", "INR", "49", "Indonesia", "IDR", "56", "Iran", "IRR", "54", "Ireland", "IEP", "58", "Israel", "NIS", "10", "Italy", "ITL", "45", "Japan", "JPY", "71", "Latvia", "LVL", "72", "Lithuania", "LTL", "66", "Malaysia", "MYR", "26", "Mexico", "MXN", "31", "Netherlands", "NLG", "37", "Norway", "NOK", "73", "North Korea", "KPW", "57", "Pakistan", "PKR", "75", "Paraguay", "PYG", "77", "Peru", "PEN", "67", "Philippines", "PHP", "35", "Poland", "PLN", "53", "Portugal", "PTE", "52", "Republic of Moldova", "MDL", "1", "Romania", "RON", "41", "Russia", "RUB", "65", "Serbia", "RSD", "68", "Singapore", "SGD", "36", "Slovakia", "SKK", "61", "Slovenia", "SIT", "51", "South Africa", "ZAR", "47", "South Korea", "KRW", "15", "Spain", "ESP", "38", "Sweden", "SEK", "30", "Switzerland", "SHF", "59", "Thailand", "THB", "43", "Turkey", "TRY", "40", "Ukraine", "UAH", "29", "United Kingdom", "GBP", "74", "Uruguay", "UYU", "24", "USA", "USD", "28", "Venezuela", "VEB");
	
	var style= (<r><![CDATA[
		.rp_qpanel{background-color:white;position:relative;top:-15px;margin-bottom:6px;padding:2px 1px 3px 2px;display:block;width:66px;color:#3C8FA7;text-shadow:1px 1px 1px #aaaaaa; }
		.rp_qpanel span{display:block;font-size:12px;font-weight:600;}
		.rp_qpanel a{display:block;font-size:11px;margin-left:2px;font-weight:500;}
		.rp_qpanel a:hover{font-weight:600;}
		.rp_dmg_tbl{border-collapse:separate;border-spacing:1px 1px;color:#3C8FA7;font-weight:600;font-size:12px;text-shadow:1px 1px 1px #aaaaaa;text-align:center;}
		.rp_dmg_tbl td{border:1px solid #dddddd;padding:3px 7px 3px 7px;}
		.rp_dmg_tbl_t{position:relative;top:5px;font-size:15px;color:#808080;}
	]]></r>).toString();
	
(function (){
	var a= byClass("citizen_name");
	if (!a.length) return;
	GM_addStyle(style);
	if (d.URL.indexOf("/profile/")>0) Profile();
	else if (d.URL.indexOf("edit/profile")>0) EditProfile();
	else if (d.URL.indexOf("/exchange")>0) MonetaryMarket();
	else if (d.URL.indexOf("/company/")>0) Company();
	else if (d.URL.indexOf("/market/")>0) Marketplace();
	else if (d.URL.indexOf("battles/show")>0) Battles();
	else if (d.URL.indexOf("donate/items")>0) setTimeout(Donate, 250);
	if (byId("recaptcha_response_field")) byId("recaptcha_response_field").focus();
	MiniProfile();
})()

function Battles(){
	var div= byClass("flag");
	if (div.length<2) return;
	div= div[1].parentNode.parentNode;
	if (div.textContent.indexOf("already")>0) div.setAttribute("style", "color:red;font-size:17px;font-weight:800;margin-top:50px;");
}

function ClickMe(h){
	var e= d.createEvent("MouseEvents");
	e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return h.dispatchEvent(e);
}

function Company(){
	var btn = byClass("vround-btn-core btn-medium");
	if (btn.length){
		if (byId("wellnessvalue").textContent<80){
			btn[0].parentNode.className= "vround-red-end";
			btn[0].parentNode.parentNode.className= "vround-red-start";
			btn[0].textContent = "Warning!";
			btn[0].title = "Raise your wellness before working!";
			btn[0].className= "vround-red-core";
			//btn[0].style.width= "80px";
		} else {
			var style= byClass("maxproductivity")[0].getAttribute("style");;
			var workers = byClass("special")[0].textContent;
			if ((style.indexOf("8")>-1 && workers!=10) || (style.indexOf("2")>-1 && workers!=20)){
				btn[0].parentNode.className= "vround-red-end";
				btn[0].parentNode.parentNode.className= "vround-red-start";
				btn[0].textContent = "Warning";
				btn[0].title = "There isn't an optimal number of employees in the company!";
				btn[0].className= "vround-red-core";
				//btn[0].style.width= "80px";
			}
			
		}
	}
}

function Donate(){
	//if (!byClass("donate_fixed").length){
		var div= byClass("validicon");
		if (div.length)	div[0].parentNode.appendChild(div[0]);
		else setTimeout(Donate, 100);
		//var div= byId("messagealert");
		//var div_= create("div");
		//div_.innerHTML= "<table class=\"donate_fixed\" width=\"100%\"><tr><td><img style=\"height:107px;width:1px;\" src=\"http://img340.imageshack.us/img340/6190/blankc.gif\"></td><td><div class=\"validicon\" id=\"messagealert\"><p></p></div></td></tr></table>";
		//div.parentNode.insertBefore(div_, div);
		//div.parentNode.removeChild(div);
	//} else setTimeout(Donate, 250);
}

function EditProfile(){
	byId("error_for_citizen_file_twin").setAttribute("style", "float:left;margin-top:3px;");
}

function Marketplace(){
	//http://www.erepublik.com/en/market/country-26-industry-2-quality-0-citizen_account-xxx/1
	//0											 1	2		 3 4	   5 6				 7
	var url= d.URL.split("-"), c=0;
	var p= url[7].split("/");
	if (url[5]>0 && p.length<2 || p[1]<2){
		var t= byTag("tbody"); t= t[t.length-1];
		var s= t.getElementsByClassName("special");
		if (s.length>1) c= s[1].textContent+s[1].nextSibling.textContent;
		else c=0;
		if (url[3]==1) GM_setValue("rp_f_"+url[5]+"_"+url[1], c);
		else if (url[3]==2 && url[5]==1) GM_setValue("rp_g_1_"+url[1], c);
	}
}

function MiniProfile(){
	if (byClass("xprank")[0].textContent=="Org") return;
	
	var well= byId("wellnessvalue");
	if (well!=0){
		well.setAttribute("style", "background-image:url(\"\");text-align:center;font-size:11px;cursor:default;");	// fix wellnes icon
		var w= Number(well.textContent);
		var h= GM_getValue("rp_h_max", 0);
		var dw= 100-w;
		var qw= 1.5-w/100;
		var w2= Math.round((w+qw*(GM_getValue("rp_f_max", 0)+h))*100)/100;
		if (w2>100) w2=100;
		well.textContent= w+" ("+w2+")";
		
		var btn= byClass("wtooltip")[0];
		var ctr= byClass("flagholder")[0].getElementsByTagName("img");
		ctr= ctr[0].alt;
		for (var i=1; i<country.length; i+=3) if (ctr==country[i]){ ctr= country[i-1]; cur= country[i+1]; break; }
		var g1= Number(GM_getValue("rp_g_1_"+ctr, 0));
		var title="Wellness cost calculation{{br /}}", c=0;
		if (g1>0){
			var c1, f;
			for (var i=1; i<6; i++){
				f= Number(GM_getValue("rp_f_"+i+"_"+ctr, 0));
				if (f>0){
					w2= w+qw*(i+h);
					if (w2<100){
						w2=100-Math.floor(w2);		// number of gifts needed to achieve 100 well
						c= Math.round((f+g1*w2)*100)/100;
						c1= Math.round(c/dw*100)/100;
						title+= "&bull; Q"+i+" Food+"+w2+"xQ1 Gift: "+c+" "+cur+" ("+c1+"){{br /}}";
					} else {
						c=f;
						c1= Math.round(c/dw*100)/100;
						title+= "&bull; Q"+i+" Food: "+c+" "+cur+" ("+c1+"){{br /}}";
					}
				}
			}
		}
		if (!g1 || !c) title+="&bull; Visit the food and gift market to have prices assessed";
		btn.title= title;
		
		// wellness title fix
		btn= btn.getElementsByTagName("a")[0];
		if (btn) btn.parentNode.removeChild(btn);			// remove the link bullshit
	}
	// quick links pane
	var div= create("div");
	//div.className= "rp_qpanel";
	//div.textContent= "Quick Links";
	div.innerHTML= "<img src=\"http://img340.imageshack.us/img340/6190/blankc.gif\" width=\"10px\" height=\"1px\"/><div class=\"rp_qpanel\"><span>QuickLinks</span><a href=\""+byId("menu2").getElementsByTagName("a")[2].href+"\">Work</a><a href=\"http://www.erepublik.com/en/my-places/army\">Train</a><a href=\"http://www.erepublik.com/en/wars/1\">Wars</a></div>";
	byClass("core")[0].insertBefore(div, byClass("logout")[0]);
}

function MM_Notification(){			// monetary market notification pop-up fix
	if (!byClass("mm_fixed").length && byClass("messagealertclass invalidicon").length) byId("error_for_amount_to_accept").parentNode.innerHTML= "<table class=\"mm_fixed\" width=\"100%\"><tr><td><img style=\"height:107px;width:1px;\" src=\"http://img340.imageshack.us/img340/6190/blankc.gif\"></td><td><span class=\"messagealertclass invalidicon\" id=\"error_for_amount_to_accept\"></span><span id=\"error_for_amount_to_accept_twin\" style=\"float:left;\" class=\"twin-small\"></span></td></tr></table>";
	setTimeout(MM_Notification, 250);
}

function MonetaryMarket(){
	/*
	setTimeout(function(){
		if (byClass("accounts")[0].getElementsByClassName("nameholder").length>1){
			var a= byId("accounts_selector");
			ClickMe(a);
		}
	}, 500);
	*/
	MM_Notification();
}

function Profile(){
	if (byId("owninv")){
		var img1= byClass("tooltip");
		var img2= byClass("qlsmalllevel");
		var h_max=0, f_max=0, q;
		
		for (var i=0; i<img1.length; i++){
			switch (img1[i].alt){
				case "House":
					q= img2[i].getAttribute("style");
					q= Number(q.substring(7, q.length-2))/20;
					if (q>h_max) h_max=q;
					break;
				case "Food":
					q= img2[i].getAttribute("style");
					q= Number(q.substring(7, q.length-2))/20;
					if (q>f_max) f_max=q;
					break;
				default :
			}
		}
		GM_setValue("rp_f_max", f_max);
		GM_setValue("rp_h_max", h_max);
	}
	
	var u= byId("user_menu");
	if (u){
		var li= u.getElementsByTagName("li");
		li= li[3].cloneNode(true);
		var a= li.firstChild;
		a.href= a.href.replace("items", "list")+"/1";
		a.textContent= "Donations list";
		u.appendChild(li);
	}
	
	//D = Q × R  × S × W × 2
	//D = (5+q) * R * S * (75+w)/250
	//D = R * S * (75+w)/100
	var dmg= Number(byClass("goright special")[1].textContent.substring("/"));
	//var s= Number(byClass("special")[5].textContent);
	var m= Number(byClass("special")[5].textContent);
	if (dmg<250) m*=1.2;
	else if (dmg<750) m*=1.4;
	else if (dmg<1500) m*=1.6;
	else if (dmg<4500) m*=1.8;
	else if (dmg<9000) m*=2.0;
	else if (dmg<25000) m*=2.2;
	else if (dmg<75000) m*=2.4;
	else m*=2.6;
	var w= Number(byClass("wellnessvalue tooltip")[0].textContent);
	var w1=(75+w)/250;
	var w2=(55+w)/50;
	//(75+w)/250+(65+w)/250+(55+w)/250+(45+w)/250+(35+w)/250
	//(55+w)/50
	
	var div= create("div"); div.className= "holder";
	var row= "<tr><td>Damage</td><td>"+Math.round(m*w1*2.5)+"</td><td>"+Math.round(6*m*w1)+"</td><td>"+Math.round(7*m*w1)+"</td><td>"+Math.round(8*m*w1)+"</td><td>"+Math.round(9*m*w1)+"</td><td>"+Math.round(10*m*w1)+"</td></tr>";
	row+= "<tr><td>Damage max</td><td>"+Math.round(m*1.75)+"</td><td>"+Math.round(6*m*0.7)+"</td><td>"+Math.round(7*m*0.7)+"</td><td>"+Math.round(8*m*0.7)+"</td><td>"+Math.round(9*m*0.7)+"</td><td>"+Math.round(10*m*0.7)+"</td></tr>";
	row+= "<tr><td>Damage x5</td><td>"+Math.round(m*w2*2.5)+"</td><td>"+Math.round(6*m*w2)+"</td><td>"+Math.round(7*m*w2)+"</td><td>"+Math.round(8*m*w2)+"</td><td>"+Math.round(9*m*w2)+"</td><td>"+Math.round(10*m*w2)+"</td></tr>";
	row+= "<tr><td>Damage x5 max</td><td>"+Math.round(m*3.1*2.5)+"</td><td>"+Math.round(6*m*3.1)+"</td><td>"+Math.round(7*m*3.1)+"</td><td>"+Math.round(8*m*3.1)+"</td><td>"+Math.round(9*m*3.1)+"</td><td>"+Math.round(10*m*3.1)+"</td></tr>";
	row+= "<tr><td>Full Tank</td><td>"+(41*Math.round(m*1.75)+Math.round(m*3.1*2.5))+"</td><td>"+(41*Math.round(6*m*0.7)+Math.round(6*m*3.1))+"</td><td>"+(41*Math.round(7*m*0.7)+Math.round(8*m*3.1))+"</td><td>"+(40*Math.round(8*m*0.7)+Math.round(9*m*3.1))+"</td><td>"+(41*Math.round(9*m*0.7)+Math.round(9*m*3.1))+"</td><td>"+(41*Math.round(10*m*0.7)+Math.round(10*m*3.1))+"</td></tr>";
	div.innerHTML= "<div class=\"rp_dmg_tbl_t\">Battle Damage Lookup</div><br/><table class=\"rp_dmg_tbl\"><tr><td>Weapon Quality</td><td>n/a</td><td>Q1</td><td>Q2</td><td>Q3</td><td>Q4</td><td>Q5</td></tr>"+row+"</table>";
	byId("career_tab_content").appendChild(div);
}

