// ==UserScript==
// @name           Castle Age - Arena Helper
// @namespace      AngusH_CA
// @description    NOTICE!! THIS SCRIPT MODIFY FROM Scott Royalty's Elite Guard Builder. This script will add links to join army member's Arena Guard and thus add them to yours. It also includes a Mass Add at Random feature to attempt adding the 25 listed on the current army members page, and includes a Favorite Army Members Management System.
// @include        http*://apps.*facebook.com/castle_age/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=61078
// @version        0.2.0
// ==/UserScript==

var scriptVersion = "0.2.0";


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
    return GM_getValue("AGM_LOCALE", "en_us");
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
        return AGBuilder.FindByAttr(obj, tag, "className", className);
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
        return html.replace(AGBuilder.htmlRe, '').replace(/&nbsp;/g, '');
    },

    timeouts: {},

    setTimeout: function (func, millis) {
        var t = window.setTimeout(function () {
            func();
            nHtml.timeouts[t] = undefined;
        }, millis);

        AGBuilder.timeouts[t] = 1;
    },

    clearTimeouts: function () {
        for (var t in AGBuilder.timeouts) {
            if (AGBuilder.timeouts.hasOwnProperty(t)) {
                window.clearTimeout(t);
            }
        }

        AGBuilder.timeouts = {};
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
// Arena Guard Builer
/////////////////////////////////////////////////////////////////////////////////////////
var UserID = new Array();
var UserLocale = GetLocale();
var GetText = Locale[UserLocale];

var AGBuilder = {
	FAV_ADD_FROM_FAV_BTN_ID:"AngusH_AGM_AddFromFavBtn",
	FAV_LIST_ID:"AngusH_AGM_FavList",
	FAV_LIST_ITEM_ID:"AngusH_AGM_FavItem_",
	FAV_LIST_ITEM_JOIN_ID:"AngusH_AGM_JoinToAGLink_",
	FAV_LIST_ITEM_REMOVE_ID:"AngusH_AGM_ItemRemoveFromFav_",
	ELEM_ADD_TO_FAV_ID:"AngusH_AGM_ElemAddToFav_",
	ELEM_REMOVE_FROM_FAV_ID:"AngusH_AGM_ElemRemoveFromFav_",
	MASS_ADD_BTN_ID:"AngusH_AGM_MassAddBtn",
	
	FavMembersID:null,
	FavMembersName:null,

	LoadFavMemberData:function() {
		var TempID = GM_getValue('ArmyMembers', "");
		if (TempID.length > 0)
			AGBuilder.FavMembersID = TempID.split(',');
		else
			AGBuilder.FavMembersID = new Array();
	
		var TmpName = GM_getValue('ArmyMembersName', "");
		if (TmpName.length > 0)
			AGBuilder.FavMembersName = TmpName.split(',');
		else
			AGBuilder.FavMembersName = new Array();
	},
	
	HaveFavMemberData:function() {
		//*************************************************************************************
		// Reload Fav Member data (Avoid multi-tab bug)
		//*************************************************************************************
		AGBuilder.LoadFavMemberData();
		
		if ( AGBuilder.FavMembersID.length > 0 )
			return true;
		else
			return false;
	},
	
	IsFavMemberExist:function(userID) {
		//*************************************************************************************
		// Reload Fav Member data (Avoid multi-tab bug)
		//*************************************************************************************
		AGBuilder.LoadFavMemberData();

		if ( AGBuilder.FavMembersID.indexOf(userID) != -1 )
			return true;
		else
			return false;
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
		var favAddElement = document.getElementById(AGBuilder.FAV_ADD_FROM_FAV_BTN_ID);

		//*************************************************************************************
		// Restore favorites link text
		//*************************************************************************************
		if ( index < 0 ) {
			if ( index == -1 ) {
				favAddElement.innerHTML = 'Complete!';
				setTimeout( function() { AGBuilder.AddUsingFavMember(-2); }, 1000 );
			} else if ( index == -2 ) {
				favAddElement.innerHTML = 'Build Guard From Favorites';
				/*
				favAddElement.addEventListener('click', function(e) {
																									AGBuilder.AddUsingFavMember(0);
																								}, false);			*/
			}
			
			return;
		}
		
		//*************************************************************************************
		// Reload Fav Member data when first member (Avoid multi-tab bug)
		//*************************************************************************************
		if ( index == 0 )
			AGBuilder.LoadFavMemberData();
			
		//*************************************************************************************
		// Do join request and Show progress
		//*************************************************************************************
		favAddElement.innerHTML = "Adding FavArmy[" + (index+1) + "]";
		AGBuilder.startXmlHttp( AGBuilder.GetArenaUrl(AGBuilder.FavMembersID) );
	
		//*************************************************************************************
		//Goto next id ( if necessary )
		//*************************************************************************************		
		index = index + 1;
		if ( index < AGBuilder.FavMembersID.length )
			setTimeout( function() { AGBuilder.AddUsingFavMember(index); }, 100 );
		else
			setTimeout( function() { AGBuilder.AddUsingFavMember(-1); }, 1000 );
	},

	AddUsingMassAdd:function(index) {
		var massAddBtn = document.getElementById(AGBuilder.MASS_ADD_BTN_ID);
		
		//*************************************************************************************
		// Restore link text
		//*************************************************************************************
		if ( index < 0 ) {
			if ( index == -1 ) {
				massAddBtn.innerHTML = 'Complete!';
				setTimeout( function() { AGBuilder.AddUsingMassAdd(-2); }, 1000 );
			} else if ( index == -2 ) {
				//AGBuilder.CreateMassAddBtn(massAddBtn, null);
				massAddBtn.innerHTML = 'Mass Add Random';
			}
			
			return;
		}
				
		//*************************************************************************************
		// Do Join request and Show progress
		//*************************************************************************************
		massAddBtn.innerHTML = 'Working ' + (index+1) + '/' + UserID.length;		
		if ( UserID[index] >= 1 )
			AGBuilder.startXmlHttp( AGBuilder.GetArenaUrl(UserID[index]) );
		
		//*************************************************************************************
		//Goto next id ( if necessary )
		//*************************************************************************************		
		index = index + 1;
		if ( index < UserID.length )
			setTimeout( function() { AGBuilder.AddUsingMassAdd(index); }, 100 );
		else
			setTimeout( function() { AGBuilder.AddUsingMassAdd(-1); }, 1000 );
	},	
	
	AddToFavList:function(target, isFromKeep) {
		var userID = target.id.substring( AGBuilder.ELEM_ADD_TO_FAV_ID.length );
		var userName = target.name;
		GM_log("In AddToFavList(...), ID:" + userID + ", Name:" + userName);
		
		if ( AGBuilder.IsFavMemberExist(userID) )
			return;
		
		//***********************************************************************************	
		// Add to favorites list
		//***********************************************************************************	
		AGBuilder.FavMembersID.push(userID);
		GM_setValue('ArmyMembers', AGBuilder.FavMembersID.join(','));			
		AGBuilder.FavMembersName.push(userName);
		GM_setValue('ArmyMembersName', AGBuilder.FavMembersName.join(','));
		
		//***********************************************************************************	
		// Remove add element
		//***********************************************************************************			
		var elemAddID = AGBuilder.ELEM_ADD_TO_FAV_ID + userID;
		var addElement = document.getElementById(elemAddID);
		var parentNode = addElement.parentNode;
		if ( addElement )
			addElement.parentNode.removeChild(addElement);

		//***********************************************************************************	
		// Add remove element
		//***********************************************************************************			
		var removeLink = AGBuilder.CreateRemoveFromFavElement(userID, userName, isFromKeep);
		if ( parentNode )
			parentNode.appendChild(removeLink);

		//***********************************************************************************	
		// Add item to management box
		//***********************************************************************************			
		var favList = document.getElementById(AGBuilder.FAV_LIST_ID);
		var favItem = AGBuilder.CreateFavItemElement(userID, userName);
		favList.appendChild(favItem);
	},
	
	RemoveFromFavList:function(target, isFromKeep) {
		var userID = target.id.substring(AGBuilder.ELEM_REMOVE_FROM_FAV_ID.length);
		var userName = target.name;
		GM_log("In RemoveFromFavList(...), ID:" + userID + ", Name:" + userName);
		
		if ( !AGBuilder.IsFavMemberExist(userID) ) {
			GM_log("Remove failed. ID[" + userID + "] don't in favorites list");
			return;
		}
			
		//***********************************************************************************	
		// Remove from favorites list
		//***********************************************************************************	
		AGBuilder.FavMembersID.splice(AGBuilder.FavMembersID.indexOf(userID), 1);
		GM_setValue('ArmyMembers', AGBuilder.FavMembersID.join(','));
		AGBuilder.FavMembersName.splice(AGBuilder.FavMembersName.indexOf(userName), 1);
		GM_setValue('ArmyMembersName', AGBuilder.FavMembersName.join(','));
		
		//***********************************************************************************	
		// Remove remove element
		//***********************************************************************************	
		var elemRemoveID = AGBuilder.ELEM_REMOVE_FROM_FAV_ID + userID;
		var removeElement = document.getElementById(elemRemoveID);
		var parentNode = removeElement.parentNode;
		if ( removeElement )
			removeElement.parentNode.removeChild(removeElement);
				
		//***********************************************************************************	
		// Add add element
		//***********************************************************************************			
		var addLink = AGBuilder.CreateAddToFavElement(userID, userName, isFromKeep);
		if ( parentNode )
			parentNode.appendChild(addLink);
		
		//***********************************************************************************	
		// Remove item from management box
		//***********************************************************************************			
		var favItemID = AGBuilder.FAV_LIST_ITEM_ID + userID;
		var favItem = document.getElementById(favItemID);
		if ( favItem != null )
			favItem.parentNode.removeChild(favItem);
	},

	CreateFavItemElement:function(favID, favName) {
		var favListItemID 			= AGBuilder.FAV_LIST_ITEM_ID + favID;
		var favListItemJoinID 	= AGBuilder.FAV_LIST_ITEM_JOIN_ID + favID;
		var favListItemRemoveID = AGBuilder.FAV_LIST_ITEM_REMOVE_ID + favID;
		
		var resultElement = document.createElement('li');
		resultElement.setAttribute('id', favListItemID);
		resultElement.setAttribute('style', 'list-style-type: decimal; list-style-position: inside;');
	
		var nameElement = document.createElement('a');
		nameElement.setAttribute( 'href', AGBuilder.GetKeepUrl(favID) );	
		nameElement.setAttribute( 'target', '_blank' );
		nameElement.innerHTML = favName + '<br />';
		resultElement.appendChild(nameElement);
	
		var joinElement = document.createElement('a');
		joinElement.setAttribute('href', AGBuilder.GetArenaUrl(favID) );	
		joinElement.setAttribute('id', favListItemJoinID);
		joinElement.setAttribute('target', '_blank');
		joinElement.innerHTML = 'Join ';
		resultElement.appendChild(joinElement);
		
		var sepElement = document.createElement('span');
		sepElement.setAttribute('style', 'font-size: 12px;');
		sepElement.innerHTML = ' | ';
		resultElement.appendChild(sepElement);
		
		var removeElement = document.createElement('a');
		removeElement.setAttribute('id', favListItemRemoveID);
		removeElement.innerHTML = 'Remove';
		removeElement.setAttribute('name', favName);
		removeElement.addEventListener('click', function(e) {
																							AGBuilder.RemoveFromFavList(e.target);
																						}, false);
		resultElement.appendChild(removeElement);
	
		return resultElement;
	},

	CreateAddToFavElement:function(userID, userName, isFromKeep) {
		var addID = AGBuilder.ELEM_ADD_TO_FAV_ID + userID;
		var resultElement = document.createElement('a');
		
		if ( isFromKeep ) {
			resultElement.setAttribute('style', 'font-size: 14px; color:#ffffff;');
			resultElement.innerHTML = '  Add To Arena Favorites';
		} else {
			resultElement.setAttribute('style', 'font-size: 12px;');
			resultElement.innerHTML = '<br />Add To Arena Favorites [x]';
		}
			
	
		resultElement.setAttribute('name', userName);
		resultElement.setAttribute('id', addID);
		
		resultElement.addEventListener('click', function(e) {
																							AGBuilder.AddToFavList(e.target, isFromKeep);
																						},false);
		return resultElement;
	},

	CreateRemoveFromFavElement:function(userID, userName, isFromKeep) {
		var elemRemoveID = AGBuilder.ELEM_REMOVE_FROM_FAV_ID + userID;
		var resultElement = document.createElement('a');
		
		if ( isFromKeep ) {
			resultElement.setAttribute('style', 'font-size: 14px; color:#ffffff;');
			resultElement.innerHTML = 'Remove From Arena Favorites';
		} else {
			resultElement.setAttribute('style', 'font-size: 12px;');
			resultElement.innerHTML = '<br />Remove From Arena Fav [x]';
		}
		
		resultElement.setAttribute('id', elemRemoveID);
		resultElement.setAttribute('name', userName);
		resultElement.addEventListener('click',  function(e) {
																						AGBuilder.RemoveFromFavList(e.target);
																					},false);
		return resultElement;
	},

	CreateManagementBox:function(myID) {
		//*************************************************************************************
		// Create main box and title box
		//*************************************************************************************
		var mainBox = document.createElement('div');
		mainBox.setAttribute('id', 'AngusH_AGM_Container');
		mainBox.setAttribute('style', 'background-color: #C0C0C0; clear: both; text-align: center; -moz-user-select:none; border-width: 2px; border-style: solid; margin-bottom: 5px;');
		
		var titleBox = document.createElement('div');
		titleBox.setAttribute('id', 'AngusH_AGM_Container');
		titleBox.setAttribute('style', 'background-color: #000000; color:#FFFFFF; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
		titleBox.innerHTML = 'Arena Helper Manager';
		mainBox.appendChild(titleBox);
	
		//*************************************************************************************
		// Have Favorites Member Data, create add link
		//*************************************************************************************
		if ( AGBuilder.HaveFavMemberData() )
		{
			var favAddElement = document.createElement('a');
			favAddElement.setAttribute('id', AGBuilder.FAV_ADD_FROM_FAV_BTN_ID);
			favAddElement.innerHTML = 'Build Guard From Favorites';
			favAddElement.addEventListener('click', function(e) {
																								AGBuilder.AddUsingFavMember(0);
																							}, false);
			mainBox.appendChild(favAddElement);
		}
	
		//*************************************************************************************
		// Create Favorites list box
		//*************************************************************************************
		var contentsBox = document.createElement('div');
		contentsBox.setAttribute('style', 'padding-left: 3px; padding-right: 3px;');

		//Favorites List ==========================================================		
		var favList = document.createElement('ol');
		favList.setAttribute('id', AGBuilder.FAV_LIST_ID);
		favList.setAttribute('style', 'padding: 3px 3px 3px 3px;');
		for ( var i = 0; i < AGBuilder.FavMembersID.length ; i++ )
			favList.appendChild( AGBuilder.CreateFavItemElement(AGBuilder.FavMembersID[i],AGBuilder.FavMembersName[i]) );
		contentsBox.appendChild(favList);
		mainBox.appendChild(contentsBox);
		
		//Other Links =============================================================
		var theGoto = document.createElement('div');
		theGoto.setAttribute('id', 'AngusH_AGM_GotoSection');
		theGoto.innerHTML = '<a href="http://apps.facebook.com/castle_age/army_member.php">My Army</a>';
		if ( myID != "" )
			theGoto.innerHTML += '| <a href="' + AGBuilder.GetArenaUrl(myID) + '">My Vengeance List</a>';
		mainBox.appendChild(theGoto);
		
		var theScript = document.createElement('div');
		theScript.setAttribute('id', 'AngusH_AGM_ScriptSection');
		theScript.innerHTML = '<a href="http://userscripts.org/scripts/show/73094" target=_blank>Script Homepage</a>';
		mainBox.appendChild(theScript);
		
		var verElement = document.createElement('div');
		verElement.innerHTML = "Version: " + scriptVersion;
		mainBox.appendChild(verElement);		
	
		var theAds = document.getElementById('sidebar_ads');
		theAds.innerHTML = '';
		theAds.parentNode.appendChild(mainBox);
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
		newHTML += '<span style="color: #ffffff; font-size: 14px; font-weight: bold;">Arena Helper v' + scriptVersion + ': <a href="#" id="' + AGBuilder.MASS_ADD_BTN_ID + '">Mass Add Random</a></span>';
		newHTML += '</div><div style="clear: both;"></div></div>';
		newHTML += '</td>';
		newHTML += '<td class="mContTRBorder" width="12"></td>';
		newHTML += '</tr>';
		newHTML += '</table>';
		massAddBtn.innerHTML = newHTML;
		
		if ( p )
			p.snapshotItem(0).appendChild(massAddBtn);	
		
		var randomLink = document.getElementById(AGBuilder.MASS_ADD_BTN_ID);
		if ( randomLink ) {
			randomLink.addEventListener('click', function(e) {
																						AGBuilder.AddUsingMassAdd(0);
																					},false);
		}
	},
	
	CreateJoinLink:function(userID) {
		var joinElement = document.createElement('a');	
		joinElement.setAttribute('href', AGBuilder.GetArenaUrl(userID) );
		joinElement.setAttribute('target', '_blank');
		joinElement.setAttribute('style', 'font-size: 12px;');
		joinElement.innerHTML = '<br />Join Arena Guard [x]';
		return joinElement;
	},
	
	Main:function() {
		//*************************************************************************************
		// Initialize
		//*************************************************************************************
		AGBuilder.LoadFavMemberData();
		
		//*************************************************************************************
		// Get self ID
		//*************************************************************************************
		var myID = "";
		var navAccountPic = nHtml.FindByAttrContains(document.body, "a", "id", 'navAccountPic');
		if ( navAccountPic ) {
			var myID = navAccountPic.href.substring((navAccountPic.href.indexOf("id=")+3));		
			GM_log("myID:"+myID);
		}
		
		//*************************************************************************************
		// Create Management box
		//*************************************************************************************
		AGBuilder.CreateManagementBox(myID);
		
		//*************************************************************************************
		// At Arena Vengeance Page, repleace fb link to CA keep link
		//*************************************************************************************
		var arenaVengeanceImg = nHtml.FindByAttrContains(document.body, "img", "src", "arena_vengeance.gif");
		if ( arenaVengeanceImg ) {
			GM_log("Found Arena Vengeance Image");
			
			var itemLinks = document.evaluate("//td[@class='bluelink']", document, null, 
																					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 	
			for (var i = 0; i < itemLinks.snapshotLength; i++)
			{  
				var item = itemLinks.snapshotItem(i);
				var itemHref = nHtml.FindByAttrContains(item, "a", "href", "");	
				if ( itemHref.href.indexOf("http://www.facebook.com/profile.php?id=") != -1 ) {
					itemHref.setAttribute( 'target', '_blank' );					
					itemHref.href = itemHref.href.replace("http://www.facebook.com/profile.php?id=", 
																			  				"http://apps.facebook.com/castle_age/keep.php?user=");
				}
			}
		}
		
		//*************************************************************************************
		// At friend keep page, add join to favorites link
		//*************************************************************************************
		if (window.location.href.indexOf('http://apps.facebook.com/castle_age/keep.php?user=') >= 0 )
		{
			//Not friend, don't add anythings =========================================
			var invadeBtn = nHtml.FindByAttrContains(document.body, "input", "src", "battle_01.gif");
			var duelBtn   = nHtml.FindByAttrContains(document.body, "input", "src", "battle_02.gif");
			if ( invadeBtn || duelBtn ) {
				GM_log("Found battle button, not friend");
				return;
			}
			
			//Try to Get Friend's ID ==================================================
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
				
			//Found friend ID and name, Add link ======================================
			if ( !AGBuilder.IsFavMemberExist(friendID) ) {
				var addToFavLink = AGBuilder.CreateAddToFavElement(friendID, friendName, 1);
				keepStats.parentNode.appendChild(addToFavLink);	
			} else {				
				var removeLink = AGBuilder.CreateRemoveFromFavElement(friendID, friendName, 1);
				keepStats.parentNode.appendChild(removeLink);
			}									
	
			return;
		}
		
		//*************************************************************************************
		// At army page, add [add/remove fav link]
		//*************************************************************************************
		if (window.location.href.indexOf('army_member.php') === -1)
			return;
	
		var pageLinks = document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 	
		for (var i = 0; i < pageLinks.snapshotLength; i++)
		{  
			var thisLink = pageLinks.snapshotItem(i);
			
			// Check link to fix the Page links.
			if (thisLink.href.indexOf("army_member.php?page=") != -1)	{
				thisLink.addEventListener('click', function(e) {
					window.location.href = e.target.href;
					event.stopPropagation();
					event.preventDefault();
				},true);
			}	else if (thisLink.textContent.indexOf("Remove Member [x]") != -1)	{
				var userID = thisLink.href.substring((thisLink.href.indexOf("_id=")+4));
				var userName = "";
				if ( i > 0 )
					userName = pageLinks.snapshotItem(i-1).text;

				var joinElement = AGBuilder.CreateJoinLink(userID);
				thisLink.parentNode.appendChild(joinElement);
	
				if ( !AGBuilder.IsFavMemberExist(userID) ) {
					var addToFavLink = AGBuilder.CreateAddToFavElement(userID, userName, 0);
					thisLink.parentNode.appendChild(addToFavLink);
				} else {
					var removeLink = AGBuilder.CreateRemoveFromFavElement(userID, userName, 0);
					thisLink.parentNode.appendChild(removeLink);
				}
	
				if (UserID.indexOf(userID) == -1)
					UserID.push(userID);
			}
		}
	
		// Create mass add button =================================================
		var armyHeaders = document.evaluate("//div[@class='mContT2']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		AGBuilder.CreateMassAddBtn(null, armyHeaders);
	}
};

/////////////////////////////////////////////////////////////////////////////////////////
// Entry Point
/////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", function(e) {
	AGBuilder.Main();
},false);