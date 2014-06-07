// ==UserScript==
// @author		luckyman333 (at) gmail.com, modified by tomasz.frelik (at) enzo.pl, modified by usr8472(at)yahoo.com
// @namespace	http://userscripts.org/
// @name		Travian: Resource (Chinese)
// @description	On build pages, if not enough resources show how much is needed and how much time it will take to produce this quantity. --- modified by Tomasz Frelik --- modified by usr8472.
// @include		http://s*.travian*/build.php?*
// ==/UserScript==

function format1(maxtime){
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

function format2(maxtime){
	var Digital=new Date();
	var hrs = Math.floor(maxtime/3600);
	var min = Math.floor(maxtime/60) % 60;
	var sec = maxtime % 60;
	
	var hours=Digital.getHours();
	var minutes=Digital.getMinutes();
	var seconds= Digital.getSeconds();
	hrs=hours+hrs;
	min=min+minutes;
	sec=sec+seconds;
	
	if(sec>=60){
		sec=sec-60;
		min+=1;
	}	
	if(min>=60){
		min=min-60;
		hrs+=1;
	}
	var today,am;
	var t="";
	if(hrs>=24){
		hrs=hrs-24;
		today=0;
	}else{
		today=1;
	}
	if (hrs>12){
		am=0;
	}else{
		am=1;
	}
	hrs=hrs%12;
	if(hrs < 10) t=t+"0";
	t = t+hrs+":";
	if(min < 10) t = t+"0";
	t=t+min+":";
	if(sec < 10) t = t+"0";
	t=t+sec;
	if (am) t="AM "+t;
	else t="PM "+t;
	if (today) t="&#20170;&#26085; "+t;
	else t="&#26126;&#26085; "+t;
	return t;
}

if ( navigator.appName == 'Opera' ) {
	eventSource = document;
} else {
	eventSource = window;
}

eventSource.addEventListener( 'load', function( e ) {
			
	var results = document.evaluate('//td[@id]/text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//alert(results.snapshotLength);
	if (results.snapshotLength == 0) {return;}
	
	var wood = parseInt(results.snapshotItem(0).data.split('/'));
	var clay = parseInt(results.snapshotItem(1).data.split('/'));
	var iron = parseInt(results.snapshotItem(2).data.split('/'));
	var crop = parseInt(results.snapshotItem(3).data.split('/'));
	var woodp = parseInt(results.snapshotItem(0).parentNode.title);
	var clayp = parseInt(results.snapshotItem(1).parentNode.title);
	var ironp = parseInt(results.snapshotItem(2).parentNode.title);
	var cropp = parseInt(results.snapshotItem(3).parentNode.title);
	
	//var need = document.evaluate('/html/body/table/tbody/tr/td[3]/table[last()]/tbody/tr//td/text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var need = document.evaluate('//table[@class="f10"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//alert(need.snapshotLength);
	for (var i=0;i<need.snapshotLength;i++){
		//wood | clay | iron | crop | upkeep | time
		//alert(need.snapshotItem(i).textContent);
		if (need.snapshotItem(i).textContent.indexOf("|")==-1||need.snapshotItem(i).textContent.indexOf(":")==-1||need.snapshotItem(i).textContent.charAt(0)=="\n") continue;
		var needs = need.snapshotItem(i).textContent.split(" | ");
		//for (var j=0;j<needs.length;j++) alert(needs[j]);
		
		var woodneed = parseInt(needs[0]);
		var clayneed = parseInt(needs[1]);
		var ironneed = parseInt(needs[2]);
		var cropneed = parseInt(needs[3]);
		if (wood>=woodneed&&clay>=clayneed&&iron>=ironneed&&crop>=cropneed) continue;
		//alert("Not enough resources");
		
		var woodsn=0,claysn=0,ironsn=0,cropsn=0;
		if (wood<woodneed) woodsn=woodneed-wood;
		if (clay<clayneed) claysn=clayneed-clay;
		if (iron<ironneed) ironsn=ironneed-iron;
		if (crop<cropneed) cropsn=cropneed-crop;
		
		var maxtime=0,time,t1,t2;
		time = woodsn/woodp*3600;
		if (maxtime<time) maxtime=time;
		time = claysn/clayp*3600;
		if (maxtime<time) maxtime=time;
		time = ironsn/ironp*3600;
		if (maxtime<time) maxtime=time;
		time = cropsn/cropp*3600;
		if (maxtime<time) maxtime=time;
		maxtime=parseInt(maxtime);
		t1=format1(maxtime);
		t2=format2(maxtime);
		
		if (wood>woodneed && woodsn==0){
			woodsn=wood-woodneed; 
			woodsn="+"+woodsn;
		}else if(woodsn!=0){
			woodsn="-"+woodsn;
		}

		if (clay>clayneed  && claysn==0){
			claysn=clay-clayneed; 
			claysn="+"+claysn;
		}else if (claysn!=0){
			claysn="-"+claysn;
		}

		if (iron>ironneed && ironsn==0){
			ironsn=iron-ironneed; 
			ironsn="+"+ironsn;
		}else if(ironsn!=0){
			 ironsn="-"+ironsn;
		}

		if(crop>cropneed && cropsn==0){
			cropsn=crop-cropneed;
			cropsn="+"+cropsn;
		}else if( cropsn!=0){
			cropsn="-"+cropsn;
		}
	
		// create presentation
		// in Firefox the total is in a new line, even though the div is floated
		var resource_div = document.createElement( 'div' );
		resource_div.style.cssFloat = "left";
		//resource_div.style.paddingRight = 4;
		// resource_div.innerHTML = "Resources needed: <img src=\"img/un/r/1.gif\" width=\"18\" height=\"12\">"+woodsn
		                                             // +" | <img src=\"img/un/r/2.gif\" width=\"18\" height=\"12\">"+claysn
		                                             // +" | <img src=\"img/un/r/3.gif\" width=\"18\" height=\"12\">"+ironsn
		                                             // +" | <img src=\"img/un/r/4.gif\" width=\"18\" height=\"12\">"+cropsn
		                                             // +"<br>Enough resources in: <span id=timer0>"+t+"</span>";
													 

		resource_div.innerHTML = '&#21319;&#32026;&#25152;&#38656;&#36039;&#28304;'
			+': (+) &#22810; , (-) &#19981;&#36275; <br/>'
			+'<img src="img/un/r/1.gif" width="18" height="12">'+woodsn
			+' | <img src="img/un/r/2.gif" width="18" height="12">'+claysn
			+' | <img src="img/un/r/3.gif" width="18" height="12">'+ironsn
			+' | <img src="img/un/r/4.gif" width="18" height="12">'+cropsn
			+' <br/>'+'&#26044; '+t1+' &#26178;&#30340;'+t2+'&#65292;&#23559;&#26377;&#36275;&#22816;&#36039;&#28304;';
		//alert(resource_div.innerHTML);
		//TODO: resources left after building
		//TODO: time count down, count down not work after the first count, userscript is only loaded when the page is loaded
		need.snapshotItem(i).appendChild(resource_div);
	}
},false);
