// ==UserScript==
// @name           Tesco Money Saver
// @namespace      TescoMoneySaver
// @description      Browse groceries by price, enabling you to choose value-for-money over the best-known brand.
// @include        http://www.tesco.com/superstore/product/shelf.aspx?*
// ==/UserScript==

//////main code/////

//if product list exists, continue
if (productsNode = document.getElementById("products")) {

	//create input (i.e. original products in original order) items list
	var inputList = new Array();
	//create output list
	var outputList;

	//populate input list
	for (i = 0; i < countProducts(); i++) {
		inputList[i] = getProduct(i);
	}
	
	//if sort by price is turned on, continue
	if (document.cookie.match("sortByPrice=true")) {
		// add ticked checkbox to page
		addCheckbox(productsNode, true);
		sortByPrice();
		printSorted();
	}

	//if sorting by price is disabled
	else {
		//... add unticked checkbox to page
		addCheckbox(productsNode, false);
	}
}


//////functions//////


/////// object product constructor////
function product(id, rank) {
	this.id = id; //- tesco's id for item
	this.price = eval(document.getElementById("" + id + "-p").innerHTML); //- price in pounds
	this.html = getHTMLbyID(id); // - original html code for this item to make the item appear on the page
	this.next = null; //- next node in linked list
	this.previous = null; //- previous node in linked list
	this.rank = rank; //- original ranking on page (alphabetically) so can be reverted later if desired
}

////// object linkedList constructor ///////
function linkedList(){
	this.firstNode = null;
	this.lastNode = null;
}

// count number of products on page
function countProducts() {
	var count = 0;
	productList = document.getElementById("products");
	return productList.childNodes.length;
}

// return a product by place in original list
function getProduct(index) {
	productList = document.getElementById("products");
	if (productList){
		productId = productList.childNodes.item(index).firstChild.id;
		return new product(productId, index);
	}
	else {alert("error: Product list not found. Please report how this happened so this problem can be eliminated.");}
}

// get html of item by id
function getHTMLbyID(myID){
	myElement = document.getElementById(myID);
	if (myElement) {
		return myElement.innerHTML;
	}
}

// set html of item by id
function setHTMLbyID(myHTML, myID){
	myElement = document.getElementById(myID);
	if (myElement) {
		myElement.innerHTML = myHTML;
	}	
}

// insert a new node after an existing node
 function insertAfter( list, node, newNode) {
     newNode.previous = node;
     newNode.next = node.next;
     if (node.next == null) {
         node.next = newNode;
         list.lastNode = newNode;
	}
     else {
         node.next.previous = newNode;
		node.next = newNode;
	 }
}

// insert a new node before an existing node
function insertBefore(list, node, newNode) {
     newNode.previous = node.previous;
     newNode.next = node;
     if (node.previous == null) {
         node.previous = newNode;
         list.firstNode = newNode;
	}
     else {
         node.previous.next = newNode;
		 node.previous = newNode;
	}
}

// insert a node at the beginning of the list
function insertBeginning(list, newNode) {
     if (list.firstNode == null) {
         list.firstNode = newNode;
         list.lastNode = newNode;
         newNode.prev = null;
         newNode.next = null;
	}
     else {
         insertBefore(list, list.firstNode, newNode)
	}
}

// insert a node at the end of the list
function insertEnd(list, newNode) {
     if (list.lastNode == null) {
         insertBeginning(list, newNode);
	}
     else {
         insertAfter(list, list.lastNode, newNode);
	}
}

// switch price sorting from current setting (i.e. on -> off or off -> on)
function switchPriceSort() {
	//if sorting is enabled...
	if (document.cookie.match("sortByPrice=true")) {
		//...turn it off
		document.cookie="sortByPrice=false; path=/";
		//and revert sorting to original order
		revertSorting();
	}
	// sorting disabled...
	else {
		//.... turn it on!
		document.cookie="sortByPrice=true; path=/";
		// and then carry out sorting
		if (outputList == null) {
			sortByPrice();
		}
		printSorted();
	}
}

//set an attribute for a node
function setMyAttribute(node, attName, attValue) {
	att = document.createAttribute(attName);
	att.value = attValue;
	node.setAttributeNode(att);
}

//check url's terms for a match to provided string
function urlContains(str){
	 return location.search.match(str);
}

//creates a checkbox which can enable or disable sorting by price
function addCheckbox(node, checked) {
	// create div node
	divNode = document.createElement('DIV');
	// create div's children, input and label
	inputNode = document.createElement('INPUT');
	labelNode = document.createElement('LABEL');
	
	//set labelNode attribute for => sortByPriceBox
	setMyAttribute (labelNode, "for", "sortByPriceBox");
	//set inputNode's attibutes - type => checkbox, checked => checked, onclick => switchPriceSort(this), name => sortByPriceBox
	setMyAttribute(inputNode, "type", "checkbox");
	if (checked) {
		setMyAttribute(inputNode, "checked", "checked");
	}
	inputNode.addEventListener("click", switchPriceSort, true);
	setMyAttribute(inputNode, "name", "sortByPriceBox");
	//append label text to labelNode
	textNode = document.createTextNode("Show products cheapest first");
	labelNode.appendChild(textNode);
	
	//add style attributes to checkbox to match current  "show images" checkbox as of 17/2/08
	setMyAttribute(divNode, "style", "font-size:0.7em; margin: 0em 1.4em 0 1.3em; width:50%; font-weight:bold");
	setMyAttribute(inputNode, "style", "border: 0px solid white; margin: 0 0.5em 0 0; padding:0");
	setMyAttribute(labelNode, "style", "padding-left:0.2em; color:#333333");
	
	// append input and label to div
	divNode.appendChild(inputNode);
	divNode.appendChild(labelNode);
	//insert into DOM	
	node.parentNode.insertBefore(divNode, node);
}

// traverse an output list to find item specified by rank
function getProductByRank(outlist, rank) {
	examinedItem = outlist.firstNode;
	if (examinedItem.rank == rank) {
		return examinedItem;
	}
	while (examinedItem.next) {
		if (examinedItem.next.rank == rank) {
			return examinedItem.next;
		}
		examinedItem = examinedItem.next
	}
}

// revert sorted page to unsorted page
function revertSorting () {

	for (i = 0; i < inputList.length; i++) {		
		setHTMLbyID(inputList[i].html, getProductByRank(outputList, i).id);
	}
}

// traverse sorted output list and print in order
function printSorted() {
	//for each product on page
	examinedItem = outputList.firstNode;
	setHTMLbyID(getHTMLbyID(examinedItem.id), inputList[0].id);

	for (i = 1; i < countProducts(); i++) {	
		//replace with outputList item
		setHTMLbyID(examinedItem.next.html, inputList[i].id);
		if (examinedItem.next) {examinedItem = examinedItem.next;}
	}
}
	
// set global variable outputList to a linked list of products ordered in ascending order (cheapest first)
function sortByPrice() {
	
	// create list for outputting
	outputList = new linkedList();
	//add first item to output list
	insertBeginning(outputList, inputList[0]);
	//if second item is cheaper, add to beginning...
	if (inputList[1].price < inputList[0].price) insertBeginning(outputList, inputList[1]);
	//...or else add to the end
	else insertEnd(outputList, inputList[1]);

	/////add products to output list///////
	//get a new product to enter to the output list
	for  (i = 2; i < inputList.length; i++) {
		newProduct = inputList[i];
		//create an iteration pointer to traverse the list
		examinedProduct = outputList.firstNode;
		// look through output list until a place is found for the new product
		flagItemNotPlacedYet = true;
		while (flagItemNotPlacedYet) {
			//if new product is cheaper than examined product...
			if (newProduct.price < examinedProduct.price) {
				//... then add new product before examined product in the list
				insertBefore(outputList, examinedProduct, newProduct);
				//mark it as placed
				flagItemNotPlacedYet = false;
			}
			else if (examinedProduct.next == null) {		
				//...add new product to end of list
				insertEnd(outputList, newProduct);
				//and mark item as placed
				flagItemNotPlacedYet = false;
			}
			//if more products left to examine...
			if (examinedProduct.next != null) {
				// examine next product
				examinedProduct = examinedProduct.next;
			}
		}
	}
}

