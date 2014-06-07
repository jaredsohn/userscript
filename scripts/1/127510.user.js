// ==UserScript==
// @name           Powerpets
// @namespace      http://userscripts.org/users/438551
// @description    Powerpets Automation
// @include        http://www.powerpets.com/*
// ==/UserScript==



function atoi(str)
{
  return parseInt(str.replace(",", ""), 10);
}

function itoa(i)
{
  var radix = 10;
  return (i >= radix? itoa(i / radix): "")
    + String.fromCharCode(i % radix + "0".charCodeAt());
}

function findEnd(str, start)
{
  var paren = 0;
  var j = start;
  if(str[start] == "[")
  {
    paren++;
    j++;
  }
  for(; j < str.length
    && (paren != 0 || (str[j] != "," && str[j] != "[" && str[j] != "]")); j++)
    if(str[j] == "[") paren++;
    else if(str[j] == "]") paren--;
  return j;
}

function argToString(arg)
{
  if(typeof(arg) == "string") return arg;
  if(typeof(arg) == "number") return itoa(arg);
  if(Array.isArray(arg))
  {
    var s = "[";
    for(var i = 0; i < arg.length; i++)
    {
      if(i != 0) s += ",";
      s += argToString(arg[i]);
    }
    return s + "]";
  }
  return null;
}

function stringToArg(str)
{
  if(str.length == 0) return null;
  if(str[0] == "[")
  {
    var arg = new Array();
    var start = 1;
    var i = 0;
    while(true)
    {
      var j = findEnd(str, start);
      if(j == str.length)
        return arg;
      arg[i] = stringToArg(str.substring(start, j));
      start = j + 1;
      i++;
    }
  }
  if("0".charCodeAt() <= str[0].charCodeAt()
    && str[0].charCodeAt() <= "9".charCodeAt())
    return atoi(str);
  else return str;
}

function getPrice(maxPrice, maxLength)
{
  var rawPrices = document.getElementsByClassName("sltprice");
  var links = document.getElementsByClassName("sltbuy");
  var prices = new Array();

  for(var i = 0; i < maxLength && i <= maxPrice; i++)
  {
    var p = atoi(rawPrices[i + 1].innerHTML);
    var l = links[i + 1].getElementsByTagName("a")[0].href;
    if(p > 0 && p <= maxPrice)
      prices[i] = new Array(p, l);
    else break;
  }
  return prices;
}

function pushStack(arg)
{
  var array = new Array();
  array[0] = arg;
  GM_setValue("stack", argToString(array) + GM_getValue("stack", ""));
}

function popStack()
{
  var stack = GM_getValue("stack", "");
  if(stack.length == 0) return 0;
  var i = findEnd(stack, 0);
  GM_setValue("stack", stack.substring(i));
  return stringToArg(stack.substring(0, i))[0];
}

function getChildByName(obj, name, index)
{
  for(var i = 0; i < obj.childNodes.length; i++)
    if(obj.childNodes.item(i).name == name)
    {
      if(index == 0) return obj.childNodes.item(i);
      else index--;
    }
  return null;
}

function getChildById(obj, id, index)
{
  for(var i = 0; i < obj.childNodes.length; i++)
    if(obj.childNodes.item(i).id == id)
    {
      if(index == 0) return obj.childNodes.item(i);
      else index--;
    }
  return null;
}

function insert(sorted, newNums, maxLen)
{
  for(var i = 0; i < newNums.length; i++)
  {
    var cur = newNums[i];
    var j;
    for(j = 0; j < maxLen && j < sorted.length; j++)
    {
      if(cur[0] < sorted[j][0])
      {
        var t = sorted[j];
        sorted[j] = cur;
        cur = t;
      }
    }
    if(j < maxLen) sorted[j] = cur;
  }
  return sorted;
}

function searchItem(item)
{
  pushStack(GM_getValue("func", 0));
  pushStack(item);
  GM_setValue("func", 1);
  var form = document.getElementById("submit1").parentNode;
  getChildByName(form, "fo_search", 0).value = item;
  getChildByName(form, "focus", 0).value = 2; /* Items */
  form.submit();
}

function searchItem1() /* 1 */
{
  var itemName = popStack();
  GM_setValue("func", popStack());
  var items = document.getElementsByClassName("lineItem");
  for(var i = 0; i < items.length; i++)
    if(items[i].innerHTML.substring(">" + itemName + "<") == -1)
      continue;
    else break;
  for(var j = 0; j < items[i].childNodes.length; j++)
  {
    var form = getChildById(items[i], "buttonform", j);
    if(getChildById(form, "button", 0).value == "User Shops")
      form.submit();
  }
}

function priceList(item, iterations, size, retAddr)
{
  pushStack(retAddr);
  pushStack(GM_getValue("func", 0));
  GM_setValue("ret", new Array());
  priceList0(item, iterations, size);
}

function priceList0(item, iterations, size)
{
  GM_setValue("func", 2);
  pushStack(new Array(item, iterations - 1, size));
  searchItem(item);
}

function priceList1() /* 2 */
{
  var arg = popStack();
  var item = arg[0];
  var iter = arg[1];
  var size = arg[2];
  var ret = GM_getValue("ret", new Array());
  prices = getPrice(200000, size);
  GM_setValue("ret", insert(ret, price, size));
  if(iter == 0)
  {
    GM_setValue("func", popStack());
    window.location = popStack();
  }
  else
    priceList0(item, iter, size);
}

while(true)
{
//alert(GM_getValue("func", null));
  switch(GM_getValue("func", 0))
  {
    case 0:
      /*pushStack(0); searchItem("Everlasting Friends");*/
      alert(GM_getValue("ret", null));
      priceList("Everlasting Friends", 10, 10, "http://www.google.ca");
      break;

    case 1: searchItem1(); break;
    case 2: priceList1(); break;
  }
  break;
}

//GM_setValue("func", 0);GM_setValue("stack", "");
