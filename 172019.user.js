// ==UserScript==
// @name        FME Catalog Fixer
// @description	Fixes FME-cat so that applications expand correctly
// @namespace   none
// @include     http://fme-cat.com/overlays/part-detail.aspx*
// @version     1.0
// @grant	    none
// @icon	    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAB3RJTUUH3AkYDhQ3rRg0pQAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAAUsSURBVHjaxVddjBNVFP7uTKeddjrdttsWV9gVEkhcfIAoBIhkY6JBV%2BBBIBITUeKDgIGABkkQeDHIGhMSwoM%2F4QGI8rMhLLIguyugPBBRhGD4Ezbo8rNdlm233U6n006nneud6YsxstspEk9ye3vvnXvOd8%2F5zpk7hJoU%2F6dwj7K5IUSojyc04qv0tehw1bJJlggtlYEV786EHPbAoAZ4U0QsSihPgPtDlFSrizgNgdtD6Ib1rTDNHASvDrU8CE3PIRp6EgQ%2B9P4%2BgFOn7yJxrzoQjkMgMJ%2BNa5AxlOwD4fPwSBzCMT9KXAFKPoXmaVOQHK5enyMA1ulXrXwBly5ewIwZz0LN5qGrHPp6kxCFGHbs6IWimNi05TUQsUpOWCGotgkC6OaNC2hIBhXdleb3gvpYs9YovUPB5tatX1YZV6HTEQcspot%2BYHjkij0mHA%2Bal0Hc9cyXPEoFHS7Rw%2F56GLsJimVzTB44CkGJKU0pWWRUL67cuA%2BOmwoUooDhhZeL4upvcStQGE7o4KlcnVInISC8RP2hCNWZs7M0b%2Ff2T77SZ1KUKjlKz56%2FTq1nq9HpCIC9wRWmA2aZJpnN6ynFNmQ1C0d7Tw89c%2FWyzYOqD1VLKSaB8RTRMA73HIc%2BGEesXkYim8Yb81vZagE0Ua66EI1ZCTnBTynxgBaHiW1YFvFR5xHs62jH4rmzAYkHlDQgAm0nOxk%2F0iBRnlYLYlQPENlPk6qKEz9dwFsvt2Jr9%2FdIGgWcPncWN%2B7cQtNTjSimUnBbGeA2IYgu9MdvI%2BKX0N%2FVDXp5YEwQo3tApDh86iTCEycBHoLdnftZ0ktI6iqEhgD68hlQImF8ZDz6r12C0BSD1PQMePZCqG95BWTiOEpvPxgVxOhpmNNw9NujiN8frKDlBGiGDuXgQfCSBJN3gWOFoT%2BZRmjmbBiHOqFny0gPjsDnC6J54WKQJxpozQCoRsmJve3o7uhB8%2FylCPABDO7%2BGiuP9SCn5CAHQjALKoujBr2oQHx9EfK7v0GjzkE2TVYLTHaILGoGUBE3ckNJ1Ile%2FLp%2Fnz1z7OgBBPwuZO9eRSDGap5YgPbgJnxcHihmcW3vHjD%2FQDBLeHX5ckbK2EO9MGYWUCVO7ExgLD%2BnZjBnQgBLFj2Pzw%2FsQmhSENpILwsNB1fEi%2FxAnxU3tidHSFSit5Iqzp88ja4v96BmAJaYhlohknUOotGOjp0winGkb7MTUx8rxQRGKQSpbD1QqGwyNPz8yxnUC24EJd%2BjAfintLRMRvupiyip7DUcbgQxBOQzSWaoAaphVrCOUNsLUpGDmsk%2BNBOc3wlDQHfXPpSMBMKTQygcuYtoHZsvJlHKDkGM%2Fi18iRwZzXhtAJg8N70ZHg%2BQGkrZ42I2icbGBhC9gMKIM5XOAbCq%2B8fNP9H60ouQ3JWpYkZHNqkgEggzDpqPGQCTllnz8MN352Bq7D2gsUQ1A%2BANH%2FME87Yz%2BzUAYK7vOvQjli54Gx69zp5y5X0YJzXByPIIBvjHDIDFeMm8N7Fr2ReI8hPssVvzw1P0QyhLyAyXnelzfCEJsGowAXT1oY10YdtSao037f2Uop6zm0BI1ZcRqzn3gODDxi1bMcKu4s2RKYyBQD6uYMMn2%2FD%2Bh5tR55EebwhISkNxSIFccuOzNVvxwdp1%2BKptJ9QHacYBDZxhYPN7a%2BmW7W1VXbVqupK52ceoR3Zh9YpVCLqC0EslbNu53V77%2BJ01kIN1uOcuoj%2BdwOyp0zF31hw83TyNuP%2FFVE0A%2Fkv5C0k3QPd4G%2BguAAAAAElFTkSuQmCC

// ==/UserScript==
//For parts without description
var desc = document.body.innerHTML.match(/                            Description/ig);
	if (desc == null)
	{
		//Unhide Passenger car light truck
		var div1 = document.getElementsByTagName("div").item(39);

		//Unhide list of vehicles
		var div2 = document.getElementsByTagName('div').item(41);

		div1.setAttribute('style', 'display: block;');
		div2.setAttribute('style', 'display: block;');
	}
		


function ts_makevisible (row) {
	row.setAttribute('style', 'float:none;width: 100%;');
}

var desc = document.body.innerHTML.match(/                            Description/ig);
	if (desc != null)
	{
		//For parts with description
		//Unhide Passenger car light truck
		var div4 = document.getElementsByTagName("div").item(45);
		div4.setAttribute('style', 'display: block;');

		//Unhide list of vehicles
		var div5 = document.getElementsByTagName('div').item(47);
		div5.setAttribute('style', 'display: block;');
	}
	
//Start showing rows
showROws();
		
function showROws() {
	if (!document.getElementsByTagName) return;
   var datarows = document.getElementsByTagName("div");

   for (var ti=0;ti<datarows.length;ti++) {
       var thisdatarows = datarows[ti];
	   // Any div to show must have a class="rptItem"
	   if (((' '+thisdatarows.className+' ').indexOf("rptItem") != -1)) {
	   ts_makevisible(thisdatarows);
	   }
   }
}