// ==UserScript==
// @name           OkCupid_InCommon
// @namespace      http://www.okcupid.com/InCommon
// @description    Duplicate OKC's think you both like' these words 'feature'.  Includes option to define your own custom word search. 
// @include        http://www.okcupid.com/profile/*
// @exclude        http://www.okcupid.com/profile/*/pictures
// @exclude        http://www.okcupid.com/profile/*/questions
// @exclude        http://www.okcupid.com/profile/*/tests
// ==/UserScript==




var EmptyEssay = 0;
var EssayHash = new Object();

GM_registerMenuCommand("Reload 'both like' search words from your profile",init_CommonWords);
GM_registerMenuCommand("Enter custom search words",init_custom_words);


if (typeof(GM_getValue("OKC_BothLike")) == 'undefined')
{
	init_CommonWords();
		
}

if ((GM_getValue("EmptyEssays") > 0) && (GM_getValue("CustomSearchWords") !== 1 ))
{
	
	alert("You have not filled out all essays. There may not be enough text to 'think that you both like' anything\n\nFor better matches you can click on 'Tools > Greasemonkey > User Script Commands > Enter custom search words'");

}



get_currentprofile_words();
you_both_like();








function init_CommonWords()
{

	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://www.okcupid.com/profile',
	    headers: 
	    {
	        'User-agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3'
	        
	    },
	    onload: function(response){config_profwords(response)}
	
	});
}



function init_custom_words()
{
	var BothText = prompt("Enter your custom search words.\nSeparate words with commas(,).",GM_getValue("OKC_BothLike"));

	var BothText = cleanText(BothText,0);
	
	GM_setValue("OKC_BothLike", BothText);
	GM_setValue("CustomSearchWords", 1);
		
}




function config_profwords(resDet)
{
	
				EmptyEssay = 0;
//				GM_deleteValue doesn't seem to work
				GM_setValue("EmptyEssays", 0);
				GM_setValue("CustomSearchWords", 0);
				GM_setValue("OKC_BothLike", "");
	
				var e0 = /<div id=\"essay_text_0\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e1 = /<div id=\"essay_text_1\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e2 = /<div id=\"essay_text_2\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e3 = /<div id=\"essay_text_3\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e4 = /<div id=\"essay_text_4\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e5 = /<div id=\"essay_text_5\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e6 = /<div id=\"essay_text_6\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e7 = /<div id=\"essay_text_7\" class=\"nostyle\">([^]+?)<\/div>/m;
				var e9 = /<div id=\"essay_text_9\" class=\"nostyle\">([^]+?)<\/div>/m;
				
				
				var e0txt = e0.exec(resDet.responseText)[1]; 
				var e1txt = e1.exec(resDet.responseText)[1];
				var e2txt = e2.exec(resDet.responseText)[1];
				var e3txt = e3.exec(resDet.responseText)[1];
				var e4txt = e4.exec(resDet.responseText)[1];
				var e5txt = e5.exec(resDet.responseText)[1];
				var e6txt = e6.exec(resDet.responseText)[1];
				var e7txt = e7.exec(resDet.responseText)[1];
				var e9txt = e9.exec(resDet.responseText)[1];
			
//				Combine essay content
				var ProfWords = cleanText(e0txt,1);
				ProfWords = ProfWords.concat(" , " + cleanText(e1txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e2txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e3txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e4txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e5txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e6txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e7txt,1));
				ProfWords = ProfWords.concat(" , " + cleanText(e9txt,1));
			
//				create array of every word in essays
				var ProfWordsArray = ProfWords.split(/\W+/);
				var arr = {};
				
				for ( i=0; i < ProfWordsArray.length; i++ )
				    arr[ProfWordsArray[i]] = ProfWordsArray[i];
				
				ProfWordsArray = new Array();
				for ( key in arr )
				    ProfWordsArray.push(arr[key]);
			    
			    
//				save values
				GM_setValue("OKC_BothLike", ProfWordsArray.join());
				GM_setValue("EmptyEssays", EmptyEssay);
			

			
			
}


function get_currentprofile_words()
{
	
	
//do common words bit on current page
//pop into hash
		
	// My Self-Summary | Essay 0
	var e0 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_0']/div[1]/div[@id='essay_text_0']";
	
	//What I’m doing with my life | Essay 1
	var e1 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_1']/div[1]/div[@id='essay_text_1']";
	
	//I’m really good at | Essay 2
	var e2 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_2']/div[1]/div[@id='essay_text_2']";
	
	//The first things people usually notice about me | Essay 3
	var e3 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_3']/div[1]/div[@id='essay_text_3']";
	
	//My favorite books, movies, music, and food | Essay 4
	var e4 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_4']/div[1]/div[@id='essay_text_4']";
	
	//The six things I could never do without | Essay 5
	var e5 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_5']/div[1]/div[@id='essay_text_5']";
	
	//I spend a lot of time thinking about | Essay 6
	var e6 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_6']/div[1]/div[@id='essay_text_6']";
	
	//On a typical Friday night I am |Essay 7
	var e7 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_7']/div[1]/div[@id='essay_text_7']";
	
	//You should message me if | Essay 9
	var e9 = "/html/body[@id='p_profile']/div[@id='body_wrapper']/div[@id='wrapper']/div[@id='page']/div[@id='main_content']/div[@id='main_column']/div[@id='essay_9']/div[1]/div[@id='essay_text_9']";
	
				var e0txt = document.evaluate(e0, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
				var e1txt = document.evaluate(e1, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e2txt = document.evaluate(e2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e3txt = document.evaluate(e3, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e4txt = document.evaluate(e4, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e5txt = document.evaluate(e5, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e6txt = document.evaluate(e6, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e7txt = document.evaluate(e7, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var e9txt = document.evaluate(e9, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				
				
				 	
				 	
				 
				 	
				 	
//				Combine essay content
				var ProfWords;

				if (e0txt.snapshotLength > 0)
				{
					ProfWords = cleanText(e0txt.snapshotItem(0).innerHTML,0);
				}
				else
				{
					ProfWords = "";					
				}

				if (e1txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e1txt.snapshotItem(0).innerHTML,0));
				}
								
				if (e2txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e2txt.snapshotItem(0).innerHTML,0));
				}
				if (e3txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e3txt.snapshotItem(0).innerHTML,0));
				}
				if (e4txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e4txt.snapshotItem(0).innerHTML,0));
				}
				if (e5txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e5txt.snapshotItem(0).innerHTML,0));
				}
				if (e6txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e6txt.snapshotItem(0).innerHTML,0));
				}
				if (e7txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e7txt.snapshotItem(0).innerHTML,0));
				}
				if (e9txt.snapshotLength > 0)
				{
					ProfWords = ProfWords.concat(" , " + cleanText(e9txt.snapshotItem(0).innerHTML,0));
				}

			
			

//				put every word in essays into hash
				
				var ProfWordsArray = ProfWords.split(/\W+/);

				
				for ( i=0; i < ProfWordsArray.length; i++ )
				{
//					skip most pronouns
					if (ProfWordsArray[i].length > 3)
					{
				    	EssayHash[ProfWordsArray[i].toLowerCase()] = 1;
					}
				}
}



function you_both_like()
{
	
//			get words from your profile

			var YourWords = GM_getValue("OKC_BothLike").split(/\W+/);
			var InCommon = new Array();
			var Matches = 0;
			
			
			for ( i=0; i < YourWords.length; i++ )
			{				
				if (EssayHash[YourWords[i]] === 1)
				{
					InCommon.push(YourWords[i].toLowerCase());
					Matches++;						
				}				
			}
			
			
			var BothLikeWords = InCommon.join(", ");
			
	
			if (Matches > 0)
			{
				var divInterest, divIncommon;
				divInterest = document.getElementById('interests');
				if (divInterest) 
				{
				    divIncommon = document.createElement('div');
				    divIncommon.setAttribute('id',"InCommon");
				    
				    
				    divIncommon.innerHTML = '<div id="interests" class="nostyle">' +
				    ' <p id="InCommon_string">' +
				    'I think you both like: ' + BothLikeWords +
				    '.</p></div>';

				    divInterest.parentNode.insertBefore(divIncommon, divInterest.nextSibling);
				    
				}
				
			}	
}



			
function cleanText(essaytext,OwnProfile)
{
//		 	Regex to cleanup text
			if(essaytext.match("... fill me out") === null)
			{
				var stripTags = /<[^]+?>/gm;
				var stripNewlines = /\n/gm;
//		  		handle paragraphs that are basically one word per line( implemented as line breaks <br>
		  		var ConvertBR2commas = /<br>/gm;
		  			
			    return essaytext.replace(ConvertBR2commas, " , ").replace(stripNewlines, " ").replace(stripTags, "");
			}
			else
			{
				if (OwnProfile !== 0)
				{
					EmptyEssay = EmptyEssay + 1;
				}
				return "";	
			}
}


