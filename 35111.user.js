// ==UserScript==
// @name           Travian: current/max Bounty ML v1
// @description    Show current/max bounty etc.
// @include        http://*.travian.*/berichte.php?id=*
// ==/UserScript==



var t = new Array(0, 
40, 20, 50,  0, 100, 70, 0, 0, 0, 3000, 
60, 40, 50,  0, 110, 80, 0, 0, 0, 3000,  
30, 45,  0, 75,  35, 65, 0, 0, 0, 3000 
);

//alert(t[1]);  

function find(xpath,xpres) {
	var ret = document.evaluate(xpath,document,null,xpres,null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE,
    XPUList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

function elem(tag,content) {
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}

function getUnits() {
	ret = new Array(11);
	unitline = new Array(11);
	//get relevant lines: 0 = troops sent, 1 = casualties or prisoners, 2 = prisoners (iffy)
	unitline[0] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[3]/td/text()", XPOList);
	unitline[1] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[4]/td/text()", XPOList);
	unitline[2] = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[5]/td/text()", XPOList);

	var len = unitline[0].snapshotLength-1;
	if (unitline[1].snapshotLength > 5){
		if (unitline[2].snapshotLength > 5){
			for (i=1; i<=len; i++) ret[i-1] = parseInt(unitline[0].snapshotItem(i).nodeValue) - (parseInt(unitline[1].snapshotItem(i).nodeValue) + parseInt(unitline[2].snapshotItem(i).nodeValue));
			} else for (i=1; i<=len; i++) ret[i-1] = parseInt(unitline[0].snapshotItem(i).nodeValue) - parseInt(unitline[1].snapshotItem(i).nodeValue);
	}
//alert (ret);
	return ret;
}

//function getBags() {
//	ret = new Array(11);
//	unitline = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[2]/td/img/@src", XPOList);
//	var len = unitline.snapshotLength-1;
//	for (i=0; i<=len; i++){
//		current = unitline.snapshotItem(i);
//		ret[i] =t[(current.nodeValue).substring((current.nodeValue).lastIndexOf("/")+1,(current.nodeValue).length-4)];
//	}
//alert (ret);
//	return ret;
//}

// for the sake of integration
// code by kispaljr
function getBags() {
	ret = new Array(11);
	unitline_images = find("//table/tbody/tr[4]/td/table[1]/tbody/tr[2]/td/img/@src", XPOList);
	
	var len = unitline_images.snapshotLength-1;
	for (j=0, i=0; i<=len; i++){
		img_url = unitline_images.snapshotItem(i).nodeValue;
		if (img_url.substr(0, 9) == "img/un/u/") {
			ret[j++] =t[img_url.substring(img_url.lastIndexOf("/")+1, img_url.length-4)]; 
		}
	}
	return ret;
}




function pBty() {
	var ret = 0;
	var units = getUnits();
	var bags = getBags();
	var len = units.length;
	for (i=0; i<len-1; i++) {ret += bags[i] * units[i];}
	return ret;
}

function totalBty() {
	var total = 0;
	bty = find("//tr[@class='cbg1']/td[@class='s7']/text()", XPOList);
	if (bty.snapshotLength > 0){
		for (i=0; i<=3; i++ ){
			total += parseInt(bty.snapshotItem(i).nodeValue);
		}
	}
	return total;
}


window.addEventListener( 'load', function( e ) {
	btyrow = find("//tr[@class='cbg1']/td[@class='s7']/text()", XPOList);
	//filter out reports we don't care about
	if ( btyrow.snapshotLength === 0 || btyrow.snapshotLength === 2 ) return;
	//save first node for later abuse
	var content = totalBty().toString() + "/" + pBty().toString();
//alert(content);
	var firstNode = btyrow.snapshotItem(0);
	var pNode = firstNode.parentNode;
	//do we have a hero ?
	var colspan = find ("//table/tbody/tr[4]/td/table[1]/tbody/tr[1]/td[2]/@colspan",XPOList);
	colspan.snapshotItem(0).nodeValue == "10" ? pNode.setAttribute("colspan", "7") : pNode.setAttribute("colspan", "8");
	//create box
	var tpd = elem ("td", content);
	tpd.className = "s7";
	tpd.setAttribute("colspan", "3");
	//attach it to DOM
	pNode.parentNode.appendChild(tpd);
},false);
