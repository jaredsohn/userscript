// ==UserScript==
// @name           irishrail remediation 1.2
// @namespace     http://www.dcu.ie
// @description  correct some web accessibility problem on www.irishrail.ie
// @version 1.2
// @include        http://irishrail.ie/*
// @include        http://www.irishrail.ie/*
// @include        https://www.irishrail.ie/*
// ==/UserScript==

//--------------------------------------------------------------------------------------------------------------
// Client side remediation for www.irishirail.ie:
// 1. Add null alt text to images used as spacer
// 2. Change the tiltle bar image to text("Reservation&Times","Fare Deals","Travel Alerts&News")
// 3. Add alt text for advertisement images. (Fare Deals advertisement)
// 4. Add "title" attibute to image links and buttons
// 5.  Modify the links which redirect automatically. ("student travel card","ticketmaster"...)
// 6. Change the color of the web site to provide sufficient contrast
// 7. Set the language of the web site. (lang="en")
// 8. Add accesskey to focus on search field (accesskey='0')
// 9. Add accesskey to focus on the form (accesskey='1')
//---------------------------------------------------------------------------------------------------------------

function addLanguageInfo(){
	// ****set the language of the web**** 
	var html = document.getElementsByTagName('html')[0];
	if(html&&!html.lang)
		html.lang="en";
}

function fixImages(){
	var images,image;
	images = document.getElementsByTagName('img'); 

	for (var i = 0; i < images.length; i++) { 
		image = images[i]; 
		
		var string = image.src;
		var s = string.substring(string.lastIndexOf("/")+1,string.lastIndexOf("."));
		
		// ****fix images as spacer****
		if(s=="arrow"||s=="sitemap_arrow"||s=="spacer"||s=="sitemap_bullet")
			image.alt = "";
			
		// ****fix images as Graphic text****
		// images as tiltle
		else if(s=="proceed_to_reservations")
			image.alt = "Proceed to Reservations";
		// seat type "P" "S" and "T"	
		else if(s=="p")
			image.alt = "P";
		else if(s=="s")	
			image.alt = "S";
		else if(s=="t")	
			image.alt = "T";
		// continue button	
		else if(s=="continue")	
			image.alt = "Continue";
			
		// title of columns in main page	
		else if(s=="grey_bar") {
			var td = image.parentNode;
			var tr = td.parentNode;
			var td1 = document.createElement('td');
			tr.replaceChild(td1,td);
			
			var td2 = document.createElement('td');
			td2.textContent = "Reservation&Times";
			td2.className = "title1";
			tr.insertBefore(td2, td1.nextSibling);
			
			var td3 = document.createElement('td');
			tr.insertBefore(td3, td2.nextSibling);
			
			var td4 = document.createElement('td');
			td4.textContent = "Fare Deals";
			td4.className = "title1";
			tr.insertBefore(td4, td3.nextSibling);
			
			var td5 = document.createElement('td');
			tr.insertBefore(td5, td4.nextSibling);
			
			var td6 = document.createElement('td');
			td6.textContent = "Travel Alerts&News";
			td6.className = "title1";
			tr.insertBefore(td6, td5.nextSibling);
		}
		
		//**** fix the buttons, make them more accessible when turn off images****
		var a = image.parentNode;
		if(a&&a.tagName=="A"){
			// add title attribute
			a.setAttribute("title",image.alt);
		}
		var height = image.getAttribute("height");
		/* seems not good to change the buttons' size
		if(height&&height==15){
			image.setAttribute("height",20);		
		}
		*/
	}

	// ***fix images as advertisement***	
	// since images as advertisement are changeable. We shouldn't get the element by images' name.
	
	var adArea = document.getElementById("home-middle-panel");
	if(adArea) {
		var eles1 = adArea.childNodes;
		for(var i=0;i<eles1.length;i++){
			var ele1 = eles1[i];
			if(ele1.tagName=="P"){
				eles2 = ele1.childNodes;
				for(var j=0;j<eles2.length;j++){
					ele2 = eles2[j];
					if(ele2.tagName=="A"){
						var ad = ele2.firstChild;
						if(ad.tagName=="IMG"&&!ad.alt) {
							
							var newad = document.createElement('img');
							newad.src = ad.src;
							newad.alt = "Fare Deals Advertisement Link";
							//ad.alt = "Fare Deals Advertisement;
							ad.parentNode.replaceChild(newad,ad);
						}
					}
					if(ele2.tagName=='IMG'&&!ele2.alt){
						var newad = document.createElement('img');
						newad.src = ele2.src;
						newad.alt = "Fare Deals Advertisement Picture";
						ele2.parentNode.replaceChild(newad,ele2);
					}
				}
			}
		}
	}
}


//****Modify the links which redirect automatically.****
function fixLinks(){
	var allLinks, thisLink;
	allLinks = document.evaluate(
	    '//a[@target]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	    thisLink = allLinks.snapshotItem(i);
	    thisLink.target = "_self";
	}
}

//***fix the presentation of the web site****
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
var newCSS = ".sitemap{background-color: #C0FFC0;}"	
			+".title1{background-color: #C0FFC0;font-size:1.2em;}"


function fixStyle(){
	//addGlobalStyle(newCSS);
	GM_addStyle(newCSS);
	
	// change background color of some titile from dark green to light green
	var trs = document.getElementsByTagName('tr');
	for(var i=0;i<trs.length;i++){
		var tr = trs[i];
		var bg = tr.getAttribute("bgcolor");
		if(bg&&bg=="#86b918"){	
			tr.setAttribute("bgcolor","#C0FFC0")
		}
	}
	var tds = document.getElementsByTagName('td');
	for(var i=0;i<tds.length;i++){
		var td = tds[i];
		var bg = td.getAttribute("bgcolor");
		if(bg){	
			if(bg=="#86b918")
				td.setAttribute("bgcolor","#C0FFC0");
			else if(bg=="#828585")
				td.setAttribute("bgcolor","#505050");
		}
	}
	// change the background color of the form in home page 
	var form = document.getElementById("res");
	if(form)
		form.style.backgroundColor = "#505050";
}


function addAccesskey4Search(){	
	// ****add accesskey to focus on search field (all pages of the website) -- accesskey = 0****
	// Notice: When I replace the search input with a new one. The focus can focus on search field by using accesskey, but the inner javascipt used for search will not work then. 
	// The solution is : I add a invisible label before it, and assign the accesskey to the label. When you press accesskey, the focus will go to search field.
	var search = document.getElementsByName('search')[0];
	if(search){
		search.id = "searchbar";
		//search.setAttribute("accesskey","0");
		
		var searchLabel = document.createElement('label');
		searchLabel.setAttribute("for","searchbar");
		searchLabel.setAttribute("accesskey","0");
		search.parentNode.insertBefore(searchLabel,search);
		
		//change search field to a new one, or assign accesskey to it directly will not work
		/* var accessSearch = document.createElement('input');
		accessSearch.setAttribute("type","text");
		accessSearch.setAttribute("accesskey","0");
		accessSearch.setAttribute("onblur","if(this.value=='')this.value='Site Search';");
		accessSearch.setAttribute("onfocus","if(this.value=='Site Search')this.value='';");
		accessSearch.setAttribute("maxlength","30");
		accessSearch.setAttribute("value","Site Search");
		search.parentNode.replaceChild(accessSearch,search);
		 */	 
	}	
}

// ****add accesskey to focus on first item of form (including all steps of ticket booking) -- accesskey = 1****
function addAccesskey4Form(){
	// ****First step (Home page)
	// set the focus on first input field  (from station)
	var input1 = document.getElementById('txtFromStation');
	if(input1){
		//======question1: set "accesskey" attribute to original element can't work======
		//input1.accesskey = "1";
		//input1.setAttribute("accesskey","1");
		//=======both of them can't work=================================
		// following code can work
		var access1 = document.createElement('input');
		access1.setAttribute("type","text");
		access1.setAttribute("accesskey","1");
		access1.setAttribute("name","txtFromStation");
		access1.setAttribute("id","txtFromStation");
		access1.setAttribute("onclick","this.value");
		access1.setAttribute("style","width: 140px; height: 20px;");
		input1.parentNode.replaceChild(access1,input1);
	}

	//****Second step (select trains: http://www.irishrail.ie/your_journey/timetables_junction1.asp)
	// set the focus on first checkbox1
	var allcheckbox1, checkbox1;
	allcheckbox1 = document.evaluate(
	    "//input[@type='checkbox']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	if(allcheckbox1)
	checkbox1 = allcheckbox1.snapshotItem(0);

	if(checkbox1){
		var access2 = document.createElement('input');
		access2.setAttribute("type","checkbox");
		access2.setAttribute("accesskey","1");
		access2.setAttribute("name",checkbox1.name);
		access2.setAttribute("id",checkbox1.id);
		access2.setAttribute("onclick",checkbox1.getAttribute("onclick"));
		access2.setAttribute("tabindex","0");
		checkbox1.parentNode.replaceChild(access2,checkbox1);
	}

	//*** Third step (select ticket type)
	var select1 = document.getElementsByName('pxticket')[0];
	if(select1){	
		//var inner = select1.innerHTML;
		var access3 = document.createElement('select');
		access3.setAttribute("accesskey","1");
		access3.setAttribute("name","pxticket");
		access3.innerHTML = select1.innerHTML;
		select1.parentNode.replaceChild(access3,select1);
		
	}

	//*** Fourth step (log in)
	var username = document.getElementsByName('email')[0];
	if(username){
		//username.setAttribute("accesskey","1");
		var access4 = document.createElement('input');
		access4.setAttribute("type","text");
		access4.setAttribute("accesskey","1");
		access4.setAttribute("size","20");
		access4.setAttribute("name","email");
		access4.setAttribute("style","outline-color: rgb(255, 153, 0); outline-style: solid; outline-width: 1px; -moz-outline-radius-topleft: 5px; -moz-outline-radius-topright: 5px; -moz-outline-radius-bottomright: 5px; -moz-outline-radius-bottomleft: 5px;");
		username.parentNode.replaceChild(access4,username);
	}

	//****Fifth strp (Place Order) cardlist
	var select2 = document.getElementById('cardlist');
	if(select2){	
		var access5 = document.createElement('select');
		access5.setAttribute("accesskey","1");
		access5.setAttribute("id","cardlist");
		access5.setAttribute("name","cardlist");
		access5.setAttribute("style","width: 150px;");
		access5.innerHTML = select2.innerHTML;
		select2.parentNode.replaceChild(access5,select2);
	}
}
addLanguageInfo();
fixStyle();
fixImages();
fixLinks();
addAccesskey4Search();
addAccesskey4Form();
