// ==UserScript==
// @name			Userscripts.org Sort Groups Joined/Created Lists
// @author			Erik Vold
// @namespace		userscriptsOrgSortGroupsJoinedList
// @include			http://userscripts.org/groups
// @include			http://userscripts.org/groups?*
// @include			http://userscripts.org/groups#*
// @version			0.1.1
// @license			MPL 2.0
// @datecreated		2009-10-21
// @lastupdated		2013-07-13
// @homepageURL http://userscripts.org/scripts/show/60298
// @description		This userscript will sort the groups joined/created list on userscripts.org
// ==/UserScript==

var userscriptsOrgSortGroupsJoinedList={
	init: function(){
		this.sortID("groups-you-joined");
		this.sortID("groups-you-created");
	},
	sortID: function(id){
		var grpsCreated=document.getElementById(id);
		if(!grpsCreated) return;
		var grpLinks=grpsCreated.getElementsByTagName('a');
		if(!grpLinks.length) return;
		var sortAry=[],i,j;
		for(i=0;i<grpLinks.length;i++){
			sortAry.push(grpLinks[i].innerHTML+"");
		}
		var trimFunc = function(input){
			return input.toLowerCase().replace( /^\s*(the|a){0,1}\s+/i , '' );
		}
		sortAry=sortAry.map( trimFunc ).sort();
		for(i=0;i<sortAry.length;i++){
			for(j=i; j<grpLinks.length; j++) {
				if ( trimFunc(grpLinks[j].innerHTML)!=sortAry[i] ) continue;
				if( i==j ) break;
				grpsCreated.insertBefore( grpLinks[j].parentNode, grpLinks[i].parentNode );
			}
		}
	}
};
userscriptsOrgSortGroupsJoinedList.init();