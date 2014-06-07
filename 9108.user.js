// ==UserScript==
// @name          News.YC Enhancements
// @namespace     http://www.rootbranch.com/YCNews
// @description	  Some simple enhancements for News.YC
// @include       http://news.ycombinator.com/*
// ==/UserScript==


/*

	Enhancements:
	
	- Search box
	- Ajax voting (supplied by previous GM script)
	- Ajax commenting (also supplied by previous GM script -- only works fully when on comment thread pages)
	- Visual distinction between comment threads and outgoing links
	- Style modifications
		- New arrows
		- Web 2.0'ish logo
	- New links open in a background tab while comment threads display on the same page
	- View and participate in discussion threads without leaving the main index
	
	Screenshot:
	http://www.photoflock.com/display/p463f8a013cf89
	
	Contributions:
	http://news.ycombinator.com/comments?id=18361
	http://news.ycombinator.com/comments?id=19402
*/






/*
	Useful Functions from the ajax GM scripts
*/

function filter(fn, seq) {
	var a = new Array();
	for(var i = 0; i < seq.length; i++) {
		if(fn(seq[i])) {
			a.push(seq[i]);
		}
	}
	return a;
}


function map(fn, seq) {
	var a = new Array(seq.length);
	for(var i = 0; i < seq.length; i++) {
		a[i] = fn(seq[i]);
	}
	return a;
}






// Vars
var allLinks = document.getElementsByTagName("a");
var articleReferences = new Array();




// Style Mods
cssRules = [
	"body { font-family: arial, helvetica, sans serif !important}",
	"table { background-color: white ! important; }",
	"td { background-color: white ! important; }",
	"a { color: #09f !important; }",
	"textarea { width: 350px; )",
	".subtext { font-family: Verdana !important; }",
	".pagetop { position: relative; top: 10px; left: 6px; }",
	".sectionTitle { font-size: 2em ! important; letter-spacing: -3px; font-family: arial, helvetica, sans serif; font-weight: bold; }",
	".col1 { width: 55%; margin-right: 5%; float: left; }",
	".col2 { width: 100%; margin-top: 20px; }",
	".col2 font { font-size: .9em; color: gray; }",
	".contentLink { color: #555 !important; font-size: .9em; }",
	".pagetop b { font-size: 3em ! important; letter-spacing: -4px; font-family: arial, helvetica, sans serif; margin-right: 20px;}",
	"#searchBox { width: 130px; margin: 0 5px; font-size: .7em; }",
	"#searchForm { display: inline; font-size: .8em; }",
	"#searchSubmit { padding: 0; }",
	"#utils { }"
]


var downArrow = "data:image/gif,GIF89a%0C%00%0D%00%D5%00%00%FD%FD%FD%F9%F9%F9%F2%F2%F2%B3%B3%B3%40%40%40%DC%DC%DC%E2%E2%E2%DD%DD%DD%EB%EB%EB%E4%E4%E4%E3%E3%E3%D8%D8%D8%E8%E8%E8LLL%DE%DE%DEMMM%E5%E5%E5%F4%F4%F4%EA%EA%EA%D1%D1%D1%ED%ED%ED%E9%E9%E9%EF%EF%EF%E1%E1%E1%D3%D3%D3%A0%A0%A0%EE%EE%EE%D2%D2%D2%DA%DA%DA%D4%D4%D4%9F%9F%9F666%F3%F3%F3%FA%FA%FAEEE%E7%E7%E7%F8%F8%F8%EC%EC%EC%F7%F7%F7VVV%D9%D9%D9%BF%BF%BF%DB%DB%DB%D5%D5%D5%A7%A7%A7%FC%FC%FC%D7%D7%D7%F1%F1%F1HHH%F5%F5%F5%C9%C9%C9%8C%8C%8C%FE%FE%FE%FB%FB%FBQQQ%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0C%00%0D%00%00%06%7F%C0%DB%8D%06%A8%D5B%B5%16M8%AC%C5%2C%08%04E%10%00%08%01%B1%06l%DB%80%BCj%C2%9A%056%1B%C8%1E%9C%0Ai%18%A8%10f%2C%99m%A5%88%D0j%2F%C3%3B~%DA%1CJ%0110%22%1F3%1E.6%89%06%02%02%7B%2C%03).%88%05%14%20%0A6e22%0E6%18%07%1A%26%12%05%0F%19%9B6%13%0B%10%11-1%0C*6%88%A8%09_7%AC%0C%056%1D(%B35K%B51%12%06%17%23_KA%00%3B";
var upArrow = "data:image/gif,GIF89a%0C%00%0D%00%D5%00%00%E5%E5%E5%DF%DF%DF%F2%F2%F2%F7%F7%F7%EF%EF%EF%F8%F8%F8%B3%B3%B3%40%40%40%F5%F5%F5%E8%E8%E8%ED%ED%ED%FA%FA%FA%DA%DA%DA%DC%DC%DCLLL%D4%D4%D4MMM%D8%D8%D8%E9%E9%E9%F4%F4%F4%EC%EC%EC%DE%DE%DE%D5%D5%D5%DB%DB%DB%E1%E1%E1%9F%9F%9F%BF%BF%BF%F1%F1%F1VVVEEE%E0%E0%E0%D6%D6%D6%E4%E4%E4%DD%DD%DD666%A0%A0%A0%FB%FB%FB%D1%D1%D1%CF%CF%CF%FE%FE%FE%A7%A7%A7%EE%EE%EE%F9%F9%F9%F6%F6%F6%E7%E7%E7HHH%FD%FD%FD%D7%D7%D7%C9%C9%C9%8C%8C%8C%FC%FC%FCQQQ%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0C%00%0D%00%00%06%7D%40%9A%D0%B5%18%ACT2%A1%D2U%20%CCX%14DrXP%CC%5E%B3PBJcZ%2B%B0%11%E4%B2%95%A9R30%CC%10%9B5%24%AB%C9%F5%A51%A0P%B1C%80%20%98%F9_%191%22%1D-%0D%14%13%00%2F%1C0x%07%26%0F%7Bg%013%8Cy%25%0C%09%2B.%03%2C%10k1-%0F%18%02I%24%0A%0E-%A9%0E%11%2C%03B2%02%00%0C%1F%16%11%1E)%0BB'*%1B%12%00%20%2C)%2BIA%00%3B";
var newLogo = "data:image/gif,GIF89a%26%00%26%00%E6%00%00%FF%90F%FF%7D!%FF%80%26%FF%8A6%FF%96H%FF%861%FF%9DT%FF%99N%FF%83%2B%FF%8D%3B%FF%92A%FF%8CA%FF%D9%C0%FF%F8%F3%FF%E5%D2%FF%F9%F5%FF%E2%CD%FF%9BT%FF%A6d%FF%A9q%FF%C2%94%FF%8B8%FF%9AS%FF%CE%AA%FF%C6%9C%FF%99M%FF%AAl%FF%A3_%FF%B9%86%FF%E3%D0%FF%95K%FF%ACr%FF%C8%A1%FF%8D%3D%FF%BF%91%FF%F6%F0%FF%E0%C9%FF%A9i%FF%F9%F4%FF%DF%C8%FF%D8%BC%FF%F7%F2%FFy!%FF%A0Y%FF%F2%E8%FF%E9%D9%FF%C5%9B%FF%C8%9F%FF%B9%88%FF%BB%8B%FF%B8%85%FF%D1%AF%FF%B5%7D%FFs%16%FF%7B%25%FF%BB%88%FF%855%FFl%0A%FF%9BY%FF%BA%84%FF%A9h%FF%A6a%FF%ADo%FF%A1%5B%FF%B1v%FF%BE%8A%FF%FF%FF%FFf%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%26%00%26%00%00%07%FF%807%82%83%84%85%86%87%88%82A%8B%8C%8D%8E%8F%90%91%8B%3B%94%95%96%97%98%99%9A%944%9D%9E%9F%A0%A1%A2%A3%9D%40%A6%A7%A8%A9%AA%AB%AC%A6%3E%AF%B0%B1%B2%B3%B4%B5%AF%3C%B8%B9%BA%BB%BC%BD%BE%B8%3D%C1%C2%C3%C4%C5%C6%C7%C1%3F%CA%CB%CC%CD%CE%CF%D0%CA%06%D3%D4%D4%25%0FBB%2F%D5%DC%06%17%D9%0F%1B%DD%D4%07%E5%E6%E7%18%E0%12%E7%E7%12%D9B%1C%EC%EC%04%F4%F5%F6%04%0E%D9%0E%F7%F5%F9B3%FC%EE)%18H%B0%A0%82%15%26%B2Q0%A8%80B6%16%19%18%1AL%40%B1%A2E%8A%22%B25%88%601B%83l%1A.%8AL0%A0%A4%C9%93%26!d%83pR%A5%10%17(c%96%2C%40%B3%A6%CD%9A%1E%3E%0A%F9%403F%B6%167%83%D6D%40%B4%A8Q%A304V%A8%A0%D3%C2%D1%A7E%05H%9DJ%B5*%89l%20Pd%93Q%B5%2B%D5%00%60%C3%8A%1D%1B%22%C5%3B!'%C6%AA%1D%3B%A4%AD%DB%B7py%87Lx7BE%DC%BBx%F3%BA%ED%90m%82%DE%BF%80%870%C8%B6%20%B0%E1%BB%83%85%14%3E%CC%B8m%E2%C5%8D%0F%3F%8E%CCx2e%C3%96%2F%03%CE%ACY%2F%E7%CE%A0C%8B%1E%7D7%87%E9%D3%A8S%AB%5E%CD%DAt%8D%D7%B0c%CB%9EM%BB%F6k%1B%B8s%EB%DE%CD%BB%B7o%DC8%82%0B%1FN%BC%B8%F1%E3%C1%01(_%CE%BC%B9%F3%E7%D0%95%EB%98N%BD%BA%F5%EB%D8%B3O%0F%04%00%3B";
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			  

// Search HTML
var searchText = '<span id="searchForm"><form action="http://nycs.bigheadlabs.com/search1/" method="get"><input type="text" name="q" id="searchBox" width="5" /><input type="submit" id="searchSubmit" value="Search" /></form></span>';

for (i=0; i<cssRules.length; i++)
{
	GM_addStyle(cssRules[i]);
}



// Find and modify tables - a very sucky (but fast) way of doing this...
var tables = document.getElementsByTagName('table');
tables[0].style.width = "95%";
tables[0].style.marginTop = "20px";
tables[2].style.marginTop = "20px";
tables[2].style.float = "left";



// Threads Column Extension - only on the main page!!
if(location.pathname=="/"||location.pathname=="/news"||location.pathname=="/newest"||location.pathname=="/best")
{
	// Style adjustments for the tables
	tables[2].insertRow(0);
	tables[2].rows[0].insertCell(0);
	tables[2].rows[0].cells[0].colSpan = 4;
	if(location.pathname=="/"||location.pathname=="/news") { tables[2].rows[0].cells[0].innerHTML = "<span class='sectionTitle'>Popular</span>"; }
	else if(location.pathname=="/newest") { tables[2].rows[0].cells[0].innerHTML = "<span class='sectionTitle'>Newest</span>"; }
	else if(location.pathname=="/best") { tables[2].rows[0].cells[0].innerHTML = "<span class='sectionTitle'>Best Ever</span>"; }
	tables[2].rows[0].cells[0].style.paddingBottom = "10px";
	tables[2].className = "col1";
	
	var threadsLink = filter(function(a){
		return a.innerHTML == "threads";
	}, allLinks);
	
	if (threadsLink.length>0){
		
		tables[2].parentNode.innerHTML += "<div id='threadsTarget' style='float: left; width: 39%;'><div class='sectionTitle' style='width: 300px; margin-top: 20px;'>Loading Thread History...</div></div>";
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: threadsLink[0].href,
			onload: function(responseDetails) {
				// create new element and assign this text to the innerHTML prop so we can navigate the object model
				var container = document.createElement("div");
				container.innerHTML = responseDetails.responseText;
				
				var aTags = filter(function(a){
					return a.innerHTML == a.href;
				},container.getElementsByTagName('a'));
				
				for (i=0; i<aTags.length; i++)
				{
					for (j=15; j<=aTags[i].innerHTML.length; j+=15)
					{
						// Inject a space every few chars to break up long URL's
						aTags[i].innerHTML = aTags[i].innerHTML.substring(0, j) + " " + aTags[i].innerHTML.substring(j);
					}
				}
				document.getElementById('threadsTarget').innerHTML = container.getElementsByTagName('table')[2].parentNode.innerHTML;
				var newTable = document.getElementById('threadsTarget').getElementsByTagName('table')[0];
				newTable.className = "col2";
				newTable.insertRow(0);
				newTable.rows[0].insertCell(0);
				newTable.rows[0].cells[0].colSpan = 4;
				newTable.rows[0].cells[0].innerHTML = "<span class='sectionTitle'>Your Threads</span>";
				mapReplyLinks();
			}
		});
	}
}


// Display Link Function
function showLink(comments, url)
{
	if (url)
	{
		GM_openInTab(url);
	}
	
	showComments(comments);
}


// Looad comments in col2
function showComments(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails) {
			// create new element and assign this text to the innerHTML prop so we can navigate the object model
			var container = document.createElement("div");
			container.innerHTML = responseDetails.responseText;
			//unsafeWindow.console.log(url);
			var pageTitle = filter(function(a){
				return a.rel == "nofollow";
			}, container.getElementsByTagName("a"))[0].innerHTML;
			document.getElementById('threadsTarget').innerHTML = container.getElementsByTagName('table')[2].parentNode.innerHTML;
			var newTable = document.getElementById('threadsTarget').getElementsByTagName('table')[0];
			newTable.className = "col2";
			newTable.insertRow(0);
			newTable.rows[0].insertCell(0);
			newTable.rows[0].cells[0].colSpan = 4;
			newTable.rows[0].cells[0].innerHTML = "<span class='sectionTitle'>"+pageTitle+"</span>";
			mapReplyLinks();
			swapArrows();
		}
	});
	
}




// Swap Logo and Arrows
function swapArrows(){
	var images = document.getElementsByTagName("img");
	
	for (var i=0; i < images.length; i++)
	{
		if (images[i].getAttribute("src") == "http://ycombinator.com/images/y18.gif")
		{
			// Logo
			images[i].src = newLogo;
			images[i].width = "38";
			images[i].height = "38";
		}
		
		if (images[i].getAttribute("src") == "http://ycombinator.com/images/grayarrow.gif")
		{
			// Up arrow
			images[i].src = upArrow;
		}
		
		if (images[i].getAttribute("src") == "http://ycombinator.com/images/graydown.gif")
		{
			// Down arrow
			images[i].src = downArrow;
		}
	}
}
swapArrows();



// Build Link References
for (var i=0; i < allLinks.length; i++)
{
	if (allLinks[i].getAttribute("rel"))
	{
		// This is one of the content links
		allLinks[i].className = "contentLink";
		articleReferences.push(allLinks[i]);
	}


	if (allLinks[i].getAttribute("href").indexOf("news50") == 0 ||
		 allLinks[i].getAttribute("href").indexOf("news100") == 0)
	{
		// This is the next page link
		allLinks[i].parentNode.innerHTML = "<a href='news'>1</a> | <a href='news50'>2</a> | <a href='news100'>3</a>";
	}
}




// Inject new styles and click events
for (var i=0; i < articleReferences.length; i++)
{
	if (articleReferences[i].getAttribute("href").indexOf("comments?id=") == 0)
	{
		// This is a comment
		articleReferences[i].style.fontSize = "1.3em";
		
		articleReferences[i].addEventListener("click", function(event)
		{
		   showLink(this.href);
		   event.stopPropagation();
		   event.preventDefault();
		}, true);
	} else {
		// This is an outgoing link
		var commentsUrl = filter(function(a){
			return a.href.indexOf("comments?id=") >= 0;
		},articleReferences[i].parentNode.parentNode.nextSibling.getElementsByTagName("a"))[0].href;
		
		//unsafeWindow.console.log("COMMENTS: " + commentsUrl + "\nHREF: " + articleReferences[i].href)
		
		articleReferences[i].addEventListener("click", function(event)
		{
			showLink(filter(function(a){
				return a.href.indexOf("comments?id=") >= 0;
			}, this.parentNode.parentNode.nextSibling.getElementsByTagName("a"))[0].href, this.href);
			
			event.stopPropagation();
			event.preventDefault();
		}, true);
	}
}


// Inject Search Box
var spanTags = document.getElementsByTagName("span");
for (var i=0; i<spanTags.length; i++)
{
	if (spanTags[i].className=="pagetop" && spanTags[i].parentNode.style.lineHeight!="12pt")
	{
		// Inject searchbox
		spanTags[i].innerHTML = "<div id='utils'>" + searchText + spanTags[i].innerHTML + "</div>";
	}
}







// RIPPED FROM http://userscripts.org/scripts/source/8951
// These could be better integrated with the code above

if (!GM_xmlhttpRequest) {
    alert('YCArrows requires version Greasemonkey 0.2.6 or later.');
    return;
}

function onLoginPage(htmltext) {
	return (htmltext.search(/<b>Login<\/b>/) >= 0);
}

function blankArrows(center) {
	var img = document.createElement('img');
	img.src = 'http://ycombinator.com/images/s.gif';
	img.height = 1;
	img.width = 14;
	var ctag = document.createElement('center');
	ctag.appendChild(img);
	center.parentNode.replaceChild(ctag, center);
}

function parentOf(e, depth) {
	if(depth <= 1)
		return e.parentNode;
	else
		return parentOf(e.parentNode, depth-1);
}

function findPointsNode(img) {
	//comments style layout
	var tag = parentOf(img, 3).nextSibling.firstChild;
	if(tag.tagName.search(/span/i) >= 0)
		return tag.firstChild;
	
	//story style layout
	return parentOf(img, 4).nextSibling.childNodes[1].firstChild;
}

function votefn(img) {
	if(img.src.search(/graydown/) >= 0)
		return function(n) { return --n; };
	return function(n) { return ++n; };
}

function alterPoints(txtnode, alterfn) {
	var n = alterfn(parseInt(txtnode.data.match(/([+-]?[0-9]+) point/)[1]));
	var repltxt = (n == 1)?n + " point":n + " points";
	txtnode.data = txtnode.data.replace(/[+-]?[0-9]+ points?/, repltxt); 
}

var clickHandler = function(event) { 
	GM_xmlhttpRequest({
		method: 'GET',
		url: event.target.parentNode.href,
		onload: function(responseDetails) {
			if(onLoginPage(responseDetails.responseText)) {
				var link = document.getElementsByTagName('link')[0];
				link.parentNode.removeChild(link);
				document.getElementsByTagName('body')[0].innerHTML = 
					responseDetails.responseText.replace(/<\/?html>/g, '');
			} else {
				alterPoints(findPointsNode(event.target), votefn(event.target));
				blankArrows(event.target.parentNode.parentNode);
			}
		}
	});
	event.preventDefault();
};

var arrow_anchors = 
filter(function(a) {
	return (a.href && (a.href.search(/\/r\?.*/) >= 0)); 
}, document.getElementsByTagName('a'));

map(function(a) {
	a.addEventListener('click', clickHandler, true);
    }, arrow_anchors);













// MY ajax comment extension... (to update the # of comments)
var commentCountElem = filter(function(a) {
	return (location.href == a.href && a.rel!="nofollow" && location.href.indexOf("comments")>=0);
}, document.getElementsByTagName('a'));

//alert(commentCountElem.length);





// COMMENT WITH AJAX
// http://news.ycombinator.com/comments?id=19402

function constructReplyRow(formtext) {
	var tr = document.createElement('tr');
	tr.appendChild(document.createElement('td'));
	tr.appendChild(document.createElement('td'));
	var td = document.createElement('td');
	td.innerHTML = formtext;
	tr.appendChild(td);
	return tr;
}

var cancelHandler = function(event) {
	var repltr = parentOf(event.target, 6);
	repltr.parentNode.removeChild(repltr);
	event.preventDefault();
}

var clickHandler2 = function(event) { 
	GM_xmlhttpRequest({
		method: 'GET',
		url: event.target.href,
		onload: function(responseDetails) {
			var formHTML = responseDetails.responseText.match(/<form.*<\/form>/)[0];
			formHTML = formHTML.replace(/<\/form>/, '&nbsp;&nbsp;<font size=1><u><a href="">Cancel</a></form></u></font>');
			var tbody = parentOf(event.target, 6);
			var repltr = constructReplyRow(formHTML);
			var cancela = repltr.getElementsByTagName('a')[0];
			cancela.addEventListener('click', cancelHandler, true);
			tbody.appendChild(repltr);
						
			// Mod -- Update comment count
			if (location.href.indexOf("comment") >= 0){
				commentCountElem[0].innerHTML[0]++; // end mod
			}
			cancela.scrollIntoView(false);
		}
	});
	event.preventDefault();
};

function mapReplyLinks(){
	var reply_anchors = filter(function(a) {
		return (a.textContent && a.textContent == "reply"); 
	}, document.getElementsByTagName('a'));
	
	map(function(a) {
		a.addEventListener('click', clickHandler2, true);
		}, reply_anchors);
}

mapReplyLinks(); // we'll need to call this when the threads info has finished loading too