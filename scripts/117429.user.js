// ==UserScript==
// @name           Newegg.com: Show the Hidden Prices
// @description    Never be annoyed with hidden prices on newegg.com again :)
// @version        3.3.1
// @include        http://www.newegg.tld/*
// ==/UserScript==
/* Script badly broken, working of fix this contains what I have so far, better than nothing, the old awesome version is commended out if you want to work on fixing it
function getURL(findMe,txt){
	if(txt){
		txt=txt.slice(1);
		txt=txt.slice(txt.indexOf(findMe+'='));
		var l=txt.indexOf('&');
		if(l!=-1){
			return txt.slice(findMe.length+1,l);
		}
		else{
			return txt.slice(findMe.length+1);
		}
	}
	return null;
}*/
function addCommas(nStr){// http://www.mredkj.com/javascript/nfbasic.html
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}/*
function roundNumber(num, dec){// http://forums.devarticles.com/showpost.php?p=71368&postcount=2
	return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}
function comboPriceInCart(e,combo){
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.newegg.com/Product/MappingPrice.aspx?ComboID='+combo,
		onload: function(r){
			var save=r.responseText;
			save=save.substr(save.indexOf('<dd class="rebate">You Save: ')+29);
			save=save.substr(0,save.indexOf('</dd>'));
			e.parentNode.previousElementSibling.textContent='Discount: '+save;
			var price=r.responseText;
			price=price.substr(price.indexOf('<h3 class="zmp">')+16);
			price=price.slice(0,price.indexOf('</h3>')).replace(/[(\t\r\n\ ]/g,'');
			e.parentNode.innerHTML='<strong>Combo Price: '+price+'</strong>';
		}
	});
}
function comboPriceFinder(ele){
	if(document.evaluate("//table[@class='comboOverview']/tbody/tr/td[@class='price']/em",document,null,9,null).singleNodeValue){
		setTimeout(function(){
			comboPriceFinder(ele);
		},2000);
	}
	else{
		var prices=document.evaluate("//table[@class='comboOverview']/tbody/tr/td[@class='price']",document,null,6,null);
		var is=0;
		for(var i=prices.snapshotLength-1;i>-1;i--){
			is+=Number(prices.snapshotItem(i).textContent.replace(/[( \n\r\t\$,]/g,''));
		}
		insertComboPageHTML(roundNumber(is,2).toString(),ele);
	}
}
function fetchPrice(ITEM,ele,bool,comboList){
	if(bool){
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.newegg.com/Common/Ajax/RelationItemInfo.aspx?item='+ITEM+'&type=Newegg&_='+(new Date().getTime().toString().substring(0,10)),
			onload: function(price){
				price=price.responseText;
				price=price.substr(price.indexOf(ITEM+'$')+ITEM.length+1);
				price=price.slice(0,price.indexOf('">')).replace(/[(\n\r\t \$,]/g,'');
				if(Number(price)==price){
					if(comboList){
						ele.innerHTML='$'+addCommas(price);
					}
					else{
						insertProductPageHTML(ele,price.split('.'));
					}
				}
				else{
					GM_log('No price for '+ITEM+' advailable');
				}
			}
		});
	}
	else{
		if(ITEM.indexOf('Combo')!=-1){
			ITEM='ComboID='+ITEM;
		}
		else{
			ITEM='Item='+ITEM;
		}
		GM_xmlhttpRequest({// price in cart
			method: "GET",
			url: 'http://www.newegg.com/Product/MappingPrice.aspx?'+ITEM,
			onload: function(price){
				price=price.responseText;
				price=price.substr(price.indexOf('<h3 class="zmp">')+16);
				price=price.slice(0,price.indexOf('</h3>')).replace(/[(\t\r\n\$, ]/g,'');
				if(comboList){
					ele.innerHTML='$'+addCommas(price);
				}
				else{
					insertComboPageHTML(price,ele);
				}
			}
		});
	}
}
function insertComboPageHTML(is,ele){
		var tmp=document.getElementById('singleFinalPrice').nextElementSibling.cloneNode(true);
		insertProductPageHTML(ele,is.split('.'));
		ele.appendChild(tmp);
		tmp=tmp.innerHTML;
		var save=Number(tmp.replace(/,/g,'').substr(tmp.indexOf('$')+1));
		var was=addCommas(roundNumber(Number(is)+save,2));
		ele.previousElementSibling.innerHTML='<span class="label">Was: </span><span>$'+was+'</span>';
		var comboFoot=document.evaluate("//tfoot/tr[@class='grand_total']/td[@class='price']",document,null,9,null).singleNodeValue;
		comboFoot.innerHTML='$'+addCommas(is.indexOf('.')==-1?is+'.00':is);
		comboFoot=comboFoot.parentNode.parentNode;
		tmp=document.createElement('tr');
		tmp.innerHTML='<td colspan="2">Combo Discounts:</td><td class="price">-$'+addCommas(save.toString().indexOf('.')==-1?save+'.00':save)+'</td>';     
		comboFoot.insertBefore(tmp,comboFoot.childNodes[0]);
		tmp=document.createElement('tr');
		tmp.innerHTML='<td colspan="2">Combined Total:</td><td class="price">$'+(was.indexOf('.')==-1?was+'.00':was)+'</td>';
		comboFoot.insertBefore(tmp,comboFoot.childNodes[0]);
}
function insertProductPageHTML(ele,item){
	var html='',ele2=ele.parentNode.childNodes[0];
	if(ele2.className=='original'){
		var p=Number(ele2.childNodes[1].textContent.substr(1).replace(/,/g,''))-Number(item[0].replace(/,/g,'')+'.'+item[1]);
		p=addCommas(roundNumber(p,2));
		html='<div class="original"><span class="label">Save: </span>$'+(p.indexOf('.')==-1?p+'.00':p)+'</div>';
	}
	ele.innerHTML='<div id="singleFinalPrice" class="current"><span class="label">Now: </span><span>$</span>'+addCommas(item[0])+'<sup>.'+item[1]+'</sup></div>'+html;
}
function showPrice(target){
	var price,eles=document.evaluate('//ul/li[@class="'+target+'"]',document,null,6,null);
	for(var i=eles.snapshotLength-1;i>-1;i--){
		price=eles.snapshotItem(i).parentNode;
		price=price.nextElementSibling.value.substr(1).split('.');
		eles.snapshotItem(i).innerHTML='<span class="label">Now: </span>$<strong>'+price[0]+'</strong><sup>.'+price[1]+'</sup>';
		eles.snapshotItem(i).className='priceFinal';
	}
}
function showPriceLoop(){// Timed loop is used cause DOMSubtreeModified will fire hundreds of times a second which is hell on slow systems
	showPrice('priceMAP');
	setTimeout(function(){
		showPriceLoop();
	},3250);
}
showPrice('priceRange');
showPriceLoop();

var Item=getURL('Item',location.search),ele;
if(!Item)
	Item=getURL('ItemList',location.search);
if(Item){// Product Pages
	setTimeout(function(){
		ele=document.evaluate("//div[@class='wrapper']/a[@class='blkLink map']/em",document,null,9,null).singleNodeValue;
		if(ele){// Normal Item
			try{// Check page for price
				insertProductPageHTML(ele.parentNode.parentNode,document.evaluate("//div[starts-with(@rel,'"+Item+"')]",document,null,9,null).singleNodeValue.getAttribute('rel').split('$')[1].split('.'));
			}
			catch(e){// Price did not load on page in time or will not be loading; Now getting price my self
				fetchPrice(Item,ele.parentNode.parentNode,ele.textContent=="Click for Details",false);
			}
		}
		else{// Combo Item
			ele=document.evaluate("//div[@id='singleFinalPrice']/h3/a/em",document,null,9,null).singleNodeValue;
			var products=document.evaluate("//tr/td[@class='price']/em/../../td[@class='desc']/a",document,null,6,null);
			var prices=document.evaluate("//tr/td[@class='price']/em/..",document,null,6,null);
			if(ele.textContent=='See price in cart'){// Slightly Hidden
				fetchPrice(Item,ele.parentNode.parentNode.parentNode.parentNode,false,false);
				for(var i=products.snapshotLength-1;i>-1;i--){
					var id=products.snapshotItem(i).href;
					fetchPrice(getURL('Item',id.substr(id.indexOf('?'))),prices.snapshotItem(i),false,true);
				}
				var prices=document.evaluate("//tr/td[@class='price']",document,null,6,null);
			}
			else{// Very Hidden
				setTimeout(function(){
					comboPriceFinder(ele.parentNode.parentNode.parentNode.parentNode);
				},3000);
				for(var i=products.snapshotLength-1;i>-1;i--){
					var id=products.snapshotItem(i).href;
					fetchPrice(getURL('Item',id.substr(id.indexOf('?'))),prices.snapshotItem(i),true,true);
				}
			}
		}
	},2550);
}
else{
	var eles=document.evaluate("//ul[@class='comboPrice map']/li[@class='comboFinal']/a[@class='priceAction']",document,null,6,null);
	for(var i=eles.snapshotLength-1;i>-1;i--){
		ele=eles.snapshotItem(i);
		if(ele.textContent=='See price in cart'){
			var combo=ele.getAttribute('onclick');
			combo=combo.slice(combo.indexOf('ComboID=')+8,combo.indexOf("','"));
			comboPriceInCart(ele,combo);
		}
		else{
			var url=ele.parentNode.nextElementSibling.getElementsByTagName('a')[0].href;
			ele.removeAttribute('onclick');
			ele.href="/Product/ComboDealDetails.aspx?ItemList="+url.substr(url.lastIndexOf('=')+1);
			ele.textContent='Click for Price';
			ele.removeAttribute('title');
		}
	}
}*/
function showPrice(){
	var paths=Array("//div[@class='itemCell']/div[@class='itemAction']/ul/li[@class='price-map']/a/../../li[@class='price-current ']",
	"//div/div[@class='wrap_inner']/div[@class='wrap_pitch']/ul/li[@class='price-map']/a/../../li[@class='price-current ']",
	"//div[@class='infoSideSell']/ul/li[@class='price-map']/*/../../li[@class='price-current ']");
	for(var x=0,stp=paths.length;x<stp;x++){
		eles=document.evaluate(paths[x],document,null,6,null);
		for(var i=eles.snapshotLength-1;i>-1;i--){
			ele=eles.snapshotItem(i);
			price=ele.parentNode.parentNode.getElementsByTagName('input')[0].value;
			GM_log(price+" == "+Number(price));
			if(!isNaN(price))
				price="$"+price;
			price=price.split(".");
			ele.innerHTML="<strong>"+price[0]+"</strong><sup>."+price[1]+"</sup>";
			ele.className+="patched";
		}
	}
}
function showPriceLoop(){// Timed loop is used cause DOMSubtreeModified will fire hundreds of times a second which is hell on slow systems
	showPrice();
	setTimeout(function(){
		showPriceLoop();
	},3250);
}

GM_addStyle("#singleFinalPrice,.is-map .price-current.patched{display:block!important;}.is-map .price-map{display:none!important;}");
var ele=document.evaluate("//li[@class='price-map']/a/../../li[@id='singleFinalPrice']",document,null,9,null).singleNodeValue,eles,price;
if(ele){
	price=ele.getAttribute('content').split(".");
	ele.innerHTML="$<strong>"+addCommas(price[0])+"</strong><sup>."+price[1]+"</sup>";
}
showPriceLoop();
