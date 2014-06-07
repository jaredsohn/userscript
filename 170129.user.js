// ==UserScript==
// @name           Wikipedia - ajax archives
// @description    Patch dinosauric wikipedia software
// @version        1.0
// @downloadURL    http://userscripts.org/scripts/source/170129.user.js
// @updateURL      http://userscripts.org/scripts/source/170129.meta.js
// @homepageURL    http://userscripts.org/scripts/show/170129
// @icon           data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%04%03%00%00%00%81Tg%C7%00%00%00%09pHYs%00%01%CD%5E%00%01%CD%5E%01%B8r%93Z%00%00%000PLTE%05%04%05%86%87%86HJH%C9%C9%C9hhh%E8%E8%E8'''%A8%A9%A8%17%16%17%98%97%98XXX%D7%D6%D7yxy%FC%FB%FC898%B9%B8%B9%CB%F0I%09%00%00%01BIDATx%5E%85%D1%B1K%02a%18%06%F0%87%B0%3C%10%C4h%0B%92%86%86%8Aj%0C%1A%04%97%86%FE%80%5B%92%E3n%0CK%90Ph%11%8E(%10!%C9j%CA%C5%96%8A%20h%C8%F1%20%82F%07%B1%2F%AB%E3I%A7%A6%5C%5B*%CA%F7%A2%0B%91%E8%E1%E3%83%E7%07%2F%BC%7C%1F(Q%F4%03i%06i%88%C9%0Di%92%1F%03%25%BE%FA%C0%3EPz%0F%98%D7%F9%7Cr%C4%07%B5nC%B3%81B%D6%03wa%12%9B%FB%BAn%1EX%DAL)%07%A6%A1%9D%24FW%90%2C%BBQ%1B)p%E3%E5%ED%D0%82d%CD1%3F%1D%B0%91%B1%BA%23%15%ACf%AC%F0R)%06%5E%A1P%26%23%98e%A3%02t%C08%A6%0C%B2%3Ea%90%AF8%FA%00%1B%7Bv%B1L%92n%147%24H6OQ%9C%3E%9B%B3%11%F07%7D%7F%06%80%F1A%0FTU(Q%5D%0E%DC%A5%3C%88h9Jv%CF%EFC%02M%AD%9D%92%5E%0F%F0b%C8!%F1%18J%D7H%AAx%8D%91m%92x%DA%A1d%3EHV%C6%04ne%90%97%E1%18i%3B%02%AD%01%A3%DB%F35%D2%0DS%80%F1%AD%E1cm%91d%2B%F8%0D%0Fm%24%B3%14%E8x%F0%FB%BE%CA%E9%FB%86%3F%C0P%3D%E7%FF%91%2F%09%AA%5B%C4~SY%FB%00%00%00%00IEND%AEB%60%82
// @namespace      asdfasdfasdfasdfdasf
// @include        http://en.wikipedia.org/w/*action=history*
// @include        https://en.wikipedia.org/w/*action=history*
// @grant          GM_xmlhttpRequest
// ==/UserScript==


// Configuration 

maximumNumberOfItems = 20; // howmany items you want

redirect = "yes"; // set this to no if you dont want to be redirected.

superSexyMode = "off"; // move some of the links from the top of the page into a side bar menu.


// redirect if maximumNumberOfItems is set lower than the default of 50

if( document.location.href.indexOf('limit=') == -1 && redirect == "yes" && maximumNumberOfItems < 50 ){
	document.location.href = document.location.href+"&limit="+maximumNumberOfItems;

// If not redirecting we load the entries.

}else{

// load all the list items

	allHTMLListItems = document.getElementsByTagName('li'); 

// create a variable to remember which entries have been loaded

	var listOfAlreadyManagedDivs="";

// loop though the list items

	for( listItemPointer=0; listItemPointer < allHTMLListItems.length; listItemPointer++ ){ 

// cut the list item into chunks at the quotation marks. One of these chunks will contain the number for that edit.

		listItemChunks = allHTMLListItems[listItemPointer].innerHTML.split('"');

// loop though the chunks

		for( itemChunkPointer=0; itemChunkPointer < listItemChunks.length; itemChunkPointer++ ){

// check if this chunk is a number

			if( !isNaN( listItemChunks[itemChunkPointer] ) ){

// Here I use a short variable for no particular reason. Ok I guess I was to lazy to fix it.

				num=listItemChunks[itemChunkPointer];

// check if this chunk that is a number is not a diff number we had already covered.

				if(listOfAlreadyManagedDivs.indexOf(num)==-1){

// if it was not listed we list it

					listOfAlreadyManagedDivs=listOfAlreadyManagedDivs+","+num;

// use the number to request the xml

					GM_xmlhttpRequest({
						method: 'GET',
						url:    'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&revids='+num+'&rvdiffto=prev&format=xml',
						onload: function(response) {

// parse the xml

							var xml = new DOMParser()
							xml = xml.parseFromString(response.responseText, "text/xml");
							//unsafeWindow.console.log("The response was: ", xml);





							var x = "";

							for ( var nodeCollector = 0; nodeCollector < xml.getElementsByTagName("diff")[0].childNodes.length; nodeCollector++ ) {
								x = x + xml.getElementsByTagName("diff")[0].childNodes[nodeCollector].nodeValue;
							}



							//var x=xml.getElementsByTagName("diff")[0].childNodes[0].nodeValue;
							//x=x+xml.getElementsByTagName("diff")[0].childNodes[1].nodeValue;
							var targetRev=xml.getElementsByTagName("rev")[0].getAttribute('revid');

// we want only one matching target

							var finished=0;

// load all the list items (again)

							allHTMLListItems=document.getElementsByTagName('li');

// loop though the list items

							for(listItemPointer=0;listItemPointer < allHTMLListItems.length;listItemPointer++){

// first look if the list item contains the nesasary quotation marks. And look if it is not the page footer.

								if(allHTMLListItems[listItemPointer].innerHTML.indexOf('"')!=-1 && allHTMLListItems[listItemPointer].id != "footer"){

// cut the list item into chunks at the quotation marks. One of these chunks will contain the number matching the revid in the xml file

									listItemChunks=allHTMLListItems[listItemPointer].innerHTML.split('"');

// cycle though the chunks

									for(itemChunkPointer=0;itemChunkPointer < listItemChunks.length;itemChunkPointer++){

// check if the chunk is a number

										if(!isNaN(listItemChunks[itemChunkPointer])){

// check if the chunk (that is a number) matches the revid in the xml. And check if not finished already.

											if( listItemChunks[itemChunkPointer] == targetRev && finished == 0 ){

// we want only one match

												finished=1;

// get the list item inner html

												y=allHTMLListItems[listItemPointer].innerHTML;

// extend the list item content. The big chunks are the css to make the shady background images work in all these browsers people use.

												allHTMLListItems[listItemPointer].innerHTML = y+"<hr class=\"ruler\">\
												<table width=\"100%\">"+x+"<!-- --></table>\
												\
												<style>\
												.ruler				{border:0;color:#FFDBDB;background-color:#FFDBDB;height:4px;}\
												li					{margin-left:-25px;}\
												li:first-line		{font-size:110%;}\
												table				{font-size:14px;line-height:20px;}\
												td					{vertical-align:top;overflow:auto; white-space: -moz-pre-wrap;  white-space: -hp-pre-wrap; white-space: -o-pre-wrap; white-space: -pre-wrap; white-space: pre-wrap; white-space: pre-line; word-wrap: break-word;}\
												diff-context		{width:45%;overflow:scroll;}\
												.diff-marker		{width:1%;}\
												.diff-deletedline	{width:45%;overflow:scroll;\
																	\
																		/* IE10 Consumer Preview */ \
																	background-image: -ms-radial-gradient(center, circle farthest-corner, #FFE8E9 0%, #FFFFFF 100%);\
																	\
																	/* Mozilla Firefox */ \
																	background-image: -moz-radial-gradient(center, circle farthest-corner, #FFE8E9 0%, #FFFFFF 100%);\
																	\
																	/* Opera */ \
																	background-image: -o-radial-gradient(center, circle farthest-corner, #FFE8E9 0%, #FFFFFF 100%);\
																	\
																	/* Webkit (Safari/Chrome 10) */ \
																	background-image: -webkit-gradient(radial, center center, 0, center center, 500, color-stop(0, #FFE8E9), color-stop(1, #FFFFFF));\
																	\
																	/* Webkit (Chrome 11+) */ \
																	background-image: -webkit-radial-gradient(center, circle farthest-corner, #FFE8E9 0%, #FFFFFF 100%);\
																	\
																	/* W3C Markup, IE10 Release Preview */ \
																	background-image: radial-gradient(circle farthest-corner at center, #FFE8E9 0%, #FFFFFF 100%);\
																	}\
												.diff-addedline		{width:45%;overflow:scroll;\
																	\
																		/* IE10 Consumer Preview */ \
																	background-image: -ms-radial-gradient(center, circle farthest-corner, #D7F4EC 0%, #FFFFFF 100%);\
																	\
																	/* Mozilla Firefox */ \
																	background-image: -moz-radial-gradient(center, circle farthest-corner, #D7F4EC 0%, #FFFFFF 100%);\
																	\
																	/* Opera */ \
																	background-image: -o-radial-gradient(center, circle farthest-corner, #D7F4EC 0%, #FFFFFF 100%);\
																	\
																	/* Webkit (Safari/Chrome 10) */ \
																	background-image: -webkit-gradient(radial, center center, 0, center center, 500, color-stop(0, #D7F4EC), color-stop(1, #FFFFFF));\
																	\
																	/* Webkit (Chrome 11+) */ \
																	background-image: -webkit-radial-gradient(center, circle farthest-corner, #D7F4EC 0%, #FFFFFF 100%);\
																	\
																	/* W3C Markup, IE10 Release Preview */ \
																	background-image: radial-gradient(circle farthest-corner at center, #D7F4EC 0%, #FFFFFF 100%);\
																	}\
												.diffchange			{color:red;}\
												.diffchange-inline	{color:green;font-weight:bold;}\
												.comment			{font-size:180%;display:block;background-color:#FFDBDB;line-height:160%; border-radius: 15px;padding-left:7px;border:2px solid #BB7070}\
												</style><hr class=\"ruler\">";
											}
										}
									}
								}
							}
						}
					});
				}
			}
		}

// cap the number of diffs to be loaded (again)

		if(listItemPointer>=maximumNumberOfItems){
			break;
			// listItemPointer=allHTMLListItems.length;
		}
	}
}

// move some links from the top of the page into their own colapsible menu in the wiki side bar

if(superSexyMode=="on"||superSexyMode=="yes"){
	foo=document.getElementById('histlegend').innerHTML;
	foo=foo.split('External tools: ')[1];
	foo=foo.split('(cur)')[0];
	foo=foo.split('<a ').join('<li><a ');
	foo=foo.split('</a>').join('</a></li>');
	foo=foo.split('<b>·</b>').join('');
	foo=foo.split('white-space:nowrap;').join('');
	// foo=foo+'<li><a href="https://userscripts.org/scripts/show/170129">Tell me how I\'m doing?</a></li>';
	document.getElementById('p-tb').innerHTML=document.getElementById('p-tb').innerHTML+'<h3>External tools</h3><div style="display: block;" class="body"><ul>'+foo+"</ul></div>";
	document.getElementById('histlegend').innerHTML="";
}



