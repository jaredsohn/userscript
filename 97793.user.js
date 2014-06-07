// Craigslist Manager
// version 1.0
// Released under the GNU General Public Licence.
// Visit http://www.gnu.org/copyleft/gpl.html for a copy of said licence.

// Image Preview functionality has been borrowed from "Craigslist image preview 2" 
// filter by Kite who reworked Jeffrey Palm's original script
// Basic memo field by userscript.org scriptwright CBWhiz 
// with mods and memo management functions added by Paka

// hides images less than 150px tall or wide as irrelevant

/*
** Changelog **
1.0
mods above this point were made to v. 1.225 of "craigslist location filter"by Kuzmeech see
http://userscripts.org/scripts/show/39793
Paka started a new offshoot of this script renamed "Craigslist Manager"
2010.06.28:
1.225- images were not showing!
1.224- fix for jumping ads due to loaded images - now ads with images are moved to the top. Removed "show real pics" option due to that.
1.223- logic fixes: includes filter wasn't working, "next 100" known issue fixed
1.222- fix for ads with duplicate images - they were not filtered, hide empty ads overrides "has image"
1.221- fix for small images which were not hidden
1.21 - downscale image popups which do not fit the screen
1.20 - dual monitor & horizontal alignment fix.
1.19 - horizontally - shows smaller pics closer to cursor
1.18 - hides all extremely wide images and ones that are smaller than 150px height or width
	 - hides duplicate links that once were shown somewhere on the page
	 - added "td background=" support
	 - fix for &amp; in url
1.17 - thanks for the tip from user "Perplexed Guide" - now full size popup picture previews with idea borrowed from CLPicView FF plugin
1.16 - fixed include logic, right align for labels on top
1.15 - image preview - fetches images only for _shown_ ad blocks
1.14 - include location filter added
1.13 - checkbox added to enable/disable exclusion filter 
1.12 - performance imrovements in RE preparation, debug output removed
1.11 - added "oneshot" timer for 300ms quiesce time after typing stopped, because "onkeyup" in its' pure state was blocking the browser
1.1 - added "exclude" input element at top with onkeyup event handler
1.0 - initial versoin where exclusions were defined in script array
*/

// ==UserScript==
// @name           Craigslist Manager
// @include       http://*.craigslist.org/*
// @include       http://*.craigslist.ca/*
// ==/UserScript==

//paka added for memo field:
/*var entireBody = unsafeWindow.document.getElementsByTagName('body');
entireBody[0].onclick=function(e){
	//getOnClicks(this.tagName,this.id,this.className);
	//  && e.target.innerHTML.indexOf("<table")==-1
	if (e.target.id.indexOf("series_201")==0){
	}
}
*/
//end paka, note: above section for future refinements

(function(){

String.prototype.trim = function(symbol) {
	return this.replace(/^\s+|\s+$/g,"");
}

function $n(tag, on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
	return e;
}

function $t(text, on) {
	var e = document.createTextNode(text);
	if (on) on.appendChild(e);
	return e;
}

function $e(id) {
	return document.getElementById(id);
}

// called once when loading - converts location into G.maps link
function mapsLink() {
	ps = document.getElementsByTagName('p');
	for (var i = 0; i < ps.length; i++)  							// for each posting
	{
		if (ps[i].innerHTML.match(/index\d+\.html/)) continue;
		var font = ps[i].getElementsByTagName( 'font' )[0];
		if (font) {
			var location = font.innerHTML.trim().replace(/\(/, '').replace(/\)/, '');
			// replace with href to google maps
			font.innerHTML = "&nbsp;&nbsp;&nbsp;(<a href=\"http://maps.google.com/?q=" + location + "&z=8\">" 
					+ location + "</a>)";
		}	
	}
}

function oneshot() { 
	var timer; 
	return function( fun, time ) { 
		clearTimeout( timer ); 
		timer = setTimeout( fun, time ); 
	}; 
} 

var processAdsOneShot = oneshot(); 

/** converts array of patterns to array of RegExps + trims patterns */
function prepareRexs(array) {
	var rexs = new Array(); // prepare RE objects
	for (var j = 0; j < array.length; j++) {
		var pattern = array[j].trim();
		if (pattern != '') {
			rexs.push(new RegExp(pattern, 'i'));
		}	
	}
	return rexs;
}

var alphaDiv; // like alpha-male

/** main piece that walks through ads */
function processAds() {
debug;
	var excludeFiltersArray = $e("excludeLocationsInput").value.split(',');
	var includeFiltersArray = $e("includeLocationsInput").value.split(',');

	var rexsInclude = prepareRexs(includeFiltersArray);
	var rexsExclude = prepareRexs(excludeFiltersArray);

	ps = document.getElementsByTagName('p');
	
	for (var i = 0; i < ps.length; i++)  							// for each posting
	{
		var p = ps[i];
		if (p.innerHTML.match(/index\d+\.html/)) continue;
		
		/* paka: took this out due to improper date sort:
		if (!alphaDiv) {
			alphaDiv = $n('div');
			alphaDiv.id = 'alphaDiv';
			p.parentNode.insertBefore(alphaDiv, p);
		}*/
		
		var font = ps[i].getElementsByTagName( 'font' )[0];
		var visible = true;
		var noPics = false;
		if (font) {
			var location = font.innerHTML;
					
			if ($e('includeEnabled').checked) {
				visible = false;
				for (j = 0; j < rexsInclude.length; j++) {
					var re = rexsInclude[j];
					if (re.test(location)) {
						visible = true;
						break;
					}
				}
			}
			if ($e('excludeEnabled').checked) {
				for (j = 0; j < rexsExclude.length; j++) {
					var re = rexsExclude[j];
					if (re.test(location)) {
						visible = false;
						break;
					}
				}
			}
		} else { // no <font> - locatin is unspecified - exclude if "only include" checked 
			visible = ! $e('includeEnabled').checked; 
		}
		
		ps[i].style.display = visible ? 'block' : 'none';
		
		makeMemoHandler(ps[i]);
		
		if (visible) { // images only for visible
			var pclass = ps[i].className;
			if (!pclass || !pclass.match(/thumbnails\-loaded/)) { // mark ads which we've added thumbnails to
				if (pclass) { ps[i].className += " "; }
				ps[i].className += "thumbnails-loaded";
				// show image previews
				showImages(ps[i]);
			} else {
				ps[i].style.display = noPics ? 'block' : 'none';
			}
		}	
	}
}

var EXCLUDE_LOCATIONS = "exclude.locations";
//move this garbage to bottom of page:
var messagesTable = document.getElementById("messages").parentNode.parentNode.parentNode
//alert(messagesTable.innerHTML)
messagesTable.parentNode.appendChild(messagesTable)

oldcleanup = function() {
	var memos = GM_listValues().length - 4
	if (memos>0&&!confirm(memos+" memos exist. Clear them?")) return
	for each (var val in GM_listValues()) {
		if (val.indexOf("cl_")==0) {
			if (confirm("Delete this?\n "+val+"\n\n"+GM_getValue(val))) GM_deleteValue(val)
		}
	}

}

cleanup = function() {
	var loc = document.location.toString()
	if (loc.indexOf(".org/search")>-1) {
		if (confirm('Clear the "Search for", "price", and "has image"\n criteria now to manage memos?')){
			// this syntax doesn't work in GM:
			//document.forms[0].query.value = ""
			document.forms[0].elements.namedItem("query").value = ""				
			document.forms[0].elements.namedItem("minAsk").value = ""
			document.forms[0].elements.namedItem("maxAsk").value = ""
			document.forms[0].elements.namedItem("hasPic").value = 0
			GM_setValue("managememos",1) //for click on re-entry
			document.forms[0].submit()
		} 
		return;
	}
	var marker = document.getElementById("showPics")
	var clb = document.getElementById("cleanupButton")
	var mDiv = document.getElementById("memoDiv")
	if (clb.value == "Hide Memo Management") {
		mDiv.parentNode.removeChild(mDiv)
		clb.value = "Manage Memos"
		return
	}
	clb.value = "Hide Memo Management"
	//clb.
	//first time through:
	var showMemos = $n("div");
	showMemos.id = "memoDiv"
	var tMemos = [], t = -1, unhash, deleteMemoBtn
	marker.parentNode.insertBefore(showMemos, marker);
	var memos = GM_listValues().length - 4
	//if (memos>0&&!confirm(memos+" memos exist. Clear them?")) return
	GM_deleteValue("junk")
	for each (var val in GM_listValues()) {
		if (val.indexOf("cl_")==0) {
			t+=1
			tMemos[t] = $n("div");
			unhash = "h"+val.substr(15)+".html"
			unhash = unhash.replace(/_/gi,"/")
			//tMemos[t].innerHTML = "<a href="+unhash+">"+unhash+"</a> "+GM_getValue(val)+" <input type=button value='Delete' onClick='GM_deleteValue(\""+val+"\")'>"
			tMemos[t].innerHTML = "<a href="+unhash+">"+unhash+"</a> "+GM_getValue(val)
			deleteMemoBtn = addDeleteMemoBtn("deleteMemo"+t);
			deleteMemoBtn.setAttribute("GMvalue",val)
			//deleteMemoBtn.
			tMemos[t].appendChild(deleteMemoBtn);
			showMemos.appendChild(tMemos[t])
			//if (confirm("Delete this?\n "+val+"\n\n"+GM_getValue(val))) GM_deleteValue(val)
		}
	}

}

deleteMemo = function() {
	//if (!confirm("Delete this memo?")) return
	GM_deleteValue(this.getAttribute("GMvalue"))
	this.parentNode.parentNode.removeChild(this.parentNode)
}

saveChangesAndRefresh = function() {
	GM_setValue("excludeLocationsInput", $e("excludeLocationsInput").value);
	GM_setValue("includeLocationsInput", $e("includeLocationsInput").value);
	GM_setValue("excludeEnabled", $e("excludeEnabled").checked);
	GM_setValue("includeEnabled", $e("includeEnabled").checked);
//	GM_setValue("hideBullshit", $e("hideBullshit").checked);

	updateElementsVisibility();
	processAdsOneShot( processAds, 200 ); 
};

function updateElementsVisibility() {
	$e("excludeLocationsInput").style.display = $e("excludeEnabled").checked ? '' : 'none';
	$e("includeLocationsInput").style.display = $e("includeEnabled").checked ? '' : 'none';
	//$e("cleanupButton").style.display = '';
	$e("includeLabel").style.color = $e("includeEnabled").checked ? 'red' : 'black';
	$e("excludeLabel").style.color = $e("excludeEnabled").checked ? 'red' : 'black';
//	$e("hideBullshitCheckbox").style.color = $e("hideBullshit").checked ? 'red' : 'black';
	
}

function addInput(name, defVal) {
	var input = $n("input");
	input.id = name;
	input.size = 70;
	input.addEventListener("keyup", saveChangesAndRefresh, true);
	input.value = GM_getValue(name, defVal);
	return input;
}

function addCleanupBtn(name) {
	var input = $n("input");
	input.type = "button"
	input.id = name;
	//input.setAttribute("onClick", "cleanup()") //doesn't work in
	input.addEventListener("click", cleanup, true);
	input.value = "Manage Memos";
	return input;
}
function addDeleteMemoBtn(name) {
	var input = $n("input");
	input.type = "button"
	input.id = name;
	input.addEventListener("click", deleteMemo, true);
	input.value = "Delete";
	return input;
}
function addCheckbox(name) {
	var checkbox = $n("input");
	checkbox.type = "checkbox";
	checkbox.id = name;
	checkbox.addEventListener("change", saveChangesAndRefresh, true);
	checkbox.checked = GM_getValue(name, true);
	return checkbox;
}

var imagesOnly = false;

function addLinkAtTop() {
	// find top FORM with TABLE inside
	var form = document.getElementsByTagName("form");
	if (form && form[0].action.search(/search/)) {
		
		var tbody = form[0].getElementsByTagName('tbody')[0];
		var tr = $n("tr",tbody); 
		var td = $n("td", tr);
			td.align = "right";
			var label = $n("label", td); 
			label.innerHTML = "Only following locations:";
			label.id = "includeLabel";
		
		td = $n("td", tr);
			var input = addInput("includeLocationsInput", 'cambridge, belmont');
			td.appendChild(addCheckbox("includeEnabled"));
			td.appendChild(input);
//			td.colspan = 2;
		td = $n("td", tr);
/*			var label = $n("label", td);
			label.id = "hideBullshitCheckbox";
			label.innerHTML = '<input type="checkbox" id="hideBullshit"/> really hide no-pics ads';
			$e("hideBullshit").addEventListener("change", saveChangesAndRefresh, true);
			$e("hideBullshit").checked = GM_getValue("hideBullshit", true);
			label.title = "Hide ads without qualifying pictures which are showing like empty line";
*/
		tr = $n("tr",tbody); 
		td = $n("td", tr);
			td.align = "right";
			label = $n("label", td); 
			label.innerHTML = "Exclude locations:";
			label.id = "excludeLabel";
		
		td = $n("td", tr);
			excludeInput = addInput("excludeLocationsInput", 
				GM_getValue(EXCLUDE_LOCATIONS, 'malden, everett')); // for backwards compatibility, remove after march 2009
			td.appendChild(addCheckbox("excludeEnabled"));
			td.appendChild(excludeInput);
			//td.colspan = 2;		

		//paka:
		//var cleanupScript = $n('script',tr);
		//cleanupScript.innerHTML='function sendCleanupMsg(){alert("heello");var loc=document.location.toString();alert(loc.substr(loc.length-1)); if (loc.substr(loc.length-1)=="/") {alert("|"+document.forms[0].query.value+"|"); document.forms[0].query.value=" ";}}';
		//tr = $n("tr",tbody); 
		td = $n("td", tr);
			td.align = "right";
			var clearMemosBtn = addCleanupBtn("cleanupButton");
			td.appendChild(clearMemosBtn);
			//label = $n("label", td); 
			//label.innerHTML = "<input name='cleanupBtn' type=button value='Clear Memos' onclick='sendCleanupMsg(); this.value=1; this.form.submit()'>";
			//label.id = "excludeLabel";
		//p.parentNode.insertBefore(alphaDiv, p);
		//end paka	
	}
	updateElementsVisibility();
	if (GM_getValue("managememos")==1) {
		GM_setValue("managememos",0);
		clearMemosBtn.click();
	}
}

/** finds all child <A/>  and fetches images for it */
function showImages(element) {
	var links = element.getElementsByTagName("a");
	for (i=0; i<links.length; i++) {
		var link = links[i];
		if (link.href && link.href.match(/.*craigslist.*\/\d+\.html$/)) {
		  GM_xmlhttpRequest({
			method:"GET",
				url: link.href,
				headers:{
				"User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.2.6) Gecko/20100625 Firefox/3.6.6",
				  "Accept":"text/html,text/monkey,text/xml,text/plain",
				  },
				onload: processAd(link)
			});
		}
	}
}

var bigPictureDivCounter = 0;
var knownPictures = {}
var size = 60;

// ajax callback for each ad text
function processAd(_a) {
	var a = _a;
	
	return function(details) {
		if (details.responseText) {
			var div;
			//paka added:
			var pakadate = details.responseText.match(/Date: ([^>]+)HST/)
			pakadate = new String(pakadate)
			pakadate = " "+pakadate.substring(11,25)
			//a.innerHTML+=pakadate
			var p = document.createTextNode(pakadate);
			a.parentNode.appendChild(p);
			//end paka
			if (m = details.responseText.match(/<img ([^>]+)>/gi)) {
				processImgs(a, div, m, "src");
			}
			if (m = details.responseText.match(/<td ([^>]+)>/gi)) {
				processImgs(a, div, m, "background");
			}
		}
	};
}

var counter = 0;
function processImgs(a, div, m, word) {
	for (j=0; j<m.length; j++) {
		s = m[j];
		if (!s) continue;
		s = s.split(word + '="')[1];
		if (!s) continue;
		s = s.split('"')[0];
		s = s.replace(/amp;/gi, ''); // some strange people post &amp; in URL parameters - fix for that
		
		if (knownPictures[s]) { // don't show duplicate pictures
			continue;
		} else {
			knownPictures[s] = s;
		}
		
		if (!div) {
			var d = $n("div",a.parentNode);
			var br = $t(" ",a.parentNode);
			div = $n("div",a.parentNode);
		}
		// small thumbnails shown
		var newA = $n("a", div);
		var img = $n("img", newA);
		div.style.display = 'none';
		img.src = s;
		img.style.maxHeight = size + "px";
//		img.title = "Thumbnail shown by Craigslist location filter Greasemonkey Script";
		$t(" ", div);
		newA.href = s;

		addBigPictureDiv(a, s, img);

		// remove irrelevant bull%%it
		img.addEventListener("load", function() { 
				var bigImage = $e("div" + this.id).firstChild;
				if ((this.height < size)
						|| bigImage.height < 150 || bigImage.width < 150
							) { // non-proportional pictures and small images are ignored
					bigImage.parentNode.className = 'bullshitPic';
					this.parentNode.style.display = 'none';
				} else {
					this.parentNode.parentNode.style.display = 'block';
					bigImage.parentNode.className = 'realPic';
					if (this.parentNode.parentNode.parentNode.className != 'realAd') {
						this.parentNode.parentNode.parentNode.className = 'realAd';
						counter ++;
						//paka took 1 line out:
						//$e('alphaDiv').appendChild(this.parentNode.parentNode.parentNode); // zz
//						this.parentNode.parentNode.parentNode.innerHTML = counter + ": "  + this.parentNode.parentNode.parentNode.innerHTML;
						
					}
					
					
				}
		}, true);
	}
};

// adds div with big picture popup + handlers
function addBigPictureDiv(a, s, img) {
	// big picture hidden
	var fullSizeImgDiv = $n("div", a.parentNode);
	var fullSizeImg = $n("img", fullSizeImgDiv);
	fullSizeImgDiv.style.display = 'none';
	fullSizeImgDiv.style.position = 'absolute';
	fullSizeImgDiv.style.left = '150px';
	fullSizeImgDiv.style.border = '2px dashed blue';
	fullSizeImg.src = s;
	fullSizeImgDiv.id = "div" + bigPictureDivCounter;
	img.id = "p" + bigPictureDivCounter;
	fullSizeImgDiv.id = "divp" + bigPictureDivCounter;

	bigPictureDivCounter ++; 
	
	img.addEventListener("mouseover", function(event) { 
			var div = $e("div" + this.id);
			
			// for extremely tall or wide images
			if (window.innerWidth < div.firstChild.width * 1.05) {
					var originalWidth = div.firstChild.width;
					div.firstChild.width = window.innerWidth * 0.85;
					div.firstChild.height = div.firstChild.height * (div.firstChild.width/originalWidth);
			}
			
			if (window.innerHeight < div.firstChild.height * 1.05) { // if still..
					var originalHeight = div.firstChild.height;
					div.firstChild.height = window.innerHeight * 0.85;
					div.firstChild.width = div.firstChild.width * (div.firstChild.height/originalHeight);
			}

			var cursorDown = (event.screenY / screen.height) >  0.54; // vertically - above or below?
			div.style.top = cursorDown 
					? (event.pageY - div.firstChild.height - 5)
					: event.pageY + 5;
			
			div.style.left = 
				(div.firstChild.width > screen.width / 2) ? 
					(screen.width - div.firstChild.width) / 2 // horizontally - centered
					: (((event.screenX - window.screenX)/ window.innerWidth) < 0.54 ? (event.pageX + 15) : (event.pageX - div.firstChild.width - 10));

					

					
			div.style.display = "block";
			
			}, 
			true);
	img.addEventListener("mouseout", function(evt) { $e("div" + this.id).style.display = "none"; }, true);
}

//////////////////////////////////
/* New thing that allows memos */
function makeMemoHandler(ad_p) {

ad_id = ad_p.getElementsByTagName('a')[0].getAttribute('href', "");

ad_id = ad_id.replace("/", "_", "g"); //sanitize / to _
ad_id = ad_id.substr(1); //remove initial _

ad_id = ad_id.replace(".html", ""); //remove trailing .html


main_id = "cl_loc_memo_ad_" + ad_id;

if (document.getElementById(main_id)) {
return;
//Did this already
}

var memo_main = $n("span", ad_p);

memo_main.id = main_id
memo_main.class = "cl_memo"

//console.log(ad_id)
gm_ad_id = "cl_loc_memo_ad_" + ad_id
memo_txt = GM_getValue(gm_ad_id, "[MEMO]");

//paka:
if (memo_txt == "[MEMO]") memo_main.setAttribute("style", "color: green");
else memo_main.setAttribute("style", "color: red");

$t(" - ", memo_main);

var memo_node = $n("span", memo_main);
memo_node.setAttribute("cl_gm_ad_id", gm_ad_id);
$t(memo_txt, memo_node)
memo_node.addEventListener("click", memo_make_edit, true);

}

function memo_make_edit(e) {
//console.log(this, e);
if (this.getElementsByTagName("input").length > 0) {
return; //already editing this
}
ih = this.innerHTML;
this.innerHTML = "";
var txtin = $n("input", this);
txtin.value = ih;
txtin.style.width = "30%";
//var txtsave = $n("input", this);
txtsave = document.createElement("input");
txtsave.type = "submit";
txtsave.value = "Save";
this.appendChild(txtsave);
var _ths = this;
txtsave.addEventListener("click", function() { return saveMemo(_ths, txtin); }, false);
}

function saveMemo(spanPlace, inputNode) {
var v = inputNode.value;
gm_ad_id = spanPlace.getAttribute("cl_gm_ad_id", "");
if (v=="") v = "[MEMO]"
if (v == "[MEMO]") spanPlace.setAttribute("style", "color: green");
else spanPlace.setAttribute("style", "color: red; backgroundColor: yellow");
GM_setValue(gm_ad_id, v);
spanPlace.innerHTML = "";
$t(v, spanPlace);
}

addLinkAtTop();
mapsLink();
processAds();

//alert(GM_listValues().length)

//if (document.location.toString().indexOf("cleanupBtn") > -1) cleanup()
})();