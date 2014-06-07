// ==UserScript==
// @name           Accessibility fixes Commonsense Organics NZ 
// @namespace      britta.nz
// @description    Some accessibility fixes for the Commonsense Organics NZ website, work well with NVDA 2012.1 screen reader, found at www.nvda-project.org.
// @include        http://www.commonsenseorganics.co.nz/*
// ==/UserScript==

//Firefox includes text and empty nodes, so need to ensure search via first or last element executes properly.
function get_firstchild(elm) {
	var elmFirstChild = elm.firstChild;
	
	while (elmFirstChild.nodeType!=Node.ELEMENT_NODE) {
		elmFirstChild = elmFirstChild.nextSibling;
	}
	return elmFirstChild;
}
 
function get_lastchild(elm) {
	var elmLastChild = elm.lastChild;
	
	while (elmLastChild.nodeType!=Node.ELEMENT_NODE) {
		elmLastChild = elmLastChild.previousSibling;
	}
	return elmLastChild;
}

function onFocus(evt) {
	var target = evt.target;
	if (target.nodeType != Node.ELEMENT_NODE)
		return;
	var tag = target.tagName;
	var classes = target.getAttribute("class");
	if (!classes)
		return;
	var type = target.getAttribute("type");
	var id = target.getAttribute("id");
	var name = target.getAttribute("name");
		
	if (tag == "INPUT" && classes == "add_button") {	
		var label = classes.split("_");
		target.setAttribute("role", "button");
		target.setAttribute("aria-label", label[0]);					
	} 	else if (tag == "INPUT" && classes =="text" && type == "text" && name == "add_item") {
			if (target.getAttribute("aria-label"))
				return;
			var labelQty = "Product quantity";
			target.setAttribute("aria-label", labelQty);			
	} 	else if (tag == "A" && classes == "view_cart hide_menu") {			
			target.setAttribute("aria-expanded", true);			
	}	else if (tag == "A" && classes == "view_cart ") 	{	
			target.setAttribute("aria-expanded", false);			
	} 	else if (tag == "A" && classes == "view_cart hide_menu") {			
			target.setAttribute("aria-expanded", true);			
	}	else if (tag == "A" && classes == "view_cart ") {			
			target.setAttribute("aria-expanded", false);			
	} 	else if (tag == "A" && classes == "cart_up") {
			var increaseProductLabel = "Increase product quantity in shopping cart" ;
			target.setAttribute("role", "button");
			target.setAttribute("aria-label", increaseProductLabel);
	}	else if (tag == "A" && classes == "cart_down") {
			var decreaseProductLabel = "Decrease product quantity in shopping cart" ;
			target.setAttribute("role", "button");
			target.setAttribute("aria-label", decreaseProductLabel);
	} 	else if (tag == "A" && classes == "remove") {
			var removeProductLabel = "Remove product from shopping cart" ;
			target.setAttribute("role", "button");
			target.setAttribute("aria-label", removeProductLabel);
	}	else if (tag == "SPAN" && classes == "product_sub"){
			target.firstChild.tabIndex = -1;
	}	else if (tag == "IMG" && classes == "product") {
			target.parentNode.tabIndex = -1;
			target.parentNode.setAttribute("role", "presentation");
	}	else if (tag == "LI" && classes == "buy" || classes == "buy last" ){
			target.setAttribute("role", "presentation");
			target.parentNode.setAttribute("role", "presentation");
	}  	else if (tag == "SELECT" && name == "cart_obj_guid") {
			//this code should be in Onload, when online shop page loads ?
			// When product quantity added, does page reload ?
			target.setAttribute("tabindex", 0);
			target.setAttribute("role", "list");
			target.setAttribute("aria-autocomplete", "list");
			target.setAttribute("aria-controls", "shopList");
			target.setAttribute("aria-readonly", "true");
	}	
}

function labelOnlineShopAddButtons() {
var url = document.location.href;
	if (url.indexOf("/online-shop") != -1) {
		var elmsDiv = document.getElementsByTagName("a");

		for (var i = 0; i < elmsDiv.length; ++i) {
			var elmDiv = elmsDiv[i];
			var classDiv = elmDiv.getAttribute("class");
			var parentDiv = elmDiv.parentNode;
			var childDiv = elmDiv.firstChild;
			if (elmDiv == "INPUT" && classDiv == "add_button") {
				var label = classDiv.split("_");
				elmDiv.setAttribute("role", "button");
				elmDiv.setAttribute("aria-label", label[0]);					
			} 
		}
	}
}

function getRidOfDuplicateLinks() {
var url = document.location.href;
	if (url.indexOf("/online-shop") != -1) {
	var elmsSpan = document.getElementsByTagName("span");

		for (var i = 0; i < elmsSpan.length; ++i) {
			var elmSpan = elmsSpan[i];
			var classSpan = elmSpan.getAttribute("class");
			var parentSpan = elmSpan.parentNode
	
			if (classSpan == "product_sub") {
			//find duplicate links if they exist
				if (elmSpan.firstChild) {
					var duplicateLink = elmSpan.firstChild; 
					parentSpan.removeChild(elmSpan);
				} 
			}		
		}
	}
 }

 function getRidOfOnlineShopImages() {
	var elmsAnchor = document.getElementsByTagName("a");
	var elmsImg = document.getElementsByTagName("img");
// Remove Image element Nodes
	for (var j=0; j < 6 ; ++j) {
		for (var i = 0; i < elmsImg.length; ++i) {
			var elmImg = elmsImg[i];
			var classImg = elmImg.getAttribute("class");
			var parentImg = elmImg.parentNode
			if (classImg = "special") {
				parentImg.removeChild(elmImg) ;
			} else if (classImg = "product") {
				parentImg.removeChild(elmImg) ;
				parentImg.parentNode.removeChild(elmImg) ;				
			} else if (classImg = "first") {
				parentImg.removeChild(elmImg) ;
			} 
		}
	}		
 }
 
 function focusCheckoutTable() {
  // Put user onto first product item in checkout web page table.
var url = document.location.href;
	if (url.indexOf("/review-order") != -1) {
 var elmsDiv = document.getElementsByTagName("div");

	for (var i = 0; i < elmsDiv.length; ++i) {
		var elmDiv = elmsDiv[i];
		var classDiv = elmDiv.getAttribute("class");
		var parentDiv = elmDiv.parentNode;
		var childDiv = elmDiv.firstChild;

//Works but labelling below does not work using id
		if (classDiv == "header_wrap") {
		// Get the table heading of the checkout cart.
		// Use table heading as a label 
			if (elmDivFirstChild = get_firstchild(elmDiv)){
				var checkoutLabel = elmDivFirstChild.innerHTML;
				var id = checkoutLabel + " before checking out the contents of your shopping cart. ";			
				elmDiv.setAttribute("id" , id);
				//return id ;
			}				
		}
		
		//TO DO
		// Make code less susceptible to breaking when future web page changes applied
		if (classDiv == "cart_review") {
			var elmsCheckoutTableElement = document.getElementsByTagName("td");
			for (var i = 0; i < elmsCheckoutTableElement.length; ++i) {
				var elmCheckoutTableElement = elmsCheckoutTableElement[i];
				if (elmCheckoutTableElementFirstChild = get_firstchild(elmCheckoutTableElement)){
					if (elmCheckoutTableElementFirstChild.innerHTML) {
						//Place Focus on the first Product in the checkout shopping cart
						//if (id) {
						//	elmCheckoutTableElementFirstChild.focus();
						//	return;
						//} else {
							elmCheckoutTableElementFirstChild.focus();
							return;
						//}
					}
				}
			}			
		}
	}
	}
 }
 
function labelHoverImages(node) {
	var classes = node.getAttribute("class");
	if (!classes)
		return;
	for (var i = 0; i < classes.length; ++i) {
		var label;
		if (classes == "cart_up") {
			var increaseProductLabel = "Increase product quantity in shopping cart" ;
			node.setAttribute("role", "button");
			node.setAttribute("aria-label", increaseProductLabel);
			}	else if (classes == "cart_down") {
			var decreaseProductLabel = "Decrease product quantity in shopping cart" ;
			node.setAttribute("role", "button");
			node.setAttribute("aria-label", decreaseProductLabel);
			} 	else if (classes == "remove") {
			var removeProductLabel = "Remove product from shopping cart" ;
			node.setAttribute("role", "button");
			node.setAttribute("aria-label", removeProductLabel);
			}
		}
	}
	
 function onNodeInserted(evt) {
	var target = evt.target;
	if (target.nodeType != Node.ELEMENT_NODE)
		return;
	if (target.tagName != "A")
		return;
	var elmsAnchor = document.getElementsByTagName("a");
// Shopping cart requires mouse hover, to show the increase and decrease product quantity buttons. 
// The CSS is changed to always display the hover images, and they are relabelled for usability.			
	for (var i = 0; i < elmsAnchor.length; ++i) {
		var elmAnchor = elmsAnchor[i];
		var classAnchor = elmAnchor.getAttribute("class");
	
		if (classAnchor = "cart_up") {
			elmAnchor.setAttribute('style', 'display:block');			
		} 	else if (classAnchor = "cart_down") {
			elmAnchor.setAttribute('style', 'display:block');			
		} 	else if (classAnchor = "remove") {
			elmAnchor.setAttribute('style', 'display:block');			
		}	else if (classAnchor == "view_cart hide_menu") {			
			elmAnchor.setAttribute("aria-expanded", true);			
		}	else if (classAnchor == "view_cart ") {
			elmAnchor.setAttribute("aria-expanded", false);			
		}
		//When a Node is inserted, all the popup hover images lose their labels
		// due to a dynamic update, which requires relabelling of Images
		labelHoverImages(elmAnchor);
	}
 }

function onNodeRemoved(evt) {
	var target = evt.target;
	if (target.nodeType != Node.ELEMENT_NODE)
		return;
	if (target.tagName != "A")
		return;
	var elmsAnchor = document.getElementsByTagName("A");
// Shopping cart requires mouse hover, to show the increase and decrease product quantity buttons. 
// The CSS is changed to always display the hover images, and they are relabelled for usability.	
	for (var i = 0; i < elmsAnchor.length; ++i) {
		var elmAnchor = elmsAnchor[i];
		var classAnchor = elmAnchor.getAttribute("class");
	
		if (classAnchor = "cart_up") {
			elmAnchor.setAttribute('style', 'display:block');			
		} 	else if (classAnchor = "cart_down") {
			elmAnchor.setAttribute('style', 'display:block');			
		} 	else if (classAnchor = "remove") {
			elmAnchor.setAttribute('style', 'display:block');		
		}	else if (classAnchor == "view_cart hide_menu") {			
			elmAnchor.setAttribute("aria-expanded", true);			
		}	else if (classAnchor == "view_cart ") {			
			elmAnchor.setAttribute("aria-expanded", false);		
		}	
	//When a Node is removed, all the popup hover images lose their labels
	// due to a dynamic update, which requires relabelling of Images
		labelHoverImages(elmAnchor);
	}	
 }

function onAttrModified(evt) {
	var attrName = evt.attrName;
	if (attrName != "class")
		return;
	var target = evt.target;
	var classes = target.getAttribute("class");
	
	if (!classes)
		return;	

// When shopping cart expands and contracts, screen reader feedback is set up.		
	if (classes == "view_cart hide_menu") {			
		target.setAttribute("aria-expanded", true);
		target.focus ();
	}	else if (classes == "view_cart") {		
		target.setAttribute("aria-expanded", false);
		target.focus ();
	}	else if (classes = "cart_menu") {
			if (target.getAttribute('style', 'display:block')) 
				target.setAttribute("aria-expanded", true);
			else if (target.getAttribute('style', 'display:none')) 
				target.setAttribute("aria-expanded", false);			
	}
}

function onLoad(evt) {

labelOnlineShopAddButtons();
getRidOfDuplicateLinks(); 
getRidOfOnlineShopImages();
focusCheckoutTable();
onFocus(evt);

 }

window.addEventListener("load", onLoad);
document.addEventListener("DOMAttrModified", onAttrModified, false);
document.addEventListener("DOMNodeInserted", onNodeInserted, false);
document.addEventListener("DOMNodeRemoved", onNodeRemoved, false);
document.addEventListener("focus", onFocus, true);

//TO DOs
// Need to speak shopping cart updates as Products are added or removed.
// Combo box keyboard navigation. Pressing Alt+down arrow, then down arrow sometimes jumps onto next form field instead of navigating the combo box list. navigation of combo boxes should be fixed using aria-activedescendant. Currently using hard coded ids.
// When removing a product completely from the shopping cart, need to set Focus to the next item in shopping cart if it exists.
// Stop screen reader speaking the presentation information, section, form, when entering the product quantity edit box in the online shop. Setting the divs to have role = presentation didn't work ??.
// Improve shopping cart aria-expanded feedback to user via screen reader. This aria-expanded does not work with JAWS, but does work with NVDA, why ?
// More intuitive navigation of increase/decrease product quantity form control in shopping cart and checkout cart.
// Pressing down or up arrow in online shop products list does not fire focus event code.
