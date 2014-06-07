// ==UserScript==
// @name           Amazon Book Time Cost
// @namespace      fatknowledge.blogspot.com
// @description    v1.0 Calculate the amount of time it will take to read a book based on the word count.
// @include        http://*.amazon.*
// ==/UserScript==

(function(){
//	GM_log('Amazon Book Time Cost');	
 
	//change this to the number of words per minute that you read
	//can find your speed at http://mindbluff.com/askread2.htmhttp://mindbluff.com/askread2.htm
	var words_per_minute = 200;

	var text_stats_url = get_text_stats_url(document.body.innerHTML);
	if (text_stats_url==0) { return;}
	else { 
		//GM_log(text_stats_url);
		get_and_display_time_cost(text_stats_url);

	}

//look for a link called: Text Results
//example: "<a href=\"http://www.amazon.com/Long-Tail-Future-Business-Selling/dp/sitb-next/1401302378/ref=sbx_txt#textstats\">Text&nbsp;Stats</a>
function get_text_stats_url(page){
	try { 
		var patt1 = /href(.*?)Text&nbsp;Stats</g;
		var str2 = page.match(patt1)[0];
		
		var patt2 = /http(.*)>/g;
		var str3 = str2.match(patt2)[0];

		var the_url = str3.substring(0,str3.length-2);
	//	GM_log(the_url);
	} catch (e) { return 0; }

	return the_url;
}

function get_and_display_time_cost(text_stats_url){
//	GM_log('get_words');	

	GM_xmlhttpRequest({
		method:'GET',
		url: text_stats_url,
		onload:function(results) {
			page = results.responseText;
//			GM_log(page);

			var word_count = get_word_count(page);

			if (word_count!=0){
				display_time_cost(word_count);
			}
		}
	});
}

//Find this section and return the word count value
//  <td class="textStat" width="150">Words:&nbsp;</td>
//  <td class="textStatValue" width="50">68,070</td>
function get_word_count(page){
		//  >Words:&nbsp;</td>
		//  <td class="textStatValue" width="50">68,070</td>
			try { 
				var patt1 = />Words:&nbsp;(.*)\n(.*)textStatValue(.*)td>/mg;
				var str2 = page.match(patt1)[0];
				//GM_log('str2='+str2);

				//50">68,070<
				var patt2 = /50(.*)</mg;
				var str3 = str2.match(patt2)[0];
				//GM_log('str3='+str3);

				//68,070
				var word_count = str3.substring(4,str3.length-1);
				//GM_log('word_count='+word_count);
				return word_count;
			} catch (e) { return 0; }
}

//display the time cost right above the List Price information
function display_time_cost(word_count){
	word_count_no_comma = word_count.replace(/,/g,"");
	var words_per_hour = words_per_minute * 60;
	var hours = word_count_no_comma/words_per_hour;

	var a_table = getElementsByAttribute(document.body, "table", "class", "product")[0];
//	GM_log(a_table);	

	var a_tr  = a_table.getElementsByTagName("tr")[0];
//	GM_log('a_tr='+a_table);	

	var row = document.createElement("tr");
	var new_cell = document.createElement("td");
	new_cell.innerHTML = '<b>Time Cost:</b>';
	row.appendChild(new_cell);

	var new_cell2 = document.createElement("td");
	new_cell2.innerHTML = hours.toFixed(1)+ " hours ("+word_count+" words at "+words_per_minute+" WPM)";
	row.appendChild(new_cell2);
    a_tr.parentNode.insertBefore(row, a_tr);
}


/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
*/
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\s)" + strAttributeValue + "(\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}

})();