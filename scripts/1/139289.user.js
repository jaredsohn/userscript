// ==UserScript==
// @name           Newegg cart to post converter for eggxpert.com
// @namespace      http://userscripts.org/users/62850
// @description    Converts the cart in to postable html that has been patched for the forums
// @include        http://secure.newegg.com/Shopping/ShoppingCart.aspx*
// @include        http://secure.newegg.ca/Shopping/ShoppingCart.aspx*
// @version        1.3
// ==/UserScript==

// function to find elements using Xpath
function find(target,i){
	if(i==9)
		return document.evaluate(target, document, null, i, null).singleNodeValue;
	else
		return document.evaluate(target, document, null, i, null)
}

// create button
var btn=document.createElement('a');

// set button attributes
btn.className='btnOn';
btn.setAttribute('onblur',"this.className='btnOn'");// They could have done this with pure css, maybe it was for old versions of IE
btn.setAttribute('onfocus',"this.className='btnOn'");
btn.setAttribute('onkeydown',"this.className='btnDown'");
btn.setAttribute('onmouseout',"this.className='btnOn'");
btn.setAttribute('onmouseover',"this.className='btnOn'");
btn.setAttribute('onmousedown',"this.className='btnDown'");
btn.setAttribute('href',"javascript:void('See `Newegg cart to post converter for eggxpert.com` for code')");
btn.textContent='Generate Post HTML';

// make button useful
btn.addEventListener('click',function(){

	// find table and create a few varables
	var table=find('.//dd/table[@class="innerCells"]',9),items,item,html;
	
	// backup cart html to restore later
	html=table.innerHTML;

	// remove options (eg: warrenty)
	items=find('.//dd/table[@class="innerCells"]//dl/dd[@class="select"] | '+
	'.//dd/table[@class="innerCells"]//li/div[@class="extendedWarranty"] | '+
	'.//td[@class="cartDescription"]//dd[@class="select select-gift-services"] | '+
	'.//td[@class="cartDescription"]//dd/a[@class="membership-info"]/..',6);
	for(var i=items.snapshotLength-1;i>-1;i--){
		item=items.snapshotItem(i);
		item.parentNode.removeChild(item);
	}

	// convert quanity to plain text
	items=table.getElementsByClassName('cartQty');
	for(var i=items.length-1;i>0;i--){
		item=items[i].firstElementChild;
		if(item!=null)
			items[i].innerHTML=item.value;
	}

	// remove check boxes
	items=table.getElementsByClassName('cartSelect');
	for(var i=items.length-1;i>-1;i--)
		items[i].innerHTML='';

	// remove original price (this could be merged with the remove options section)
	items=table.getElementsByClassName('cartOrig');
	for(var i=items.snapshotLength-1;i>-1;i--)
		items[i].parentNode.removeChild(items[i]);

	// remove shipping calculator
	items=find('.//tr/td[@class="cartCalc innerBtn"]',6);
	for(var i=items.snapshotLength-1;i>-1;i--)
		items.snapshotItem(i).innerHTML='';

	// remove blank table row (below shipping row)
	items=find('.//tbody/tr[@class="space"]',9);
	items.parentNode.removeChild(items);

	// remove gift cards and add promo codes
	items=find('.//tbody/tr[@class="cartShipping cartHeader"]',6);
	var t=items.snapshotLength;
	for(var i=t-1;i>t-3;i--){
		item=items.snapshotItem(i);
		item.parentNode.removeChild(item);
	}

	// remove promo row above Grand Total (if there is one)
	item=find(".//tbody/tr[starts-with(@class,'cartPromo ') and contains(@class,'New')]",9);
	if(item!=null)
		table.firstElementChild.removeChild(item);

	// remove 'remove' from promo codes
	items=find('.//tbody/tr[@height="35"]',6);
	for(var i=items.snapshotLength-1;i>-1;i--)
		items.snapshotItem(i).firstElementChild.innerHTML='';

	// add line breaks to dd elements when needed
	items=find('.//td[@class="cartDescription"]/dl/dd | .//table//dl[@class="itemDetail"]/dd | .//td[@class="cartSavings"]/dd',6);
	for(var i=items.snapshotLength-1;i>-1;i--){
		item=items.snapshotItem(i);
		if(item.nextElementSibling!=null)
			item.appendChild(document.createElement('br'));
	}

	// open window with html code in it
	items=table.innerHTML;
	window.open('data:text/html;charset=utf-8,'+encodeURIComponent('<html><head><title>HTML Code to Post</title><head><body>If you would like to clean the html code, paste it in the <a href="http://tools.arantius.com/tabifier">Tabifier</a>.<textarea style="width:100%;height:calc(100% - 21px);" id="txtBox"></textarea></body></html>'))
		.addEventListener('load',function(){
		this.document.getElementById('txtBox').value='<table>'+items+'</table>';
	},false);

	// retore Cart to original state
	table.innerHTML=html;

},false);

// insert button into page
loc=find('.//dd/a[@id="removeFromCart"]',9).nextElementSibling;
loc.parentNode.insertBefore(document.createTextNode(' '),loc);
loc.parentNode.insertBefore(btn,loc);


// Add button to remove promo codes (very helpful when the item is not in you cart and you have 10 codes total)
try{
	loc=find('.//dd/table[@class="innerCells"]/tbody/tr[@class="cartShipping cartHeader"]/td[@class="cartPromoCalc innerBtn"]/a[@class="btnOn"]',9).nextElementSibling;
}
catch(e){
	return;// user must be loged in to enter promo codes 
}
btn=document.createElement('a');
btn.setAttribute("href","javascript:var code=document.getElementById('PromotionCode').value;if(code.length>0){Biz.Shopping.ShoppingCart.clearPromotionCode('https://secure.newegg.com ',code)}else{alert('Please enter a promo code');}");
btn.setAttribute('onblur',"this.className='btnOn'");
btn.setAttribute('onfocus',"this.className='btnOn'");
btn.setAttribute('onkeydown',"this.className='btnDown'");
btn.setAttribute('onmouseout',"this.className='btnOn'");
btn.setAttribute('onmouseover',"this.className='btnOn'");
btn.setAttribute('onmousedown',"this.className='btnDown'");
btn.className='btnOn';
btn.textContent="Remove";
loc.parentNode.insertBefore(document.createTextNode(' '),loc);
loc.parentNode.insertBefore(btn,loc);
