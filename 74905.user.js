// ==UserScript==
// @name        MrSkin Ratings in IMDb
// @namespace   mrskin.com
// @description Display an actress' MrSkin Rating and a link to her MrSkin page
// @include     http://*.imdb.com/name/nm*
// @include     http://*.imdb.com/title/tt*
// @version     1.16
//
// @require        http://userscripts.org/scripts/source/111583.user.js
// @history 1.16 Fix for current iterations of IMDB and MrSkin.
// @history 1.15 MrSkin removed search landing page.  Also Fix of formatting of code with last version.
// @history 1.14 Fix clickable rating link for new mrskin exact-match search skips.
// @history 1.13 Title check to ensure MrSkin results match.
// @history 1.12 MrSkin integration with IMDB Title pages. (Option)
// @history 1.11 Fix for MrSkin site change: skip search results on popular match.
// @history 1.10 Fix for missing MrSkin star resources
// @history 1.09 Google Chrome support. Fix for nudity roles in tooltip.
// @history 1.08 New IMDB design support. Fix for checking underage actresses.
// @history 1.07 Bug fix (search results url restored). 
// @history 1.06 User requested option for opening links in new tab
// @history 1.05 Fixed bug with script not working with unique names that have no similarities to other actresses.
// @history 1.04 Removed unecessary regex line
// @history 1.03 Made actress comparison case insensitive e.g: Clea DuVall. Fixed search url for when actress isn't found.
// @history	1.02 Added option to add google image search link
// @history	1.01 Fix for update of site and fixed mistaken use of constant rating image
// @history	1.00 Initial release
// ==/UserScript==

//Based on http://userscripts.org/scripts/2273

//Settings
var googleLink; //Show link to google image search
var openInNewTab; //Open created links in new tab
var mrSkinInTitlePages; //Integrate MrSkin ratings into IMDB title pages.

var isTitle = false; //Temporary global variable to check if current page is actress or title

(function() {

	//Google Chrome support
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
		GM_log = function(message) {
			console.log(message);
		}
	}
	
	//Check for new versions
	try
	{
		ScriptUpdater.check(74905,/*currentVersion*/'1.16');
	}
	catch(err)
	{
		GM_log("MrSkin Ratings In IMDB: " + err);
	}

	//Settings (As no settings interface is displayed, just edit the settings directly from about:config)
	googleLink = GM_getValue("googleLink", true);
	openInNewTab = GM_getValue("openInNewTab", false);
	mrSkinInTitlePages = GM_getValue("mrSkinInTitlePages", false);
	

	/* Check for actress */

	isTitle = document.URL.lastIndexOf("\/title\/tt") >= 0 //IMDB Title page or Name page?
	if (!isTitle) { // IMDB Name page (not Title page)
		if (
			//Check if actress in IMDB classic design
			document.evaluate(
				'//h5/a[text()=\'Actress:\']', document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
			).snapshotLength == 0
		) {
			/* Returned not an actress. */
			if (
				//Check if actress in IMDB new design
				document.evaluate(
					//'//a[.=\'Actress\']', document, null,
					'//div[@class=\'infobar\']/a[.=\'Actress\']', document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
				).snapshotLength == 0
			) {
				/* This isn't an actress, ignore. */
				return;
			}
		}

		// Check for legal age

		// Get year
		var now = new Date();
		var years = document.evaluate(
			"//a[contains(@href,'birth_year')]", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);

		if (years.snapshotLength > 0) {
			var href = new String(years.snapshotItem(0));
			var bornYear = href.substring(href.length - 4);
			if ((now.getFullYear() - bornYear) < 18) {
				// Too young
				return;
			}
			if ((now.getFullYear() - bornYear) == 18) {
				// Might still be too young
				var dates = document.evaluate(
					"//a[contains(@href,'OnThisDay')]", document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
				);
				if (dates.snapshotLength > 0) {
					href = new String(dates.snapshotItem(0));

					var dateindex   = href.indexOf('day=');
					var monthindex = href.indexOf('month=');

					var day = href.substring(dateindex + 4, monthindex - 1);
					var month = href.substring(monthindex + 6);

					// convert month into a number
					switch (month) {
						case 'January':         month = 0;      break;
						case 'February':        month = 1;      break;
						case 'March':           month = 2;      break;
						case 'April':           month = 3;      break;
						case 'May':             month = 4;      break;
						case 'June':            month = 5;      break;
						case 'July':            month = 6;      break;
						case 'August':          month = 7;      break;
						case 'September':       month = 8;      break;
						case 'October':         month = 9;      break;
						case 'November':        month = 10;     break;
						case 'December':        month = 11;     break;
					}

					if (month > now.getMonth()) {
						// Too young
						return;
					}
					if (month == now.getMonth()) {
						if (day > now.getDate()) {
							// Too young
							return;
						}
					}
				}
			}
		}
	}


	var s = document.evaluate(
		'id(\'tn15title\')/h1', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	).snapshotItem(0);
	
	//IMDB new design support
	if (s == null) { //old design not working
		s = document.evaluate(
			'//td[@id=\'overview-top\']/h1', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		).snapshotItem(0);
	}
	if (s != null) {
		var span = document.createElement("span");
		span.setAttribute("style", "font-size:small");

		s.parentNode.insertBefore(span, s.nextSibling);

		span.appendChild(document.createTextNode(" "));
		var actressname = trim(s.childNodes.item(0).data.replace(/ \(I+\)$/, "").replace(/ /g, " "))
		//alert("http://www.mrskin.com/search/search?term=" +escape(trim(s.childNodes.item(0).data.replace(/ \(I+\)$/, "").replace(/ /g, "+"))));
		getRating(span,s,actressname,"http://www.mrskin.com/search/search?term=" +escape(trim(s.childNodes.item(0).data.replace(/ \(I+\)$/, "").replace(/ /g, "+"))));
	}

	//Save settings
	GM_setValue('googleLink', googleLink);
	GM_setValue('openInNewTab', openInNewTab);
	GM_setValue('mrSkinInTitlePages', mrSkinInTitlePages);

})();

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function getRating(span,s,actressname,link){
		
	  
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: link,
	  onload: function(result) {
	  
			var actress;  //(ALL,url,name)
			var rating;	  //(ALL,ratingNumber,ratingSummary,"Node rules:",nudeRolesNumber)
						  //(Rating, Nudity summary, #Nude roles)
			
			//Actress page

			//MrSkin's new directsearch test with sidebar/no sidebar - [No longer used?]
			/*var landingPage;
			landingPage = result.responseText.match(/KM_test_page_b.*=.'(.*)'/);
			if(landingPage!=null){
				getRating(span,s,actressname,"http://www.mrskin.com" + landingPage[1]);
				return;
			}*/

			if (isTitle) { //Title page
				var movieTitle = actress = result.responseText.match(/<title>(.*).Nude Scenes<\/title>/); //New direct result (skips search results)
				//movieTitle is just assigned to actress to act as an alias.
				
				if(actress==null){  //If didn't find title by direct results then find via search results
					//Search results (without a best match)
					//actress = result.responseText.match(/<div id="starpage-header">\s*.+\s*<h1>(.+)<span.+\s*.+mrskin\.com(.+)&amp;layout=box_count/);
					//do searches still occur with no best match? - search recursivly?
					
					if(actress==null){
						//Best match search results
						actress = result.responseText.match(/<h2 class=[\s\S]+?Best Match<\/h2>[\s\S]+?<h3>[\s\S]+?Movie:[\s\S]+?<a href="(.+)">(.+)<\/a>/); 

						//recursive
						getRating(span,s,actressname,"http://www.mrskin.com" + actress[1]);
						return;
					}
				}
			}
			else //Actress page
			{
				//actress = result.responseText.match(/<div id="starpage-header">\s*<div>\s*<h1(.+?)>(.+)<small>.*</); 
				actress = result.responseText.match(/<h1>(.+)<small>/);//New direct result (skips search results)
				
				if(actress!=null){
					actress.push(result.finalUrl); //put url at end of array
					var tempvar = actress[2];
					actress[2] = actress[1];
					actress[1] = tempvar;
				}

				if(actress==null){  //If didn't find actress by direct results then find via search results
					//Search results (without a best match)
					//actress = result.responseText.match(/<div id="starpage-header">\s*.+\s*<h1>(.+)<span.+\s*.+mrskin\.com(.+)&amp;layout=box_count/);
					//do searches still occur with no best match? - search recursivly?
					
					if(actress!=null){
						//Lazy way of standardizing actress array
						var tempvar = actress[2];
						actress[2] = actress[1];
						actress[1] = tempvar;
					}
					else
					{
						//Best match search results
						//actress = result.responseText.match(/<h2 class="heading-ext">Best Match<\/h2>\s*<h3>\s*Actress:\s*<a href="(.+)">(.+)<\/a>/); 
						//actress = result.responseText.match(/<h2 class=\s*>Best Match<\/h2>\s*<h3>\s*Actress:\s+<a href="(.+)">(.+)<\/a>/); 
						actress = result.responseText.match(/<h2 class=[\s\S]+?Best Match<\/h2>[\s\S]+?<h3>[\s\S]+?Actress:[\s\S]+?<a href="(.+)">(.+)<\/a>/); 

						//recursive
						getRating(span,s,actressname,"http://www.mrskin.com" + actress[1]);
						return;
					}
				}
			}

			//Actress Found
			//if (actress!=null){ //allowing errors to fail to console
				if ((isTitle && movieTitle[1].toLowerCase() == trim(actressname.toLowerCase())) || (trim(actress[2].toLowerCase()) == trim(actressname.toLowerCase()))){

					//(Rating, Nudity summary, "Nude roles:", #Nude roles) - Rating, Type of nudity and how many nude roles
				    //rating = result.responseText.match(/<span class="rating rating-.*?<span>(.)<\/span><\/span> (.*)<\/h6>.*?<dt>(.*?)<\/dt>.<dd>(.*?)<\/dd/);  //ALL,ratingNumber,ratingSummary,"Node rules:",nudeRolesNumber
					rating = result.responseText.match(/<h1>.+<small>[\s\S]+?Rating:[\s\S]+?rating rating-(.+?)"[\s\S]+?<\/i> (.*)<\/li>[\s\S]+?<li><strong>(.*).<\/strong> (.*)</);

					if (!(rating)){
						//(Rating, Nudity summary) - The rating and type of nudity
						//rating = result.responseText.match(/<span class="rating rating-.*?<span>(.)<\/span><\/span> (.*)<\/h6>/);
						rating = result.responseText.match(/<h1>.+<small>[\s\S]+?Rating:[\s\S]+?rating rating-(.+?)"[\s\S]+?<\/i> (.*)<\/li>/);
					}
					
					if (!(rating)){
						//(Rating) - Just the rating
						//rating = result.responseText.match(/<span class="rating rating-.*?<span>(.)<\/span><\/span> (.*)<\/h6>/);
						rating = result.responseText.match(/<h1>.+<small>[\s\S]+?Rating:[\s\S]+?rating rating-(.+?)"[\s\S]+?<\/i>/);
					}
					
					//Display rating
					var newLink = document.createElement("a");
					if (result.finalUrl.indexOf("search?term") == -1) { //Direct page
						newLink.setAttribute("href", result.finalUrl);
					}
					else { //Search result page (http://www.mrskin.com/search/search?term=Jennifer+Aniston+#)
						newLink.setAttribute("href", "http://mrskin.com" + actress[1]);
					}
					if (openInNewTab) {newLink.setAttribute("target", "_blank");}
					
					var sknImg = document.createElement("img");
					//http://img-p.mrskin.com/assets/images/rating_2.png

					if(rating.length == 5 && rating[3] == "Nude roles:"){
						sknImg.title = rating[2] + " (" + rating[3] + " " + rating[4] + ")";
					}
					else
					{
						sknImg.title = rating[2];
					}
					var ratingImage = "";
					if (rating[1] == 1){
						ratingImage = "http://i.imgur.com/bh7FS.png";
					}
					else if (rating[1] == 2){
						ratingImage = "http://i.imgur.com/OnETx.png";
					}
					else if (rating[1] == 3){
						ratingImage = "http://i.imgur.com/nUxuM.png";
					}
					else if (rating[1] == 4){
						ratingImage = "http://i.imgur.com/q0Ldw.png";
					}
					
					//sknImg.src = "http://img-p.mrskin.com/assets/images/rating_" + rating[1] + ".png";
					sknImg.src = ratingImage;
					
					newLink.appendChild(sknImg);

					span.appendChild(newLink);
					
				}
				else //If not in Mr Skin, provide unobtrustive link to MrSkin search results
				{
					//span.appendChild(document.createTextNode(" ("));
					var newLink = document.createElement("a");
					newLink.setAttribute(
						"href",
						"http://www.mrskin.com/search/search?term=" +
						escape(
							s.childNodes.item(0).data.replace(/ \(I+\)$/, "").replace(/ /g, "+")
						)
					);
					if (openInNewTab) {newLink.setAttribute("target", "_blank");}
					newLink.appendChild(document.createTextNode("..."));
					span.appendChild(newLink);
					//span.appendChild(document.createTextNode(")"));

				}
			/*}
			else
			{
				//Actress not found
				//alert(actressname);
			}*/
			//Google
			if (googleLink){
				var gglLink = document.createElement("a");
				gglLink.setAttribute("href", "http://google.com/images?q=" + actressname);
				if (openInNewTab) {gglLink.setAttribute("target", "_blank");}
				var gglImg = document.createElement("img");
				gglImg.src = "http://www.google.com/favicon.ico";
				//Add padding
				span.appendChild(document.createTextNode('\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0'));
				gglLink.appendChild(gglImg);
				span.appendChild(gglLink);
			}
		}
   });
}
