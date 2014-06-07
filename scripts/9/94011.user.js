// ==UserScript==
// @name           Flipkart to ISBN
// @namespace      http://nmanne.blogspot.com/
// @description    Flipkart to ISBN.Net.In Link 
// @include        http://*.flipkart.com/*
// ==/UserScript==
// alert(Chanchal)
var book_tab = document.getElementById("fk-header-tab-book");
var prod_img =  document.getElementById("mprodimg-id");


if (book_tab.className == "fk-header-tab current" && prod_img){
//http://www.flipkart.com/tablet-memory-historian-s-assistant-book-1147499845

 
	
  //Display a link
  var targetURL = "http://isbn.net.in/";
  var strbookurl = document.location.href;
   

  var queryString = getISBN(strbookurl);

  targetURL = targetURL + queryString;
  var insertHTML = "<tr><td><a href='" + targetURL + "' target = '_blank' > <br/>Compare<br/></a></td><tr>";
  var oldhtml = prod_img.parentNode.innerHTML;

  prod_img.parentNode.innerHTML = insertHTML + oldhtml;
}

function getISBN(pBookURL) {
 // var data_arr = pBookURL.split("-");
  //isbn_number = data_arr[data_arr.length-1];
  //return isbn_number;
  var div_parent = document.getElementById("details");
  
  var div_children = div_parent.childNodes[1].childNodes;
  
  var arr_index =0;
  var found = 0;
  var string_html;
  var isbn_number = 0;
  for(index=0; index<div_parent.childNodes.length; index++)
  {
	if(div_parent.childNodes[index].className == "item_details")
	{
		div_children = div_parent.childNodes[index];
		break;
	}
}
var childlength=0;
  for(; arr_index<div_children.childNodes.length; arr_index++)
  {
 //   GM_log(div_children.childNodes[arr_index].innerHTML);
	if(div_children.childNodes[arr_index].innerHTML)
	{
		if(div_children.childNodes[arr_index].innerHTML == "ISBN: ")
		{
			if(div_children.childNodes[arr_index+1].className == "product_details_values")
			  data_span = div_children.childNodes[arr_index+1];
			if(div_children.childNodes[arr_index+2].className == "product_details_values")
				data_span = div_children.childNodes[arr_index+2];
			//GM_log(data_span.childNodes[0].childNodes[0].innerHTML)	
			isbn_number = data_span.childNodes[0].childNodes[0].innerHTML;
			break;
		}
	}
  }
  return isbn_number;
  //return pBookURL.substring(isbnStartIndex,isbnEndIndex);
}