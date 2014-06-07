// ==UserScript==
// @name        Dine About Town SF
// @namespace   porkflyryescripts
// @description Annotates Yelp Reviews on Dine About Town List
// @include     http://www.sanfrancisco.travel/dine/dine-about-town/
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1
// ==/UserScript==

// Remove the ad on the right side
GM_addStyle("#subContentContainer .rightColumn { display: none }");
GM_addStyle(".rating { overflow: hidden; width: 78px; height: 15px; margin: 0 3px 4px 0; }");
GM_addStyle(".star-img { display: block; width: 100%; height: 100%; background: url('http://s3-media3.ak.yelpcdn.com/assets/2/www/img/1109731a68b3/ico/stars/v2/stars_map.png'); }");
GM_addStyle(".offscreen { position: absolute; left: -9999px; top: auto; overflow: hidden; width: 1px; height: 1px; }");

GM_addStyle(".rating .stars_0 { background-position: -3px -3px; }");
GM_addStyle(".rating .stars_1 { background-position: -3px -21px; }");
GM_addStyle(".rating .stars_1_half { background-position: -3px -39px; }");
GM_addStyle(".rating .stars_2 { background-position: -3px -57px; }");
GM_addStyle(".rating .stars_2_half { background-position: -3px -75px; }");
GM_addStyle(".rating .stars_3 { background-position: -3px -93px; }");
GM_addStyle(".rating .stars_3_half { background-position: -3px -111px; }");
GM_addStyle(".rating .stars_4 { background-position: -3px -129px; }");
GM_addStyle(".rating .stars_4_half { background-position: -3px -147px; }");
GM_addStyle(".rating .stars_5 { background-position: -3px -165px; }");

GM_addStyle("#restaurants td a { color: #999; font-weight: normal; }");



Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

function onYelpRespond(response) {
  var doc = new DOMParser().parseFromString(response.responseText, "text/html");
  var business_results = doc.getElementById('businessresults').getElementsByClassName('businessresult');

  var first_result_link = business_results[0].getElementsByClassName('photo-box')[0].getElementsByTagName('a')[0].href;
  first_result_link = first_result_link.replace('www.sanfrancisco.travel', 'www.yelp.com');

  var first_result = business_results[0].getElementsByClassName('rightcol')[0];
  var star_rating_div = first_result.getElementsByClassName('rating')[0];
      
  var reviews_link = document.createElement('a');
  reviews_link.href = first_result_link;
  reviews_link.target = "blank";
  reviews_link.appendChild(first_result.getElementsByClassName('reviews')[0]);

  var new_col = document.createElement('td');
  new_col.appendChild(star_rating_div);
  new_col.appendChild(reviews_link);
  this.curr_row.appendChild(new_col);
}


// Grab the table for the restaurants
var restaurants_table = document.getElementById('restaurants');

var all_rows = restaurants_table.getElementsByTagName('tr');
for (var i = 0; i < all_rows.length; i++) {
  var curr_row = all_rows[i];

  if (i == 0) {
    var title = document.createTextNode('Yelp Reviews');
    var new_col = document.createElement('th');
    new_col.appendChild(title);
    curr_row.appendChild(new_col);
    continue;
  }

  // Fetch the Yelp reviews and add a column on the right
  var first_col_link = 
    curr_row.getElementsByTagName('td')[0].getElementsByTagName('a')[0];
  var restaurant_name = first_col_link.firstChild.data;
  var query_url = 'http://www.yelp.com/search?find_desc=' + restaurant_name + '&find_loc=San Francisco&ns=1';
  query_url = encodeURI(query_url);


  GM_xmlhttpRequest({
    method: "GET",
    url: query_url,
    onload: onYelpRespond.bind({ curr_row : curr_row })
  });
}
