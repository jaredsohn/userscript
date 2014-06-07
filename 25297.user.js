// ==UserScript==
// @name          IMDb DirectSearch Plus
// @namespace     Hiromacu
// @description   Variable search bar via icons for IMDb.

// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*

// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==

/************************
 ** SCRIPT INFORMATION **
 ******************************************************************************************
 ** This script is based on 'IMDb->DirectSearch Fixed' by mohanr and I used two ideas 	 **
 ** from 'KG-IMDb 0.1' by KaraGarga (such as iconbar opacity on 60% and Open All text 	 **
 ** at the end of the iconbar.								 **
 **											 **
 ** Additionally I added a new "div" element to keep the original IMDb movie title style **
 ** and keep the iconbar under title.							 **
 **									      - Hiromacu **
 ******************************************************************************************/

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/


// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable a search engine from the script.

var trackers = new Array();

//Wikipedia
trackers.push(new SearchEngine("Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%title&go=Go", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//AllMovie
var allmovie_title = new String(getTitle()); allmovie_title = allmovie_title.replace(/ /g,"|"); 
trackers.push(new SearchEngine("AllMovie", "http://www.allmovie.com/cg/avg.dll?p=avg&sql=12:" + allmovie_title + "~T10AC", false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7DAAAOwwHHb6hkAAACBklEQVQokWP4////gwsXVzc0T4qJx4OWVdZc3rsPqJjh7pmzPcHhPUFhxKBTGzYxrKhtwCIXHN7hE9Dm6QtiB4a2uHt3+QX1BIfNzsxhmByTgKmh0zcQaNDOqTO6A0MnhEcfXrJsbk5Bl1/wpOh4BiAGqugOCAEaCURd/sFAbqub14m1618/fATkTo5NBDp9Q1dvu6c/0DMMQAw0pj88eklp5cq6xmmJqUBtre7eR5avfHrjJkhDTMLPr9/WtXW2e8E0AB1wbuv2z2/fvnn8+OOr1yuq6xqd3PBp6PYPWVhYCrQa6Nx7Z889vHipydn9yLIVuG3wC5qenHZ6w6bbJ0+9uHvv4aXLQCcdXrocu4YJkbFT45PePXl6/9z5OVm5J9dteHTlKjAcDy9b8eT6DaBrIRrWNLVBPd0fFgX0659fvydExlRb2p5cux6orsXVE2jD64cPe0MigMH498/f3bPmAKMFagMwZN4+fvL4ytULO3YBrQL6fnpi6vLquj+//1w/cgRoyY0jR///+7+upb0vJAIUD52+QTNSM4Bm75u3AMjdNmnKvLzCdm9/oJ6d02Z0BYRMiIjZO2fesspaoHMYFhWXg6LWL6jFzavNwxfoS6DVkOjr8IamDmC0tnr4AK2amZbFcPXAISJTHhDtX7CIARjtZ7duA7oBf/IGBiAwRf35/RsAknmV/hUMm9MAAAAASUVORK5CYII="));

//Rotten Tomatoes via IMDb-ID
trackers.push(new SearchEngine("Rotten Tomatoes via IMDb-ID", "http://www.rottentomatoes.com/alias?type=imdbid&s=%imdb-id", true, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ51AAMjQ1AAAAAAAAAAAABC+AAAs8BIAzO8SAD+61QAYXEAAsgYIABC+AAABALIAsgYIAAEAAACyBggAAAAAERAAAAAAAAEREQAAAAAAARERAAEQERAAERAAEREREQAREBEREAEREBEREREAAAEREREQAAAAABEREQAAAAAREBEREQAAAREAEREREAABEQARABEREAERAREAEREQAAAREQABEQAAABERAAAAAAAAEREAAAAAAAAREAAAAAD8f3cA+D93hfg5AAAccADwDEF3rIQDAADgH3eA8D8AAMQPAJyMBwAAjMF3aIjBAALw43dQ8P93//D//2nx/3ei"));

//Youtube
trackers.push(new SearchEngine("Youtube", "http://www.youtube.com/results?search_query=%title&search=Search", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD//////////4OD//9paf//bm7//2Fh//9ZWf//Wlr//1pa//9WVv//ZGT//3Bw//9jY///goL//////////////////11d//8sLP//QUH//ygo//84OP//RET//y4u//8xMf//UVH//y4u//8PD///ZWX//x0d//9aWv////////////88PP//Cgr///////8zM///1NT///////+lpf//ubn///////+urv//fHz////////g4P//Fhb/////////////MzP//woK////////NDT//8vL//9ycv//paX//7Cw//9jY///s7P//8nJ//9XV///eXn//yIi/////////////zMz//8LC///+/v//zMz///Gxv//hYX//6Ki//+srP//W1v//6ys//+3t///2tr//93d//8PD/////////////80NP//AgL///b2//8nJ///5ub//56e//+5uf//oaH//+/v//+5uf//oKD//+Li///f3///AgL/////////////MzP//wUF////////Skr//0pK//9NTf//NTX//97e//+ysv//Nzf//xIS//+mpv//Kyv//z09/////////////xkZ///Y2P////////////8nJ///EBD//wAA///y8v//Ly///wAA//8mJv//Hh7//6mp//92dv////////////+vr///Jib//xMS//8eIP//MzP//zY2//84OP//Hh///y4u//9XV///hoj//8LC///R0f//qqr/////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA/8zMzP/u7u7/IiIi/wAAAP8iIiL//////zMzM/8AAAD/AAAA/////////////////////////////////wAAAP/MzMz//////yIiIv/u7u7/ERER/7u7u/8AAAD/iIiI/xEREf///////////////////////////+7u7v8AAAD/zMzM//////8iIiL/7u7u/xEREf+7u7v/AAAA/8zMzP8RERH///////////////////////////93d3f/AAAA/1VVVf/u7u7/IiIi/wAAAP8iIiL//////wAAAP/MzMz/ERER///////////////////////d3d3/AAAA/4iIiP8AAAD/3d3d/////////////////////////////////////////////////////////////////wAAAP//////AAAA////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D"));

//Mininova via title
//trackers.push(new SearchEngine("Mininova via title", "http://www.mininova.org/search/%title/4/seeds", false, "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////ANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ+RgDx0MEA/PLxAP/99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL+EzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//Torrentz
//trackers.push(new SearchEngine("Torrentz", "http://www.torrentz.com/search?q=%title&s=U", false, "data:image/gif;base64,R0lGODlhEAAQAPcAAClKaylScylSezFSczFSezFahDFajDFjjDlahDljjEJjhEJrjEJrlEprjEprlEpzlFJrjFJzjFJzlFJznGN7nGOEnGOEpWuEnGuMpXuUrYScrZSlvZStxqWtvaW1xq29zrW9zrXGzsbO1sbO3s7W3tbe597n597n7+fv7+/v9/f39/f3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAEAAQAAAIrwANHDAgkODAgggNFBC4cKFChQMbPmx4oEDFiQUWoNi4MUGBjyBBJuCwQQXJkChDogi5QMJHBBIeIChAoMDKmhJMqNhQIOeJBjUJ3CTw4UOFnxJSVKBJQGjTAiIkEMUQoUTTqyiukmgwwEMGCCMIDCAQwOkAASIoBBBRIcKIswMGBEgRIK6GEh5QKAAbN26AEn4JdDBxYUCDEHL9DgDQl3HdxY0hM54seTHly5UZBwQAOw=="));

//ThePirateBay
trackers.push(new SearchEngine("The Pirate Bay (Video)", "http://thepiratebay.org/search/%title/0/7/0", false, "data:image/x-icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA="));

//isoHunt
trackers.push(new SearchEngine("isoHunt (Video/Movies)", "http://isohunt.com/torrents/%title?ihp=1&iht=1&ihs1=2&iho1=d", false, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAACKZj8Ao4FmAMaxnACniGMA9vHvAN/OxgDl2NMAgFwzAKB+XwCXdlUA8u7oALuolgCjgGIA7+rjAKSKZwD7+vgAmnRTAMy+swC/rZkAbDwLAIVeNwCulH0Ag1oyAIlkPwBmNAEAc0UTAOni2gByRBYAcEARAMy7rACFXjgAelAmAKOHaQDPwbQAuJ+IAHdMIQDSwLcA5NXOAHVIHAD08O0A9fDtAGs6CgBsOgoA9/b1AINZLgDZyrwAbT0KAPn59QDQv6oAhFo0AI1nQQCHXz8AybyrANPHtQDYyr0A7ejkAGw9CwDazb0ApI5wAG08DgDs5N8AfVQlAPPx7ADBq5oAlHdXALGWgwDl3tgAbT0MALqnjQB1RxkAqYtxAIxsRQDo4dgA////ALKYfgB2SRwAtZuGAPv7+gB3SRwA8e3oAOzj2wBpNwUAiWM+AJBtSwC6pI4AZjMAANfNvwC1mYQA5drUAHFDFQBoNQMApIptAMazngDIs54A59/XAO7p5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASUlJSSsEL0lJSUlJSUlJSUlJSUlbMTlJSUlJSUlJSUlJSUlJDlU/SUlJSUlJSUlJSTBKSRVVRklJSUlJSUlJSScfBzwdVQhJSUlJSUlJSUkPEBlCXhtSSUlJC1MFSUlJSUxVXBoePUhJSS0mR0lJSUk0OCBNQFVFTk5FGAAGSUlJJRwyKANVO0tLS0NaWElJST4zWTcRUVdJSUlBVURJSUlJDCo1UBQJDUlJVhMBSUlJSRIYIklJSUlJSV4jLCFJSUlPVDZJSUlJSUlJFyldSUlJSUlJSUlJSUlJSQJVOklJSUlJSUlJSUlJSUkkLhZJSUlJSUlJSUlJSUlJSQpfSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="));

//Mininova via IMDb-ID
//trackers.push(new SearchEngine("Mininova via IMDb-ID", "http://mininova.org/imdb/%imdb-id/seeds", true, "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////ANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ+RgDx0MEA/PLxAP/99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL+EzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//opensubtitles.org  via IMDb-ID
trackers.push(new SearchEngine("opensubtitles.org  via IMDb-ID", "http://www.opensubtitles.org/en/search/sublanguageid-all/imdbid-%imdb-id", true, "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9VVVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAAAAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0iIiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACqqqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAiIiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//Subscene
trackers.push(new SearchEngine("Subscene", "http://subscene.com/s.aspx?q=%title", false, "data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHIUExURSElCTk8IiwvEyQnCSIlCSQmCR8iCRogCB4jCSAlCCImCS0wFhwhCh0iB0A4DBsgCCAjByMnDWdNEPuvGxQbCBgfB11UHhUcCCUnDCwvFWxdJT4/IRwgB1pDB2FXExQdBhEaB8aDCy0xGlRFDS8zGxAYA0I+FhodB/+1KRwhCC4xFS8yFmFHBxohCZJxG8+SDSMmCpN1G9GcFmtMDD40DiktDy4uCiolCBgfBtGRHKuDGP+1HHNjGBMdCYZwKZBtEoppGE1HFeOtJM2eKiswGohVDtaOHoFfC5NuMbWNImBXFT0/KJ5jBiIlCCwwFRcbCCspChshCxsfCI9vFkA3ClI6Bh8jB9uTEFVPJTA0FhMcBx4kCU9BDC45GkY+Em5gJ1JLJmtdJ6GEHs+jPDozEDMvCDM0DaVtByEkCSgqEiouFuqiFpF0KDAyFOanGKB2GIVnE5RiDUpAHa2CICEkB19YNRkfBxgdCCAjCK6FG0NMNktACCwpCl1OEsqRFCwwGZRnFl1OD72OJW9eHC8zES0wFB8iBzk7HhweBT48IzI0F9OaFyMkB5d2K8mYHDs7HCEmCWBPJGNRDqx+FGNDAtSgNy4xFiMmCd/6OBMAAAD2SURBVHjaYmCcBgJ+ne2t9Src06YxMjBNB4GwoomqUoky06czMWiBBThTPFqa+DimT5/G4CLAzFIxnSEgp7dBlAskUGVaIphbztuV7JYKVAAUkC5l46/1ShObOiWKefr0tmkMmQkRFjVGSXr5HYEGvmX93gzcGXZqCsbWTgVscv48zfFKDNN444ol5AuFbUKCHSvteyQZprGKO1hpVvsIeTrnuQcxTGOYNp2Bs25yo6y+hmWoCNd0kAAru0l2t6Giqzk783SwwPTpujHhfTrq0dOnwwSm2yqns0yYDhGAeI5nkhkDmMHEAPa+dlZsJDgYpjECBBgAykdeD+sHEioAAAAASUVORK5CYII="));


// --------------- END OF SEARCH ENGINES ---------------  


function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function SearchEngine(shortname, searchurl, usesIMDBID, icon) {
	this.shortname = shortname;
	this.searchurl = searchurl;
	this.usesIMDBID = usesIMDBID;
	this.icon = icon;
	
	this.getHTML = function (title, id) {

//		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" style=\"-moz-opacity: 0.6;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\" target='_blank'><img class=\"img\" style=\"-moz-opacity: 0.6;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		return html;
	}
	
	this.getSearchUrl = function (title, id) {
		var searchUrl = this.searchurl;
		if (this.usesIMDBID) {
			searchUrl = searchUrl.replace(/%imdb\-id/, id);
		}
		else {
			searchUrl = searchUrl.replace(/%title/, encodeURIComponent(title));
		}
		
		return searchUrl;
	}	
}

function openAllInTabs(title, id, inclIMDBID) {
	for (var i = 0; i < trackers.length; i++) {
		if (trackers[i].usesIMDBID && !inclIMDBID)
			continue;
		else
			GM_openInTab(trackers[i].getSearchUrl(title, id));
	}
}

function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	
	/*
	regexp = /'|,|:/g;
	title = title.replace(regexp, " ");
	*/
	
	return title;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


//a new "div" element for keep original IMDb movie title style
/**** BEGIN ****/
var main = document.getElementById('tn15content');
var div_iconbar = document.createElement("div"); 
div_iconbar.id = "div_iconbar";
main.parentNode.insertBefore(div_iconbar, main); 
/**** END ****/

function addIconBarIcons(title, id, trackers) {   
 var iconbar = xpath("//div[@id='div_iconbar']", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
    GM_log("Error! Couldn't find icon bar. Quitting!");
    return;
  }

	iconbar = iconbar.snapshotItem(0);
	iconbar.id = "iconbar";
	
   var tdimg;
  for (var i = 0; i < trackers.length; i++) {
    tdimg = document.createElement("span");
    tdimg.innerHTML = trackers[i].getHTML(title, id);
    iconbar.appendChild(tdimg);
	}

	
	if (GM_openInTab) {
		var aopenall = document.createElement("a");
		aopenall.innerHTML = "Open All";
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		iconbar.appendChild(aopenall);
	}
}


function addStyles() {
	var open_all_class = "a.openall {\n" +
	"	font-weight: bold;\n" + 
	"	font-family: Verdana, Arial, Helvetica, sans-serif;\n" +
	"	font-size: 10px\n" +
	"}";
	
	GM_addStyle(open_all_class);
}


addStyles();
var title = getTitle();
var id = getId();
addIconBarIcons(title, id, trackers);
(function()
{
    try
    {
        var tr = document.evaluate("//TR[TD/@class='lhscol'][1]/TD[last()]//TR[1]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
        if (tr)
        {
            tr.deleteCell(tr.cells.length - 1);
        }
    }
    catch (e)
    {
        alert("UserScript exception: " + e);
    }
}
)();

