// ==UserScript==
// @name        Real world currency mod for SR (latest)
// @namespace   sr
// @description SR: convert BTC to GBP/EUR/USD. Calculate <CUR>/gram. Gets live exchange rate from intersango.com. Uses cookie to store exchange rate and prefs.
// @include     http://silkroadvb5piz3r.onion/*
// @version     1.3b
// ==/UserScript==

var active_cur='gbp';
var currencies=['gbp','eur','usd'];
var trading={};

function draw()
{
	//Shopping cart page
	if (location.href.search('orders/cart')>-1)
	{
		var body = document.getElementById('table1');
		if (window.before)
			body.innerHTML = window.before;
		else
			window.before = body.innerHTML;

		var trs = body.getElementsByTagName('tr');
		for(var tri in trs)
		{
			var tr = trs[tri];
			var quantity = tr.childNodes[4];
			var total = tr.childNodes[7];
			if (tri==0)	//Table Header 
			{
				//Adding price(cur), price/g and total(Cur) headers 
				
				var price_head = document.createElement('th');
				price_head.innerHTML=getSymbol(active_cur)+'&nbsp;<a href="#" onclick="changeCurrency()">&lt;-&gt;</a>';

				var price_pg = document.createElement('th');
				price_pg.innerHTML=getSymbol(active_cur)+'/g';

				var price_total = document.createElement('th');
				price_total.innerHTML='total&nbsp;'+getSymbol(active_cur);

				tr.insertBefore(price_head,quantity);
				tr.insertBefore(price_pg,quantity);
				tr.insertBefore(price_total,total.nextSibling);

				continue;
			}

			var g = findGrams( tr.childNodes[2].innerHTML );
			
			//get price & total price, calculate various prices
			var btc_price = parseFloat( tr.childNodes[3].innerHTML.substr(1) );
			var cur_price = (btc_price * trading[active_cur]).toFixed(2);
			var total_price = parseFloat( total.innerHTML.substr(1) );
			var cur_total_price = (total_price * trading[active_cur]).toFixed(2);

			var ppg =  g && g>0 ?  (cur_price/g).toFixed(2) : '?';

			var pricetd = document.createElement('td');
			var ppgtd = document.createElement('td');
			var totaltd = document.createElement('td');

			pricetd.innerHTML=getSymbol(active_cur)+cur_price;
			ppgtd.innerHTML=getSymbol(active_cur)+ppg;
			totaltd.innerHTML=getSymbol(active_cur)+cur_total_price;

			//adding the <tds>
			tr.insertBefore(pricetd,quantity);
			tr.insertBefore(ppgtd,quantity);
			tr.insertBefore(totaltd,total.nextSibling);
			
		}
		//now the grand total (in bold)
		var spans = document.getElementsByTagName('span');
		var total_span;
		for(var si in spans)
			if (spans[si].innerHTML.search('Total:')>-1)
				total_span=spans[si];
		var total_price = parseFloat( total_span.innerHTML.substr(total_span.innerHTML.search(/[0-9]/)) );
		total_price *= trading[active_cur];
		total_price = total_price.toFixed(2);
		if (total_span.innerHTML.search('/')>-1)
			total_span.innerHTML=total_span.innerHTML.substr(0,total_span.innerHTML.search('/')-1);
		total_span.innerHTML += ' / '+getSymbol(active_cur)+total_price;
		drawFooter();
		return;
	}else
	if (location.href.search('/item/')>-1) //item detail page.
	{
		var bs = document.getElementsByTagName('b');
		var priceb = bs.item(0);
		var body = document.getElementsByTagName('table').item(0).innerHTML;
		
		var price = body.substr( body.search( 'Price' ) );
		price = price.substr( 0, price.search('<br><br>') );
		price = parseFloat(price.substr( price.lastIndexOf('>')+2 ));
		
		var item = '<BR/>'+getSymbol(active_cur)+(price*trading[active_cur]).toFixed(2)
		
		var g = findGrams(body);
		
		if (g)
			item+=' ('+(price*trading[active_cur]/g).toFixed(2)+' '+getSymbol(active_cur)+'/g)';

		item += ' (<A href="#" onclick="changeCurrency()">change</a>)';
		
		var first_b = document.getElementsByTagName('b').item(0);
		if (window.original)
			first_b.innerHTML=window.original;
		else
			window.original=first_b.innerHTML;
		first_b.innerHTML += item;
		drawFooter();
		return;
	}else
	if (location.href.search('/category/')>-1)
	{
		var x = document.getElementById('table1');
		if (window.before)
			x.innerHTML = window.before;
		else
			window.before = x.innerHTML;
		var trs = x.getElementsByTagName('tr');
		for(var ri in trs)
		{
			if (ri==0){
				var item = document.createElement('th');
				item.innerHTML=getSymbol(active_cur)+'&nbsp;<a href="#" onclick="changeCurrency()">&lt;-&gt;</a>';
				trs[ri].insertBefore(item,trs[ri].childNodes[3]);
				var item = document.createElement('th');
				item.innerHTML=getSymbol(active_cur)+'/g';
				trs[ri].insertBefore(item,trs[ri].childNodes[4]);
				continue;
			}
			var item = document.createElement('td');
			var pricetd = trs[ri].childNodes[2];
			var btc_price = parseFloat(pricetd.innerHTML.substr(1));
			var g = findGrams(trs[ri].innerHTML);
	
			item.innerHTML=getSymbol(active_cur)+(btc_price*trading[active_cur]).toFixed(2);

		
				var item2 = document.createElement('td');
				item2.innerHTML= g ? (btc_price*trading[active_cur]/g).toFixed(2) : '?';
				trs[ri].insertBefore(item2,trs[ri].childNodes[3]);

			trs[ri].insertBefore(item,trs[ri].childNodes[3]);
			
		}
		drawFooter();
	}else 	//other pages page
	{
		var btds=[];
		var tds = document.getElementsByTagName('td');
		var bs = document.getElementsByTagName('b');
		var tds = [].concat(Array.prototype.slice.call(tds), Array.prototype.slice.call(bs));
		for(var tdi in tds)
		{
			if ( tds[tdi].innerHTML.search('‡∏ø')==0 )
				btds.push(tds[tdi]);
			else if (tds[tdi].innerHTML.search('‡∏ø')>-1)
				console.log(tds[tdi].innerHTML.search('‡∏ø'));
		}
		for(var bi in btds)
		{
			var td = btds[bi];
			var price = ( trading[active_cur] * parseFloat(td.innerHTML.substr(1)) ).toFixed(2);
			var exist_string = (/&nbsp;(¬£|\$|‚Ç¨)/);
			if (td.innerHTML.search(exist_string)>-1)
				td.innerHTML = td.innerHTML.substr( 0, td.innerHTML.search(exist_string) );
			td.innerHTML+='&nbsp;'+getSymbol(active_cur)+price;
		}
		drawFooter();
	}
}

function findGrams(body)
{
	var matches = ( (/[^A-Za-z0-9](\d+[\.\d]*)+[\s]*(gram|grams|gr|g)+[^A-Za-z0-9]/i) ).exec(body);
	if ( matches && matches.length )
		return parseFloat(matches[1]);
	var matches = ( (/[^A-Za-z0-9](\d+[\.\d]*)+g[^A-Za-z0-9]/i) ).exec(body);
	if ( matches && matches.length )
		return parseFloat(matches[1]);
	return false;
}

function getTradingPrices(resp)
{
	var gbp = resp.responseText.substr( resp.responseText.search('British Pound') );
	gbp = gbp.substr( 0, gbp.search('</dd>') );
	gbp = parseFloat( gbp.substr( gbp.lastIndexOf('>')+1 ) );
	trading.gbp=gbp;

	var eur = resp.responseText.substr( resp.responseText.search('Euro') );
	eur = eur.substr( 0, eur.search('</dd>') );
	eur = parseFloat( eur.substr( eur.lastIndexOf('>')+1 ) );
	trading.eur=eur;

	var usd = resp.responseText.substr( resp.responseText.search('US Dollar') );
	usd = usd.substr( 0, usd.search('</dd>') );
	usd = parseFloat( usd.substr( usd.lastIndexOf('>')+1 ) );
	trading.usd=usd;

	setCookie('trading',JSON.stringify(trading));
	draw();
}

function changeCurrency()
{
	var cur = currencies.indexOf( active_cur );
	var next = ++cur % currencies.length;
	active_cur = currencies[next];
	draw();
	trading.active_cur = active_cur;
	setCookie('trading',JSON.stringify(trading));
}

function refreshCurrencies(force)
{
	if (force){
		setCookie('trading','false');
		return location.reload(true);
	}
	GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://www.intersango.com/",
		  onload: getTradingPrices
	});
}

function drawFooter()
{
	var active_cur_id = document.getElementById('active_cur_id');
	if (active_cur_id)
	{
		active_cur_id.innerHTML=getSymbol(active_cur);
		return false;
	}
	var body = document.getElementById('table1');
	var trs = document.getElementsByTagName('tr');
	var lasttd = trs.item( trs.length-1 ).getElementsByTagName('td').item(0);
	var lasttd_insertat = lasttd.innerHTML.search('<br');
	var text = '<BR/><BR/>\
		Active paper currency: <strong id="active_cur_id">'+getSymbol(active_cur)+'</strong>\
		<a href="javascript:changeCurrency();">change</a>\
		 | Rate: <strong>'+getSymbol(active_cur)+trading[active_cur].toFixed(2)+'/BTC</strong>\
		 <a href="javascript:refreshCurrencies(true);">refresh</a>';
	lasttd.innerHTML = lasttd.innerHTML.substr(0,  lasttd_insertat) + text + lasttd.innerHTML.substr(lasttd_insertat);
	return false;
}

//utils:

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}


function getSymbol(str)
{
	switch(str)
	{
		case 'gbp': return '&pound;';break;
		case 'usd': return '$';break;
		case 'eur': return '&euro;';break;
	}
}

//boot:
var cookie_trading = getCookie('trading');
if(!cookie_trading || cookie_trading=='false')
{
	console.log('Getting exchange rates from intersango.');
	refreshCurrencies();
}
else
{
	eval('trading='+cookie_trading);
	console.log('Using stored exchange rates from cookie:',cookie_trading);
	if (trading.active_cur)
		active_cur = trading.active_cur;
	draw();
}

unsafeWindow.currencies=currencies;
unsafeWindow.getSymbol=getSymbol;
unsafeWindow.findGrams=findGrams;
unsafeWindow.changeCurrency=changeCurrency;
unsafeWindow.refreshCurrencies=refreshCurrencies;
unsafeWindow.active_cur=active_cur;
unsafeWindow.trading=trading;
unsafeWindow.drawFooter=drawFooter;