// ==UserScript==
// @name           CS2 Improved Trading Post
// @namespace      userscripts.org
// @description    This automaticly fills in the buy values according to the amount available, your cargo space, and your credits. if we do not find any indication of the available cargo space, we don't do anything.
// @include        http://*.chosenspace.com/index.php?go=planet_trade*
// @include        http://*.chosenspace.com/index.php?go=starbase*
// @include        http://*.chosenspace.com/index.php?go=shipyard*
// @include        http://*.chosenspace.com/index.php?go=manufactory*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
var firebug=false;
function log(txt){
	if(firebug) console.log(txt);
}
log("START ITP");
	function xpath(query){return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
	var CurrentCredits=-1;
	var cargohold=-1;
	var amount;
	var allTags=xpath("//text()[contains(.,'Credits: $')]");
	var thisTag=allTags.snapshotItem(0);
	if(thisTag){
		CurrentCredits=thisTag.textContent.split("$")[1].split(",").join("");
log("found credits: "+CurrentCredits);
	}
	allTags=xpath("//text()[contains(.,'Cargo in Hold (')]");
	thisTag=allTags.snapshotItem(0);
	if(thisTag){
log("found hold");
		var hold=thisTag.textContent.split("(")[1].split(")")[0].split(",").join("").split("/");
		var curhold=hold[0]*1;
		var maxhold=hold[1]*1;
		cargohold=maxhold-curhold;
log("found cargo in hold. cargohold free: "+cargohold);
	}
	else{
log("hold not found. try finding by other means...");
		allTags=xpath("//input[@value='Buy']");
		var predefval;
		mc:for(var i=0;i < allTags.snapshotLength;i++){
			thisTag=allTags.snapshotItem(i);
			predefval=thisTag.previousSibling.previousSibling.value.split(",").join("");
			if(thisTag.parentNode.previousElementSibling.nodeName!="FORM"){
				amount=thisTag.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.split(" ")[1].split(",").join("");
			}
			else{
				amount=thisTag.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.split(" ")[1].split("(")[0].split(",").join("");
			}
			if(predefval<amount){
				cargohold=predefval;
				break mc;
			}
		}
log("no cargo in hold. cargohold found: "+cargohold);
	}
	if(cargohold == -1){
log("no cargohold found: aborting now");
	}
	else{
log("cargohold found: continue");
		cargohold=cargohold*1;
		CurrentCredits=CurrentCredits*1;
		allTags=xpath("//input[@value='Buy']");
		var mposs, price;
		buy:for(var i=0;i < allTags.snapshotLength;i++){
			thisTag=allTags.snapshotItem(i);
			if(thisTag.parentNode.previousElementSibling.nodeName!="FORM"){
log("planet found");
				price=thisTag.parentNode.previousElementSibling.previousElementSibling.textContent.split("$")[1].split(",").join("");
				amount=thisTag.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.split(" ")[1].split(",").join("");
			}
			else{
log("outpost found");
				price=thisTag.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent.split("$")[1].split(",").join("");
				amount=thisTag.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.split(" ")[1].split("(")[0].split(",").join("");
			}
			amount=amount*1;
			price=price*1;
log("amount: "+amount);
log("price: "+price);
			mposs=Math.floor(CurrentCredits/price);
			if(amount <= cargohold){
				if(amount <= mposs){
					thisTag.previousSibling.previousSibling.value=amount;
				}
				else if(mposs <= cargohold){
					thisTag.previousSibling.previousSibling.value=mposs;
				}
				else{
					thisTag.previousSibling.previousSibling.value=cargohold;
				}
			}
			else if(mposs <= cargohold){
				thisTag.previousSibling.previousSibling.value=mposs;
			}
			else{
				thisTag.previousSibling.previousSibling.value=cargohold;
			}
log("result: "+thisTag.previousSibling.previousSibling.value);
		}
	}
log("END ITP");
