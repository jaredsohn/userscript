// ==UserScript==
// @name            Google Rankage BETA
// @author          mitzevo <http://mitzevo.dcmembers.com/>
// @description     Google Rankage, a GM script for adding numbers next to google search results, making it easy to see their positions (saves counting ;)).
// @include         http://google.*/*
// @include         http://www.google.*/*
// ==/UserScript==


// todo: filter out news and shopping results on first page.. making the first page appear to have 11 or 12 results..
// todo: improve chinese listings beyond the 100.. probably improve/optimize/compact the code at a later stage or sum thin..
// todo: on google.cn some pages are not showing the numbers, have to debug that.
// todo: when logged into google account, results don't show numbers.. debug.

// feature: english or chinese numbering :) 1 2 3 yi er san etc.
// feature: correctly number the results, skipping shopping results and news (


(function() {
	var lang; //Display numbers in English or Chinese ('en' or 'zh')?:
	 lang = 'zh';
	 
	var langhash = new Array(); //unicodes for english and chinese numbers
	 langhash['en'] = new Array(); langhash['zh'] = new Array(); 
	 langhash['en'][0] = "\u0030"; langhash['zh'][0] = "\uLING";
	 langhash['en'][1] = "\u0031"; langhash['zh'][1] = "\u4e00";
	 langhash['en'][2] = "\u0032"; langhash['zh'][2] = "\u4e8c";
	 langhash['en'][3] = "\u0033"; langhash['zh'][3] = "\u4e09";
	 langhash['en'][4] = "\u0034"; langhash['zh'][4] = "\u56db";
	 langhash['en'][5] = "\u0035"; langhash['zh'][5] = "\u4e94";
	 langhash['en'][6] = "\u0036"; langhash['zh'][6] = "\u516d";
	 langhash['en'][7] = "\u0037"; langhash['zh'][7] = "\u4e03";
	 langhash['en'][8] = "\u0038"; langhash['zh'][8] = "\u516b";
	 langhash['en'][9] = "\u0039"; langhash['zh'][9] = "\u4e5d";
	 langhash['en'][10] = "\u0039"; langhash['zh'][10] = "\u5341";
	 //langhash['en'][11] = "\u0031\u0030"; langhash['zh'][11] = "\u5341\u4e00"; //.. we will generate the sequence later instead of hardcoding.
	
	var start = window.location.href.match("start=([0-9]+)"); //get the start param value from the loaded/loading/gs'd page..
	 start = (start == null)? 0 : start[1]; //alert("start = "+start); // ^if it doesn't exist, it's a fresh page/first page listing.
	var page = start/10 + 1; //page = (pos == 0)? 1 : (pos/10 + 1); alert("page = "+page);
	var pos = start; //pos = start;

	//find out which <ol> contains the organic results by matching the footprint.. (easily found when comparing the html source of a few G queries)
	var ol = document.getElementsByTagName("ol")[0]; // let's try the first one..
	 ol = (ol.innerHTML.substr(0,8) == '<!--m-->') ? ol : document.getElementsByTagName("ol")[1]; //does the first match the footprint? if not, it's the second one we're after
	 ol = (ol.innerHTML.substr(0,8) == '<!--m-->') ? ol : document.getElementsByTagName("ol")[2]; //does the second match the footprint? if not, it's the thirc one we're after
	 ol = (ol.innerHTML.substr(0,8) == '<!--m-->') ? ol : document.getElementsByTagName("ol")[3]; //does the third match the footprint? if not, it's the fourth one we're after
	var lis = ol.getElementsByTagName('li');
	
	 
	for(var i = 0, li; li = lis[i]; i++){
	
			var div, tables;
			 div = li.getElementsByTagName('div')[0];//alert(tables.innerHTML);
			 tables = li.getElementsByTagName('table')[0];//alert(tables.innerHTML);
			
			 if(!tables){ check = "notts "; }else{ check = tables.className; }
			 //alert(check + "    " + li.className);
			 
// ok so there is a few ways you can check to see if it is an organic search result, most LIs have the h3 and div class="s", or if it is a news, book, scholar, etc. type result, it would be a table
// instead of the div, and would be table class="ts"> .. but book results is a little diff.. have to do this later.			 
			 
		if((li.className=='g' || li.className=='g w0') && check != "ts"){
			//UPDATE:19/MAR/2010 - Actually G uses class of 'g' when not signed in, 'g w0' when signed in, update code to work for either.	
			//UPDATE:17/MAR/2010 - Remebered about this script, was'nt working any more, so checked things out and
			//                     seems the class has been changed back to 'g' from 'g w0'.
			//UPDATE:16/MAR/2009 - The class name was changed from 'g' to 'g w0'.
			//alert(div.className);
			//if(tables.className != "ts") {
				var ones, tens, position;//alert(i+""+div+""+div.innerHTML);
				pos++;
				if(pos < 10){
					position = langhash[lang][pos];
				}else if(pos < 100){
					position = String(pos);
					tens = langhash[lang][position.substr(0,1)]; ones = langhash[lang][position.substr(1,1)];
					if(lang == 'en'){
						position = tens+ones
					}else{
						if(pos > 9 && pos < 20)
						 position = (pos != 10)? langhash['zh'][10]+ones : langhash['zh'][10];
						else if(pos > 19 && pos < 100)
						 position = (pos != 20 && pos != 30 && pos != 40 && pos != 50 && pos != 60 && pos != 70 && pos != 80 && pos != 90)? tens+langhash['zh'][10]+ones : tens+langhash['zh'][10];
						else
						 position = tens+langhash['zh'][10]+ones;
					}
				}
				li.innerHTML = '<span style="color: black; background-color: yellow; font-family: simhei; font-size: 11px; font-weight: bold; border: none; padding: 1px 3px 2px 3px;"><a title=\''+position+'\'>'+position+'</a></span> '+li.innerHTML;
			//}
		}
	}
})();
