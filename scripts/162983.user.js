// Klimtog's KOL 3-Day Pre-Ascension Checklist
// BETA
//
// ==UserScript==
// @name          3-Day Pre-Ascension Checklist
// @namespace     http://www.stupidcat.com/hosted_websites/klimtog/kol/softcore/checklist/klimcheck.user.js
// @description   Checks your inventory for ascension-relevent items
// @include       *127.0.0.1:*/charsheet.php
// @include       *kingdomofloathing.com/charsheet.php
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle('div,p{padding:0;margin:0}.clearfix:after{content:"";display:block;height:0;clear:both}#klimtogdiv{position:absolute;top:50%;left:50%;margin-top:-30%;margin-left:-46%;width:92%;min-height:76%;border:solid 1px #000;background:#fff;color:#000;display:none}#klimtogclosebutton{position:relative;width:100%;margin:0;padding:0}#checklistresults{width:98%;margin:10px auto;border-collapse:collapse}#checklistresults td,#checklistresults tr,#checklistresults th{border:solid 1px #000}.checkhead{width:100%;text-align:center;font-size:16px;padding:14px 0;font-weight:bold;margin-top:10px}.resultcontainer{width:100%;color:#fff}.result1{width:50%;background-color:#900;padding:5px}.result2{width:50%;background-color:#090;padding:5px}.expected{width:50%;padding:5px;color:#000}.optmsg{font-size:10px}');

function GM_get(page, callback) {
    var url = "";
    if (this.document.location.hostname.indexOf("127") >= 0) url = 'http://' + this.document.location.hostname + ":" + this.document.location.port + "/" + page;
    else url = 'http://' + this.document.location.hostname + "/" + page;
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'Cookie': document.cookie
        },
        onload: function (details) {
            if (typeof callback == 'function') {
                callback(details.responseText);
            }
        }
    });
}



function getSingleItem(itemFind,itemExpected,page,optional,optmessage){var startIndex=page.indexOf(itemFind);if(startIndex>=0){var m=page.substring(startIndex,page.indexOf("</span>",startIndex)).match(/\(\d*\)/);if(m!=null){var n=m[0].match(/\d{1,5}/);var itemNum=parseInt(n[0]);}else{var itemNum=1;}}else{var itemNum=0;}if(optional==1){var itemOptional='<span class="optional">*</span> ';}else{var itemOptional="";}if(itemNum<itemExpected){var itemOutput='<tr class="resultcontainer"><td class="result1">'+itemOptional+itemFind+optmessage+': <b>'+itemNum+'</b></td><td class="expected">Expected: '+itemExpected+'</td></tr>';}else{var itemOutput='<tr class="resultcontainer"><td class="result2">'+itemOptional+itemFind+optmessage+': <b>'+itemNum+'</b></td><td class="expected">Expected: '+itemExpected+'</td></tr>';}$("#checklistresults").append(itemOutput);}

function getTwoItems(itemFind1,itemFind2,itemExpected,page,optional,optmessage){var startIndex=page.indexOf(itemFind1);if(startIndex>=0){var m=page.substring(startIndex,page.indexOf("</span>",startIndex)).match(/\(\d*\)/);if(m!=null){var n=m[0].match(/\d{1,5}/);var itemNum1=parseInt(n[0]);}else{var itemNum1=1;}}else{var itemNum1=0;}var startIndex=page.indexOf(itemFind2);if(startIndex>=0){var m=page.substring(startIndex,page.indexOf("</span>",startIndex)).match(/\(\d*\)/);if(m!=null){var n=m[0].match(/\d{1,5}/);var itemNum2=parseInt(n[0]);}else{var itemNum2=1;}}else{var itemNum2=0;}if(optional==1){var itemOptional='<span class="optional">*</span> ';}else{var itemOptional="";}var itemTotal=itemNum1+itemNum2;if(itemTotal<itemExpected){var itemOutput='<tr class="resultcontainer"><td class="result1">'+itemOptional+itemFind1+" / "+itemFind2+optmessage+': <b>'+itemTotal+'</b></td><td class="expected">Expected: '+itemExpected+'</td></tr>';}else{var itemOutput='<tr class="resultcontainer"><td class="result2">'+itemOptional+itemFind1+" / "+itemFind2+optmessage+': <b>'+itemTotal+'</b></td><td class="expected">Expected: '+itemExpected+'</td></tr>';}$("#checklistresults").append(itemOutput);}

function getOutfit(piece1,piece2,piece3,outfitName,oExpected,page,optional){var opiece1=0;var opiece2=0;var opiece3=0;var startIndex=page.indexOf(piece1);if(startIndex>=0){var opiece1=1;}else{var opiece1=0;}var startIndex=page.indexOf(piece2);if(startIndex>=0){var opiece2=1;}else{var opiece2=0;}var startIndex=page.indexOf(piece3);if(startIndex>=0){var opiece3=1;}else{var opiece3=0;}if(optional==1){var itemOptional='<span class="optional">*</span> ';}else{var itemOptional="";}var outfitTotal=(opiece1+opiece2)+opiece3;if(outfitTotal==oExpected||outfitTotal>oExpected){var itemOutput='<tr class="resultcontainer"><td class="result2">'+itemOptional+outfitName+': <b>'+outfitTotal+'</b></td><td class="expected">Expected: '+oExpected+'</td></tr>';}else{var itemOutput='<tr class="resultcontainer"><td class="result1">'+itemOptional+outfitName+': <b>'+outfitTotal+'</b></td><td class="expected">Expected: '+oExpected+'</td></tr>';}$("#checklistresults").append(itemOutput);}

function getFoodBooze()
{
	
	$('a[rel="checkfood"]').replaceWith('<span rel="checkfood">Checking for food...</span>');
	
    GM_get("inventory.php?which=1",
    function findStatus(response) 
    {
		var pageText = response;

		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Food</td></tr>');
		
        getSingleItem("Boris\'s key lime pie", 1, pageText, 0, "");
		getSingleItem("Jarlsberg\'s key lime pie", 1, pageText, 0, "");
		getSingleItem("Sneaky Pete\'s key lime pie", 1, pageText, 0, "");
		getSingleItem("star key lime pie", 4, pageText, 0, "");
		getSingleItem("digital key lime pie", 3, pageText, 0, ' <span class="optmsg">(These or mainstat hi meins)</span>');
		getSingleItem("hot hi mein", 3, pageText, 0, ' <span class="optmsg">(mus, these or digital key lime pies)</span>');
		getSingleItem("sleazy hi mein", 3, pageText, 0, ' <span class="optmsg">(mox, these or digital key lime pies)</span>');
		getSingleItem("spooky hi mein", 3, pageText, 0, ' <span class="optmsg">(mys, these or digital key lime pies)</span>');
		getSingleItem("wet stew", 1, pageText, 0, "");
		getSingleItem("stunt nuts", 1, pageText, 0, "");
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Booze</td></tr>');
		
		getSingleItem("jar of squeeze", 2, pageText, 0, "");
		getTwoItems("Mon Tiki", "teqiwila slammer", 12, pageText, 1, ' <span class="optmsg">(only if you have free pulls)</span>');
		getTwoItems("yellow brick road", "gimlet", 12, pageText, 1, ' <span class="optmsg">(only if you have free pulls)</span>');
		getTwoItems("Mae West", "prussian cathouse", 12, pageText, 1, ' <span class="optmsg">(only if you have free pulls)</span>');
		$('span[rel="checkfood"]').html('Check complete!');
	});
} // End getFoodBooze() function //

function getEquipment()
{
	
	$('a[rel="checkequipment"]').replaceWith('<span rel="checkequipment">Checking for equipment...</span>');
	
	GM_get("inventory.php?which=2",
    function findStatus(response) 
    {

		var pageText = response;
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Outfits</td></tr>');
		
		getOutfit("Knob Goblin harem veil", "Knob Goblin harem pants", "NO THIRD PIECE", "Harem Outfit", 2, pageText, 0);
		getOutfit("7-Foot Dwarven mattock", "miner\'s helmet", "miner\'s pants", "Mining Outfit", 3, pageText, 0);
		getOutfit("eyepatch", "swashbuckling pants", "stuffed shoulder parrot", "Swashbuckling Outfit", 3, pageText, 0);
		getOutfit("star sword", "star staff", "star crossbow", "Star Weapons", 1, pageText, 0);
		getOutfit("filthy knitted dread sack", "filthy corduroys", "NO THIRD PIECE", "Filthy Hippy Outfit", 2, pageText, 1);
		getOutfit("beer helmet", "bejeweled pledge pin", "distressed denim pants", "Frat Warrior Outfit", 3, pageText, 1);
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Equipment</td></tr>');
		
		getSingleItem("ring of conflict", 1, pageText, 0, "");
		getSingleItem("C.A.R.N.I.V.O.R.E. button", 1, pageText, 0, "");
		getSingleItem("hockey stick of furious angry rage", 1, pageText, 1, ' <span class="optmsg">(if you\'re an asshole)</span>');
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Misc. Equipment</td></tr>');
		
		getSingleItem("star hat", 1, pageText, 0, "");
		getSingleItem("acoustic guitarrr", 1, pageText, 0, "");
		getSingleItem("Wand of Nagamar", 1, pageText, 0,  ' <span class="optmsg">(in case RNG screws you)</span>');
		
		$('span[rel="checkequipment"]').html('Check complete!');
	});
} // End getEquipment() function //


function getMisc()
{
	
	$('a[rel="checkmisc"]').replaceWith('<span rel="checkmisc">Checking for misc. items</span>');
	
	GM_get("inventory.php?which=3",
    function findStatus(response) 
    {

		var pageText = response;
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">NS Gate 1 Items</td></tr>');
		
		getSingleItem("gremlin juice", 1, pageText, 0, "");
		getSingleItem("wussiness potion", 1, pageText, 0, "");
		getSingleItem("thin black candle", 1, pageText, 0, "");
		getSingleItem("Mick\'s IcyVapoHotness Rub", 1, pageText, 0, "");
		getSingleItem("super-spiky hair gel", 1, pageText, 0, "");
		getSingleItem("Angry Farmer candy", 1, pageText, 0, "");
		getSingleItem("adder bladder", 1, pageText, 0, "");
		getSingleItem("Black No. 2", 1, pageText, 0, "");
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">NS Gate 2 Items</td></tr>');
		
		getSingleItem("jaba&ntilde;ero-flavored chewing gum", 1, pageText, 0, "");
		getSingleItem("handsomeness potion", 1, pageText, 0, "");
		getSingleItem("Meleegra&trade; pills", 1, pageText, 0, "");
		getSingleItem("Mick\'s IcyVapoHotness Rub", 1, pageText, 0, "");
		getSingleItem("pickle-flavored chewing gum", 1, pageText, 0, "");
		getSingleItem("marzipan skull", 1, pageText, 0, "");
		getSingleItem("tamarind-flavored chewing gum", 1, pageText, 0, "");
		getSingleItem("lime-and-chile-flavored chewing gum", 1, pageText, 0, "");
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">NS Tower Items</td></tr>');
		
		getSingleItem("baseball", 1, pageText, 0, "");
		getSingleItem("plot hole", 1, pageText, 0, "");
		getSingleItem("meat vortex", 1, pageText, 0, "");
		getSingleItem("sonar-in-a-biscuit", 1, pageText, 0, "");
		getSingleItem("leftovers of indeterminate origin", 1, pageText, 0, "");
		getSingleItem("stick of dynamite", 1, pageText, 0, "");
		getSingleItem("Knob Goblin firecracker", 1, pageText, 0, "");
		getSingleItem("inkwell", 1, pageText, 0, "");
		getSingleItem("mariachi G-string", 1, pageText, 0, "");
		getSingleItem("photoprotoneutron torpedo", 1, pageText, 0, "");
		getSingleItem("pygmy blowgun", 1, pageText, 0, "");
		getSingleItem("barbed-wire fence", 1, pageText, 0, "");
		getSingleItem("fancy bath salts", 1, pageText, 0, "");
		getSingleItem("razor-sharp can lid", 1, pageText, 0, "");
		getSingleItem("frigid ninja stars", 1, pageText, 0, "");
		getSingleItem("tropical orchid", 1, pageText, 0, "");
		getSingleItem("black pepper", 1, pageText, 0, "");
		getSingleItem("NG", 1, pageText, 0, "");
		getSingleItem("bronzed locust", 1, pageText, 0, "");
		getSingleItem("powdered organs", 1, pageText, 0, "");
		getSingleItem("spider web", 1, pageText, 0, "");
		getSingleItem("chaos butterfly", 1, pageText, 0, "");
		getSingleItem("disease", 1, pageText, 0, "");
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Other Quest-Related Items</td></tr>');
		
		getSingleItem("large box", 1, pageText, 0, ' <span class="optmsg">(NS gate 3)</span>');
		getSingleItem("ketchup hound", 1, pageText, 0, "");
		getSingleItem("drum machine", 1, pageText, 0, "");
		getSingleItem("star chart", 1, pageText, 0, "");
		getSingleItem("Mick\'s IcyVapoHotness Inhaler", 1, pageText, 0, ' <span class="optmsg">(extra one for the nuns)</span>');
		getSingleItem("cyclops eyedrops", 1, pageText, 1, ' <span class="optmsg">(for the filthworms)</span>');
		
		$("#checklistresults").append('<tr><td class="checkhead" colspan="2">Other Misc Items</td></tr>');
		
		getSingleItem("ninja pirate zombie robot head", 1, pageText, 0, ' <span class="optmsg">(this or clockwork pirate skull)</span>');
		getSingleItem("clockwork pirate skull", 1, pageText, 0, ' <span class="optmsg">(this or NPZR head)</span>');
		getSingleItem("milk of magnesium", 1, pageText, 1, ' <span class="optmsg">(day 1, for turn gen if needed)</span>');
		getSingleItem("facsimile dictionary", 1, pageText, 1, ' <span class="optmsg">(for extra meat)</span>');
		getSingleItem("spice melange", 1, pageText, 1, ' <span class="optmsg">(if you suck at turn-gen)</span>');
		getSingleItem("bartender-in-the-box", 1, pageText, 1, ' <span class="optmsg">(if you don\'t have Inigo\'s)</span>');
		
		$('span[rel="checkmisc"]').html('Check complete!');
	});
} // End getEquipment() function //


$(document).ready(function() {

	$('a[href="showconsumption.php#booze"]').parent().parent().after('<tr><td colspan="2" style="text-align: center;"><a href="#" rel="klimtogchecklist">Run 3-Day Pre-Ascension Checklist</a></td></tr>');
	
	$('body').prepend('<div id="klimtogdiv"></div>');
	
	$('#klimtogdiv').prepend('<p id="klimtogclosebutton"><a href="#" rel="klimtogcheckclose" style="position: absolute; right: 0; margin-top: -10px; margin-right: -10px;"><img src="http://i111.photobucket.com/albums/n134/KlimtogWasTaken/x.png" alt="Close" /></a></p>');
	
	$('#klimtogclosebutton').after('<div id="checklistcheck" style="text-align: center; padding: 10px;"><a href="#" rel="checkfood">Check Food and Booze</a><br /><br /><a href="#" rel="checkequipment">Check Equipment</a><br /><br /><a href="#" rel="checkmisc">Check Misc. Items</a><br /><br /><span>* = optional</span></div>');
	$('#checklistcheck').after('<table id="checklistresults"></table>');
	
	$('a[rel="klimtogchecklist"]').click(function() {
		$('#klimtogdiv').show();
		return false;
    });
	
	$('a[rel="klimtogcheckclose"]').click(function() {
		$('#klimtogdiv').hide();
		return false;
    });
	
	$('a[rel="checkfood"]').click(function() {
		getFoodBooze();
		return false;
	});
	$('a[rel="checkequipment"]').click(function() {
		getEquipment();
		return false;
	});
	$('a[rel="checkmisc"]').click(function() {
		getMisc();
		return false;
	});
});