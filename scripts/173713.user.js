// ==UserScript==
// @name           Cigarbid Freefall Watcher and Autobid
// @author         Melasoul
// @namespace      http://userscripts.org/scripts/show/173713
// @description    This will add a small floating window that will display the average lowest price that the bid has gone for, the lowest price seen so far, and how many bids have been watched. It will also allow a user to enter an amount they want to pay for the item and, when allowed, will automatically place the bid if that amount or lower comes up. Note: The script author is in no way responsible for any loss of bids or money because of the use of this script. Use at your own risk.
// @grant          none
// @include        http://*.cigarbid.*/Auction/Lot/*
// ==/UserScript==

// Initializes the dock and the price check function
function init() {
  if (isFreefall()) {
    create_dock();
    getLotID();
    setInterval(function() {refresh_price();}, 500);
  }
}

// Determines if this is a freefall auction, since the URL doesn't show that
function isFreefall() {
  code = document.documentElement.innerHTML;
  results = code.match(/isFreeFall = true/g);
  if (results) { return true; }
  return false;
}

// Get the lot_id of the auction
function getLotID() {
  lot_id_list = document.getElementsByClassName('cb_lot_id');
  lot_id = lot_id_list[lot_id_list.length - 1].innerHTML;
}

// These variables need to be shared by the dock and the price checker
// So they stay "global"
var obj_list = {};
var cb_name = 'checkbox_name';
var txt_name = 'bidbox_name';
var lot_id = "0";

// These variables need to persist outside of the price refresh
// So we'll make them "global" as well
var average = new Number(0);
var count = new Number(0);
var price = new Number(0);
var last_price = new Number(0);
var lowest_price = new Number(-1);
var isResetting = new Boolean(true);

// This watches the price, averaging the price and updating any tracked
// information. It also activates the bid if the auto-bid is checked.
function refresh_price() {
  // Keep track of the previous price for lowest price checking
  last_price = price;

  // Get the new price
  price = parseFloat(document.getElementsByClassName('cb_price_countdown cb_lot_price_'+lot_id)[0].innerHTML.replace("$",""));

  // If the auto-bid checkbox is checked, check the price and bid
  cbox = document.getElementsByName(cb_name)[0];
  // Is the box checked and is the current price a number?
  if(cbox.checked && !isNaN(price)) {
    if(price <= document.getElementsByName(txt_name)[0].value) {
      // Testing functions
      //document.getElementById('cb_search_button').click();
      //window.alert("BID!!!");

      // Click the bid button and uncheck the auto-bid checkbox
      document.getElementById('bidbutton').click(); 
      cbox.checked = false;
    }
  }

  // This is true if the price currently reads "resetting..."
  if(isNaN(price)) {
    // Do we know if the bid is currently resetting?
    if(!isResetting) {
      // Determine the cumulative rolling average
      count++;
      average = average + ((last_price - average) / count);

      obj_list["average"].innerHTML = '<p> Average Price: $' + average.toFixed(2) + '</p>';
      obj_list["count"].innerHTML = '<p>Over ' + count + ' bid(s)</p>';

      // Flag that we know we're resetting so we don't keep 
      // averaging over and over again.
      isResetting = true;

      // Detemine if this last price was the lowest price or not
      if(lowest_price < 0 || lowest_price > last_price) {
        lowest_price = last_price;
        obj_list["lowest"].innerHTML = '<p>Lowest Price: $' + lowest_price.toFixed(2) + '</p>';
      }
    }
  }
  // If the price is a number again, we are no longer resetting
  else {
    isResetting = false;
  }

  obj_list["current"].innerHTML = '<p>Current Price: ' + (isNaN(price)?'Resetting...':('$' + price.toFixed(2))) + '</p>';
}

// This unchecks the auto-bid checkbox
// It should be set as the "oninput" function of the text box
// containing the auto-bid amount. This keeps the script from
// bidding while the user is entering in the desired bid amount.
function safety_on() {
  cbox = document.getElementsByName(cb_name)[0];
  cbox.checked = false;
}

// This creates the floating dock
function create_dock() {
  // Create the base dock
  contobj = document.createElement('watcher_container');
  contobj.style.position = 'fixed';
  contobj.style.top = '10px';     // Space from the top of the screen
  contobj.style.right = '10px';   // Space from the right of the screen
  contobj.style.padding = '15px'; // Padding around the inside of the dock
  contobj.style.zIndex = '1000';  // We want this to stay on top
  contobj.style.backgroundColor = 'rgba(128,128,204,.8)';
  contobj.style.outlineStyle = 'ridge';
  contobj.style.outlineColor = '#FFFFFF';
  contobj.style.outlineWidth = '2px';

  // Create and initialize the individual dock elements
  currobj = document.createElement('current_price_container');
  currobj.innerHTML = '<p>Current Price: ' + (isNaN(price)?'Resetting...':('$' + price.toFixed(2))) + '</p>';

  avgobj = document.createElement('average_bid_container');
  avgobj.innerHTML = '<p> Average Price: Waiting...</p>';

  lowobj = document.createElement('lowest_bid_container');
  lowobj.innerHTML = '<p>Lowest Price: Waiting...</p>';

  cntobj = document.createElement('count_container');
  cntobj.innerHTML = '<p>Over no bid(s)</p>';

  // Add each of the objects to an array so that the price watcher
  // can update the information as needed
  obj_list["current"] = currobj;
  obj_list["average"] = avgobj;
  obj_list["lowest"] = lowobj;
  obj_list["count"] = cntobj;

  // Create the auto-bid elements
  textobj = document.createElement('te');
  textobj.innerHTML = '<p>Desired Bid:<input type=\'number\' value=\'0.00\' pattern=\'\\d+\\.\\d{2}\' name=\'' + txt_name + '\'></p>';
  textobj.oninput = function() {safety_on();}

  checkobj = document.createElement('ce');
  checkobj.innerHTML = '<p><input type=\'checkbox\' name=\'' + cb_name + '\'> Automate Bid</p>';

  // Add the elements to the dock
  contobj.appendChild(currobj);
  contobj.appendChild(avgobj);
  contobj.appendChild(lowobj);
  contobj.appendChild(cntobj);
  contobj.appendChild(textobj);
  contobj.appendChild(checkobj);

  // Add the dock to the page
  body = document.getElementsByTagName('body')[0];
  body.appendChild(contobj);
}

// Finally, initialize everything
init();