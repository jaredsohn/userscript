// ==UserScript==
// @name           Mall Helper
// @author         Picklish
// @contributor    hellion
// @license        GPL v2.0 http://www.gnu.org/copyleft/gpl.html
// @namespace      http://picklish.kol.googlepages.com
// @include        *kingdomofloathing.com/login.php*
// @include        *kingdomofloathing.com/main.php*
// @include        *kingdomofloathing.com/searchmall.php*
// @include        *kingdomofloathing.com/game.php
// @include        *127.0.0.1:*/login.php*
// @include        *127.0.0.1:*/main.php*
// @include        *127.0.0.1:*/searchmall.php*
// @include		   *127.0.0.1:*/game.php
// @exclude        *forums.kingdomofloathing.com*
// @description    multi-buy with limits for KoL's mall search page
// @version        0.12
// ==/UserScript==

// ---------------------------------------------------------------------------

// VERSION HISTORY
// 0.12 - Hellion fixed a niggling button-placement issue
// 0.11 - Hellion eliminated some cruft about pluralizing that relies on a no-longer-existent DB.
// 0.9 - Hellion fixed to work with the new searchmall.php page (generic fix-up only; needs further customizing).
// 0.81 - Hellion recoded the password hash grabbing routine (mostly via copy/paste from Mr. Script) when it mysteriously stopped working.
// 0.8 - Fixed display-related bugs.
// 0.7 - Fixed small bug with return text.
//     - Now works with my Use Acquired Item script.
//     - Added version checking.
//     - Added images.  Because I can.
// 0.6 - Now stores per-item meat limits.
// 0.5 - Blah, blah, fishcakes.  Fixed bug from mall layout change.
// 0.4 - Minor bug fixes
//     - Better error text
// 0.3 - Multibuying works now.
// 0.2 - Fixed double reload bug.
//     - Now with better looking numbers.
//     - Character pane now refreshes properly.
// 0.1 - Initial (unpublicized) Release

// TODO
// 3) for single and multibuying, just add forms via a large text block,
//    rather than creating elements via objects.
// 6) stop button

//var dbdownload = "http://ca.geocities.com/picklish_kol/itemdb_cat-1.0.txt";
// ---------------------------------------------------------------------------
// VERSION CHECKER 1.1

// - BEGIN MANUAL SECTION -
var currentVersion = "0.12";
var scriptURL = "http://www.noblesse-oblige.org/hellion/scripts/mallhelper.user.js";
// var scriptURL = "http://picklish.kol.googlepages.com/picklishskolscriptsmallh.user.js";
var scriptName = "Picklish's Mall Helper Script";
var showOnlyErrors = true;

// The elements of resources are four element arrays which contain a
// resource name (for displaying), a resource link (for downloading
// the resource), a downloaded value name (for storing the result of the
// resource in a greasemonkey variable of that name), and a time in days
// before re-checking this resource.
var resources = new Array(
    new Array(
        "Item Info Database",
		"", 		// was: dbdownload,
        "db",
        4000
    )
);

// - END MANUAL SECTION -

// - BEGIN CUT AND PASTE SECTION -
var datePrefix = "CheckTime-";

function MakeBullet(message)
{
    return "<tr><td><font size=-2>&nbsp;&#42;" + message + "</font></td></tr>";
}

// Check for an updated script version and print the result box...
function CheckScriptVersion()
{
	GM_log("checking mall helper version...");
    // Preemptively set error, in case request fails...
    GM_setValue("webVersion", "Error")

    GM_xmlhttpRequest({
        method: "GET",
        url: scriptURL,
        headers:
        {
//            "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
            "Accept": "text/html",
        },
        onload: function(responseDetails)
        {
            if (responseDetails.status == "200")
            {
                var m = responseDetails.responseText.match(
                    /version\s*(\w+(?:\.\w+)?)/);
				GM_log("version received="+m[1]);
                if (m && !isNaN(m[1]))
                {
                    GM_setValue("webVersion", m[1]);
                }
            }

            var message;
            var warningLevel = 0;
            var forceGet = false;

            var webVer = parseFloat(GM_getValue("webVersion"));
            if (GM_getValue("webVersion", "Error") == "Error")
            {
                message = "Failed to check website for updated version of script.";
                warningLevel = 1;
            }
            else if (isNaN(webVer))
            {
                message = "Couldn't find suitable version number.";
                warningLevel = 1;
            }
            else
            {
                if (webVer > parseFloat(currentVersion))
                {
                    message = "Right click <a href='" + scriptURL + "' TARGET='_blank'>here</a> and select 'Install User Script' for Version " + webVer + ".";
                    warningLevel = 2;
                }
                else
                {
                    if (webVer < parseFloat(currentVersion))
                    {
                        message = "Script is newer than web version.";
                        warningLevel = 0;
                        forceGet = true;
                    }
                    else
                    {
                        message = "Script is latest version.";
                        warningLevel = 0;
                    }
                }
            }

            // In either case, check remaining resources...
            CheckResource(0, warningLevel, MakeBullet(message), forceGet);
        }
    });
}

// look for our web-based data and download it if our local copies are too out-of-date
function CheckResource(index, warningLevel, message, forceGet)
{
// ---
// sadly, our only resource at this point no longer exists.
// happily, we don't really need it.
// Let's just skip the whole check thing for now.		06Jan10 Hellion
//	return;
// ---	
	GM_log("message="+message);
    if (index >= resources.length)
    {
        PrintCheckVersionBox(warningLevel, message, forceGet);
        return;
    }

    var name = resources[index][0];
    var url = resources[index][1];
    var varname = resources[index][2];
    var daylimit = parseFloat(resources[index][3]);

    var now = new Date();

    // if don't need to get...
    if (!forceGet && GM_getValue(datePrefix + varname, 0) != 0 &&
        (now.getTime() <= Date.parse(GM_getValue(datePrefix + varname)) +
        daylimit * 86400000))
    {
        var timeString;
        if (daylimit == 1.0)
            timeString = daylimit + " day";
        else
            timeString = daylimit + " days";
        message += MakeBullet(name + ": Less than " + timeString + 
            " old, using cached version.");
        CheckResource(index + 1, warningLevel, message, forceGet);
        return;
    }

    // otherwise we need to get this resource...
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
//		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',},
        varname: varname,
        name: name,
        onload: function(responseDetails)
        {
            if (responseDetails.status != 200)
            {
                GM_log("Error getting " + this.name + "@" + this.url + ": " + 
                    responseDetails.status);
                
                if (GM_getValue(varname, "") == "")
                {
                    if (warningLevel < 2)
                        warningLevel = 2;
                    message += MakeBullet(this.name + ": Error accessing resource.  No cached version to use.");
                }
                else
                {
                    if (warningLevel < 1)
                        warningLevel = 1;
                    message += MakeBullet(this.name + ": Error accessing stale resource.  Using cached version.");
                }
            }
            else
            {
                GM_setValue(this.varname, responseDetails.responseText);
                var size = GM_getValue(this.varname).length;
                message += MakeBullet(this.name + ": Downloaded new version (" + size + " bytes.)");
                GM_log("Got " + this.varname + " (" + size + " bytes)");

                var now = new Date();
                GM_setValue(datePrefix + this.varname, now.toString());
            }

            CheckResource(index + 1, warningLevel, message, forceGet);
        }
    });
}

function PrintCheckVersionBox(resourceWarningLevel, resourceMessage, forceBox)
{
    // set color from warning level
    var color;
    if (resourceWarningLevel > 1)
    {
        color = "red";
    }
    else if (resourceWarningLevel > 0)
    {
        color = "orange";
    }
    else
    {
        color = "blue";

        // if no errors, return...
        if (!forceBox && (showOnlyErrors || 
            GM_getValue("showOnlyErrors", false)))
        {
            return;
        }
    }

    var span = document.createElement("center");
    span.innerHTML = "<table style='border: 1px solid " + color + "; margin-bottom: 4px;' width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=" + color + "><font color=white size=-2><b>" + scriptName + "</b> " + currentVersion + ":</font></td></tr>" + resourceMessage + "</table>";

    document.body.insertBefore(span, document.body.firstChild);
}

if (window.location.pathname == "/game.php")
{
    CheckScriptVersion();
}
// - END CUT AND PASTE SECTION -
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
function Commaify(num)
{
    // stringify
    num = num + "";

    if (num.length <= 3)
        return num;

    var result = num.substring(num.length - 3);
    var temp = num.substring(0, num.length - 3);

    while (temp.length > 0)
    {
        var len = temp.length < 3 ? temp.length : 3;

        result = temp.substring(temp.length - len) + "," + result;
        temp = temp.substring(0, temp.length - len);
    }

    return result;
}
// ---------------------------------------------------------------------------
function ParseAccount(text)
{
//	GM_log("Parsing account hash info");
    // return 1 on success, 0 otherwise
//	GM_log(text);
    var m = text.match(
		/var pwdhash = ['\"]?([^'\"]+)['\"]?>/m);
//        /<input type=hidden name=pwd value=['\"]?([^'\"]+)['\"]?>/m);
    if (!m) return 0;
    GM_setValue("pwdhash", m[1]);
//	GM_log("ParseAccount: got pwdhash: " + GM_getValue("pwdhash", ""));
    return 1;
}
// ---------------------------------------------------------------------------
// some stuff copied from Mr. Script to see if getting the Pwd Hash from a different screen works better ...  Hellion
// ----------------------------------------------------
// GM_GET: Stolen gleefully from OneTonTomato. Tee-hee!
// ----------------------------------------------------
function GM_get(dest, callback, errCallback)
{	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://' + dest,
	  	onerror:function(error)
	  	{	if( typeof(errCallback)=='function' )
				callback(details.responseText);
			else GM_log("GM_get Error: " + error);
	  	},
		onload:function(details) {
			if( typeof(callback)=='function' ){
				callback(details.responseText);
}	}	});	}



function GetDomain()
{	return document.location.host;	}
function GetPwd()
{	return GM_getValue("pwdhash","");}
function SetPwd(hash)
{	GM_setValue("pwdhash", hash);}
function FindHash()
{	
	GM_log("finding pwd hash...");
	GM_get(GetDomain() + '/store.php?whichstore=m',
	function(blah)
	{	var hashIndex = blah.indexOf("name=phash");
		var hash = blah.substring(hashIndex+18, hashIndex+50);
		SetPwd(hash); 
//		GM_log("FindHash: got hash: " + hash);
		if (hashIndex < 1) return 0;
		return 1;
	});
}
// end copy...

function GetPwdHash()
{
//	GM_log("getting pwd hash from http://" + window.location.hostname + "/charpane.php");
    // if we're at the mall, then we can assume we're not in a fight
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://' + window.location.hostname + "/charpane.php", //was account.php
        headers: {
//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',},
        onload: function(responseDetails)
        {
            if (responseDetails.status != 200)
            {
                GM_log("Error getting account: " + responseDetails.status);
                GM_log(responseDetails.responseText);
                return;
            }

            if (ParseAccount(responseDetails.responseText))
            {
                ModifyMallPage();
            }
        }
    });
}

// ---------------------------------------------------------------------------
// attempt to make our purchase notification as much like KoL's native format as possible.
// ---------------------------------------------------------------------------
function GetItemText(itemNum, howMany, itemName)
{
    var item = '<tr>' + 
		'<td>&nbsp;</td>' + // space for the image that we no longer display
		'<td valign=top>You acquire: <b>' +itemName+'</b> ('+howMany+')</td></tr>'; //itemname, no plural form anymore
    return item;
}
// ---------------------------------------------------------------------------
function BuyMultiResults(href, itemnum, itemname, meatspent, itemsbought, 
    error)
{
    // determine average
    var avg = 0;
    if (itemsbought > 0)
        avg = Math.ceil(meatspent / itemsbought);
    if (itemsbought > 1 && meatspent > 0)
        avgText = " (" + Commaify(avg) + " each.)";
    else
        avgText = ".";

    // determine acquired, spent, and error messages
    var acquiredText = "";
    var errorText = "";

    if (itemsbought > 0)
    {
        var acquiredText = GetItemText(itemnum, itemsbought, itemname.innerHTML) + '<tr><td></td><td valign=center>You spent <b>' + Commaify(meatspent) + '</b> meat' + avgText + '</td></tr>';
    }
    else if (error == "")
    {
        errorText = "<tr><td></td><td valign=center>You didn't purchase any items.</td></tr>";
    }

    if (error != "")
    {
        errorText = "<tr><td></td><td valign=center>";
        if (itemsbought > 0)
        {
            errorText += "You only purchased " + Commaify(itemsbought) + 
                " items";
        }
        else
        {
            errorText += "You didn't purchase any items";
        }

        errorText += " because " + error + "</td></tr>";
    }

    // generate final result table
    var resultText = '<center><table width=95%  cellspacing=0 cellpadding=0><tr><td style="color: white;"' +
					'align=center bgcolor=blue><b>Results:</b></td></tr><tr><td style="padding: 5px; border: 1px solid blue;">' +
					'<center><table><tr><td><center><table>' + acquiredText + errorText + 
					'</table></center></td></tr></table></center></td></tr><tr><td height=4></td></tr></table></center>';

    var charpaneRefresh = "<script language=Javascript><!--\n parent.charpane.location.href='charpane.php';\n//--></script>";

    GM_setValue("delayedresults", resultText + charpaneRefresh + // descitem +
        GM_getValue("delayedresults", ""));

    // reload
    window.document.location = href;
}
// ---------------------------------------------------------------------------
function BuyMultiHelper(href, itemname, linknum, maxlinknum, itemnum, 
    maxquantity, maxmeat, maxmeatperitem, meatspent, itemsbought)
{
    var whichstore;
    var quantity;
    var price = 0;
    var storeInput;
    var error;

    while (linknum < maxlinknum)
    {
        error = "";
        storeInput = document.getElementById("store" + linknum);
        if (!storeInput)
        {
            GM_log("Finding link error:" + linknum);
            error = "of an internal error finding link " + linknum;
            break;
        }
        whichstore = storeInput.value;
        price = parseInt(storeInput.getAttribute("price"));

        if (storeInput.getAttribute("itemnum", 0) == itemnum && 
            price <= maxmeatperitem)
        {
            var max = parseInt(storeInput.getAttribute("max"));
            if (max)
            {
                // buy as many as possible or up to the limit
                // requested if that would go over
                if (max + itemsbought > maxquantity)
                    quantity = maxquantity - itemsbought;
                else
                    quantity = max;

                var premeatlimit = quantity;

                // test this amount against max meat spent limit
                if (quantity * price + meatspent > maxmeat)
                {
                    var remaining = maxmeat - meatspent;
                    quantity = Math.floor((maxmeat - meatspent) / price);
                }
        
                if (premeatlimit > 0 && quantity <= 0)
                {
                    error = "of your total limit of " + 
                        Commaify(maxmeat) + " meat.";
                }

                // we have a valid quantity, so quit this loop...
                break;
            }
        }
        linknum++;
    }

    // if we've run out of stores...
    if (linknum >= maxlinknum || quantity <= 0 || price > maxmeatperitem)
    {
        var error;
        if (itemsbought >= maxquantity)
        {
            error = ""; 
        }
        else if (price > maxmeatperitem)
        {
            error = "of your limit of " + Commaify(maxmeatperitem) + 
                " meat per item.";
        }
        else if (error == "" && quantity <= 0)
        {
            error = "you couldn't find enough stores to buy from.";
        }
        BuyMultiResults(href, itemnum, itemname, meatspent, itemsbought, error);
    }
    else
    {
        // update text node with current status
        var textnode = document.getElementById("nowbuying");
        if (textnode)
        {
            textnode.innerHTML = "Now buying " + Commaify(quantity) + " from <i>" + storeInput.getAttribute("storename", "") + "</i>.";

            if (itemsbought > 0)
            {
                textnode.innerHTML += "<br>Have already bought " + Commaify(itemsbought) + " for " + Commaify(meatspent) + " meat.";
            }
        }

        BuyMultiQuantity(href, itemname, linknum, maxlinknum, itemnum, 
            maxquantity, maxmeat, maxmeatperitem, meatspent, itemsbought, 
            whichstore, price, quantity);
    }
}

function BuyMultiQuantity(href, itemname, linknum, maxlinknum, itemnum, 
    maxquantity, maxmeat, maxmeatperitem, meatspent, itemsbought, whichstore, 
    price, quantity)
{
    var whichitem = Pricify(price, itemnum);

	var theData = "buying=1&quantity=" + quantity + "&whichitem=" + whichitem +
		"&pwd=" + GM_getValue("pwdhash","") + "&whichstore=" + whichstore;

    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://' + window.location.hostname + "/mallstore.php",
        headers: {
//		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html', 
            'Content-type': 'application/x-www-form-urlencoded'},
        data: theData,
        // Pass everything we know...
        searchhref: href,
        itemname: itemname,
        linknum: linknum,
        maxlinknum: maxlinknum,
        itemnum: itemnum,
        maxquantity: maxquantity,
        maxmeat: maxmeat,
        maxmeatperitem: maxmeatperitem,
        meatspent: meatspent,
        itemsbought: itemsbought,
        whichstore: whichstore,
        price: price,
        onload: function(responseDetails)
        {
            if (responseDetails.status != 200)
            {
                GM_log("BuyMultiQuantity response: " + responseDetails.responseText);
                BuyMultiResults(this.searchhref, this.itemnum, this.itemname, 
                    this.meatspent, this.itemsbought,
                    "the page returned an error.");
                return;
            }

            var error = "";
            var itemsbought = this.itemsbought;
            var meatspent = this.meatspent;
            var remainingQuant = 0; // if zero, then go to next store.
            var doneBuying = false;

            if (responseDetails.responseText.indexOf(
                ">You acquire ") != -1)
            {
                // valid purchase, parse number bought since
                // it may not be the same as the number requested
                var acquired = 0; 
                if (responseDetails.responseText.indexOf(
                    ">You acquire an item:") != -1)
                {
                    acquired = 1;
                }
                else
                {
                    var m = responseDetails.responseText.match(
                        /You acquire <b>([0-9]+) /);
                    if (m)
                    {
                        acquired = parseInt(m[1]);
                    }
                }

                if (acquired > 0)
                {
                    itemsbought += acquired;
                    meatspent += acquired * this.price;
                }
                else
                {
                    error = "there was an error determining number acquired.";
                    GM_log(error);
                    GM_log(responseDetails.responseText);
                    doneBuying = true;
                }
            }
            else
            {
                // something wrong
                GM_log("BuyMultiQuantity unspecified error: " + responseDetails.responseText);
                if (responseDetails.responseText.indexOf(
                    "<td>You can't afford that item.</td>") != -1)
                {
                    error = "you do not have enough meat.";
                    doneBuying = true;
                }
				else if (responseDetails.responseText.indexOf(
					"<td>Invalid password submitted.</td>") != -1)
				{
					error = "I don't have the right password hash for you.";
					doneBuying = true;
				}
                else if (responseDetails.responseText.indexOf(
                    "<td>You may only buy ") != -1)
                {
                    // limit issues
                    var m = responseDetails.responseText.match(/<td>You may only buy ([0-9]+) of this item per day from this store.<\/td>/);
                    if (m)
                    {
                        remainingQuant = parseInt(m[1]);
                    }
                    else
                    {
                        m = responseDetails.responseText.match(/<td>You may only buy ([0-9]+) of this item per day from this store\. You have already purchased ([0-9]+) in the last 24 hours\.<\/td>/);
                        if (m)
                        {
                            var limit = parseInt(m[1]);
                            var bought = parseInt(m[2]);
                            remainingQuant = limit - bought;
                        }
                        else
                        {
                            error = "there was an error parsing the limits.";
                            GM_log(error);
                            GM_log(responseDetails.responseText);
                            doneBuying = true;
                        }
                    }
                }
                else
                {
                    if (responseDetails.responseText.indexOf(
                        "This store doesn't have that item at that price") != 
                        -1 || responseDetails.responseText.indexOf(
                        "<td>That player will not sell to you") !=
                        -1)
                    {
                        // Nothing to do.  Go on to the next store.
                    }
                    else
                    {
                        GM_log("there was an unknown error.");
                        GM_log(responseDetails.responseText);
                        doneBuying = true;
                    }
                }
            }

            if (doneBuying || itemsbought >= maxquantity ||
                meatspent >= maxmeat)
            {
                if (itemsbought >= maxquantity)
                {
                    error = "";
                }
                else if (meatspent >= maxmeat)
                {
                    error = "of your total limit of " + Commaify(maxmeat) + 
                        " meat.";
                } 
                BuyMultiResults(this.searchhref, this.itemnum, this.itemname, 
                    meatspent, itemsbought, error);
            }
            else if (remainingQuant)
            {
                BuyMultiQuantity(this.searchhref, this.itemname, 
                    this.linknum, this.maxlinknum, 
                    this.itemnum, this.maxquantity, this.maxmeat, 
                    this.maxmeatperitem, meatspent, itemsbought, 
                    this.whichstore, this.price, remainingQuant)
            }
            else
            {
                BuyMultiHelper(this.searchhref, this.itemname, 
                    this.linknum + 1, this.maxlinknum,
                    this.itemnum, this.maxquantity, this.maxmeat, 
                    this.maxmeatperitem, meatspent, itemsbought);
            }
        }
    });
}
// ---------------------------------------------------------------------------
function BuyMulti()
{
    var multistoreform = document.getElementById("multistorebuy");
    var mstextnode = document.getElementById("multistoretextnode");
    var howmanyinput = document.getElementById("multihowmany");
    var maxmeatinput = document.getElementById("meatlimit");
    var maxmeatperiteminput = document.getElementById("meatlimitperitem");
    if (!multistoreform || !howmanyinput || !maxmeatinput ||
        !maxmeatperiteminput || !mstextnode)
    {
        return;
    }

    var itemnum = multistoreform.getAttribute("itemnum", 0);
    var howmany = parseInt(howmanyinput.value);
    var maxmeat = parseInt(maxmeatinput.value);
    var maxmeatperitem = parseInt(maxmeatperiteminput.value);
    var itemname = document.getElementById("multiitemnametext");
    if (itemnum == 0 || howmany <= 0)
        return;

    // save custom
    if (document.getElementById("custommeatlimit").checked)
    {
        GM_setValue("meatlimit-" + itemnum, maxmeat);
    }
    if (document.getElementById("custommeatlimitperitem").checked)
    {
        GM_setValue("meatlimitperitem-" + itemnum, maxmeatperitem);
    }

    // If we get here, we're eventually going to print results and reload,
    // so get rid of the multistoreform.
    mstextnode.innerHTML = "<span>Buying " + Commaify(howmany) + " X <b>" + itemname.innerHTML + "</b> (Meat limit: " + Commaify(maxmeat) + ". Max per item: " + Commaify(maxmeatperitem) + ".)</span><br><span id=nowbuying></span>";

    BuyMultiHelper(window.document.location.href, itemname, 0, 
        multistoreform.getAttribute("numlinks", 0),
        itemnum, howmany, maxmeat, maxmeatperitem, 0, 0);
}
// ---------------------------------------------------------------------------
function BuyItem()
{
    var onestoreform = document.getElementById("onestorebuy");
    var howmany = document.getElementById("howmany");
    if (!onestoreform || !howmany)
        return;

    var theData = "buying=1&pwd=" + GM_getValue("pwdhash", "") + 	
        "&whichstore=" + onestoreform.getAttribute("whichstore") +
        "&whichitem=" + onestoreform.getAttribute("whichitem") +
        "&quantity=" + howmany.value;

    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://' + window.location.hostname + "/mallstore.php",
        headers: {
//		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html', 
            'Content-type': 'application/x-www-form-urlencoded'},
        data: theData,
        href: window.document.location.href,
        onload: function(responseDetails)
        {
            if (responseDetails.status != 200)
            {
                GM_log("ERROR: " + responseDetails.responseText);
                return;
            }

            // store results
            var startText = "<table width=95";
            var endText = "<td height=4></td></tr></table>";

            var startLoc = responseDetails.responseText.indexOf(startText);
            var endLoc = responseDetails.responseText.indexOf(endText) +
                endText.length;

            var resultText = responseDetails.responseText.substring(
                startLoc, endLoc);

            var charpaneRefresh = '<script language=Javascript><!--\n parent.charpane.location.href="charpane.php";\n//--></script>';

            GM_setValue("delayedresults", resultText + charpaneRefresh +
                GM_getValue("delayedresults", ""));

            // Reload search page:
            // We can't just do a reload, because win.doc.loc is the
            // purchase href and not the search.
            window.document.location.href = this.href;
        }
    });
}
// ---------------------------------------------------------------------------
function SelectThisStore()
{
    SelectStore(this);
}
// ---------------------------------------------------------------------------
function Pricify(price, itemnum)
{
    // My kingdom for a sprintf...
    switch((price + "").length)
    {
    case 0: spacer = "000000000"; break;
    case 1: spacer = "00000000"; break;
    case 2: spacer = "0000000"; break;
    case 3: spacer = "000000"; break;
    case 4: spacer = "00000"; break;
    case 5: spacer = "0000"; break;
    case 6: spacer = "000"; break;
    case 7: spacer = "00"; break;
    case 8: spacer = "0"; break;
    }

    return itemnum + spacer + price;
}
// ---------------------------------------------------------------------------
function SelectStore(store)
{
    var storeName = document.getElementById("storename");
    var maxNode = document.getElementById("maxtext");
    var onestoreform = document.getElementById("onestorebuy");
    var multistoreform = document.getElementById("multistorebuy");
    var itemName = document.getElementById("itemnametext");
    var itemName2 = document.getElementById("multiitemnametext");
    if (!storeName || !maxNode || !itemName || !onestoreform
        || !itemName2 || !multistoreform
        )
    {
        return;
    }

    // visible stuff
    storeName.innerHTML = store.getAttribute("storename");
    maxNode.innerHTML = "(max " + store.getAttribute("max") + ")";
    itemName.innerHTML = store.getAttribute("itemname");
    itemName2.innerHTML = itemName.innerHTML;

    // important stuff
    onestoreform.setAttribute("whichstore", store.getAttribute("value"));
    onestoreform.setAttribute("price", store.getAttribute("price"));

    var spacer = "";
    var price = store.getAttribute("price");
    var itemnum = store.getAttribute("itemnum");
    onestoreform.setAttribute("whichitem", Pricify(price, itemnum));
    multistoreform.setAttribute("itemnum", itemnum);

    // loop through stores and update the multi buy form with the correct
    // item (in case it changed)
    var multistoreform = document.getElementById("multistorebuy");
    var maxlinknum = multistoreform.getAttribute("numlinks", 0);

    var totalMeat = 0;
    var maxPrice = 0;
    var totalItems = 0;
    for (var linknum = 0; linknum < maxlinknum; linknum++)
    {
        storeInput = document.getElementById("store" + linknum);
        if (storeInput && storeInput.getAttribute("itemnum", "") == itemnum)
        {
            var q = parseInt(storeInput.getAttribute("max", 0));
            var p = parseInt(storeInput.getAttribute("price", 0));
            totalItems += q;
            maxPrice = p;
            totalMeat += q * p;
        }
    }

    // respect stored values
    var storedLimit = GM_getValue('meatlimit-' + itemnum, 0);
    var storedLimitPerItem = GM_getValue('meatlimitperitem-' + itemnum, 0);

    document.getElementById('custommeatlimit').checked = (storedLimit != 0);
    document.getElementById('custommeatlimitperitem').checked = (storedLimitPerItem != 0);

    document.getElementById('meatlimit').value = storedLimit ? storedLimit : totalMeat;
    document.getElementById('meatlimitperitem').value = storedLimitPerItem ? storedLimitPerItem :
        maxPrice;
    document.getElementById('meatlimit').setAttribute("default", totalMeat);
    document.getElementById('meatlimitperitem').setAttribute("default", maxPrice);
    document.getElementById('multiitemlimit').innerHTML = " from multiple stores (max " + Commaify(totalItems) + " total.)";

    UpdateHowMany();
}
// ---------------------------------------------------------------------------
function UpdateHowMany()
{
    var priceNode = document.getElementById("onestorebuy");
    var costNode = document.getElementById("costtext");

    if (!priceNode || !costNode)
        return;

    price = priceNode.getAttribute("price");
    if (!price && price != 0)
        return;

    costNode.innerHTML = " for " + Commaify(price) + " meat each";
}
// ---------------------------------------------------------------------------
function AutoCheckMeatLimit()
{
    var input = document.getElementById(this.getAttribute("tiedinput"));
    input.checked = true;

    SelectCustomMeatLimit(input);
}
// ---------------------------------------------------------------------------
function SelectCustomMeatLimitForThis()
{
    SelectCustomMeatLimit(this)
}
// ---------------------------------------------------------------------------
function SelectCustomMeatLimit(chkbox)
{
    var multistoreform = document.getElementById("multistorebuy");
    var itemnum = multistoreform.getAttribute("itemnum", 0);

    var txt = chkbox.getAttribute("tiedinput");

    if (chkbox.checked)
    {
        GM_setValue(txt + "-" + itemnum, 
            document.getElementById(txt).value);
    }
    else
    {
        // disable
        GM_setValue(txt + "-" + itemnum, 0);

        // set back to default
        var input = document.getElementById(txt);
        var oldvalue = input.getAttribute("default", 0);
        input.value = oldvalue;
    }
}
// ---------------------------------------------------------------------------
function ModifyMallPage()
{
//	GM_log("starting ModifyMallPage()");
    if (document.body.innerHTML.indexOf(
        "<center>No such item was found in the Mall.") != -1)
    {
        return;
    }

    // append delayed results
    var delayedresults = GM_getValue("delayedresults", "");
    if (delayedresults != "")
    {
        var results = document.createElement("center");
        results.innerHTML = delayedresults;
        document.body.insertBefore(results, document.body.firstChild);
        GM_setValue("delayedresults", "");
    }

    // add text column
    var searchResults;
    var bs = document.getElementsByTagName("b");
    for (var i = 0; i < bs.length; i++)
    {
        var b = bs[i];
//		GM_log("bs["+i+"]="+b.innerHTML);
        if (b.innerHTML.indexOf("Search Results") != -1)
        {
//			GM_log("saving as searchResults");
            searchResults = b;
            b.innerHTML = "";
        }
        else if (b.innerHTML.indexOf("Price:") != -1)
        {
            var td = document.createElement("td");
			td.setAttribute("class","tiny");
            td.innerHTML = "<b><u>Select Item:</u></b>";
            b.parentNode.parentNode.appendChild(td);
 //           break;
        }
    }
    if (!searchResults)
        return;

    searchResults = searchResults.parentNode;

    // for each link, create a radio button
	// 18Mar09 Hellion: but hide it, unless it's the first store for a given item number.
	// 		The button is to select the class of item, not to select the specific store, since the advent of the "buy/buy some" links.
    var linkNum = 0;
    var firstStore;
	var itemName;
    var anchors = document.getElementsByTagName("a");
    var totalMeat = 0;
    var totalItems = 0;
    var maxPrice = 0;
    var firstItem = 0;
	var firstButton = 0;
    for (var i = 0; i < anchors.length; i++)
    {
        var a = anchors[i];
        var style = a.getAttribute("style");
        var href = a.getAttribute("href");
        var tr = a.parentNode.parentNode;

 // first, look for the item name in a link by itself.	
		if (href) {
			var im = href.match(
				/pudnuggler/);
			if (im) {
				itemName = a.innerHTML;
//				GM_log("item name = "+itemName);
				firstButton = 1;
				continue;		// if we found the item name, give up on this line; it's got nothing else for us.
			}
		}

// first-level check to see if this is a store line: does it have the right link?  And if it is a store link, is it not-grayed-out?  
// if it's not a store, or if it is grayed out, skip it.
		if (!href || href.indexOf("mallstore.php") == -1 ||
            (style && style.indexOf("color: gray;") != -1))
        {
            continue; 
        }
		
        // parse store link for info
        var m = href.match(
            /whichstore=([0-9]+)&searchitem=([0-9]+)&searchprice=([0-9]+)/);
        if (!m)			// not a store line.  move on.
            continue;
        var whichstore = m[1];
        var itemNum = m[2];
        var price = m[3];

		m = a.innerHTML.match(/&nbsp;Meat/);		// the price is a link to the store, as well as the store name.  skip parsing the price. 
		if (m) continue;
		
        m = tr.innerHTML.replace(/,/,"").match(
            /stock">([0-9]+)<\/td><td class="small">([0-9]+)&nbsp;\/&nbsp;day/);
        var max = 0;
        if (m)		// found both a quantity and a limit, from the look of things.
        {
            var quant = parseInt(m[1]);
            var limit = parseInt(m[2]);
            if (quant > limit)
                max = limit;
            else
                max = quant;
        }
        else
        {
		// try again, looking for just a quantity this time.
            m = tr.innerHTML.replace(/,/,"").match(/<td class="small stock">([0-9]+)/);
            if (m)
            {
                max = parseInt(m[1]);
            } 
        }
		// if we were unable to sniff out at least a quantity, then we give up on this line.
        if (max == 0)
            continue;

//		Here's the actual radio button creation.
//		18mar09 Hellion: Due to the fact that I'm just hacking this up to work again rather than refactoring it properly,
//		the conversion of the button to "select this item" instead of "select this store" is almost entirely cosmetic.
//		It still actually selects the individual store as well, but the "multiple-buy" form ignores that element of it,
//		and the "single-buy" form is now hidden.
//		So, to avoid having a line full of extra buttons, we hide all but the first for a given item name.
		tr.appendChild(document.createElement("td"));	// extra blank column to align things properly.
        var td = document.createElement("td");
        td.setAttribute("align", "right");
        tr.appendChild(td);

        var input = document.createElement("input");
        input.setAttribute("name", "storeselector");
        input.setAttribute("type", "radio");
        input.setAttribute("value", whichstore);
        input.setAttribute("id", "store" + linkNum);
        input.setAttribute("price", price);
        input.setAttribute("itemnum", itemNum);
        input.setAttribute("storename", a.innerHTML.replace(/<br>/, " "));
        input.setAttribute("max", max);
        input.setAttribute("itemname", itemName);
		if (firstButton == 0) {			// not the first button for this item?  hide it.
			input.style.display = 'none';
			firstButton = 0;
		} else firstButton = 0;			// else note that we are no longer on the first button.
//		GM_log("store "+whichstore+" itemname attribute ="+itemName);
        input.addEventListener("change", SelectThisStore, false);
        td.appendChild(input);

        if (linkNum++ == 0)
        {
            input.checked = true;
            firstStore = input;
            firstItem = itemNum;
        }

        if (itemNum == firstItem)
        {
            totalMeat += max * price;
            maxPrice = price;
            totalItems += max;
        }
    }

    // only display the main form one time, after we've processed the first store.
    if (!firstStore)
        return;

    {
        // multi-store buy form
        var multistorebuy = document.createElement("p");
        multistorebuy.setAttribute("align", "left");
        searchResults.parentNode.insertBefore(multistorebuy, searchResults);

        var span = document.createElement("span");
        span.innerHTML = "<hr>";
        multistorebuy.appendChild(span);

        var form = document.createElement("span")
        form.setAttribute("id", "multistoretextnode");
        multistorebuy.appendChild(form);

        var input = document.createElement("input");
        input.setAttribute("class", "button");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Buy");
        input.addEventListener("click", BuyMulti, false);
        input.setAttribute("id", "multistorebuy");
        input.setAttribute("numstores", linkNum);
        form.appendChild(input);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "multiquantity");
        input.setAttribute("value", 1);
        input.setAttribute("size", 6);
        input.setAttribute("id", "multihowmany");
        form.appendChild(input);

        span = document.createElement("span");
        span.innerHTML = " X ";
        form.appendChild(span);

        var b = document.createElement("b");
        b.setAttribute("id", "multiitemnametext");
        form.appendChild(b);

        span = document.createElement("span");
        span.innerHTML = " from multiple stores.";
        span.setAttribute("id", "multiitemlimit");
        form.appendChild(span);
        
        form.appendChild(document.createElement("br"));

        span = document.createElement("span");
        span.innerHTML = "Total Meat Limit: ";
        form.appendChild(span);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "meatlimit");
        input.setAttribute("value", 0);
        input.setAttribute("size", 11);
        input.setAttribute("id", "meatlimit");
        input.setAttribute("tiedinput", "custommeatlimit");
        input.addEventListener("change", AutoCheckMeatLimit, false);
        input.addEventListener("keydown", AutoCheckMeatLimit, false);
        form.appendChild(input);

        span = document.createElement("span");
        span.innerHTML = "&nbsp;&nbsp;&nbsp;Meat Limit Per Item: ";
        form.appendChild(span);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "meatlimitperitem");
        input.setAttribute("value", 0);
        input.setAttribute("size", 11);
        input.setAttribute("id", "meatlimitperitem");
        input.setAttribute("tiedinput", "custommeatlimitperitem");
        input.addEventListener("change", AutoCheckMeatLimit, false);
        input.addEventListener("keydown", AutoCheckMeatLimit, false);
        form.appendChild(input);

        span = document.createElement("span");
        span.innerHTML = "<br>Use Custom Meat Limit:&nbsp;";
        form.appendChild(span);

        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "custommeatlimit");
        input.checked = false;
        input.setAttribute("id", "custommeatlimit");
        input.addEventListener("change", SelectCustomMeatLimitForThis, false);
        input.setAttribute("tiedinput", "meatlimit");
        form.appendChild(input);

        span = document.createElement("span");
        span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Custom Meat Limit Per Item:&nbsp;";
        form.appendChild(span);

        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "custommeatlimitperitem");
        input.setAttribute("id", "custommeatlimitperitem");
        input.setAttribute("tiedinput", "meatlimitperitem");
        input.checked = false;
        input.addEventListener("change", SelectCustomMeatLimitForThis, false);
        form.appendChild(input);
    }

//    {
//        // single-store buy form
//		18Mar09 Hellion: again due to the simplistic nature of my hackery, I merely hide this element rather than relocating the functionality
//				within it that the multi-buy function depends on.
        var onestorebuy = document.createElement("p");
        onestorebuy.setAttribute("align", "left");
		onestorebuy.style.display='none';			// bwahaha.  Go away, you silly element.
        searchResults.parentNode.insertBefore(onestorebuy, searchResults);
//
        var span = document.createElement("span");
        span.innerHTML = "<hr>";
            //"<hr><p><center><b>Buy From Selected Store:</b></center><p>";
        onestorebuy.appendChild(span);
//
        var form = document.createElement("span")
        onestorebuy.appendChild(form);
//
        var table = document.createElement("table");
        form.appendChild(table);
//
        var tr = document.createElement("tr");
        table.appendChild(tr);
//
        var td = document.createElement("td");
        td.setAttribute("valign", "top");
        tr.appendChild(td);
//
        var input = document.createElement("input");
        input.setAttribute("class", "button");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Buy");
        input.setAttribute("id", "onestorebuy");
        input.addEventListener("click", BuyItem, false);
        td.appendChild(input);
//
        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "quantity");
        input.setAttribute("value", 1);
        input.setAttribute("size", 6);
        input.setAttribute("id", "howmany");
        td.appendChild(input);
//
        td = document.createElement("td");
        tr.appendChild(td);
//
        span = document.createElement("span");
        span.innerHTML = " X ";
        td.appendChild(span);
//
        td = document.createElement("td");
        tr.appendChild(td);
//
        var b = document.createElement("b");
        b.setAttribute("id", "itemnametext");
        td.appendChild(b);
//
        span = document.createElement("span");
        span.setAttribute("id", "costtext");
        td.appendChild(span);
//
        tr = document.createElement("tr");
//		tr.setAttribute("display","none");
        table.appendChild(tr);
//
        td = document.createElement("td");
//		td.setAttribute("display","none");
        td.setAttribute("id", "maxtext");
        td.setAttribute("align", "right");
        tr.appendChild(td);
//
        tr.appendChild(document.createElement("td"));
//
        td = document.createElement("td");
        tr.appendChild(td);
//
        span = document.createElement("span");
        span.innerHTML = "from ";
        td.appendChild(span);
//
        var em = document.createElement("em");
        em.setAttribute("id", "storename");
        td.appendChild(em);
//    }


    document.getElementById('multistorebuy').setAttribute("numlinks", linkNum);

    if (firstStore)
        SelectStore(firstStore);
}
// ---------------------------------------------------------------------------
// MAIN section
// ---------------------------------------------------------------------------
if (window.location.pathname == "/login.php")
{
    GM_setValue("pwdhash", "");
}
else 
{
	if (GetPwd() == "")   	
	{
		FindHash();  	
	}
    ModifyMallPage();
}
// ---------------------------------------------------------------------------

