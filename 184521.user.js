// ==UserScript==
// @name        Nexus Clash Stat Bars
// @namespace   http://userscripts.org/users/125692
// @description Adds bars to AP HP and MP
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @grant          GM_getValue
// @grant          GM_setValue 
// @grant          GM_addStyle
// @version     1.04
// ==/UserScript==
//for nexus clash. this script
// adds coloured bars to under AP/HP/MP to provide visual referenece to depletion of these stats.
//1.01  - changed to math.round from parseInt for negligible increase in accuracy
//1.02  - added border to bars
//1.03  - added colour change for when over max
//1.04  - handles negative stats properly now.
(function() {
//this copied off the web
//http://stackoverflow.com/questions/9447950/script-to-save-settings
// for chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

//check if start screen and store max values.
var isstart = document.evaluate(
	"//h2[starts-with(.,'Welcome back to Nexus Clash!')]", 
	document, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (isstart.snapshotLength == 1) {
	//we on start screen.
	//Store max ap/hp/mp values.
	var charlinks = document.evaluate( 
		"//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	var charid;
	var charmaxhp=0;
	var charmaxap=0;
	var charmaxmp=0;
	if (charlinks.snapshotLength > 1) {//found some charlinks
		var charlink=0;
		for (i=0;charlink=charlinks.snapshotItem(i);i++){
			//alert(i);
			charid=charlink.href.match(/id=(\d+)/)[1];
			
			charlink=charlink.parentNode.nextElementSibling.nextElementSibling;
			charmaxap=charlink.textContent.match(/\/(\d+)/)[1];
			
			charlink=charlink.nextElementSibling;
			charmaxhp=charlink.textContent.match(/\/(\d+)/)[1];
			
			charlink=charlink.nextElementSibling;
			charmaxmp=charlink.textContent.match(/\/(\d+)/)[1];	
			
			//now store 'em away
			GM_setValue("maxap"+charid,charmaxap);
			GM_setValue("maxhp"+charid,charmaxhp);
			GM_setValue("maxmp"+charid,charmaxmp);		
		} 
	}
	return; //as that is all we want to do as we are on the start screen
}





//we not on start screen so we probably in game so apply rest of script.
//add styles
GM_addStyle(".bar{line-height=:1px;height:5px;display:inline-block;margin: 0 0 0 0;padding: 0 0 0 0;position:absolute;top:20px;left:-1px;border:1px solid #777777;"+
"background-color:#ff0000;");// SET COLOUR FOR BACKGROUND OF BAR ##FF0000 is red
GM_addStyle(".bar2{line-height=:1px;height:5px;display:inline-block;margin: 0 0 0 0;padding: 0 0 0 0;position:absolute;top:21px;left:0px;"+
"background-color:#00ff00;}");// SET COLOUR FOR FOREGROUND OF BAR
GM_addStyle(".numberdiv{display:inline-block;padding:0 0 0 0;margin: 0 0 0 0;width:20px;position:relative;}");
var OVERMAXCOLOUR="#0000FF";//colour to make bar for when over max

//ADD COLOUR BARS TO AP/HP/MP
if(document.getElementById("CharacterInfo")){

	var charinfodiv=document.getElementById("CharacterInfo");
	var charlinks = document.evaluate( 
		".//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		charinfodiv,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	var charid=0;
	if (charlinks.snapshotLength==1){
			charid=charlinks.snapshotItem(0).href.match(/id=(\d+)/)[1];
	}
	var charmax = new Array();//lol at this way. makes code a bit shorter in for
	charmax[0]=GM_getValue("maxap"+charid,0);
	charmax[1]=GM_getValue("maxhp"+charid,0);
	charmax[2]=GM_getValue("maxmp"+charid,0);

	if (charmax[0]&&charmax[1]&&charmax[2]){//only if all are true(ie we got a proper value)
		for(i=0;i<3;i++){//for each stat add bar
			var anewspan=document.createElement('div');
			anewspan.className="numberdiv";
			var font=charinfodiv.getElementsByTagName("font")[i];//get font
			charstat=font.innerHTML.match(/-?\d+/); //get ap/hp/mp  and if -ve
	
			var reddiv=document.createElement('div');
			reddiv.style.width='20px';
			reddiv.className="bar"; 
			if(i==1){//the hp doesn't refill automatically most of the time.
				reddiv.title=charstat+"/"+charmax[i]+" Need "+
				(Number(charmax[i])-Number(charstat))+"hp healed";
			}
			else{// for ap and mp
				reddiv.title = charstat+"/"+charmax[i]+" Full in "+ 
				(Number(charmax[i])-Number(charstat))/4+" hours";//assume ap/mp +1 per tick
			}
			var greendiv=document.createElement('div');
			var greenwidth=Math.round(20*(Number(charstat)/Number(charmax[i])));
			if (greenwidth>20){//for some reason we over max
				greenwidth=20;
				greendiv.style.backgroundColor=OVERMAXCOLOUR;//set to blue to signify over max
			}
			else if (greenwidth<0){//for some reason we at -ve values
				greenwidth=0;
			}
			greendiv.className="bar2"; 
			greendiv.style.width=""+greenwidth+"px";//to make out of 20 as int;
			greendiv.title=charstat+"/"+charmax[i];
			var firstcell=font.parentNode;
			if(i==0){//first time is nested deeper
				firstcell=font.parentNode.parentNode;
			}
			firstcell.width='20px';
			anewspan.insertBefore(greendiv,anewspan.firstChild);//put img in span
			anewspan.insertBefore(reddiv,anewspan.firstChild);//put img in span
			anewspan.insertBefore(font,anewspan.firstChild);//move the text into the new span
			firstcell.insertBefore(anewspan,firstcell.firstChild);//put span in table cell
		}
	}
}
//EOF
})();