// ==UserScript== //
// @name           Intern Proof ATG CSC
// @namespace      arc
// @description    Removes links in the ATG CSC to create users and create orders
// @version        1.1
// @license        Apache License
// @include        http*://atg-csc-stage.redcross.org/*
// @include        http*://atg-csc-dev.redcross.org/*
// @include        http*://atg-csc.redcross.org/*

// ==/UserScript==

// total number of attempts
var removeAttemps = 50;

function removeEntries()
{
	removeAttemps = removeAttemps;
	
    // remove "+You" entry from the toolbar
    var toolbarEntries = document.getElementsByClassName("gbzt");
    if (toolbarEntries && toolbarEntries.length)
    {
        for (var i = 0; i < toolbarEntries.length; i++)
            if (toolbarEntries[i] && toolbarEntries[i].nodeName == "A" && toolbarEntries[i].getAttribute("href"))
                if (toolbarEntries[i].getAttribute("href").indexOf("plus.google.com") != -1)
                    toolbarEntries[i].parentNode.parentNode.removeChild(toolbarEntries[i].parentNode);
    }
    
    // remove "personal results" from the results page
    var personalResultsBars = document.getElementsByClassName("ab_center_col");
    if (personalResultsBars && personalResultsBars.length)
        for (var i = 0; i < personalResultsBars.length; i++)
            personalResultsBars[i].parentNode.removeChild(personalResultsBars[i]);
    
    // remove "Google+" link from the footer on some Google sites
    var footer = document.getElementById("fll");
    if (footer)
    {
        var links = footer.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++)
            if (links[i] && links[i].getAttribute("href"))
                if (links[i].getAttribute("href").indexOf("plus.google.com") != -1)
                    links[i].parentNode.removeChild(links[i]);
    }
    
    // remove blue bar with Google+ advertisement
    var joinBar = document.getElementById("gbprw");
    if (joinBar)
        joinBar.parentNode.removeChild(joinBar);
    
    // remove "Join Google+" entry from the account menu
    var joinEntry = document.getElementById("gbmplp");
    if (joinEntry)
        joinEntry.parentNode.parentNode.removeChild(joinEntry.parentNode);

/*BCC related links to be removed here*/

    // remove the NEW link on the top
    var orderLinkAnchor = document.getElementById("orderLinkAnchor");
    if (orderLinkAnchor)
        orderLinkAnchor.parentNode.removeChild(orderLinkAnchor);


    //Remove new order links
    var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++)
            if (links[i] && links[i].getAttribute("onclick"))
                if (links[i].getAttribute("onclick").indexOf("createOrder") != -1)
                    links[i].parentNode.removeChild(links[i]);

//Remove new order links
    var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++)
            if (links[i] && links[i].getAttribute("onclick"))
                if (links[i].getAttribute("onclick").indexOf("createNewCustomer") != -1)
                    links[i].parentNode.removeChild(links[i]);


//Remove new order links
    var links = document.getElementsByTagName("td");
	for (var i = 0; i < links.length; i++)
            if (links[i] && links[i].getAttribute("onclick"))
                if (links[i].getAttribute("onclick").indexOf("createNewCustomer") != -1)
                    links[i].parentNode.removeChild(links[i]);


//Remove links under commerce tab
    var commerceMenu = document.getElementById("commerceMenu");
    if (commerceMenu)
        commerceMenu.parentNode.removeChild(commerceMenu);

	
	if (removeAttemps > 0)
		setTimeout(function(){removeEntries()}, 100);
}

// start attempts (repeat every 100 milliseconds)
setTimeout(function(){removeEntries()}, 100);