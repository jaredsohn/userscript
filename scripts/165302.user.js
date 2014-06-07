// ==UserScript==
// @name			NeoGAF - Take out the trash
// @namespace		http://neogaf.com/forum
// @description		Get rid of those crappy threads
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			1.1.2
// ==/UserScript==

// ********************************************************************************

var goodTerms = new Array(
					"announce",
					"blog",
					"details",
					"footage",
					"impressions",
					"lttp",
					"news",
					"|ot|",
					"|ot2|",
					"release",
					"rttp",
					"rumor",
					"rumour",
					"sales",
					"screenshot"
				);
				
var badTerms = new Array(
					"?",
					"am i",
					"can",
					"could",
					"expect",
					"feel",
					"only one",
					"remember",
					"spoilers",
					"so",
					"what",
					"when",
					"where",
					"which",
					"who",
					"will"
			   );

// ********************************************************************************
								
console.log("* NeoGAF - Take out the trash: Starting");

var threads = new Array();
var theThreads = document.getElementById("threadslist").getElementsByTagName("td");
var threadCount = theThreads.length;
var goodWordCount = goodTerms.length;
var badWordCount = badTerms.length;
var startScore = 50;

if (theThreads)
{
	console.log("  - NeoGAF - Take out the trash: Hiding crap threads");
	
	for (i = 0; i < threadCount; ++i)
	{
		if (theThreads[i].id.indexOf('_threadtitle_') > -1)
		{
			threadID = theThreads[i].id.replace('td_threadtitle_', '');

			thisThread = new Object();
			thisThread.id = threadID;
			thisThread.score = startScore;

			for (j = 0; j < badWordCount; ++j)
			{
				if (theThreads[i].textContent.toLowerCase().indexOf(badTerms[j].toLowerCase()) > -1)
				{
					thisThread.score = (thisThread.score / 2);
					if (theThreads[i].getAttribute('data-keywords-bad'))
					{
						theThreads[i].setAttribute('data-keywords-bad', theThreads[i].getAttribute('data-keywords-bad') + ', ' + badTerms[j].toLowerCase());
					}
					else
					{
						theThreads[i].setAttribute('data-keywords-bad', badTerms[j].toLowerCase());
					}
				}
			}

			for (j = 0; j < goodWordCount; ++j)
			{
				if (theThreads[i].textContent.toLowerCase().indexOf(goodTerms[j].toLowerCase()) > -1)
				{
					thisThread.score = (thisThread.score * 2);
					if (theThreads[i].getAttribute('data-keywords-good'))
					{
						theThreads[i].setAttribute('data-keywords-good', theThreads[i].getAttribute('data-keywords-good') + ', ' + goodTerms[j].toLowerCase());
					}
					else
					{
						theThreads[i].setAttribute('data-keywords-good', goodTerms[j].toLowerCase());
					}
				}
			}
			
			if ((thisThread.id) && (thisThread.score))
			{
				threads.push(thisThread);
			}
			
			thisThread = null;
		}
	}

	threadCount = threads.length;
	for (i = 0; i < threadCount; ++i)
	{
		threadFullID = 'td_threadtitle_' + threads[i].id;
		thisThread = document.getElementById(threadFullID);
		thisThread.setAttribute('data-score', threads[i].score);
		if (threads[i].score >= 200)
		{
			thisThread.style.fontSize = "1.2em";
			thisThread.style.fontWeight = "bold";
			for (j = 0; j <= 5; ++j)
			{
				thisThread.parentNode.getElementsByTagName("td")[j].style.backgroundColor = "#ff9999";
			}
		}
		else if (threads[i].score >= 100)
		{
			thisThread.style.fontSize = "1.2em";
			thisThread.style.fontWeight = "bold";
		}
		else if (threads[i].score >= 50)
		{
			thisThread.style.fontSize = "1.0em";
		}
		else
		{
			thisThread.style.fontWeight = "lighter";
			thisThread.getElementsByTagName("a")[0].style.color = "#aaaaaa";
			for (j = 0; j <= 5; ++j)
			{
				thisThread.parentNode.getElementsByTagName("td")[j].style.backgroundColor = "#dedede";
			}
		}
	}	
}

console.log("* NeoGAF - Take out the trash: Finished.");