// ==UserScript==
// @name           Castle Age Helper
// @namespace      AngusH_CA
// @description    THIS SCRIPT BASE ON Scott Royalty's Elite Guard Builder.
// @include        http*://apps.*facebook.com/castle_age/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=61078
// @version        0.1.11
// ==/UserScript==

var scriptVersion = "0.1.11";
var scriptName = 'Castle Age Helper';
var scriptNum = '74266';

/////////////////////////////////////////////////////////////////////////////////////////
// Log
/////////////////////////////////////////////////////////////////////////////////////////
if(!GM_log) 
{
	GM_log = console.debug;
}

function getContainer(id) {
	return document.getElementById(id);
};


/////////////////////////////////////////////////////////////////////////////////////////
// Language Table
/////////////////////////////////////////////////////////////////////////////////////////
Locale = {
    en_us : {
    		JOIN_TO_AG : "", 
        ADD_TO_FAV_LIST : "",
        REMOVE_FROM_FAV_LIST : "",
    }, zh_tw : {
    		JOIN_TO_AG : "", 
        ADD_TO_FAV_LIST : "",
        REMOVE_FROM_FAV_LIST : "",
   }
}

function GetLocale() {
    return GM_getValue("LOCALE", "en_us");
}


/////////////////////////////////////////////////////////////////////////////////////////
// XPath Tools
/////////////////////////////////////////////////////////////////////////////////////////
function $x(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); }
function $x1(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }


/////////////////////////////////////////////////////////////////////////////////////////
// HTML Tools
//   this object contains general methods for wading through the DOM and dealing with HTML
/////////////////////////////////////////////////////////////////////////////////////////
var nHtml = {
    xpath: {
        string : XPathResult.STRING_TYPE,
        unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        first : XPathResult.FIRST_ORDERED_NODE_TYPE
    },

    FindByAttrContains: function (obj, tag, attr, className, subDocument) {
        if (attr == "className") {
            attr = "class";
        }

        if (!subDocument) {
            subDocument = document;
        }

        var q = subDocument.evaluate(".//" + tag + "[contains(translate(@" +
            attr + ",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" +
            className.toLowerCase() + "')]", obj, null, this.xpath.first, null);

        if (q && q.singleNodeValue) {
            return q.singleNodeValue;
        }

        return null;
    },

    FindByAttrXPath: function (obj, tag, className, subDocument) {
        var q = null;
        var xp = ".//" + tag + "[" + className + "]";
        try {
            if (obj === null) {
                gm.log('Trying to find xpath with null obj:' + xp);
                return null;
            }

            if (!subDocument) {
                subDocument = document;
            }

            q = subDocument.evaluate(xp, obj, null, this.xpath.first, null);
        } catch (err) {
            gm.log("XPath Failed:" + xp + "," + err);
        }

        if (q && q.singleNodeValue) {
            return q.singleNodeValue;
        }

        return null;
    },

    FindByAttr: function (obj, tag, attr, className, subDocument) {
        if (className.exec === undefined) {
            if (attr == "className") {
                attr = "class";
            }

            if (!subDocument) {
                subDocument = document;
            }

            var q = subDocument.evaluate(".//" + tag + "[@" + attr + "='" + className + "']", obj, null, this.xpath.first, null);

            if (q && q.singleNodeValue) {
                return q.singleNodeValue;
            }

            return null;
        }

        var divs = obj.getElementsByTagName(tag);
        for (var d = 0; d < divs.length; d++) {
            var div = divs[d];
            if (className.exec !== undefined) {
                if (className.exec(div[attr])) {
                    return div;
                }
            } else if (div[attr] == className) {
                return div;
            }
        }

        return null;
    },

    FindByClassName: function (obj, tag, className) {
        return CAHelper.FindByAttr(obj, tag, "className", className);
    },

    spaceTags: {
        'td': 1,
        'br': 1,
        'hr': 1,
        'span': 1,
        'table': 1
    },

    GetText: function (obj) {
        var txt = ' ';
        if (obj.tagName !== undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
            txt += " ";
        }

        if (obj.nodeName == "#text") {
            return txt + obj.textContent;
        }

        for (var o = 0; o < obj.childNodes.length; o++) {
            var child = obj.childNodes[o];
            txt += this.GetText(child);
        }

        return txt;
    },

    htmlRe: new RegExp('<[^>]+>', 'g'),

    StripHtml: function (html) {
        return html.replace(CAHelper.htmlRe, '').replace(/&nbsp;/g, '');
    },

    timeouts: {},

    setTimeout: function (func, millis) {
        var t = window.setTimeout(function () {
            func();
            nHtml.timeouts[t] = undefined;
        }, millis);

        CAHelper.timeouts[t] = 1;
    },

    clearTimeouts: function () {
        for (var t in CAHelper.timeouts) {
            if (CAHelper.timeouts.hasOwnProperty(t)) {
                window.clearTimeout(t);
            }
        }

        CAHelper.timeouts = {};
    },

    getX: function (path, parent, type) {
        var evaluate = null;
        switch (type) {
        case this.xpath.string :
            evaluate = document.evaluate(path, parent, null, type, null).stringValue;
            break;
        case this.xpath.first :
            evaluate = document.evaluate(path, parent, null, type, null).singleNodeValue;
            break;
        case this.xpath.unordered :
            evaluate = document.evaluate(path, parent, null, type, null);
            break;
        default :
            break;
        }

        return evaluate;
    },

    getHTMLPredicate: function (HTML) {
        for (var x = HTML.length; x > 1; x--) {
            if (HTML.substr(x, 1) == '/') {
                return HTML.substr(x + 1);
            }
        }

        return HTML;
    },

    OpenInIFrame: function (url, key) {
        //if (!iframe = document.getElementById(key))
        var iframe = document.createElement("iframe");
        //gm.log ("Navigating iframe to " + url);
        iframe.setAttribute("src", url);
        iframe.setAttribute("id", key);
        iframe.setAttribute("style", "width:0;height:0;");
        document.documentElement.appendChild(iframe);
    },

    ResetIFrame: function (key) {
        var iframe = document.getElementById(key);
        if (iframe) {
            gm.log("Deleting iframe = " + key);
            iframe.parentNode.removeChild(iframe);
        } else {
            gm.log("Frame not found = " + key);
        }

        if (document.getElementById(key)) {
            gm.log("Found iframe");
        }
    },

    Gup: function (name, href) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(href);
        if (results === null) {
            return "";
        } else {
            return results[1];
        }
    },

    ScrollToBottom: function () {
        //gm.log("Scroll Height: " + document.body.scrollHeight);
        if (document.body.scrollHeight) {
            if (caapGlob.is_chrome) {
                var dh = document.body.scrollHeight;
                var ch = document.body.clientHeight;
                if (dh > ch) {
                    var moveme = dh - ch;
                    gm.log("Scrolling down by: " + moveme + "px");
                    window.scroll(0, moveme);
                    gm.log("Scrolled ok");
                } else {
                    gm.log("Not scrolling to bottom. Client height is greater than document height!");
                }
            } else {
                window.scrollBy(0, document.body.scrollHeight);
            }
        }// else if (screen.height) {}
    },

    ScrollToTop: function () {
        if (caapGlob.is_chrome) {
            gm.log("Scrolling to top");
            window.scroll(0, 0);
            gm.log("Scrolled ok");
        } else {
            window.scrollByPages(-1000);
        }
    },

    CountInstances: function (string, word) {
        var substrings = string.split(word);
        return substrings.length - 1;
    }
};


/////////////////////////////////////////////////////////////////////////////////////////
// Other funcgtion
/////////////////////////////////////////////////////////////////////////////////////////
function CheckForImage(chkImage, webSlice) {
	var imageSlice;
	
	if (!webSlice) {
		webSlice=document.body;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'input','src',chkImage)) {
		return imageSlice;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'img','src',chkImage)) {
		return imageSlice;
	}
	if (imageSlice = nHtml.FindByAttrContains(webSlice,'div','style',chkImage)) {
		return imageSlice;
	}
	return false;
}

function NumberOnly(num) {
	var numOnly=parseFloat(num.toString().replace(/[^0-9\.]/g,""));
	return numOnly;
}

function DoClick(obj) {
	if (!obj) {
		GM_log('ERROR: Null object passed to Click');
		return;
	}
	
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
}

function GetSiegeURL(monstURL, monstType) {
	if ( monstURL.indexOf('&action=doObjective') > 0 )
		return monstURL;
		
	if ( monstURL.indexOf('mpool=3') > 0 || monstType == 'Raid I' || 
			 monstType == 'Raid II' || monstType=="Deathrune" || monstType=="Bahamut" ) {

			return monstURL + '&action=doObjective';
	}
	
	return monstURL;
}

function GetAttackButton() {
	var atkBtn = CheckForImage('attack_monster_button2.jpg');
	if ( !atkBtn )	atkBtn = CheckForImage('seamonster_power.gif');	
	if ( !atkBtn )	atkBtn = CheckForImage('event_attack2.gif');	
	if ( atkBtn )		return atkBtn;
	
	var sta = 5;
	var btnGroup = null;
	if ( sta >= 50 )
		btnGroup = CheckForImage('button_cost_stamina_50.gif');
	else if ( sta >= 20 )
		btnGroup = CheckForImage('button_cost_stamina_20.gif');
	else if ( sta >= 10 )
		btnGroup = CheckForImage('button_cost_stamina_10.gif');
	else if ( sta >= 5 )
		btnGroup = CheckForImage('button_cost_stamina_5.gif');
	
	if ( !btnGroup )
		return null;
		
	btnGroup = btnGroup.parentNode.parentNode;
	if ( !atkBtn )	atkBtn = CheckForImage('button_nm_p_power_attack.gif', btnGroup);	
	if ( !atkBtn )	atkBtn = CheckForImage('button_nm_p_bash.gif', btnGroup);	
	if ( !atkBtn )	atkBtn = CheckForImage('button_nm_p_stab.gif', btnGroup);	
	if ( !atkBtn )	atkBtn = CheckForImage('button_nm_p_bolt.gif', btnGroup);	
	if ( !atkBtn )	atkBtn = CheckForImage('button_nm_p_smite.gif', btnGroup);	
			
	return atkBtn;
}

function DoAttack() {
	var atkBtn = GetAttackButton();	
  if ( atkBtn )
  	DoClick(atkBtn);		
}

function GetFortifyButton() {
	var forBtn = CheckForImage('seamonster_fortify.gif');
	if ( !forBtn )	forBtn = CheckForImage('button_dispel.gif');	
	if ( !forBtn )	forBtn = CheckForImage('attack_monster_button3.jpg');	
	if ( !forBtn )	forBtn = CheckForImage('button_nm_s_fortify.gif');	
	if ( !forBtn )	forBtn = CheckForImage('button_nm_s_dispel.gif');	
	if ( forBtn )		return forBtn;
	
	var eng = 10;
	var btnGroup = null;
	if ( eng >= 100 )
		btnGroup = CheckForImage('button_cost_energy_100.gif');
	else if ( eng >= 40 )
		btnGroup = CheckForImage('button_cost_energy_40.gif');
	else if ( eng >= 20 )
		btnGroup = CheckForImage('button_cost_energy_20.gif');
	else if ( eng >= 10 )
		btnGroup = CheckForImage('button_cost_energy_10.gif');
	
	if ( !btnGroup )
		return null;
		
	btnGroup = btnGroup.parentNode.parentNode;
	if ( !forBtn )	forBtn = CheckForImage('button_nm_s_strengthen.gif', btnGroup);	
	if ( !forBtn )	forBtn = CheckForImage('button_nm_s_cripple.gif', btnGroup);	
	if ( !forBtn )	forBtn = CheckForImage('button_nm_s_deflect.gif', btnGroup);	
	if ( !forBtn )	forBtn = CheckForImage('button_nm_s_heal.gif', btnGroup);	
			
	return forBtn;	
}

function DoFortify() {
	var forBtn = GetFortifyButton();
  if ( forBtn )
  	DoClick(forBtn);		
}

function DoHeal() {
	var needHeal = GM_getValue('NeedHeal', 0);
	if ( !needHeal )
		return;
		
	var healSection = nHtml.FindByAttrContains(document.body, "div", "class", "keep_healer_section");
	if ( !healSection ) {
		GM_log("Can't found Heal Section");
		return;
	}
/*	
	var bqh = null;
	var q = document.evaluate(".//input[contains(translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'bqh')]",document.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (q && q.singleNodeValue) { 
  	test1 = q.singleNodeValue; 
  	GM_log("test1:" + test1.value); 
  	http://apps.facebook.com/castle_age/keep.php?action=heal_avatar&bqh=
  }
		
	*/
		
	var healBtn = CheckForImage('heal_button.gif');
  if ( !healBtn ) {
		GM_log("Can't found Heal Button");
		return;
  }
  
  GM_setValue('NeedHeal', 0);
  DoClick(healBtn);		
}

/////////////////////////////////////////////////////////////////////////////////////////
// Arena Guard Builer
/////////////////////////////////////////////////////////////////////////////////////////
var UserID = new Array();
var UserLocale = GetLocale();
var GetText = Locale[UserLocale];

var CAHelper = {
	FAV_ADD_FROM_FAV_BTN_ID:"AngusH_CAH_AddFromFavBtn",
	FAV_LIST_ID:"AngusH_CAH_FavList",
	FAV_LIST_ITEM_ID:"AngusH_CAH_FavItem_",
	FAV_LIST_ITEM_JOIN_ID:"AngusH_CAH_JoinToAGLink_",
	FAV_LIST_ITEM_REMOVE_ID:"AngusH_CAH_ItemRemoveFromFav_",
	ELEM_ADD_TO_FAV_ID:"AngusH_CAH_ElemAddToFav_",
	ELEM_REMOVE_FROM_FAV_ID:"AngusH_CAH_ElemRemoveFromFav_",
	MASS_ADD_BTN_ID:"AngusH_CAH_MassAddBtn",
	
	FavMembersID:null,
	FavMembersName:null,

	MassMembersID:null,

	LoadFavMemberData:function() {
		var TempID = GM_getValue('FavMembers', "");
		if (TempID.length > 0)
			CAHelper.FavMembersID = TempID.split(',');
		else
			CAHelper.FavMembersID = new Array();
	
		var TmpName = GM_getValue('FavMembersName', "");
		if (TmpName.length > 0)
			CAHelper.FavMembersName = TmpName.split(',');
		else
			CAHelper.FavMembersName = new Array();
	},
	/*
	LoadUserData:function() {
		var TempID = GM_getValue('UserID', "");
		if (TempID.length > 0)
			UserID = TempID.split(',');
		else
			UserID = new Array();
	},*/
	
	HaveFavMemberData:function() {
		//*************************************************************************************
		// Reload Fav Member data (Avoid multi-tab bug)
		//*************************************************************************************
		CAHelper.LoadFavMemberData();
		
		if ( CAHelper.FavMembersID.length > 0 )
			return true;
		else
			return false;
	},
	
	IsFavMemberExist:function(userID) {
		//*************************************************************************************
		// Reload Fav Member data (Avoid multi-tab bug)
		//*************************************************************************************
		CAHelper.LoadFavMemberData();

		if ( CAHelper.FavMembersID.indexOf(userID) != -1 )
			return true;
		else
			return false;
	},
	
	GetEliteUrl:function(userID) {
		return 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + userID + '&lka=' + userID + '&ref=nf';
	},

	GetArenaUrl:function(userID) {
		return 'http://apps.facebook.com/castle_age/arena.php?user=' + userID + '&lka=' + userID + '&agtw=1&ref=nf';	
	},
	
	GetKeepUrl:function(userID) {
		return 'http://apps.facebook.com/castle_age/keep.php?user=' + userID;
	},
	
	startXmlHttp:function (urlLink) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: urlLink,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3',
				'Accept': 'text/html'
			},
		});
	},
	
	AddUsingFavMember:function(index) {
		var favAddElement = document.getElementById(CAHelper.FAV_ADD_FROM_FAV_BTN_ID);

		//*************************************************************************************
		// Restore favorites link text
		//*************************************************************************************
		if ( index < 0 ) {
			if ( index == -1 ) {
				favAddElement.innerHTML = 'Complete!';
				setTimeout( function() { CAHelper.AddUsingFavMember(-2); }, 500 );
			} else if ( index == -2 ) {
				favAddElement.innerHTML = 'Build Guard From Favorites';
			}
			
			return;
		}
		
		//*************************************************************************************
		// Reload Fav Member data when first member (Avoid multi-tab bug)
		//*************************************************************************************
		if ( index == 0 )
			CAHelper.LoadFavMemberData();
			
		//*************************************************************************************
		// Do join request and Show progress
		//*************************************************************************************
		favAddElement.innerHTML = "Adding FavArmy[" + (index+1) + "]";
		CAHelper.startXmlHttp( CAHelper.GetEliteUrl(CAHelper.FavMembersID[index]) );
		CAHelper.startXmlHttp( CAHelper.GetArenaUrl(CAHelper.FavMembersID[index]) );
	
		//*************************************************************************************
		//Goto next id ( if necessary )
		//*************************************************************************************		
		index = index + 1;
		if ( index < CAHelper.FavMembersID.length )
			setTimeout( function() { CAHelper.AddUsingFavMember(index); }, 100 );
		else
			setTimeout( function() { CAHelper.AddUsingFavMember(-1); }, 500 );
	},

	AddUsingMassAdd:function(index) {
		var massAddBtn = document.getElementById(CAHelper.MASS_ADD_BTN_ID);
		
		//*************************************************************************************
		// Restore link text
		//*************************************************************************************
		if ( index < 0 ) {
			if ( index == -1 ) {
				massAddBtn.innerHTML = 'Complete!';
				setTimeout( function() { CAHelper.AddUsingMassAdd(-2); }, 500 );
			} else if ( index == -2 ) {
				massAddBtn.innerHTML = 'Mass Add Random';
			}
			
			return;
		}
				
		//*************************************************************************************
		// Do Join request and Show progress
		//*************************************************************************************
		massAddBtn.innerHTML = 'Working ' + (index+1) + '/' + UserID.length;		
		if ( UserID[index] >= 1 ) {
			CAHelper.startXmlHttp( CAHelper.GetEliteUrl(UserID[index]) );
			CAHelper.startXmlHttp( CAHelper.GetArenaUrl(UserID[index]) );
		}
			
	
		//*************************************************************************************
		//Goto next id ( if necessary )
		//*************************************************************************************		
		index = index + 1;
		if ( index < UserID.length )
			setTimeout( function() { CAHelper.AddUsingMassAdd(index); }, 100 );
		else
			setTimeout( function() { CAHelper.AddUsingMassAdd(-1); }, 500 );
	},	
	
	AddToFavList:function(target, isFromKeep) {
		var userID = target.id.substring( CAHelper.ELEM_ADD_TO_FAV_ID.length );
		var userName = target.name;
		GM_log("In AddToFavList(...), ID:" + userID + ", Name:" + userName);
		
		if ( CAHelper.IsFavMemberExist(userID) )
			return;
		
		//***********************************************************************************	
		// Add to favorites list
		//***********************************************************************************	
		CAHelper.FavMembersID.push(userID);
		GM_setValue('FavMembers', CAHelper.FavMembersID.join(','));			
		CAHelper.FavMembersName.push(userName);
		GM_setValue('FavMembersName', CAHelper.FavMembersName.join(','));
		
		//***********************************************************************************	
		// Remove add element
		//***********************************************************************************			
		var elemAddID = CAHelper.ELEM_ADD_TO_FAV_ID + userID;
		var addElement = document.getElementById(elemAddID);
		var parentNode = addElement.parentNode;
		if ( addElement )
			addElement.parentNode.removeChild(addElement);

		//***********************************************************************************	
		// Add remove element
		//***********************************************************************************			
		var removeLink = CAHelper.CreateRemoveFromFavElement(userID, userName, isFromKeep);
		if ( parentNode )
			parentNode.appendChild(removeLink);

		//***********************************************************************************	
		// Add item to management box
		//***********************************************************************************			
		var favList = document.getElementById(CAHelper.FAV_LIST_ID);
		var favItem = CAHelper.CreateFavItemElement(userID, userName);
		favList.appendChild(favItem);
	},
	
	RemoveFromFavList:function(target, isFromKeep) {
		var userID = target.id.substring(CAHelper.ELEM_REMOVE_FROM_FAV_ID.length);
		var userName = target.name;
		GM_log("In RemoveFromFavList(...), ID:" + userID + ", Name:" + userName);
		
		if ( !CAHelper.IsFavMemberExist(userID) ) {
			GM_log("Remove failed. ID[" + userID + "] don't in favorites list");
			return;
		}
			
		//***********************************************************************************	
		// Remove from favorites list
		//***********************************************************************************	
		CAHelper.FavMembersID.splice(CAHelper.FavMembersID.indexOf(userID), 1);
		GM_setValue('FavMembers', CAHelper.FavMembersID.join(','));
		CAHelper.FavMembersName.splice(CAHelper.FavMembersName.indexOf(userName), 1);
		GM_setValue('FavMembersName', CAHelper.FavMembersName.join(','));
		
		//***********************************************************************************	
		// Remove remove element
		//***********************************************************************************	
		var elemRemoveID = CAHelper.ELEM_REMOVE_FROM_FAV_ID + userID;
		var removeElement = document.getElementById(elemRemoveID);
		var parentNode = removeElement.parentNode;
		if ( removeElement )
			removeElement.parentNode.removeChild(removeElement);
				
		//***********************************************************************************	
		// Add add element
		//***********************************************************************************			
		var addLink = CAHelper.CreateAddToFavElement(userID, userName, isFromKeep);
		if ( parentNode )
			parentNode.appendChild(addLink);
		
		//***********************************************************************************	
		// Remove item from management box
		//***********************************************************************************			
		var favItemID = CAHelper.FAV_LIST_ITEM_ID + userID;
		var favItem = document.getElementById(favItemID);
		if ( favItem != null )
			favItem.parentNode.removeChild(favItem);
	},

	CreateFavItemElement:function(favID, favName) {
		var favListItemID 			= CAHelper.FAV_LIST_ITEM_ID + favID;
		var favListItemJoinID 	= CAHelper.FAV_LIST_ITEM_JOIN_ID + favID;
		var favListItemRemoveID = CAHelper.FAV_LIST_ITEM_REMOVE_ID + favID;
		
		var resultElement = document.createElement('li');
		resultElement.setAttribute('id', favListItemID);
		resultElement.setAttribute('style', 'list-style-type: decimal; list-style-position: inside;');
	
		var nameElement = document.createElement('a');
		nameElement.setAttribute( 'href', CAHelper.GetKeepUrl(favID) );	
		nameElement.setAttribute( 'target', '_blank' );
		nameElement.innerHTML = favName + '<br />';
		resultElement.appendChild(nameElement);

		var eliteElement = document.createElement('a');
		eliteElement.setAttribute('href', CAHelper.GetEliteUrl(favID) );	
		//eliteElement.setAttribute('id', favListItemJoinID);
		eliteElement.setAttribute('target', '_blank');
		eliteElement.innerHTML = 'Elite';
		resultElement.appendChild(eliteElement);
	
		var sepElement1 = document.createElement('span');
		sepElement1.setAttribute('style', 'font-size: 12px;');
		sepElement1.innerHTML = ' | ';
		resultElement.appendChild(sepElement1);
			
		var arenaElement = document.createElement('a');
		arenaElement.setAttribute('href', CAHelper.GetArenaUrl(favID) );	
		//arenaElement.setAttribute('id', favListItemJoinID);
		arenaElement.setAttribute('target', '_blank');
		arenaElement.innerHTML = 'Arena';
		resultElement.appendChild(arenaElement);
		
		var sepElement2 = document.createElement('span');
		sepElement2.setAttribute('style', 'font-size: 12px;');
		sepElement2.innerHTML = ' | ';
		resultElement.appendChild(sepElement2);
		
		var removeElement = document.createElement('a');
		removeElement.setAttribute('id', favListItemRemoveID);
		removeElement.innerHTML = 'Remove';
		removeElement.setAttribute('name', favName);
		removeElement.addEventListener('click', function(e) {
																							CAHelper.RemoveFromFavList(e.target);
																						}, false);
		resultElement.appendChild(removeElement);
	
		return resultElement;
	},

	CreateAddToFavElement:function(userID, userName, isFromKeep) {
		var addID = CAHelper.ELEM_ADD_TO_FAV_ID + userID;
		var resultElement = document.createElement('a');
		
		if ( isFromKeep ) {
			resultElement.setAttribute('style', 'font-size: 12px; color:#ffffff;');
			resultElement.innerHTML = '  Add To CA Helper Favorites';
		} else {
			resultElement.setAttribute('style', 'font-size: 12px;');
			resultElement.innerHTML = '<br />Add To CA Helper Favorites [x]';
		}
	
		resultElement.setAttribute('name', userName);
		resultElement.setAttribute('id', addID);
		
		resultElement.addEventListener('click', function(e) {
																							CAHelper.AddToFavList(e.target, isFromKeep);
																						},false);
		return resultElement;
	},

	CreateRemoveFromFavElement:function(userID, userName, isFromKeep) {
		var elemRemoveID = CAHelper.ELEM_REMOVE_FROM_FAV_ID + userID;
		var resultElement = document.createElement('a');
		
		if ( isFromKeep ) {
			resultElement.setAttribute('style', 'font-size: 14px; color:#ffffff;');
			resultElement.innerHTML = 'Remove From CA Helper Favorites';
		} else {
			resultElement.setAttribute('style', 'font-size: 12px;');
			resultElement.innerHTML = '<br />Remove From CA Helper Favorites [x]';
		}
		
		resultElement.setAttribute('id', elemRemoveID);
		resultElement.setAttribute('name', userName);
		resultElement.addEventListener('click',  function(e) {
																						CAHelper.RemoveFromFavList(e.target);
																					},false);
		return resultElement;
	},
	
	RefreshMonsterInfo:function(monstURL, monstType, monstName, dmgDone, forDone, 
															monstHP, monstFort, classType, monstTime) {
		var monsterBox = document.getElementById('AngusH_CAH_Monster');
		GM_log("monstURL: " + monstURL);
		
		//*************************************************************************************
		//
		//*************************************************************************************
		var healElement = document.getElementById('AngusH_CAH_Heal');
		if ( !healElement ) {
			healElement = document.createElement('a');
			healElement.setAttribute('id', 'AngusH_CAH_Heal');			
			healElement.addEventListener('click', function(e) { 
																							GM_setValue('NeedHeal', 1);
																							//document.location.href = 'http://apps.facebook.com/castle_age/keep.php';
																						}, false);			
			healElement.innerHTML = '<b><a href="http://apps.facebook.com/castle_age/keep.php" target=_blank>Heal</a></b><br/>';
			monsterBox.appendChild(healElement);
		}		
		
		//*************************************************************************************
		//
		//*************************************************************************************
		var listElement = document.getElementById('AngusH_CAH_Monster_List');
		if ( !listElement ) {
			listElement = document.createElement('a');
			listElement.setAttribute('id', 'AngusH_CAH_Monster_List');
			listElement.innerHTML = '<b><a href="http://apps.facebook.com/castle_age/battle_monster.php">View Monster List</a></b><br/><br/>';
			monsterBox.appendChild(listElement);
		}
		
		//*************************************************************************************
		//
		//*************************************************************************************
		var nameElement = document.getElementById('AngusH_CAH_Monster_Name');
		if ( !nameElement ) {
			nameElement = document.createElement('div');
			nameElement.setAttribute('id', 'AngusH_CAH_Monster_Name');
			nameElement.innerHTML = 'No Monster Data';
			monsterBox.appendChild(nameElement);
		} else {
			if ( monstName )
				nameElement.innerHTML = '<a href="' + GetSiegeURL(monstURL,monstType) + '">' + monstName + '</a>';
			else
				nameElement.innerHTML = 'No Monster Data';
		}

		//*************************************************************************************
		// HP/For
		//*************************************************************************************
		var hpElement = document.getElementById('AngusH_CAH_Monster_HP');
		if ( !hpElement ) {
			hpElement = document.createElement('div');
			hpElement.setAttribute('id', 'AngusH_CAH_Monster_HP');
			hpElement.innerHTML = '';
			monsterBox.appendChild(hpElement);
		} else if ( monstName ) {
				if ( monstTime && monstTime != '' )
					hpElement.innerHTML = '<b>Time: </b>' + monstTime + '<br/>';

				if ( monstHP && monstHP != -1 )
					hpElement.innerHTML += '<b>HP: </b>' + monstHP + '%';
				if ( monstFort && monstFort != -1 )
					hpElement.innerHTML += ', <b>Fortify: </b>' + monstFort + '%';
					
				if ( hpElement.innerHTML != '' )
					hpElement.innerHTML += '<br />';
		} else {
			hpElement.innerHTML = '';
		}	

		//*************************************************************************************
		//
		//*************************************************************************************
		var ActElement = document.getElementById('AngusH_CAH_Monster_Act');
		if ( !ActElement ) {
			ActElement = document.createElement('a');
			ActElement.setAttribute('id', 'AngusH_CAH_Monster_Act');
			ActElement.innerHTML = '';
			monsterBox.appendChild(ActElement);
		} else if ( monstType == 'Bahamut' && dmgDone && dmgDone != -1 ) {
			ActElement.innerHTML = '<b>Activity:</b> ' + dmgDone + '<br />';
		} else {
			ActElement.innerHTML = '';
		}
			
	
		//*************************************************************************************
		//
		//*************************************************************************************
		var dmgElement = document.getElementById('AngusH_CAH_Monster_Dmg');
		if ( !dmgElement ) {
			dmgElement = document.createElement('a');
			dmgElement.setAttribute('id', 'AngusH_CAH_Monster_Dmg');
			dmgElement.innerHTML = '';
			dmgElement.addEventListener('click', function(e) { DoAttack(); }, false);			
			monsterBox.appendChild(dmgElement);
		} else if ( dmgDone ) {
			if ( dmgDone == -1 ) {
				if ( GetAttackButton() )
					dmgElement.innerHTML = 'Attack this monster<br />';
				else
					dmgElement.innerHTML = '';
			} else {
				if ( monstType == 'Bahamut' ) {
					if ( classType == 0 )
						dmgElement.innerHTML = 'Bash';
					else if ( classType == 1 )
						dmgElement.innerHTML = 'Stab';
					else if ( classType == 2 )
						dmgElement.innerHTML = 'Magic Bolt';
					else if ( classType == 3 )
						dmgElement.innerHTML = 'Smit';
					else
						dmgElement.innerHTML = 'Attack';
							
					dmgElement.innerHTML += '   ';
				} else
					dmgElement.innerHTML = '<b>Damage:</b> ' + dmgDone + '<br />';
			}
		} else {
			dmgElement.innerHTML = '';
		}
		
		//*************************************************************************************
		//
		//*************************************************************************************
		var fortElement = document.getElementById('AngusH_CAH_Monster_Fort');
		if ( !fortElement ) {
			fortElement = document.createElement('a');
			fortElement.setAttribute('id', 'AngusH_CAH_Monster_Fort');
			fortElement.innerHTML = '';
			fortElement.addEventListener('click', function(e) { DoFortify(); }, false);			
			monsterBox.appendChild(fortElement);
		} else if ( monstType == 'Bahamut' ) {		
				if ( classType == 0 )
					fortElement.innerHTML = 'Strengthen';
				else if ( classType == 1 )
					fortElement.innerHTML = 'Cripple';
				else if ( classType == 2 )
					fortElement.innerHTML = 'Deflection';
				else if ( classType == 3 )
					fortElement.innerHTML = 'Heal';
				else
					fortElement.innerHTML = 'Fority';
						
				fortElement.innerHTML += '<br/>';							
		} else if ( forDone ) {
			if ( forDone == -1 ) {
				if ( GetFortifyButton() )
					fortElement.innerHTML = 'Fortify this monster<br/>';
				else
					fortElement.innerHTML = '';
			} else
				fortElement.innerHTML = '<b>Fortify:</b> ' + forDone + '<br/>';				
		} else {
			fortElement.innerHTML = '';
		}
		
		//*************************************************************************************
		//
		//*************************************************************************************
		var brElement = document.getElementById('AngusH_CAH_Monster_Br');
		if ( !brElement ) {
			brElement = document.createElement('div');
			brElement.setAttribute('id', 'AngusH_CAH_Monster_Br');
			brElement.innerHTML = '<br/>';
			monsterBox.appendChild(brElement);
		}		
	},	

	RefreshFavList:function() {
		var mainBox = document.getElementById('AngusH_CAH_Container');
		
		//*************************************************************************************
		// Have Favorites Member Data, create add link
		//*************************************************************************************
		var favAddElement = document.getElementById(CAHelper.FAV_ADD_FROM_FAV_BTN_ID);
		if ( !favAddElement ) {
			favAddElement = document.createElement('a');
			favAddElement.setAttribute('id', CAHelper.FAV_ADD_FROM_FAV_BTN_ID);
			mainBox.appendChild(favAddElement);
		} else if ( favAddElement.hasChildNodes() ) {
				while ( favAddElement.childNodes.length >= 1 ) {
					favAddElement.removeChild( favAddElement.firstChild );       
				}
		}
				
		var addListener = function(e) { CAHelper.AddUsingFavMember(0); };
		if ( CAHelper.HaveFavMemberData() ) {
			favAddElement.innerHTML = 'Build Guard From Favorites';
			favAddElement.addEventListener('click', addListener, false);
		} else {
			favAddElement.innerHTML = '';
			favAddElement.removeEventListener('click', addListener, false);
		}
		
		//*************************************************************************************
		// Create Favorites list box
		//*************************************************************************************
		var contentsBox = document.getElementById('AngusH_CAH_ContentsBox');
		if ( !contentsBox ) {
			contentsBox = document.createElement('div');
			contentsBox.setAttribute('id', 'AngusH_CAH_ContentsBox');
			contentsBox.setAttribute('style', 'padding-left: 3px; padding-right: 3px;');
			mainBox.appendChild(contentsBox);
		} else if ( contentsBox.hasChildNodes() ) {
				while ( contentsBox.childNodes.length >= 1 ) {
					contentsBox.removeChild( contentsBox.firstChild );       
				}
		}		
		
		//Favorites List ==========================================================		
		var favList = document.createElement('ol');
		favList.setAttribute('id', CAHelper.FAV_LIST_ID);
		favList.setAttribute('style', 'padding: 3px 3px 3px 3px;');
		for ( var i = 0; i < CAHelper.FavMembersID.length ; i++ )
			favList.appendChild( CAHelper.CreateFavItemElement(CAHelper.FavMembersID[i],CAHelper.FavMembersName[i]) );
		contentsBox.appendChild(favList);
		//mainBox.appendChild(contentsBox);		
	},
	
	CreateManagementBox:function(myID) {
		if ( document.getElementById('AngusH_CAH_Container') )
			return;
		
		//*************************************************************************************
		// Create main, title, monster box
		//*************************************************************************************
		var mainBox = document.createElement('div');
		mainBox.setAttribute('id', 'AngusH_CAH_Container');
		//mainBox.setAttribute('style', 'background-color: #C0C0C0; clear: both; text-align: center; -moz-user-select:none; border-width: 2px; border-style: solid; margin-bottom: 5px;');
		mainBox.setAttribute('style', 'background-color: #C0C0C0; clear: both; text-align: center; border-width: 2px; border-style: solid; margin-bottom: 5px;');
		
		var titleBox = document.createElement('div');
		titleBox.setAttribute('id', 'AngusH_CAH_Title');
		titleBox.setAttribute('style', 'background-color: #000000; color:#FFFFFF; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
		titleBox.innerHTML = scriptName + ' Manager' + '<br/>Version: ' + scriptVersion;;
		mainBox.appendChild(titleBox);	

		var monstBox = document.createElement('div');
		monstBox.setAttribute('id', 'AngusH_CAH_Monster');
		monstBox.setAttribute('style', 'background-color: #FFFFA0; color:#000000; padding-left: 3px; padding-right: 3px; font-weight: border-bottom-style: solid;');
		mainBox.appendChild(monstBox);	

		var theAds = document.getElementById('pagelet_canvas_nav_content');//'sidebar_ads');
		theAds.innerHTML = '';
		theAds.parentNode.appendChild(mainBox);

		//*************************************************************************************
		// Refresh Monster info
		//*************************************************************************************
		CAHelper.RefreshMonsterInfo();
		
		//*************************************************************************************
		// Refresh Favorites Member List
		//*************************************************************************************
		CAHelper.RefreshFavList();
	
		//*************************************************************************************
		// Add Other Links
		//*************************************************************************************
		var theGoto = document.createElement('div');
		theGoto.setAttribute('id', 'AngusH_CAH_GotoSection');
		theGoto.innerHTML = '<a href="http://apps.facebook.com/castle_age/army_member.php">My Army</a> | <a href="http://apps.facebook.com/castle_age/party.php">My Elite Guard</a>';
		if ( myID != "" )
			theGoto.innerHTML += '<br/><a href="' + CAHelper.GetArenaUrl(myID) + '">My Arena Vengeance List</a>';
		mainBox.appendChild(theGoto);
		
		var theScript = document.createElement('div');
		theScript.setAttribute('id', 'AngusH_CAH_ScriptSection');
		theScript.innerHTML = '<a href="http://userscripts.org/scripts/show/' + scriptNum + '" target=_blank>Script Homepage</a>';
		mainBox.appendChild(theScript);
	},
	
	CreateMassAddBtn:function(oldBtn, p) {
		if (UserID.length <= 0)
			return;
			
		var massAddBtn = null;
		if ( oldBtn )
			massAddBtn = oldBtn;
		else
			massAddBtn = document.createElement('table');
		
		massAddBtn.style.cssText = 'margin: -2px -2px -2px -2px;';
		
		var newHTML = '<table cellspacing="0" cellpadding="0">';
		newHTML += '<tr>';
		newHTML += '<td class="mContTLBorder" width="12"></td>';
		newHTML += '<td class="mContTMainback" align="middle">';
		newHTML += '<div style="width: 716px;"><div style="clear: both;"></div><div style="padding-left: 20px; float: left;">';
		newHTML += '<span style="color: #ffffff; font-size: 14px; font-weight: bold;">'+ scriptName + ' v' + scriptVersion + ': <a href="#" id="' + CAHelper.MASS_ADD_BTN_ID + '">Mass Add Random</a></span>';
		newHTML += '</div><div style="clear: both;"></div></div>';
		newHTML += '</td>';
		newHTML += '<td class="mContTRBorder" width="12"></td>';
		newHTML += '</tr>';
		newHTML += '</table>';
		massAddBtn.innerHTML = newHTML;
		
		if ( p )
			p.snapshotItem(0).appendChild(massAddBtn);	
		
		var randomLink = document.getElementById(CAHelper.MASS_ADD_BTN_ID);
		if ( randomLink ) {
			randomLink.addEventListener('click', function(e) {
																						CAHelper.AddUsingMassAdd(0);
																					},false);
		}
	},
	
	CreateJoinLink:function(userID, isArena) {
		var joinElement = document.createElement('a');	
		joinElement.setAttribute('target', '_blank');
		joinElement.setAttribute('style', 'font-size: 12px;');

		if ( isArena ) {
			joinElement.setAttribute('href', CAHelper.GetArenaUrl(userID) );
			joinElement.innerHTML = '<br />Join Arena Guard [x]';
		} else {
			joinElement.setAttribute('href', CAHelper.GetEliteUrl(userID) );
			joinElement.innerHTML = '<br />Join Elite Guard [x]';
		}
	
		return joinElement;
	},
	
	GetMyID:function() {
		var myID = '';
		var navAccountPic = nHtml.FindByAttrContains(document.body, "a", "id", 'navAccountPic');
		if ( navAccountPic ) {
			myID = navAccountPic.href.substring((navAccountPic.href.indexOf("id=")+3));	
			myID = myID.replace(/[^0-9\.]/g,"");	
			GM_setValue('AngusH_CAH_MyID', myID);
			GM_log("myID:" + myID);
		}	
		
		return myID;
	},

	GetArenaRankIndex:function(rankName) {
			var i;
			for (i = 0 ; i < arenaRankTable.length ; i++) {
				if ( rankName == arenaRankTable[i] )
					break;
			}
			
			if ( i >= arenaRankTable.length )
				i = 1;
			else
				i++;
	
			return i;
	},
	
	CheckArenaPage:function() {
		//*************************************************************************************
		// Check URL
		//*************************************************************************************
		if (clickUrl.indexOf('http://apps.facebook.com/castle_age/arena.php') < 0 )
			return;
			
		//*************************************************************************************
		//
		//*************************************************************************************
		var myLevelElem = nHtml.FindByAttrContains(document.body, "div", "id", "app46755028429_st_5");
		var myLevelHref = nHtml.FindByAttrContains(myLevelElem, "a", "href", "");	
		var myLevel = parseInt(myLevelHref.textContent.replace('Level: ', '').replace('!', ''));
		GM_log("My Level:" + myLevel);
			
		//*************************************************************************************
		//
		//*************************************************************************************
		var myArenaRankElem = nHtml.FindByAttrContains(document.body, "div", "id", "app46755028429_arena_body");
		var myArenaRankName = 'Brawler';
		var myArenaRankIndex = 1;
		
		if ( myArenaRankElem ) {
			var startKeyWord = 'Your Current Rank: ';
			var startIndex = myArenaRankElem.textContent.indexOf(startKeyWord) + startKeyWord.length;
			myArenaRankName = myArenaRankElem.textContent.substring(startIndex);
			
			var stopKeyWord =  '(Top';
			var stopIndex = myArenaRankName.indexOf(stopKeyWord);
			myArenaRankName = myArenaRankName.substring(0, stopIndex).trim();
			myArenaRankIndex = arenaRankTable[myArenaRankName];
			
			GM_log("My Arena Rank: Rank" + myArenaRankIndex + ' - ' + myArenaRankName);		
		}
					
		//*************************************************************************************
		//
		//*************************************************************************************
		var arenaVengeanceImg = nHtml.FindByAttrContains(document.body, "img", "src", "arena_vengeance.gif");
		if ( arenaVengeanceImg )
			GM_log("Found Arena Vengeance List");
			
		var itemLinks = document.evaluate("//td[@class='bluelink']", document, null, 
																				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 	
		for (var i = 0; i < itemLinks.snapshotLength; i++)	{  
			var item = itemLinks.snapshotItem(i);
			var itemHref = nHtml.FindByAttrContains(item, "a", "href", "");	
			
			if ( arenaVengeanceImg && itemHref.href.indexOf("http://www.facebook.com/profile.php?id=") != -1 ) {
				itemHref.setAttribute( 'target', '_blank' );					
				itemHref.href = itemHref.href.replace("http://www.facebook.com/profile.php?id=", 
																		  				"http://apps.facebook.com/castle_age/keep.php?user=");
			} else if ( itemHref.href.indexOf("http://apps.facebook.com/castle_age/keep.php?user=") != -1 ) {
				if ( item.childNodes.length == 3 ) {
					var info = item.childNodes[1];
					var userName = itemHref.textContent;
					var lv = parseInt(info.textContent.replace(userName,'').replace(' , Level ',''));
					var lvString = lv.toString();
					var rankName = info.textContent.replace(userName,'').replace(' , Level ','').replace(lvString,'').trim();
					var rankIndex = arenaRankTable[rankName];
					
					var color = '';
					if ( myArenaRankIndex > rankIndex+4 ) {
						;//color = '#A0A0A0';
					} else if ( myArenaRankIndex > rankIndex+3 ) {
						;//color = '#606060';
					} else if ( myArenaRankIndex > rankIndex+2 ) {
						;//color = '#202020';
					} else if ( myArenaRankIndex > rankIndex+1 ) {
						;//color = '#202020';
					} else if ( myArenaRankIndex > rankIndex ) {
						;//color = '#202020';
					} else if ( lv >= myLevel+100 ) {
						color = '#600000';
					} else if ( lv >= myLevel+50 ) {
						color = '#600060';
					} else if ( lv >= myLevel ) {
						color = '#606060';
					} else if ( lv < myLevel-100 ) {
						color = '#006000';
					} else if ( lv >= myLevel-50 ) {
						color = '#000060';
					}
					
					if ( color != '' )
						item.setAttribute( 'style', 'background-color: ' + color + '; padding-top: 8px; padding-bottom: 8px; vertical-align: middle;' );
										
					GM_log("User:" + itemHref.textContent + ", Level" + lv + ", Rank" + rankIndex + ' - ' + rankName);
				}
			}
		}
		
		
	},
	
	CheckMonsterPage:function() {
		//*************************************************************************************
		// Check if on monster page
		//*************************************************************************************
		var isVolcanicDragon = 0;
		var classType = -1;
		var webSlice;
		if (!(webSlice=CheckForImage('dragon_title_owner.jpg'))) { 
				GM_log("Can't found dragon_title_owner.jpg");
			
				if ( (webSlice=CheckForImage('nm_bars.jpg')) ) {
					isVolcanicDragon = 1;
				} else if ( (webSlice=CheckForImage('nm_bars_2.jpg')) ) {
					isVolcanicDragon = 1;
				} else {
					GM_log("Can't found nm_bars.jpg or nm_bars_2.jpg");
					return;
				}
		}

		//*************************************************************************************
		// Get name and type of monster
		//*************************************************************************************
		var monster = nHtml.GetText(webSlice);
		if ( isVolcanicDragon ) {
			monster = monster.substring(0,monster.indexOf("'s Life")).trim();
			monstType = 'Bahamut';//monster.substring(0,monster.indexOf(", ")).trim();
		} else {
			monster = monster.substring(0,monster.indexOf('You have (')).trim();
		
			if (CheckForImage('raid_1_large.jpg')) 
				monstType = 'Raid I';
			else if (CheckForImage('raid_b1_large.jpg')) 
				monstType = 'Raid II';
			else 
				monstType = /\w+$/i.exec(monster);

			if (nHtml.FindByAttrContains(webSlice,'a','href','id='+GM_getValue('AngusH_CAH_MyID','x')))
				 monster = monster.replace(/.+'s /,'Your ');
		}
				
		
		GM_log("monstType:" + monstType + ", monster:" +monster );

		var img;
		var monstTime = '';
		var hpPercent = -1.0;
		var fortPercent = -1.0;
		
		//*************************************************************************************
		// Check time and HP
		//*************************************************************************************
		var time = $("#app46755028429_monsterTicker").text().split(":");
    if ( time.length == 3 ) {
    	monstTime = time[0] + ' hours ' + time[1] + ' mins';
      var miss = $.trim($("#app46755028429_action_logs").prev().children().eq(3).children().eq(2).children().eq(1).text().replace(/.*:\s*Need (\d+) more answered calls to launch/, "$1"));
		
			var hpBar;
			if ( isVolcanicDragon ) {
				hpBar = $("img[src*=/graphics/nm_red.jpg]").parent().css("width");
			}	else {
				hpBar = $("img[src*=/graphics/monster_health_background.jpg]").parent().css("width");
			}
			if ( hpBar )
				hpPercent = Math.round(hpBar.replace(/%/,'')*10)/10;
		}
			
		
		//*************************************************************************************
		// Check for mana forcefield
		//*************************************************************************************
		if ((img=CheckForImage('bar_dispel'))) {
			var manaHealth = img.parentNode.style.width;
			manaHealth = manaHealth.substring(0,manaHealth.length-1);
			manaHealth = 100 - Number(manaHealth);
			fortPercent = (Math.round(manaHealth*10)) / 10;
		}
	
		//*************************************************************************************
		// Check fortify stuff
		//*************************************************************************************
		if ((img=CheckForImage('seamonster_ship_health'))) {
			var shipHealth = img.parentNode.style.width;
			shipHealth = shipHealth.substring(0,shipHealth.length-1);
			if (monstType == "Legion" || monstType == 'Elemental') {
				if ((img = CheckForImage('repair_bar_grey'))) {
					var extraHealth = img.parentNode.style.width;
					extraHealth = extraHealth.substring(0,extraHealth.length-1);
					shipHealth = Math.round(Number(shipHealth) * (100/(100 - Number(extraHealth))));
				}
			}
			fortPercent = (Math.round(shipHealth*10)) / 10;
		}
		GM_log("hpPercent:" + hpPercent + ", fortPercent:" + fortPercent);
		
		//*************************************************************************************
		// Check Party Health/Strength
		//*************************************************************************************
		if ((img=CheckForImage('nm_green.jpg'))) {
			var partyStrength = img.parentNode.style.width;
			var partyHealth = img.style.width;
			
			partyStrength = partyStrength.substring(0,partyStrength.length-1);
			partyHealth = partyHealth.substring(0,partyHealth.length-1);
			partyHealth = Math.round(Number(partyStrength/100) * partyHealth);
			fortPercent = (Math.round(partyHealth*10)) / 10;
			//GM_log("partyStrength:" + partyStrength + ", partyHealth:" + partyHealth);
		}		
	
		//*************************************************************************************
		// Get damage done to monster
		//*************************************************************************************
		webSlice = nHtml.FindByAttrContains(document.body, "td", "class", "dragonContainer");
	if ( !webSlice ) {
			GM_log("Couldn't get dragoncontainer");
			return;
		}

		webSlice = nHtml.FindByAttrContains(webSlice, "td", "valign", "top");
		if ( !webSlice ) {
			GM_log("couldn't get top table");
			return;
		}
			
		webSlice = nHtml.FindByAttrContains(webSlice,"a","href","keep.php?casuser=" + GM_getValue('AngusH_CAH_MyID','x'));
		if ( !webSlice ) {
			GM_log("Player hasn't done damage yet[ID:" + GM_getValue('AngusH_CAH_MyID','x') + "]");

			if (monstType=="Serpent" || monstType=="Elemental" || monstType=="Deathrune" || monstType =="Legion" )
				CAHelper.RefreshMonsterInfo(clickUrl, monstType, monster, -1, -1, hpPercent, fortPercent, classType, monstTime);
			else
				CAHelper.RefreshMonsterInfo(clickUrl, monstType, monster, -1, null, hpPercent, fortPercent, classType, monstTime);
				
			return;
		}
		
		var dmgDone = 0, forDone = 0;
		if (monstType=="Serpent" || monstType=="Elemental" || monstType=="Deathrune") {
			//var damList=nHtml.GetText(webSlice.parentNode.nextSibling.nextSibling).trim().split("/");
			var damList=nHtml.GetText(webSlice.parentNode.parentNode.nextSibling.nextSibling).trim().split("/");
			dmgDone = NumberOnly(damList[0]);
			forDone = NumberOnly(damList[1]);
			if ( dmgDone == 0 ) dmgDone = -1;
			if ( forDone == 0 ) forDone = -1;			
		} else {
			dmgDone = NumberOnly(nHtml.GetText(webSlice.parentNode.parentNode.nextSibling.nextSibling).trim());
		}
		webSlice.setAttribute('style', 'font-size: 14px; color:#FFFFFF;');
		var textElem = webSlice.parentNode.parentNode.nextSibling.nextSibling;
		var textColor = '#006000';
		textElem.setAttribute('style', 'font-size: 14px; color:' + textColor + ';');
			
		//GM_log("monstType:" + monstType + ", dmgDone:" + dmgDone + ", forDone:" + forDone);	
		CAHelper.RefreshMonsterInfo(clickUrl, monstType, monster, dmgDone, forDone, hpPercent, fortPercent, classType, monstTime);	
	},
	
	CheckKeepPage:function() {
		//*************************************************************************************
		// 
		//*************************************************************************************
		//if (clickUrl.indexOf('http://apps.facebook.com/castle_age/keep.php?user=') < 0 )
		//	return;
		if ( !document.querySelector("#app46755028429_keep") )
			return;
		
		//*************************************************************************************
		// Check key item
		//*************************************************************************************
		var statsT1 = nHtml.FindByAttrContains(document.body, "div", "class", "statsT1");
		var statsT2 = nHtml.FindByAttrContains(document.body, "div", "class", "statsT2");
		//GM_log("statsT1:" + statsT1 + ", statsT2:" + statsT2);
		
		if ( !statsT1 || !statsT2  ) {
			GM_log('statsT1 or statsT2 is null, Check keep page failed');
			return;
		}
		
		//*************************************************************************************
		//Try to Get Friend's ID
		//*************************************************************************************
		var keepStats =nHtml.FindByAttrContains(document.body, "span", "class", 'linkwhite');
		if ( !keepStats ) {
			GM_log("Can't found keepStats");
			return;
		}
	
		var keepStatsHref = nHtml.FindByAttrContains(keepStats, "a", "href", "");		
		if ( !keepStatsHref ) {
			GM_log("Can't found keepStatsHref");
		}
		
		var friendID = keepStatsHref.href.toString().trim().substring(39);
		var friendName = nHtml.GetText(keepStatsHref).trim().replace('\"', '').replace('\"', '');
		GM_log("FriendID:" + friendID + ", FriendName:" + friendName);
		
		//Can't get friend ID, return =============================================
		if ( friendID == "" )
			return;
			
		//Check Is My ID ? ========================================================
		var myID = GM_getValue('AngusH_CAH_MyID', '');
		if ( friendID == myID ) {
			GM_log("Self keep status!!!");
			return;
		}
		
		//*************************************************************************************
		//Not friend, don't add anythings
		//*************************************************************************************
		var invadeBtn = nHtml.FindByAttrContains(document.body, "input", "src", "battle_01.gif");
		var duelBtn   = nHtml.FindByAttrContains(document.body, "input", "src", "battle_02.gif");
		if ( invadeBtn || duelBtn ) {
			GM_log("Found battle button, not friend. Add his Vengeance List");
			
			var vengeanceList = document.createElement('a');
			vengeanceList.innerHTML = '<a href="' + CAHelper.GetArenaUrl(friendID) + '"><span style="font-size: 14px; color: #ffffff;">View Vengeance List</span></a>';
			keepStats.parentNode.appendChild(vengeanceList);			
			return;
		}		
			
		//*************************************************************************************
		//Found friend ID and name, Add link 
		//*************************************************************************************
		if ( !CAHelper.IsFavMemberExist(friendID) ) {
			var addToFavLink = CAHelper.CreateAddToFavElement(friendID, friendName, 1);
			keepStats.parentNode.appendChild(addToFavLink);	
		} else {				
			var removeLink = CAHelper.CreateRemoveFromFavElement(friendID, friendName, 1);
			keepStats.parentNode.appendChild(removeLink);
		}									
	},

	CheckArmyPage:function() {
		//*************************************************************************************
		// Check URL
		//*************************************************************************************
		if (clickUrl.indexOf('army_member.php') < 0 )
			return;
		
		//*************************************************************************************
		// Check URL
		//*************************************************************************************
		var pageLinks = document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 	
		for (var i = 0; i < pageLinks.snapshotLength; i++)
		{  
			var thisLink = pageLinks.snapshotItem(i);
			
			// Check link to fix the Page links.
			if (thisLink.textContent.indexOf("Remove Member [x]") != -1)	{
				var userID = thisLink.href.substring((thisLink.href.indexOf("_id=")+4));
				var userName = "";
				if ( i > 0 )
					userName = pageLinks.snapshotItem(i-1).text;

				var eliteElement = CAHelper.CreateJoinLink(userID, 0);
				thisLink.parentNode.appendChild(eliteElement);

				var arenaElement = CAHelper.CreateJoinLink(userID, 1);
				thisLink.parentNode.appendChild(arenaElement);
	
				if ( !CAHelper.IsFavMemberExist(userID) ) {
					var addToFavLink = CAHelper.CreateAddToFavElement(userID, userName, 0);
					thisLink.parentNode.appendChild(addToFavLink);
				} else {
					var removeLink = CAHelper.CreateRemoveFromFavElement(userID, userName, 0);
					thisLink.parentNode.appendChild(removeLink);
				}
	
				if (UserID.indexOf(userID) == -1)
					UserID.push(userID);
			}
		}
		//Temp		
		//GM_setValue('UserID', UserID.join(','));			
		//GM_log("User.Length:"+UserID.length);
	
		// Create mass add button =================================================
		var armyHeaders = document.evaluate("//div[@class='mContT2']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		CAHelper.CreateMassAddBtn(null, armyHeaders);	
	},
	
	CheckLandPage:function() {
		GM_log("In CheckLandPage");
		var landElement = document.getElementById('app46755028429_land');
		if ( !landElement ) {
			GM_log("Coun't found landElement");
			return;
		}
			
		dtrs = landElement.getElementsByTagName('tr');
		var hroi = 0.0, lroi = 9999.9;
		trs = Array();
		for (var i = 0; i < dtrs.length; i++) {
		   ctr = dtrs[i];
		   if (ctr.className == 'land_buy_row' || ctr.className == 'land_buy_row_unique') {
		      trs.push(ctr);
		      ctd = ctr.cells[0];
		      lis = ctd.getElementsByTagName('strong');
		      ctr.income = lis[1];
		      ctr.cost = lis[2];
		      
		      ctr.f_income = parseFloat(ctr.income.innerHTML.replace(/\D/g, ''));
		      ctr.f_cost = parseFloat(ctr.cost.innerHTML.replace(/\D/g, ''));
		      ctr.roi = ctr.f_income / ctr.f_cost * 100;
		      roi_div = '<div style="float: right; margin: 0 30px 0 0; padding: 2px 5px; font-size: 11px; background-color: #000; width: 50px; height: 15px;">' 
		      + Math.round(ctr.roi * 1000)/100.0 + "</div>";
		      ctr.income.innerHTML = roi_div + ctr.income.innerHTML;
		      if (hroi < ctr.roi) hroi = ctr.roi;
		      if (lroi > ctr.roi) lroi = ctr.roi;
		   }
		}	
		/*
    // colorize
    var cc = 128;
    for (var i = 0; i < trs.length; i++) {
       ctr = trs[i];
       // color factor
       cf = parseFloat(ctr.roi - lroi) / parseFloat(hroi - lroi);
       g = parseInt(cf * (255 - cc)) + cc;
       rb = 255 - g;
       rgb = 'rgb('+rb+','+g+','+rb+')';
       ctr.income.style.color = rgb;
       ctr.cost.style.color = 'rgb(0,'+(g-cc)+',0)';
       sels = ctr.getElementsByTagName('select');
       for (var si = 0; si < sels.length; si++) {
          sels[si].style.backgroundColor = rgb;
       }
    }*/
	},	
	
	Init:function() {
		GM_log("In init");
		
		//*************************************************************************************
		// Load Favorites Members data
		//*************************************************************************************
		CAHelper.LoadFavMemberData();
		//CAHelper.LoadUserData();//Temp
		
		//*************************************************************************************
		// Get self ID
		//*************************************************************************************
		var myID = CAHelper.GetMyID();
		
		
		//*************************************************************************************
		//
		//*************************************************************************************
		DoHeal();
		
		//*************************************************************************************
		// Create Management box (If not exist)
		//*************************************************************************************
		CAHelper.CreateManagementBox(myID);
		
		//*************************************************************************************
		// Check Arena Vengeance Page
		//*************************************************************************************
		CAHelper.CheckArenaPage();
		
		//*************************************************************************************
		// Check Monster Page
		//*************************************************************************************
		CAHelper.CheckMonsterPage();
		
		//*************************************************************************************
		// Check Land page
		//*************************************************************************************
		CAHelper.CheckLandPage();
		
		//*************************************************************************************
		// Check Army Page
		//*************************************************************************************
		CAHelper.CheckArmyPage();

		//*************************************************************************************
		// Check keep page
		//*************************************************************************************
		CAHelper.CheckKeepPage();
	}
};

/////////////////////////////////////////////////////////////////////////////////////////
// Entry Point
/////////////////////////////////////////////////////////////////////////////////////////
var globalContainer = document.querySelector('#app46755028429_globalContainer')
var clickUrl        = window.location.href;
var arenaRankTable  = { 'Brawler':1,
												'Swordsman':2,
												'Warrior':3,
												'Gladiator':4,
												'Hero':5,
												'Legend':6 };

globalContainer.addEventListener('click', function(event) {
    var obj = event.target;
    while(obj && !obj.href)
	    obj = obj.parentNode;

    if(obj && obj.href) {
			clickUrl = obj.href;
			//GM_log("clickUrl: " + clickUrl);
			
			if ( clickUrl.indexOf('http://apps.facebook.com/castle_age/battle_monster.php?') < 0 )
				setTimeout(CAHelper.RefreshMonsterInfo, 0); 
			
			if ( clickUrl.indexOf('http://apps.facebook.com/castle_age/land.php') >= 0 )
				setTimeout(CAHelper.CheckLandPage, 0); 				
    }
}, true);

globalContainer.addEventListener('DOMNodeInserted', function(event) {
	if ( !event.target.id )
		return;
	//GM_log("event.target.id: " + event.target.id);
		
	if ( event.target.id == 'app46755028429_keep' || event.target.querySelector("#app46755028429_keep") ) {
		setTimeout(CAHelper.CheckKeepPage, 0);
	}
	
	if ( event.target.querySelector("#app46755028429_arena_body" ) ) {
		setTimeout(CAHelper.CheckArenaPage, 0);
	}
	
  if ( event.target.id == 'app46755028429_battle_monster' || event.target.querySelector("#app46755028429_battle_monster")) {
		setTimeout(CAHelper.CheckMonsterPage, 0);
  }
  
	if ( event.target.id == 'app46755028429_land' ) {
		setTimeout(CAHelper.CheckLandPage, 0);
	}
	
	if ( event.target.id == 'app46755028429_army_member' ) {
		setTimeout(CAHelper.CheckArmyPage, 0);
	}	

}, true);
/*
window.addEventListener("load", function(e) {
	setTimeout(CAHelper.Init(), 500);
}, false);*/
CAHelper.Init();