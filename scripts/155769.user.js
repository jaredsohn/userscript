
// ==UserScript==
// @author 		Lurk
// @name          	MaxItems
// @version             2.1.9
// @namespace           eRepMaxItems
// @description         max kainos mygtukas
// @include      	 http://www.erepublik.com/en/economy/market/*   
// @downloadURL http://userscripts.org/scripts/source/155769.user.js
// @updateURL http://userscripts.org/scripts/source/155769.meta.js
// ==/UserScript==

window.addEventListener ("load", Greasemonkey_main, false); // pradedamas scriptas po puslapio uzkrovimo
function Greasemonkey_main () {

	var kiekis= new Array(),kiekisID= new Array();
	var x=0;	
	
	start(); 
	
	function id(){ 								// nuskaitau kiek prekiu imesta i marketa
		var visiID, naujasID,i=1;
		visiID = document.evaluate(
			'//table/tbody/tr/td[@class="m_quantity"]/div/input',
			document,
			null,
			XPathResult.ANY_TYPE,
			null);
		naujasID= visiID.iterateNext();
		//alert(naujasID.getAttribute('id'));
		while (naujasID) {
			kiekisID[i]=naujasID.getAttribute('id');			
			naujasID = visiID.iterateNext();		
			i++;		
		}
	}
	function kiekiai(){ 								// nuskaitau kiek prekiu imesta i marketa
		var visiKiekiai, naujasKiekis,i=1;
		visiKiekiai = document.evaluate(
			'//table/tbody/tr/td[@class="m_stock"]',
			document,
			null,
			XPathResult.ANY_TYPE,
			null);
		naujasKiekis= visiKiekiai.iterateNext();
		while (naujasKiekis) {
                        if (naujasKiekis.textContent % 1 === 0)
			   kiekis[i]=naujasKiekis.textContent;
		        else
                           kiekis[i]=naujasKiekis.textContent.replace(",","");
			naujasKiekis = visiKiekiai.iterateNext();
			i++;		
		}
	}

	function start() {			 //kad nesidvigubintu			
	//alert(x);
		if (x==0){
			x++;
			kiekiai();
			id();
			paste();		
		}
	}

	function paste() {
			InsertPointer =getClass('m_buy', document); // randu elementa 
			for (var i=1;i<11;i++){
				var insert=getButton(i); 
				InsertPointer[i].parentNode.appendChild(insert);
			}
		}
	

	function getButton(ItemNumber){
		
		var butn = document.createElement("td");
		with( butn ) {
			//setAttribute( 'onclick', 'alert( "nuuu ! " )' );
			addEventListener("click", function(){document.getElementById(kiekisID[ItemNumber]).value=parseInt(kiekis[ItemNumber]);}, false);
			setAttribute( 'value', '(o.0)' );   
			setAttribute( 'style','width:30px');
			//setAttribute('class', 'm_buy');	
			//setAttribute( 'type', 'button' );		
			//innerHTML ='<td><button id="myButton" style="background:#fff url(/images/parts/fluids_map.jpg) left -434px no-repeat;width:60px;color:#3c8fa7" type="button">Max</button></td>'
			innerHTML ='<a href="javascript:;" class="f_light_blue_big buyOffer" title="Max" id="pew pew"><span>Max</span></a>'
		}
		return butn
	}
	
	function getClass (clssName, rootNode /*optional root node to start search from*/){

	  var root = rootNode || document,
		  clssEls = [],
		  elems,
		  clssReg = new RegExp("\\b"+clssName+"\\b");

	  // use the built in getElementsByClassName if available
	  if (document.getElementsByClassName){
		return root.getElementsByClassName(clssName);
	  }
	  
	  // otherwise loop through all(*) nodes and add matches to clssEls
	  elems = root.getElementsByTagName('*');
	  for (var i = 0, len = elems.length; i < len; i+=1){
		if (clssReg.test(elems[i].className)) clssEls.push(elems[i])
	  }
	  return clssEls;
	  
	}
}