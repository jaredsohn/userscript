// ==UserScript==
// @name           CS2 Alternative Terminal
// @namespace      CS
// @description    comparable Lining Prices
// @include        http://*.chosenspace.com/index.php?go=planet_terminal*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
function xpath(query){return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
allTags=xpath("//input[@value='Galaxy']");
thisTag=allTags.snapshotItem(0);
if(thisTag){
	function CommaFormatted(amount){
		var i=parseInt(amount);var n=new String(i);var a=[];
		while(n.length>3){var nn=n.substr(n.length-3);a.unshift(nn);n=n.substr(0,n.length-3);}
		if(n.length>0){a.unshift(n);}
		n=a.join(',');return n;}
	function getTile2D(ArrayPosition){
	   var X = ArrayPosition % 20;var Y = ( (ArrayPosition - X) / 20 ) + 1;
	   var Coordinate = {"x":X, "y":Y};
	   return(Coordinate);}
	var CurrentGalaxy=thisTag.getAttribute("onclick").split("system_id=")[1].split("'")[0];
	var startSys=getTile2D(CurrentGalaxy);
	var endSys,targetGalaxy,dist,target,tprice,tresult,ttext;
	allTags=xpath("//a[contains(text(),'System')]");
	var sortlist=new Array();
	var j=0;
	lining:for(var i=0;i<allTags.snapshotLength;i++){
		thisTag=allTags.snapshotItem(i);
		if(thisTag.parentNode.offsetParent.parentNode.firstChild.textContent=="\nPassengers looking to Travel"){
			targetGalaxy=thisTag.getAttribute("href").split("system_id=")[1];
			endSys=getTile2D(targetGalaxy);
			dist= Math.max( Math.abs(endSys.x - startSys.x), Math.abs(endSys.y - startSys.y) );
			target=thisTag.parentNode.parentNode.childNodes[16];
			tprice=target.textContent.split('for $')[1].split(',').join('');
			if(dist!=0){
				tresult=(tprice*1)/dist;
				ttext='PJ-'+dist+' for $ '+CommaFormatted(tresult);
			}else{
				tresult=tprice*1;
				ttext='LS for $ '+CommaFormatted(tresult);
			}
			target.setAttribute('title',target.textContent);
			target.textContent=ttext;
			sortlist[j]=new Object();
			sortlist[j]['dist']=dist;
			sortlist[j]['price']=tresult;
			sortlist[j]['node']=thisTag.parentNode.parentNode.cloneNode(true);
			j++;
		}else{
			thisTag=allTags.snapshotItem(i-1);
			break lining;
		}
	}
	sortlist.sort(function(a,b){if(a.dist!=b.dist)return a.dist-b.dist;else return b.price-a.price});
	var background=true;var replace;
	function fixform(){
		var form=replace.children[0].cloneNode(true);
		form.setAttribute('style','display:inline;');
		var cn,amt,price;
		while(replace.children[10].childNodes.length>0){
			cn=replace.children[10].firstChild.cloneNode(true);
			if(cn.nodeName=='INPUT'){
				if(cn.getAttribute('type')=='text'){
					amt=(cn.getAttribute('value').replace(/\D/g,''))*1;
					cn.setAttribute('onkeyup',"function CF(n){n+='';var a=[];while(n.length>3){var nn=n.substr(n.length-3);a.unshift(nn);n=n.substr(0,n.length-3);}if(n.length>0){a.unshift(n);}n=a.join(',');return n;}var am"+i+"=(this.value.replace(/\\D/g,''))*1;var p"+i+"=this.offsetParent.parentNode.children[8];var pr"+i+"=(p"+i+".firstChild.textContent.split('$')[1].replace(/\\D/g,''))*1;this.title='Unit price = $'+CF(am"+i+"*pr"+i+");pr"+i+"=(p"+i+".title.split('$')[1].replace(/\\D/g,''))*1;this.parentNode.lastChild.title='Full payment price = $'+CF(am"+i+"*pr"+i+");");
					price=(replace.children[8].firstChild.textContent.split('$')[1].replace(/\D/g,''))*1;
					cn.title='Unit price = $';
				}else{
					price=(replace.children[8].title.split('$')[1].replace(/\D/g,''))*1;
					cn.title='Full payment price = $';
				}
				cn.title+=CommaFormatted(amt*price);
				form.appendChild(cn);
			}else{
				form.appendChild(cn);
			}
			replace.children[10].removeChild(replace.children[10].firstChild);
		}
		replace.children[10].appendChild(form);
		return;
	}
	for(var i=0;i<sortlist.length;i++){
		replace=sortlist[i].node;
		if(background){
			background=false;
			for(var x=1;x<replace.children.length;x++){
				replace.children[x].setAttribute('bgcolor','#181818');
				if(x==11)fixform();
			}
		}else{
			background=true;
			for(var x=1;x<replace.children.length;x++){
				replace.children[x].setAttribute('bgcolor','#101010');
				if(x==11)fixform();
			}
		}
		thisTag.parentNode.parentNode.parentNode.replaceChild(replace,thisTag.parentNode.parentNode.parentNode.children[i]);
	}
}