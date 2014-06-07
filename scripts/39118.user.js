// ==UserScript==
// @name           WineLibraryWishlist
// @namespace      http://www.danfield.net/
// @description    Modify behavior of WineLibrary wishlist functions
// @include        http://winelibrary.com/mywishlist.asp
// @include        https://winelibrary.com/mywishlist.asp
// ==/UserScript==


// Initialize global variables
var hideout = getValue('HideOut', false); 
var showlabels = getValue('ShowLabels', false); 

// Open cart display and remove expand button (if exists)
var expandbutton = document.evaluate(
	"//img[contains(@src,'btn-expandcart.gif')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < expandbutton.snapshotLength; i++)removeElement(expandbutton.snapshotItem(i));
var cartbox = document.getElementById('cart_expander_box')
if (cartbox) cartbox.style.display = 'block';

// Initialize status bar
var statcount = 0;
InitBar(true);

// Strip out some ads, etc.
removeElement(document.getElementById('drawer'));
removeElement(document.getElementById('links'));
var humanclick = document.evaluate(
	"//script[contains(@src,'humanclick')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < humanclick.snapshotLength; i++)removeElement(humanclick.snapshotItem(i));
GM_addStyle('#maincolumn {width: 755px ! important;}');

// Create links for filtering "Un/Mark All", "Out of Stock" and showing label images
var optionsspan = $n('span');
var markallcheckbox = $n('input', optionsspan);
markallcheckbox.type = 'checkbox';
markallcheckbox.checked = true;
markallcheckbox.addEventListener('change', function(){
	markallRows();
}, true);
$t(' Un/Mark All      ', optionsspan);
var hideoutcheckbox = $n('input', optionsspan);
hideoutcheckbox.type = 'checkbox';
hideoutcheckbox.checked = hideout;
hideoutcheckbox.addEventListener('change', function(){
	hideout = setValue('HideOut', hideoutcheckbox.checked);
	HideOutRows();
}, true);
$t(' Hide out of stock items      ', optionsspan);
var showlabelscheckbox = $n('input', optionsspan);
showlabelscheckbox.type = 'checkbox';
showlabelscheckbox.checked = showlabels;
showlabelscheckbox.addEventListener('change', function(){
	showlabels = setValue('ShowLabels', showlabelscheckbox.checked);
	ShowAllLabels(showlabels);
}, true);
$t(' Show large labels', optionsspan);
var copyalllinks = document.evaluate(
	"//div[@id='maincolumn']//a[contains(@href,'/do_wishlist.asp?action=cart_all')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
insertAfter(optionsspan, copyalllinks.snapshotItem(0));
for (var i = 0; i < copyalllinks.snapshotLength; i++) {
	copyalllinks.snapshotItem(i).href = 'javascript:void(0)';
	copyalllinks.snapshotItem(i).addEventListener('click', function(){AddAllToCart()}, true);
}

// Obtain array of table rows
var linkrows = document.evaluate(
	"//div[@id='maincolumn']//a/ancestor::tr",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Obtain array of review links
var reviewlinks = document.evaluate(
	"//div[@id='maincolumn']//a[contains(@href,'/reviewwine.asp?item=')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Obtain array of cart links
var cartlinks = document.evaluate(
	"//div[@id='maincolumn']//a[contains(@href,'/do_wishlist.asp?action=cart&item=')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Loop through row/links
statcount = 0
var item, cartlink, reviewlink, linkrow
for (var i = 0; i < cartlinks.snapshotLength; i++) {
	cartlink = cartlinks.snapshotItem(i);
	reviewlink = reviewlinks.snapshotItem(i);
	linkrow = linkrows.snapshotItem(i);
	item = reviewlink.href.split('=')[1];
	
	// Set ID's and classes
	cartlink.id = 'button' + item
	reviewlink.id = 'review' + item
	linkrow.id = 'row' + item
	linkrow.className = 'instock'

	// Change "Add to Cart" button link
	cartlink.href = cartlink.href.replace('do_wishlist.asp?action=cart&', 'addToCart.asp?');

	// Add table cell for image 
	var imagecell = $n('td');
	imagecell.style.verticalAlign = 'top';
	var previewimage = $n('img', imagecell);
	previewimage.id = 'preview' + item;
	previewimage.className = 'previewimage';
	previewimage.src = 'http://winelibrary.com/images/'+item+'.jpg'
	previewimage.width = (showlabels)?'200':'100' ;
	linkrow.appendChild(imagecell);

	// Check In Stock status for each item
	GM_xmlhttpRequest({
		method: 'GET',
		url: reviewlink.href, 
		headers: {
			'User-Agent': 'Mozilla/5.0', 
			'Accept': 'text/html,text/xml,text/plain'
		},
		onload: CheckInStock(item, linkrows.snapshotLength)
	})
}


function CheckInStock(item, max){
	return function(response){

		// Update status bar
		StatBar(statcount, max);

		// Create check box
		var stockdiv = $n('div');
		stockdiv.style.verticalAlign = 'middle';
		var chkbox = $n('input', stockdiv);
		chkbox.type = 'checkbox';
		var instock = !(response.responseText.match(/lostitem\.asp/gi));
		chkbox.checked =(instock)
		chkbox.disabled = !(instock);
		chkbox.className = (instock)?'checkboxinstock':'checkboxoutofstock';
		chkbox.id = 'checkbox'+item
		var stock =(instock)?'Item is in stock':'Item is out of stock' ;
		$t(' ' + stock, stockdiv);

		// Grab bottle price
		var responsediv = $n('div');
		responsediv.innerHTML=response.responseText
		var pricebox = document.evaluate(
			"//span[@class='sale_price']",
			responsediv,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		var price = (pricebox.snapshotLength == 1)?pricebox.snapshotItem(0).innerHTML:'';
		$t('   '+price, $n('b', stockdiv))

		// Add checkbox and price to cell
		var reviewlink = document.getElementById('review'+item)
		insertAfter(stockdiv, reviewlink);

		// Upstate row 'class' based in instaock status
		document.getElementById('row'+item).className = (instock)?'instock':'outofstock';

		// Is this wine in stock?
		var cartbutton = document.getElementById('button'+item)
		if (!instock){
			// Check if link includes vintage
			var winename = reviewlink.text.match(/(.*)\s\d\d/)
			winename = (!(winename == null))?winename[1]:reviewlink.text;

			// Create link to find newer
			var searchnewlink = $n('a');
			searchnewlink.href = 'javascript:void(0)';
			searchnewlink.addEventListener('click', function(){SearchNew(winename, item)}, true);
			$t('Search for update', searchnewlink);

			//  Replace button with Search New link
			replaceElement(searchnewlink, cartbutton);
		}

		// Hide row if needed
		HideOutRows(item);

		// Upstate variables for status bar
		statcount++
		if (statcount == max) {
			StatBar(-1);
			statcount = 0;
		}
	}
}


function HideOutRows(item){
	var tablerow
	if (item){
		tablerow = document.getElementById('row'+item)
		if (hideout && (tablerow.className == 'outofstock')){
			tablerow.style.visibility = 'collapse'
		}else{
			tablerow.style.visibility = 'visible';
		}
	}else{
		var tablerows = document.evaluate(
			"//div[@id='maincolumn']//a/ancestor::tr",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < tablerows.snapshotLength; i++) {
			tablerow = tablerows.snapshotItem(i)
			if (hideout && (tablerow.className == 'outofstock')){
				tablerow.style.visibility = 'collapse'
			}else{
				tablerow.style.visibility = 'visible';
			}
		}
	}
}



function markallRows(){
	var stockchecks = document.evaluate(
		"//input[@class='checkboxinstock']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < stockchecks.snapshotLength; i++) {
		stockchecks.snapshotItem(i).checked = markallcheckbox.checked
	}
}

function AddAllToCart(){
	// Obtain array of cart links
	var cartlinks = document.evaluate(
		"//div[@id='maincolumn']//a[contains(@href,'/addToCart.asp')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	statcount = 0
	for (var i = 0; i < cartlinks.snapshotLength; i++) {
		var cartlink = cartlinks.snapshotItem(i);
		var item = cartlink.href.split('=')[1];

		if (document.getElementById('checkbox'+item).checked){
			// Place order for this item
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://winelibrary.com/addToCart.asp?item='+item, 
				headers: {
					'User-Agent': 'Mozilla/5.0', 
					'Accept': 'text/html,text/xml,text/plain'
				},
				onload: AddedToCart(item, cartlinks.snapshotLength)
			})
		}else{
			// Upstate variables for status bar
			StatBar(statcount, cartlinks.snapshotLength);
			statcount++
			if (statcount == cartlinks.snapshotLength){
				StatBar(-1);
				statcount = 0;
				// Refresh Wishlist page
				location.reload(true);
			}
		}
	}
}


function AddedToCart(item, max){
	return function(response){
		// Update status bar
		StatBar(statcount, max);
		statcount++
		if (statcount == max){
			StatBar(-1);
			statcount = 0;
			// Refresh Wishlist page
			location.reload(true);
		}
	}
}


function ShowAllLabels(show){
	var previewimages = document.evaluate(
		"//img[@class='previewimage']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < previewimages.snapshotLength; i++) {
		previewimages.snapshotItem(i).width = (show)?'200':'100' ;
	}
}

function SearchNew(winename, item){
//	GM_openInTab('http://winelibrary.com/sorted.asp?search=' + winename + '&OrderBy=price&OrderAD=ASC');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://winelibrary.com/sorted.asp?search=' + winename + '&OrderBy=price&OrderAD=ASC', 
		headers: {
			'User-Agent': 'Mozilla/5.0', 
			'Accept': 'text/html,text/xml,text/plain'
		},
		onload: Replacements(item)
	})
}

function Replacements(replaceitem){
	return function(response){

		// Grab response and look for hits
		var responsediv = $n('div');
		responsediv.innerHTML=response.responseText
		var updates = document.evaluate(
			"//div[@class='searchRow']",
			responsediv,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);		
		var updatediv
		if (updates.snapshotLength > 0){
			// Grab or create DIV for display
			updatediv = document.getElementById('updatediv');
			if (!(updatediv)){
				// Create DIV to hold replacements
				GM_addStyle('#updatediv {'+
					'position:absolute;'+
					'background-color:#eeeeee;'+
					'border: 5px outset black;' +
					'padding: 0px;'+
					'width: 600px;'+
					'z-index: 9002;}');
				GM_addStyle('#closepopupdiv {'+
					'background-color: black;'+
					'border: 2px intset black;' +
					'padding: 0px;'+
					'margin: 0 0 0 0;' +
					'text: white;'+
					'text-align: right;'+
					'width: 100%;}');
				GM_addStyle('#scrollpopupdiv {'+
					'background-color:#eeeeee;'+
					'overflow: auto;' +
					'padding: 7px;'+
					'width: 580px;}');

				updatediv = $n('div');
				updatediv.id = 'updatediv';
				updatediv.className = 'updatediv'; 
				updatediv.style.display = 'none';
				document.body.appendChild(updatediv);
			}
			// Develop content for pop-up
			updatediv.innerHTML = '';
			var closepopupdiv = $n('div', updatediv);
			closepopupdiv.id = 'closepopupdiv';
			var closepopupbutton = $n('input', closepopupdiv)
			closepopupbutton.type = 'button';
			closepopupbutton.value = 'Close';
			closepopupbutton.addEventListener('click', function(){closepopup()}, true);
			var scrollpopupdiv = $n('div', updatediv);
			scrollpopupdiv.id = 'scrollpopupdiv';

			// For each replacement item
			for (var i = 0; i < updates.snapshotLength; i++) {

				// Strip out unneeded content
				var newitem = updates.snapshotItem(i)
				var crap = document.evaluate("//p[@class='searchRow_description']", newitem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				if (crap.snapshotLength > 0) removeElement(crap.snapshotItem(0));
				crap = document.evaluate("//a[contains(@href,'mailto:')]", newitem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				if (crap.snapshotLength > 0) removeElement(crap.snapshotItem(0));
				crap = document.evaluate("//form[@name='productForm']", newitem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				if (crap.snapshotLength > 0) removeElement(crap.snapshotItem(0));
				crap = document.evaluate("//span[@class='videoPop']", newitem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				if (crap.snapshotLength > 0) removeElement(crap.snapshotItem(0));
		
			
				// Replace links with what we want to do
				crap = document.evaluate("//a[contains(@href,'reviewwine.asp')]", newitem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var j = 0; j < crap.snapshotLength; j++) {
					var oldhref = crap.snapshotItem(j).href
					crap.snapshotItem(j).href = 'javascript:void(0)';
					OpenInTabEvent(crap.snapshotItem(j), oldhref);
				}
				crap = document.evaluate("//a[contains(@href,'do_wishlist.asp')]", newitem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				var newitemnum = crap.snapshotItem(0).href.split('item=')[1];
				crap.snapshotItem(0).href = 'javascript:void(0)';
				ReplaceItemEvent(crap.snapshotItem(0), replaceitem, newitemnum);

				// Add replacement choice to list
				scrollpopupdiv.appendChild(newitem);
			}
			// Create "blanket" over existing window and pop-up
			blanket(true);

			// Position and display popup
			updatediv.style.left = ((document.body.clientWidth - 600) / 2) + document.body.scrollLeft + 'px';
			updatediv.style.top = window.pageYOffset + 75 + 'px';
			updatediv.style.height = window.innerHeight - 150 + 'px';
			updatediv.style.display = 'block';
			
		}else{
			alert('No updates found');
		}
	}
}

function closepopup(){
	document.getElementById('updatediv').style.display = 'none';
	blanket(false);
}

function OpenInTabEvent(obj, oldhref){
	obj.addEventListener('click', function(){OpenInTab(oldhref)}, true);
}

function ReplaceItemEvent(obj, replaceitem, newitemnum){
	obj.addEventListener('click', function(){ReplaceItem(replaceitem, newitemnum)}, true);
}


function ReplaceItem(replaceitem, newitem){
	
	//Add new item to wishlist
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://winelibrary.com/do_wishlist.asp?action=wishlist&item='+newitem, 
		headers: {
			'User-Agent': 'Mozilla/5.0', 
			'Accept': 'text/html,text/xml,text/plain'
		}
	})
	// Remove old item?	
	if (confirm("Remove old item from Wishlist")){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://winelibrary.com/do_wishlist.asp?action=remove&item='+replaceitem, 
			headers: {
				'User-Agent': 'Mozilla/5.0', 
				'Accept': 'text/html,text/xml,text/plain'
			},
			onload: setTimeout("location.reload(true)",2000)
		})
	}else{

		//  Reload wishlist
		setTimeout("location.reload(true)",2000);
	}
}

function blanket(show) {
	var blanketdiv = document.getElementById('blanketdiv');
	if (!(blanketdiv)){
		// Create DIV for curtain
		GM_addStyle('#blanketdiv {'+
			'position:absolute;'+
			'background-color:#111;'+
			'opacity: 0.65;'+
			'filter:alpha(opacity=65);'+
			'z-index: 9001;'+
			'top:0px;'+
			'left:0px;'+
			'width:100%;}');
		blanketdiv = $n('div');
		blanketdiv.id = 'blanketdiv';
		blanketdiv.className = 'blanketdiv'; 
		blanketdiv.style.display = 'none';
		document.body.appendChild(blanketdiv);
		var viewportheight = window.innerHeight;
		if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
			blanketdiv.style.height = viewportheight + 'px';
		} else {
			if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
				blanketdiv.style.height = document.body.parentNode.clientHeight + 'px';
			} else {
				blanketdiv.style.height = document.body.parentNode.scrollHeight + 'px';
			}
		}
	}
	blanketdiv.style.display = show?'block':'none';
}


// =====================================================================================
// UTILITY FUNCTIONS
// =====================================================================================

function setValue(key,val) {
	GM_setValue(key,val);
	return val;
}

function getValue(key,defaultValue) {
	var val = GM_getValue(key);
	if (!val){
		val = defaultValue;
		GM_setValue(key,val);
	}
	return val;
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

/**
 * Node Node -> Void
 * Inserts newNode after target.
 */
function insertAfter(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

function removeElement(target){
	target.parentNode.removeChild(target);
}

function replaceElement(newNode, target){
	target.parentNode.replaceChild(newNode,target);
}


function OpenInTab(newhref){
	GM_openInTab(newhref);
}

/**
 * InitBar -> Void
 * Initializes status bar in window
 */
function InitBar(draw){
	unsafeWindow.mygmStatBar = function(now,max){
		var statbox = document.getElementById('mygmStatBox');
		if (!statbox){
			statbox = document.createElement('div');
			statbox.id = 'mygmStatBox';
			GM_addStyle(
			'#mygmStatBox {'+
			'  position: fixed;' +
			'  left: 0;' +
			'  right: 0;' +
			'  bottom: 0;' +
			'  top: auto;' +
			'  border-top: 1px solid black;' +
			'  background: black;' +
			'  color: black;' +
			'  margin: 0 0 0 0;' +
			'  padding: 0 0 0 0;' +
			'  width: 100%;' +
			'  z-index: 10; }');
			document.body.appendChild(statbox);;
		}
		if (now >= 0){
			// draw status bar
			var done = ((now/max)*100) + '%'
			statbox.innerHTML = "<hr style='color: #FFBD32; background: #FFBD32; height: 20px; width: " +done+"; margin:0;'/>";
		}else{
			// colapse box to line
			statbox.innerHTML = "<hr style='color: #FFBD32; background: #FFBD32; height: 3px; width: 100%; margin:0;'/>";
		}
	}
	if (draw)unsafeWindow.mygmStatBar(-1);
}

function StatBar(now, max){
	unsafeWindow.mygmStatBar(now,max);
}

