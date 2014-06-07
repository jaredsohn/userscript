// ==UserScript==
// @name          ManagerZone RankOne
// @version        1.1
// @namespace     camargodf
// @description   Rank - You are number One (V1.1)
// @include 	  http://www.managerzone.com/?p=team&uqid*
// ==/UserScript==
// ===========================================================================
// This script was made by camargodf.

var textnodes = document.evaluate( "//text()", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				
for (var i = 0; i < textnodes.snapshotLength; i++)
	textnodes.snapshotItem(i).data = textnodes.snapshotItem(i).data.replace(/(\b[1-9]{1}\b|\b[1-9]{1}[0-9]{1,3}\b)/g, '1');
