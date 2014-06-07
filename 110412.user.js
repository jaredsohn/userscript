// ==UserScript==
// @name           QuestraderWEB stock form improved
// @description    Add new features to the stock order form
// @version        2
// @include        *questrader.com/enterOrder.nexa?*
// @namespace      http://userscripts.org/scripts/show/110412
// @exclude        
// ==/UserScript==

function impform() {
if (document.getElementsByName("quantity")[0])
{

//create scripts for calc1, calc2, submitenter() func, equal_price() func & for request quote directly : q_symb() func
var scr = document.createElement("script");
scr.setAttribute("language","JavaScript");
var jstxt = document.createTextNode('' +
'function cal_act()\n' +
'{\n' +
'var a = document.midForm.calc1.value;\n' +
'var b = document.midForm.calc2.value;\n' +
'var c = Math.ceil(a/b*100)/100; //fee 1x\n' +//fee 1x
'var d = Math.pow(b,2); // sub-e\n' +// sub-e
'var e = Math.ceil(a/d*100)/100; //fee 2x\n' +//fee 2x
'var f = Math.round((c-e)*100)/100; //fee real\n' +//fee real//

/*//for diagnostic
'//alert(\'fee 1x:\' + c);\n' +
'//alert(\'fee 2x:\' + e);\n' +
'//alert(\'fee real w/o rule:\' + f);\n' +*/

'if (f < 4.95)\n' +
'{ f = 4.95 };\n' +
'if ( f > 9.95)\n' +
'{ f = 9.95 };\n' +

/*//for diagnostic
'//alert(\'fee real w/ Questrade:\' + f);\n' +*/

'var g = Math.floor((a-f)/b*100);\n' +

/*//for diagnostic
'//alert(\'nbr. shares:\' + g);\n' +*/
'document.midForm.quantity.value = g;\n' +
'};\n' +
//////////////////////////////////////////////////////////////////////////////
//func to allow press <enter> to submit form
//source : http://www.htmlcodetutorial.com/forms/index_famsupp_157.html
'function submitenter(myfield,e)\n' +
'{\n' +
'var keycode;\n' +
'if (window.event) keycode = window.event.keyCode;\n' +
'else if (e) keycode = e.which;\n' +
'else return true;\n' +
'if (keycode == 13)\n' +
'   {\n' +
'   submitOrder(\'stock\');\n' +
'   return false;\n' +
'   }\n' +
'else\n' +
'   return true;\n' +
'};\n');

//integrates above scripts
scr.appendChild(jstxt);

//same as above for the lasts scripts
var scr2 = document.createElement("script");
scr2.setAttribute("language","JavaScript");
var jstxt2 = document.createTextNode('function q_symb()\n' +
'{\n' +
'if (window.parent.document.getElementById("nFrame")) {\n' +
'var gframe1 = window.parent.document.getElementById("nFrame");\n' +
'var gframe_o = window.parent.document.getElementById("rFrame");\n' +
'var txtgq = "genericRequest.nexa?styleSheet=qmTabChart&genRequestString=";\n' +
'var txtgq2 = gframe_o.contentWindow.document.midForm.symbol.value;\n' +
'gframe1.src = txtgq+txtgq2;\n' +
'}};\n' +
'function equal_price1()\n' +
'{\n' +
'var exp = new RegExp("\.to$","gi");\n' +
'if (exp.test(document.midForm.symbol.value))\n' +
'{\n' +
'var lp = document.midForm.price.value;\n' +
'var sp = document.midForm.stopPrice.value;\n' +
'document.midForm.stopPrice.value = lp;\n' +
'}};\n' +
'function equal_price2()\n' +
'{\n' +
'var exp = new RegExp("\.to$","gi");\n' +
'if (exp.test(document.midForm.symbol.value))\n' +
'{\n' +
'var lp = document.midForm.price.value;\n' +
'var sp = document.midForm.stopPrice.value;\n' +
'document.midForm.price.value = sp;\n' +
'}};\n' +
'function buy() {\n' +
'document.midForm.action.value = 1; //buy\n' +
'document.midForm.instruction.value = 1; //market\n' +
'document.midForm.timeInForce.value = 1; //GTC\n' +
'submitOrder(\'stock\');\n' +
'}\n' +
'function sell() {\n' +
'document.midForm.action.value = 2; //sell\n' +
'document.midForm.instruction.value = 1; //market\n' +
'document.midForm.timeInForce.value = 1; //GTC\n' +
'submitOrder(\'stock\');\n' +
'}');
//integrates above scripts
scr2.appendChild(jstxt2);
//integrates above scripts into first <head> tags
var scrc = document.getElementsByTagName("head")[0];
scrc.appendChild(scr);
scrc.appendChild(scr2);

/*//change "Preview order" button to a normal button
var butsend = document.getElementsByName("send")[0];
var butsend2 = butsend.parentNode;
var inputbtn = document.createElement("input");
inputbtn.setAttribute("type","submit");
inputbtn.setAttribute("value","Preview Order");
inputbtn.setAttribute("onclick","submitOrder('stock')");
butsend2.insertBefore(inputbtn,butsend);
butsend2.removeChild(butsend);
inputbtn.setAttribute("name","send");*/

//Sell button
var butsend = document.getElementsByName("send")[0];
var butsend2 = butsend.parentNode;
var inputbtnb = document.createElement("input");
inputbtnb.setAttribute("type","button");
inputbtnb.setAttribute("value","BUY");
inputbtnb.setAttribute("onclick","buy()");
butsend2.insertBefore(inputbtnb,butsend);
	//Buy button
var inputbtns = document.createElement("input");
inputbtns.setAttribute("type","button");
inputbtns.setAttribute("value","SELL");
inputbtns.setAttribute("onclick","sell()");
butsend2.insertBefore(inputbtns,butsend);

//create new <tr>&<td> + attributes for "calc1"
var tr1 = document.createElement("tr");
var td11 = document.createElement("td");
td11.setAttribute("align","right");
td11.setAttribute("width","90");
var txt11 = document.createTextNode("$Capital:");
tr1.appendChild(td11);
td11.appendChild(txt11);
var td12 = document.createElement("td");
td12.setAttribute("align","left");
td12.setAttribute("width","50");
var input12 = document.createElement("input");
input12.setAttribute("type","text");
input12.setAttribute("autocomplete","off");
input12.setAttribute("style","width: 120px");
input12.setAttribute("name","calc1");
input12.setAttribute("size","10");
input12.setAttribute("maxlength","10");
input12.setAttribute("value","");
input12.setAttribute("onkeyup","cal_act()");
td12.appendChild(input12);
tr1.appendChild(td12);

//create new <tr>&<td> + attributes for "calc2"
var tr2 = document.createElement("tr");
var td21 = document.createElement("td");
td21.setAttribute("align","right");
td21.setAttribute("width","90");
var txt21 = document.createTextNode("¢/share:");
tr2.appendChild(td21);
td21.appendChild(txt21);
var td22 = document.createElement("td");
td22.setAttribute("align","left");
td22.setAttribute("width","50");
var input22 = document.createElement("input");
input22.setAttribute("type","text");
input22.setAttribute("autocomplete","off");
input22.setAttribute("style","width: 120px");
input22.setAttribute("name","calc2");
input22.setAttribute("size","10");
input22.setAttribute("maxlength","10");
input22.setAttribute("value","");
input22.setAttribute("onkeyup","cal_act()");
td22.appendChild(input22);
tr2.appendChild(td22);

//for request quote directly : q_symb()
var symb = document.getElementsByName("symbol")[0];
symb.removeAttribute("onchange");
symb.setAttribute("onchange","q_symb()");

//submitenter() func for all the midForm
var mf = document.getElementsByName("midForm")[0];
mf.setAttribute("onkeypress","return submitenter(this,event)");

//for equal_price() func
var price = document.getElementsByName("price")[0];
price.setAttribute("onkeyup","equal_price1()");
var s_price = document.getElementsByName("stopPrice")[0];
s_price.setAttribute("onkeyup","equal_price2()");

//force defaults to GTC
document.getElementsByName("timeInForce")[0].value = 1;

//search for target for calc1 & calc2
var target_qte = document.getElementsByName("quantity")[0];
var target_qte2 = target_qte.parentNode.parentNode;
//insertion to target of calc1 & calc2
var target_ins_bef = target_qte.parentNode.parentNode.parentNode;
target_ins_bef.insertBefore(tr1,target_qte2);
target_ins_bef.insertBefore(tr2,target_qte2);

}}

window.addEventListener('load',impform,false);