// ==UserScript==
// @name        Real world currency mod for SR
// @namespace   sr
// @description SR: convert BTC to GBP/EUR/USD. Calculate <CUR>/gram. Gets live exchange rate from intersango.com. Works on category and info pages and uses cookie to store exchange rate and prefs.
// @include     http://silkroadvb5piz3r.onion/silkroad/category/*
// @version     1.1
// ==/UserScript==


var active_cur='gbp';
var trading={};

function getSymbol(str)
{
	switch(str)
	{
		case 'gbp': return '&pound;';break;
		case 'usd': return '$';break;
		case 'eur': return '&euro;';break;
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

function draw()
{
	if (location.href.search('/item/')>-1)
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
		return;
	}
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
				item.innerHTML=active_cur+' <a href="#" onclick="changeCurrency()">&lt;-&gt;</a>';
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
	}
}


//Utils

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


var currencies=['gbp','eur','usd'];
unsafeWindow.currencies=currencies;
unsafeWindow.getSymbol=getSymbol;
unsafeWindow.findGrams=findGrams;
function changeCurrency()
{
	var cur = currencies.indexOf( active_cur );
	var next = ++cur % currencies.length;
	active_cur = currencies[next];
	draw();
	trading.active_cur = active_cur;
	setCookie('trading',JSON.stringify(trading));
}
unsafeWindow.changeCurrency=changeCurrency;
unsafeWindow.active_cur=active_cur;
unsafeWindow.trading=trading;

if(!getCookie('trading'))
{
	console.log('Getting exchange rates from intersango.');
	GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://www.intersango.com/",
		  onload: getTradingPrices
	});

}
else
{
	console.log('Using stored exchange rates from intersango.');
	eval('trading='+getCookie('trading'));
	if (trading.active_cur)
		active_cur = trading.active_cur;
	draw();
}
