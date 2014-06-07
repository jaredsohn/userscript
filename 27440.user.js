// ==UserScript==
// @name           Albertsons Env Info
// @namespace      http://ics.uci.edu/
// @description    Show cosmetic info
// @include        https://shop.albertsons.com/eCommerceWeb/ProductListAction.do?action=getProductDetails*
// ==/UserScript==



var productword = new Array();
var infolink = "";
var bottom_ = null;
var newWindow;

function findPlaceToAdd() {
		el = document.getElementById("popUpDiv1");
		if (el != null) return el;
		return null;
}

function findPlaceToAdd2() {
	el = document.getElementById("bottom");
	if (el != null) return el.parentNode;
	return null;
}


window.addEventListener('load', function() {

		function alertover(){
	  alert('over!!');
    }
    function alertout(){
	  alert('out!!');
    }

	
		if((bottom_ = findPlaceToAdd2()) != null){
			var div1 = document.createElement('div');
			div1.setAttribute('id', 'balloon1');
			div1.setAttribute('class', 'balloonstyle');
			div1.setAttribute('style', 'width: 215px;  background-color: #FCFCFC; background-repeat: repeat-x;');
			div1.innerHTML = "hahaha";
			bottom_.appendChild(div1);
		}
		

		
		var products;
    products = document.evaluate(
            "//input[@name='productName']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
   
    if (products.snapshotLength > 0) {
        productName = products.snapshotItem(0).value;
    }

    if(productName!=null)
    productword = productName.split(" ");
    	
    infolink = "http://www.cosmeticsdatabase.com/wordsearch.php?query=";
    for(var i=0 ; i<productword.length; i++){
    	if(i==0) infolink += productword[0];
    	else infolink += "+"+productword[i];
		}
		
		GM_xmlhttpRequest({
		method: "GET", 
		url: infolink, 
		onload: function( data ) {
		
			try{
				var productData = data.responseText;
				var a = 0;
				var b1 = 0;
				var b2 = 0;
				var harvalue = 0;
				var profind = false;
				if((a = productData.indexOf("/product.php"))!= -1){
					profind = true;
					productData = productData.substring(a);
					if((b1 = productData.indexOf("ttd\">")) != -1){
						productData = productData.substring(b1);
						
						if((b2 = productData.indexOf("</td>")) != -1){
						harvalue = eval(productData.substring(5,b2));
						}	
					}
				}	
				
				var addpos = findPlaceToAdd();
				
				
				var imgdownload1 = document.createElement('img');
				imgdownload1.setAttribute('class','alignMid');
				imgdownload1.setAttribute('border','0');
				imgdownload1.setAttribute('width','400');
				imgdownload1.setAttribute('height','24');
				imgdownload1.src = "http://www.cosmeticsdatabase.com/images/scorekey.gif";
				
				
				
				var tr = document.createElement('tr');
				tr.appendChild(imgdownload1);
			
				addpos.parentNode.insertBefore(tr, addpos);
				
				addpos2 = findPlaceToAdd();
				
				
				var a1 = document.createElement('a');
				a1.setAttribute('class','divLink');
				a1.setAttribute('href', 'http://www.cosmeticsdatabase.com/faq.php#1');
				a1.setAttribute('target','_blank');
				a1.innerHTML = '<img src=http://www.fueleconomy.gov/feg/images/calculator/info.gif border=0 width=16 height=16>';
				
				
				var td = document.createElement('td');
				td.setAttribute('width','30px');
				td.setAttribute('class','font-size-12 pad-bottom-5');
				if(profind == false) td.innerHTML += '<b>Harzard score : N/A </b>';
				else td.innerHTML += '<b>Hazard score : '+harvalue+'  </b>';
				td.appendChild(a1);
				
	
				
				var tr2 = document.createElement('tr');
				tr2.appendChild(td);
				addpos2.parentNode.insertBefore(tr2, addpos2);
				
				
				
				var addpos1 = findPlaceToAdd();
				
				var a = document.createElement('a');
				a.setAttribute('class','divLink');
				a.setAttribute('href', infolink);
				a.setAttribute('target','_blank');
				a.innerHTML = '<span class="fauxLink">Get&nbsp;More&nbsp;Environmental&nbsp;Information</span>';
					
				
				var tr1 = document.createElement('tr');
				
				tr1.appendChild(a);
				addpos1.parentNode.insertBefore(tr1, addpos1);
							
			}
			catch( e ) {	
			}
		}
	});		
}, true);

