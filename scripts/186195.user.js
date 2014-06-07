// ==UserScript==
// @name        FIMFiction - Remaining Words and Reading Time
// @namespace   Selbi
// @include     http*://fimfiction.net/*
// @include     http*://www.fimfiction.net/*
// @version     2.1
// ==/UserScript==

///////////////////
// Read time is calculated with a base of 10000 words in 53 minutes (~188 Words per minute).
var WPM = 188;
// This is my personal reading speed. Feel free to change it to your personal speed.
///////////////////

var words, readstax, chapterstotal, rege, firstwords, currentstory=0, total, totalundread, currentwords, timeleft, totaltime, chaptersremaining, percentage, int, intx, block1, block2, block3;
var alluls = document.getElementsByTagName('ul');
for (var int=0; int<alluls.length; int++) {
	if (alluls[int].className == "chapters") {
		words = alluls[int].getElementsByClassName('word_count');
		rege = new RegExp("[0-9,]+");
		totalwordsX = parseInt(rege.exec(words[words.length-1].innerHTML)[0].replace(",",""));
		readstax = [];
		chapterstotal = 0;
		chaptersremaining = 0;
		$("ul.chapters:eq(" + currentstory + ") .chapter-read-icon").each(function() {
			if ($(this).hasClass("chapter-read")) {
				readstax[chapterstotal] = false;
				chapterstotal++;
				chaptersremaining++;
			} else {
				readstax[chapterstotal] = true;
				chapterstotal++;
			}
		});
		currentstory++;
		firstwords = parseInt(rege.exec(words[0].innerHTML)[0].replace(",",""));
		total = "0";
		totalunread = "0";
		currentwords = "";
		for (intx=0; intx<(words.length-1);intx++) {
			currentwords = parseInt(rege.exec(words[intx].innerHTML)[0].replace(",",""));
			total = parseInt(total) + parseInt(currentwords);
			if (readstax[intx] == true) {
				totalunread = parseInt(totalunread) + parseInt(currentwords);
			}
			//if (parseInt(currentwords) == 0) {chapterstotal--;} // UNCOMMENT TO IGNORE EMPTY CHAPTERS
			//if (words.length > 2) {
				words[intx].innerHTML = '<acronym style="border-bottom: 1px dashed #999;" title="' + ((Math.round((currentwords/totalwordsX)*10000))/100).toFixed(2) + '%"><span style="font-size:80%">[~' + convertToTime(currentwords) + "]</span></acronym>&nbsp;&nbsp;" + words[intx].innerHTML;

			//}
		}
		timeleft = convertToTime(totalunread);
		totaltime = convertToTime(total);

		percentage = ((Math.round((totalunread/total)*10000))/100).toFixed(2);
		Npercentage = ((Math.round((1-(totalunread/total))*10000))/100).toFixed(2);
		chppercent = ((Math.round((chaptersremaining/chapterstotal)*10000))/100).toFixed(2);

		var sep = "&nbsp;&nbsp;&nbsp;";
		var sep2 = '<acronym title="' + numberWithCommas(total) + '">&nbsp;&nbsp;</acronym>';
		var B_ProgressBar = '<span style="border-style:solid;border-width:1px;background-color:#FFFFFF;width:100px;display:inline-block;" onmouseover="PBtext' + int + '.innerHTML=\'' + chaptersremaining + "/" + chapterstotal + '\';PBgreen' + int + '.style.width=\'' + chppercent + '%\'" onmouseout="PBtext' + int + '.innerHTML=\'' + Npercentage + '%\';PBgreen' + int + '.style.width=\'' + Npercentage + '%\'"><span id="PBgreen' + int + '" style="background-color:#01CA24;width:' + Npercentage + '%;display:inline-block;"><span id="PBtext' + int + '" style="display:inline-block;">' + Npercentage + '%</span></span></span>';
		var B_AvgWords = 'Avg. words/chapter: ' + Math.ceil(total/chapterstotal);
		var B_TotalTime = '<acronym style="border-bottom: 1px dashed #999;" title="' + B_AvgWords + '">[~' + totaltime + "]</acronym>";
		var B_TotalTime_Remaining = '<acronym style="border-bottom: 1px dashed #999;" title="Time spent so far: ~' + convertToTime(total-totalunread) + '">[~' + timeleft + " / ~" + totaltime + ']</acronym>';
		var B_Status_Read = "&#10004;" + " All chapters read.";
		var B_Status_Unread = "&#10008;" + " Unread.";
		var B_Status_NullStory = "This story has no words.";
		var B_RemainingWords = '<i><acronym style="border-bottom: 1px dashed #999;" title="' + numberWithCommas(total-totalunread) +' words read --- ' + B_AvgWords + '">' + numberWithCommas(totalunread) + "</acronym></i>";
		var B_RestHTML = words[words.length-1].innerHTML;
		var WordBlockHTML = words[words.length-1];

		if (isNaN(percentage)) {		// empty story
			WordBlockHTML.innerHTML = B_Status_NullStory + sep + B_RestHTML;
		} else	if (Npercentage == 0) {		// unread story
			WordBlockHTML.innerHTML = B_Status_Unread + sep + B_ProgressBar + sep + B_TotalTime + sep2 + B_RestHTML;
		} else if (Npercentage == 100) {	// read story
			WordBlockHTML.innerHTML = B_Status_Read + sep + B_ProgressBar + sep + B_TotalTime + sep2 + B_RestHTML;
		} else {				// in-progress story
			WordBlockHTML.innerHTML = B_ProgressBar + sep + B_TotalTime_Remaining + sep + B_RemainingWords + sep + "/" + sep2 + B_RestHTML;
		}
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertToTime(x) {
	var time = (Math.ceil(x/WPM));
	if (time > 60) {
		time = ((Math.ceil(time/6))/10).toFixed(1) + " h";
	} else {
		time += " min";
	}
	return time;	
}