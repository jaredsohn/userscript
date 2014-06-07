// ==UserScript==
// @name           Steam Prices
// @namespace      http://userscripts.org/scripts/show/
// @description    Detects and compares various game prices on store.steampowered.com
// @date           2010-10-02
// @creator        mkey
// @include        http://store.steampowered.com*
// ==/UserScript==

	var d=document, byId=d.getElementById, create=d.createElement, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName;
	var url_rates= 'http://www.hnb.hr/tecajn/evazeca.htm';
	var p1, p2, p3, url;
	var class1= 'discount_final_price', class2= 'game_purchase_price price', class3= 'game_purchase_action_bg', class4= 'btn_addtocart';
	
(function(){
	d.cookie= 'birthtime=631180801;expires=;path=/;';
	d.cookie= 'fakeCC=;expires=;path=/;';
	
	if (d.URL.indexOf('/app/')>0){		
		url= byClass('blockbg')[0].getElementsByTagName('a');
		url= url[url.length-1].href;
		date= new Date();
		date= Math.floor(date.getTime()/(60*60*24*1000));
		if (GM_getValue('rate_date', 0)<date){
			GM_setValue('rate_date', date);
			Rates();
		} else Set();
	}
})()

function Draw(page){
	var data;
	var p11;
	var t, t1, t2, t0= byClass("apphub_AppName")[0].textContent.trim();
	if (page==1){
		p11= Number(p1.replace(',', '.'));
		p2= Number(p2.substring(0, p2.indexOf('&')).replace(',','.'));
		p2= p2*GM_getValue('GBP', 1)/GM_getValue('EUR', 1);
		p2= Math.round((p11/p2-1)*100);
		
		p3= Number(p3.substring(0, p3.indexOf('&')).replace(',','.'));
		p3= p3*GM_getValue('USD', 1)/GM_getValue('EUR', 1);
		p3= Math.round((p11/p3-1)*100);
		
		if (p2>0) t1= p2+"% less expensive";
		else if (p2<0) t1= (-p2)+"% more expensive";
		else t1= "equally priced";
		if (p3>0) t2= p3+"% less expensive";
		else if (p3<0) t2= (-p3)+"% more expensive";
		else t2= "equally priced";
		
		t= t0+" is currently "+t1+" in the UK and "+t2+" in the US";
		data= p1+'€ '+p2+'%£ '+p3+'%$';
		
	} else if (page==2){
		p11= Number(p1);
		p2= Number(p2.substring(0, p2.indexOf('&')).replace(",", "."));
		p2= p2*GM_getValue('EUR', 1)/GM_getValue('GBP', 1);
		p2= Math.round((p11/p2-1)*100);
		
		p3= Number(p3.substring(p3.indexOf(';')+1));
		p3= p3*GM_getValue('USD', 1)/GM_getValue('GBP', 1);
		p3= Math.round((p11/p3-1)*100);
		
		if (p2>0) t1= p2+"% less expensive";
		else if (p2<0) t1= (-p2)+"% more expensive";
		else t1= "equally priced";
		if (p3>0) t2= p3+"% less expensive";
		else if (p3<0) t2= (-p3)+"% more expensive";
		else t2= "equally priced";
		
		t= t0+" is currently "+t1+" in the EU and "+t2+" in the US";
		data= "£"+p1+" "+p2+'%€ '+p3+'%$';
		
	} else {
		p11= Number(p1);
		p2= Number(p2.substring(0, p2.indexOf('&')).replace(",", "."));
		p2= p2*GM_getValue('EUR', 1)/GM_getValue('USD', 1);
		p2= Math.round((p11/p2-1)*100);
		
		p3= Number(p3.substring(p3.indexOf(';')+1));
		p3= p3*GM_getValue('GBP', 1)/GM_getValue('USD', 1);
		p3= Math.round((p11/p3-1)*100);
		
		if (p2>0) t1= p2+"% less expensive";
		else if (p2<0) t1= (-p2)+"% more expensive";
		else t1= "equally priced";
		if (p3>0) t2= p3+"% less expensive";
		else if (p3<0) t2= (-p3)+"% more expensive";
		else t2= "equally priced";
		
		t= t0+" is currently "+t1+" in the EU and "+t2+" in the UK";
		data= "$"+p1+" "+p2+'%€ '+p3+'%£';
	}
	
	var p= byClass(class3);
	if (!p.length){ GM_log('error: price detection 3'); return; }
	p= p[0];
	var price= p.getElementsByClassName(class1);
	if (!price.length){
		price= p.getElementsByClassName(class2);
		if (!price.length){ GM_log('error: price detection 4'); return; }
	}
	price[0].textContent= data;
	price[0].title= t;
}

// 1: uk, us
// 2: eu, us
// 3: eu, uk

function Get(page){
	var cc;
	if (page==1) cc='uk'; else cc='it';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url+'/?cc='+cc,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var i= e.responseText.indexOf(class3)+class3.length;
			
			p2= e.responseText.substring(i, e.responseText.indexOf(class4, i));
			i= p2.indexOf(class1);
			if (i<0){
				i= p2.indexOf(class2);
				if (i<0){ GM_log('error: parsing page 1'); return; }
				i+= class2.length;
			} else i+= class1.length;
			i= p2.indexOf(">", i)+1;
			p2= p2.substring(i, p2.indexOf("<", i)).trim();
			// GM_log('p2: '+p2);
			
			if (page==3) cc='uk'; else cc='us';
			GM_xmlhttpRequest({
				method: 'GET',
				url: url+'/?cc='+cc,
				headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
				onload: function(e){
					if (e.readyState == 4 && e.status != 200) return;
					var i= e.responseText.indexOf(class3)+class3.length;
					p3= e.responseText.substring(i, e.responseText.indexOf(class4, i));
					i= p3.indexOf(class1);
					if (i<0){
						i= p3.indexOf(class2);
						if (i<0){ GM_log('error: parsing page 2'); return; }
						i+= class2.length;
					} else i+= class1.length;
					i= p3.indexOf(">", i)+1;
					p3= p3.substring(i, p3.indexOf("<", i)).trim();
					// GM_log('p3: '+p3);
					
					Draw(page);
					d.cookie= 'fakeCC=;expires=;path=/;';
				}
			});
		}
	});
}

function Rates(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_rates,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var data= e.responseText;
			var i= data.indexOf('GBP');
			GM_setValue('GBP', Number(data.substring(i+16, i+24).replace(",", "")));
			i= data.indexOf('USD', i+24);
			GM_setValue('USD', Number(data.substring(i+16, i+24).replace(",", "")));
			i= data.indexOf('EUR', i+24);
			GM_setValue('EUR', Number(data.substring(i+16, i+24).replace(",", "")));
			GM_log('log: rates update');
			Set();
		}
	});
}

function Set(){
	var p= byClass(class3);
	if (!p.length){ GM_log('error: price detection 1'); return; }
	p= p[0];
	var price= p.getElementsByClassName(class1);
	if (!price.length){
		price= p.getElementsByClassName(class2);
		if (!price.length){ GM_log('error: price detection 2'); return; }
	}
	p= price[0].textContent.trim();
	if (p=="Free") return;
	price[0].textContent= "loading...";
	c1= p.charAt(p.length-1);
	
	if (c1=="€"){
		p1= p.substring(0, p.length-1);
		c1= "€";
		Get(1);
	} else {
		c1= p.charAt(0);
		p1= p.substring(1);
		if (c1=="$") Get(3);
		else if (c1=="£") Get(2);
		else GM_log('error: currency detection');
	}
}