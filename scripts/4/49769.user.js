// ==UserScript==
// @author		luckyman, modified by tomasz.frelik (at) enzo.pl, and by quimicefa (at) gmail.com, and by Jujitsubb (at) yahoo.com.
// @namespace	
// @name		Travian - Resources Needed To Build
// @description	On build pages, if not enough resources show how much is needed and how much time it will take to produce this quantity. --- luckyman's script with a few English fixes by juji.
// @include		http://s*.travian*/*
// ==/UserScript==

function format(maxtime){
	var hrs = Math.floor(maxtime/3600);
	var min = Math.floor(maxtime/60) % 60;
	var sec = maxtime % 60;
	var t = hrs + ":";
	if(min < 10){t += "0";}
	t += min + ":";
	if(sec < 10){t += "0";}
	t += sec;
	return t;
}

var woodp;
var clayp;
var ironp;
var cropp;
var results;

// si estamos en la pagina de producción, capturar la produccion y guardarla en la cookie extraña esa.
if ( document.location.href.indexOf("/dorf1.php") != -1 ) {
//	var results = document.evaluate("//div[@id='production']/div[@class='b']/table/tbody/tr/td[@align='right']/b/text()",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	results = document.evaluate("//div[@id='production']/table/tbody/tr/td[@align='right']/b",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (results.snapshotLength == 0) {return;}	
	woodp = parseInt(results.snapshotItem(0).innerHTML);
	clayp = parseInt(results.snapshotItem(1).innerHTML);
	ironp = parseInt(results.snapshotItem(2).innerHTML);
	cropp = parseInt(results.snapshotItem(3).innerHTML);

	GM_setValue("woodp", woodp); 
	GM_setValue("clayp", clayp); 
	GM_setValue("ironp", ironp); 
	GM_setValue("cropp", cropp); 
}

// si estamos en edificios ..
else if ( document.location.href.indexOf("/build.php") != -1) {

	// guardar el stock de los recursos
	results = document.evaluate("//div[@id='res']/table/tbody/tr/td[@id]/text()",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (results.snapshotLength == 0) {return;}
	var wood = parseInt(results.snapshotItem(0).data.split('/'));
	var clay = parseInt(results.snapshotItem(1).data.split('/'));
	var iron = parseInt(results.snapshotItem(2).data.split('/'));
	var crop = parseInt(results.snapshotItem(3).data.split('/'));
	
	// guardar los nombres de los recursos
	results = document.evaluate("//div[@id='res']/table/tbody/tr/td/img[@class]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if (results.snapshotLength == 0) {return;}
	
	var woodName = results.snapshotItem(0).title;
	var clayName = results.snapshotItem(1).title;
	var ironName = results.snapshotItem(2).title;
	var cropName = results.snapshotItem(3).title;
	
	var need = document.evaluate('//td[@class="required"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for (var i=0;i<need.snapshotLength;i++){
		var needs = need.snapshotItem(i).textContent.split("|");
		var woodneed = parseInt(needs[0]);
		var clayneed = parseInt(needs[1]);
		var ironneed = parseInt(needs[2]);
		var cropneed = parseInt(needs[3]);

		//alert("needs: " + woodneed + " / " + clayneed + " / " + ironneed + " / " + cropneed);
		if (wood>=woodneed&&clay>=clayneed&&iron>=ironneed&&crop>=cropneed) continue;
		//alert("Not resources");
		
		var woodsn=0,claysn=0,ironsn=0,cropsn=0;
		if (wood<woodneed) woodsn=woodneed-wood;
		if (clay<clayneed) claysn=clayneed-clay;
		if (iron<ironneed) ironsn=ironneed-iron;
		if (crop<cropneed) cropsn=cropneed-crop;
		
		woodp = GM_getValue("woodp");
		clayp = GM_getValue("clayp");
		ironp = GM_getValue("ironp");
		cropp = GM_getValue("cropp");
		
		
		var maxtime=0,time,t;
		var resourceName = "";
		time = woodsn/woodp*3600;
		if (maxtime<time) {
			maxtime=time;
			resourceName = woodName;
			}
		time = claysn/clayp*3600;
		if (maxtime<time) {
			maxtime=time;			
			resourceName = clayName;
			}
		time = ironsn/ironp*3600;
		if (maxtime<time) {
			maxtime=time;
			resourceName = ironName;
			}
		time = cropsn/cropp*3600;
		if (maxtime<time) {
			maxtime=time;			
			resourceName = cropName;
			}
		maxtime=parseInt(maxtime);
		t=format(maxtime);
		
		/*
		alert("max time: " + maxtime);
		alert("resourceName: " + resourceName);
		*/

	
	
	
		// create presentation
		// in Firefox the total is in a new line, even though the div is floated
		var resource_div = document.createElement( 'div' );
		resource_div.style.cssFloat = "left";
		//resource_div.style.paddingRight = 4;
		resource_div.innerHTML =  "<br>Time until enough: <span id=timer0>"+t+"</span>"
													 + "<br>Resource(s) Needed: " + resourceName + "!";
									 
		need.snapshotItem(i).appendChild(resource_div);
		//alert(resource_div.innerHTML);
		
		}

}


/*
// si estamos en entrenamientos ... otros ??
else if ( ){
}
*/