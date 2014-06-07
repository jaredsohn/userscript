// ==UserScript==
// @name           Muhterem IMDB
// @namespace      http://userscripts.org/users/84154
// @description    Muhteremle IMDB
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// ==/UserScript==

// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable a search engine from the script.

var trackers = new Array();
var cleanTitle = new String(getCleanTitle());
var imdbCode = new String(getImdbCode());

//-----------------------------------
//------------SUBTITLES-------------- 
//-----------------------------------

//DivXPlanet - Subtitle 
trackers.push(new SearchEngine("Subtitle: DivXPlanet", "http://divxplanet.com/cse.php?ie=ISO-8859-9&oe=ISO-8859-9&hl=tr&cof=FORID%3A9&q=%imdbkod&sa=Tekrar+Ara&cx=009015947334585847211%3A6djglhionb4#949", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/dzS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewLx4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));

//DivXForever - Subtitle
trackers.push(new SearchEngine("Subtitle: DivXForever", "http://www.divxforever.in/index.php?act=subz&CODE=66&imdb_id=%imdbkod", true, "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA4AAEdoAApnlwALaJkAA1mAAAAoQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVHUALdP/AFj0/wBh+P8AZPn/AGb9/wBb+f8AOtn5AA51kQAADxYAAAAAAAAAAAAAAAAAAAAAAAAAAAACcZUATO3/AGn4/wBm9f8Aafn/H3b5/xdH0vIOJZCyARFtjwAPZI0AAHOZAAAXFwAAAAAABGGBAAl2mgAARGMASer/AGj2/wBk9f8We/3/LU3H5wAAOlEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCBrABT8/8ANNf/AGf2/wBk9f8ef/7/Kj2z1AAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWmcIAafn/AGX0/wBl9f8Kbvj/RWvZ9gAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOYwAALDoAGKDIAGn5/wBm9f8AZPT/NYz9/zFHu94AABAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1EABak0ABj/v8CC2CGABWKugBp+v8AZfX/AGP1/xF2+/9dqv//LkjW/wAALjoAAAAAAAAdKwADYIIAG7XlAEfp/wBm+P8Aavz/FiuRtgALb5oAavz/D3b9/0mF9f8tP7DTAABLbAAADRQAAAAAAAAjKgAWuvEAUfX/AGX2/wBo9v8AZvX/AGj5/yZErtUAAENnCWn+/x8tocUAACE2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAqNwQBS7v8AZ/X/AGX0/wBn+P8yUcLiAAAZHwAAQ10AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCwAjwO4AY/X/AGX1/xBy9/8AZvn/N1Gz2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwASoc8AYfb/AGb1/wBm9v9Tgur/VJj//yk/o8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5WQAkvuoAY/f/AGb1/wBi9f9Ejf//AgBIaQMBTW0JD26LAAAAAAAADQ8AAIKqABqFrgAciq4AIaTHADXU+gBa9P8AaPj/AGT1/wBo9/9Djf//DxJ7mQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIIV3IUQcnlI3L4/yeI//8jg///Kof//z+O//8/Zdz6AwJMbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFygDAEFlDhJigAwQY4AAADNUAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAA+B8AAPADAADgAQAAAH8AAAD/AAAB/AAAAfAAAACAAAABAAAAD4AAAD+AAAD/AAAA/gAAAIAHAADADwAA+B8AAA%3D%3D"));



//-----------------------------------
//-----RAPIDSHARE & HTTP LINKS-------
//-----------------------------------


//ShareBus
trackers.push(new SearchEngine("Rapidshare: ShareBus", "http://www.sharebus.com/index.php?act=Search&CODE=01&forums=all&search_in=imdbid&result_type=topics&keywords=%imdbkod", true,
"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jWWSa0jTURjGf+fftv+slW5O02mpZEhmWJhF2YUCo5KCosQuYGVgUVFYRPSh6EoRBVlQRPQpELvZ1UJMK03IrlbeyjScZhenbVluzu30oZw6X3jgnPec5znneXkEIPCrzzV7w0qfPEuo+/Aj1uWC6cmBzW63q6b8fGXLhZf0+t8XfcjNjVVfVmSeOXY4xa2qSPgHvV6RazNiZWPdplpr04W5Azk+gcLCRSF1b7Jfr82YIAFpMuokIKOjRsjCm+ny7fMsaWvbL9vbjnlsbafX9/EUgEu5s80nT1SV37hdMznvai0ABoOG8eNMZGUm8qDoPcHmYEAgcCrw6+KzstUrAIYBosctLxeVtKY8LG1Gyn++7A43lnAVu72LJWkTiYuL+e8IwCtU1TD9t7P8rLh/a2HchuxHdW1fnYMGo9EIli2NITLChBASVaewM2fx/6kJBApfvr5boCl7+j3DnwwQPTYQu72byhfVBOg1eLyCdZnJmM2hAEjpISQ4YZrmfXV7kD85db6Fc2eWYxg5gu/fOqmutfKpoQOHo5vHZa+w2f4QYRlJQrwlXuNyuYe8HhM1CqPJDEBEZAARkRZ653k4eCifopIvfGzoAmDTxslBSnSU2esvcLWgic1b86iqavD17I4e8q83+sgAOq2nRUlKDLodoFcGCXT+dHHlej1btt/hl6MTEOzafY12W38ItVqYGG8qVrp6myqnTjG/GuID+NjYhdMJ0gtvqloHnSUnhbYYR/fcBRDncudMMRpVN/THtw8F+atkU/0eqdP190YHq54j+5LSGBjlrPWTssPDAz3+Atu2zJBrMib59mEhes/RXcm+KDNgIa7k7UhbszLRahyuDPmJwaCVC1PHfDp+ICV1IMen0ldW6yl9RUlR+q179bNc3V6Loh2OJSyweea0sOLWjheFOTktg1L3F21WIL5Z0YKNAAAAAElFTkSuQmCC"));


//-----------------------------------
//-----------Other Sites-------------
//-----------------------------------


//Beyazperde.com
trackers.push(new SearchEngine("Beyazperde.com", "http://beyazperde.mynet.com/hizliarama.asp?keyword="+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABOUlEQVQI12NggIC0mQxpMxmIAIwIDchgVjohDcgArhmbNkacduPVxoBPG3F+w2YVeXqwe9pBTYqPk/XgrecfJyYi9MxKZ2BgYEFTysTI2BtqUeCsy8DAcOzuyyDWRS8/fUf2N3o86MsIX6gNhkuXrzvZtfMicvwwoTmHl4MVmSvEzY6mgAnNT+cfvzl+7yWE/fnH79Vn76FpYGZgYGAw9rVTlbRVlfz88/erzz+2XH709defi4/fla07efrBa0URXh9deQEu9ofvvjAY+zIypM2s9jJs8TdlYGB4/vFbwLRdpx68gptnqiC6Mctdkp+LgYEha9mR6QevMckK8lR7GUKkJfm5Stz0kB1Q6qYPUc3AwFDipsfDzsrCycb8+vMPHnaoX//8+4es4c+/f+++/oSwP3z7xcrMBABQ2W0R+3SKhgAAAABJRU5ErkJggg=="));

//Wikipedia
trackers.push(new SearchEngine("Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%title&go=Go", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//EksiSozluk
trackers.push(new SearchEngine("Eksisozluge Git", "http://sozluk.sourtimes.org/show.asp?t="+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAXElEQVR4nM3TMQoAIAwDwDzd5zl28D9xKyI0Verg0ElygWIxrCMaAFTvwzpkGA3MkE8BD7cckQDJe2Btd0AgefsNELYLRC/vGcAKwArACrCHTwC5h9N/4Mg20c1MGxAM9mt5Y18AAAAASUVORK5CYII="));

//Google
trackers.push(new SearchEngine("Google", "http://www.google.com/search?hl=en&q=%22%title%22 movie&btnG=Search", false, "data:image/x-icon;base64,R0lGODlhEAAQAPfLAAATVikwdA8SnxUfgAsWpAAilholjxw4jBc7kwAlvQQ2sRMsoBUqqhMzuhY/vxw4tSgmiyM1mSUztiQ6sTE3sQ4qyxMxxRoyxiAuxR1CtBxJsBxasSJuuTFguBte0Rlf2xVc9h9W9xVjzxVr0gdj6BRh4R1o5yBcyiZbyydT1i9b2Ddb1iFY6CJg2Vpor1dzvEJu20Z0yi23QDy1REi2OUy0O1WzOVC4PU+tVUe5Sk2xQU2zRUO4UE21Ula2SmKEqWWF2HyPx2+a6X6e6Xqk1m+s78sUDs4UGdEQB9YfDdwaANEfHd0YEscjAM4mAM0qANIoD9IkGdslGswuItYgL4aP0ImP2YGZ36Opzaq2wq/S+rzX/7/e8MrS1MLO/sTb48rT8snX/83c89PZ+crq+cH1/9Dl/9Ln/93r/9fy/+Hf7P/42eDm/O7u/+T29uX2/eT2/+f4/+f5/+j/9u//8+3/9u7/9ur5/+j//+n//+v//u3//+7//e7//+////b66/T/6vX/6/f/7f/07fj/4fv/4Pj/5v/45v7/4/r+7/3/6fDw+Pfx//D/9/X/8fT/8/f/8ff/8/D///H///L8/fL///P///X7//b6/ff/+/T///b9//f///v19//w9v/09P/29v/x+f/y///z///1+v/1///2///3//j79P/58/z/8/z99/z/9v7/9P7/9vn7//v6//j9//n9//j///n///v//vv////4+v/5+//6+P/4///6/P/6/v/6///7///9+P/8+v/9+v7/+Pz////8/f/9/f79///8///9//7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMsALAAAAAAQABAAAAj/AEn4oIFjBw8bOnrMuJGjhowZM1T8UdYJUZ5ZcNRYWjSrVK5QU0DMmtUnzRAXEy4o6FCEy6NDTkQIq1MmRgM0eZTlCXMgQJtRSE4gmgUkwh1EiZTNUiamy6NUUExcuoJgDCdDjQg9KgVL2SNFT1hwEvKglLBWuixZ+jSrlSBdRlL04bBBkTBdpZTpIqWsFaBcTEr0QaEhl6dWlswKW6poDRUPlmAUQKWMkTJLc76QMQNGUZMWgIgkCFJnlq5WXigwkFClVZQQyuRgELAlk7JBymCZGYAF0ZEPrQixgUDAihxVdPpoAZAFUZIRfThxgvPCwAILDipk+OFG2ZIVoxApERtPfvwlvZ+kQFzPvv0MJQEBADs="));

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
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		return html;
	}
	
	this.getSearchUrl = function (title, id) {
		var searchUrl = this.searchurl;
		if (this.usesIMDBID) {


			searchUrl = searchUrl.replace(/%imdb\-id/, id);
			
			var adres=window.location.href;
			var ilk='imdb.com/title/';
			var imdbKod=adres.substring(adres.indexOf(ilk)+15);
			
			if(imdbKod.indexOf('/')>0)
			imdbKod=imdbKod.replace('/','');	
			
			searchUrl = searchUrl.replace(/%imdbkod/, imdbKod);
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
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	return title;
}

function getCleanTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	regexp = /,|:|;/g;
	title = title.replace(regexp, " ");
	regexp = /'|"/g;
	title = title.replace(regexp, "");
	return title;
}

function getImdbCode() {
	var adres=window.location.href;
	var ilk='imdb.com/title/';
	var imdbCode=adres.substring(adres.indexOf(ilk)+15);
	if(imdbCode.indexOf('/')>0)
	imdbCode=imdbCode.replace('/','');	
	return imdbCode;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function addIconBarIcons(title, id, trackers) {
 var iconbar = xpath("//div[@id='tn15title']", document);
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
		var tdopenall = document.createElement("td");
		var aopenall = document.createElement("a");
		aopenall.innerHTML = "Open All";
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}
/*
function addAkaIcons(id, trackers) {
	var xpath_exp = "//i[@class='transl']";
	var akas = xpath(xpath_exp, document);
	
	if (!akas || akas.snapshotLength == 0) {
		GM_log("Error! Couldn't find akas. Quitting!");
		return;
	}
	
	var aka;
	for (var i = 0; aka = akas.snapshotItem(i); i++) {
		unsafeWindow.aka = aka.textContent;
		
		var title = aka.textContent.match(/(.*?)\s+\(.*?\)\s+\[.*?\]/)[1];
		GM_log(title);
		
		for (var ii = 0; ii < trackers.length; ii++) {
			if (!trackers[ii].usesIMDBID) {
				link_span = document.createElement("span");

				link_span.innerHTML = trackers[ii].getHTML(title, id);
				aka.appendChild(link_span);
				
				delim_text = document.createTextNode(" ");
				aka.appendChild(delim_text);
			}
		}
		
		if (GM_openInTab) { //If this API exists.
			var aopenall = document.createElement("a");
			aopenall.innerHTML = "OPEN ALL";
			aopenall.href = "javascript:;";
			aopenall.setAttribute("class", "openall");
			
			function creator (a, b) {
				return function () { openAllInTabs(a, b, false); }
			}
			
			aopenall.addEventListener("click", creator(title, id), false);

			aka.appendChild(aopenall);
		}
	}
}
*/


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
//addAkaIcons(id, trackers);


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