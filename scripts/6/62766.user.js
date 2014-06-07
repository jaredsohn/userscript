// ==UserScript==
// @name           kaixin001 - rich plugin
// @namespace      http://www.kaixin001.com
// @include        http://www.kaixin001.com/!rich/market.php*
// ==/UserScript==

var list_sz = document.getElementsByClassName('list_zc');
if (list_sz.length == 1 ) 
{
	list_sz = list_sz[0];
}
else
{
	GM_log("list_sz.length="+list_sz.length);
	return;
}

function ParseULTag(ul)
{
	var obj = {};
	try
	{
		obj.name = ul.getElementsByClassName('tac mt5')[0].textContent;
		obj.price = ul.getElementsByClassName('tac mb10')[0].firstChild.textContent;
		obj.node = ul;
	}
	catch(e)
	{
		GM_log('error in parse ul: ' + ul.innerHTML);
		return null;
	}
	return obj;
}

function ToYuan(val)
{
	var result = parseFloat(val);
	if (result == NaN) return NaN;
	var m = (/ *[0-9.]+([^0-9.]*元) */).exec(val);
	if (!m)
	{
		GM_log("Parse price error:"+val);
		return NaN;
	}
	var m1 = m[1];
	if (m1 == '元') return result;
	if (m1 == '万元') return result * 10000;
	if (m1 == '亿元') return result * 100000000;
	if (m1 == '百万元') return result * 1000000;
	if (m1 == '千万元') return result * 10000000;
	GM_log("Parse price error,unknown :"+m1);
	return NaN;
}

function CmpPrice(val1,val2)
{
	var v1 = ToYuan(val1);
	var v2 = ToYuan(val2);
	if (isNaN(v1) || isNaN(v2))
	{
		return 0;
	}
	if (v1 > v2) return 1;
	if (v1 < v2) return -1;
	return 0;
}



function SyncObj(obj)
{
	obj.maxPrice = GM_getValue(obj.name+'.maxPrice',obj.price);
	obj.minPrice = GM_getValue(obj.name+'.minPrice',obj.price);
	if (CmpPrice(obj.price,obj.maxPrice) > 0)
		obj.maxPrice = obj.price;
	if (CmpPrice(obj.price,obj.minPrice) < 0)
		obj.minPrice = obj.price;
	GM_setValue(obj.name+'.maxPrice',obj.maxPrice);
	GM_setValue(obj.name+'.minPrice',obj.minPrice);
}

function DisplayObj(obj)
{
	//GM_log(obj.name+":min="+obj.minPrice+',max='+obj.maxPrice);
	var node2 = obj.node.getElementsByClassName('tac mb10')[0];
	node2.innerHTML += '<span style="float:right;margin-left:0;margin-right:4px;width:auto;">最低:'+obj.minPrice+'<br/>最高:'+obj.maxPrice+'</span>';
}
var list_sz_ces = list_sz.children;
var items = [];
for (var i = 0;i<list_sz_ces.length;++i)
{
	var ul = list_sz_ces[i];
	if (ul.tagName!='UL') continue;
	var obj = ParseULTag(ul);
	if (obj) items.push(obj);
}
for (var i=0;i<items.length;++i)
{
	SyncObj(items[i]);
	DisplayObj(items[i]);
}
