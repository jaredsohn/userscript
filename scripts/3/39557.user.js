// ==UserScript==
// @name           Stone Free
// @description    A greasemonkey script to help you discover free alternatives to consumer goods.
// @include        http://www.amazon.com/*
// ==/UserScript==

craigslist_url = "http://chicago.craigslist.org";

search_keyword = "";
product_name_element = document.getElementById('btAsinTitle');
product_name = product_name_element.innerHTML.toLowerCase();
category_links = document.getElementById('SalesRank').getElementsByTagName('td')[document.getElementById('SalesRank').getElementsByTagName('td').length - 1].getElementsByTagName('a');
category_name = singularize(category_links[category_links.length - 1].innerHTML.toLowerCase());
parent_category_name = singularize(category_links[category_links.length - 2].innerHTML.toLowerCase());

// craigslist's search isn't very forgiving, so we'll try to figure out the best keyword to use
if (product_name.match(parent_category_name)) {
  search_keyword = parent_category_name;
} else if (product_name.match(category_name)) {
  search_keyword = category_name;
} else {
  
  category_words = category_name.split(" ");
  
  for (i in category_words) {
    if (product_name.match(category_words[i])) {
      search_keyword = category_words[i];
    }
  }
  
  if (search_keyword == ""){
    search_keyword = category_name;
  }
  
}

request_url = craigslist_url + '/search/zip?query=' + search_keyword + '&minAsk=min&maxAsk=max';

GM_xmlhttpRequest({
    method: 'GET',
    url: request_url + '&format=rss',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
    },
    
    onload: function(responseDetails) {
      
      parser = new DOMParser();
      dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      results = dom.getElementsByTagName('item');
      total_results = results.length;
      
      if (total_results > 0) {
        
        render_text = "<h2 style='color: red; font-size: 0.9em'>Get This For Free Instead</h2>";
        render_text += "<p style='font-size: 0.65em; margin: 0 0 5px 0;'>We found some FREE items on Craigslist that appear similar to this item. Maybe you can pick something up for free instead.</p>";
        
        for (var i = 0; i < results.length && i < 3; i++) {        
            title = results[i].getElementsByTagName('title')[0].textContent;
            url = results[i].getElementsByTagName('link')[0].textContent;
            render_text += "<p style='font-size: 0.7em; margin: 4px;'><a href='" + url + "'>" + title + "</a></p>";
        }

        if (total_results > 3) {
          render_text += "<p style='text-align: right; font-size: 0.5em;'><a href='" + request_url + "'>&raquo; See all " + total_results + " results on Craigslist</a></p>";
        }

        newElement = document.createElement('div');
        newElement.innerHTML = render_text;
        newElement.style.border = "2px solid yellow";
        newElement.style.padding = "10px";
        newElement.style.margin = "10px";
        
        product_name_element.parentNode.insertBefore(newElement, product_name_element.nextSibling);
        
      }
      
    }
});


// janky singularization
function singularize(string) {
  if (string.substr(string.length - 3, 3) == "ies") {
    return string.substr(0, string.length - 3);
  } else if (string.substr(string.length - 1, 1) == "s") {
    return string.substr(0, string.length - 1);
  } else {
    return string;
  }
}