// ==UserScript==
// @name           NG Submissions Stats
// @namespace      greasemonkey.knugen.com/ngsubmissionsstats
// @description    Gives you some stats about a user's Flash and Audio submissions
// @include        http://*.newgrounds.com/flash/
// @include        http://*.newgrounds.com/audio/
// ==/UserScript==

var page					= String(document.location).indexOf('flash') > -1 ? 'flash' : 'audio';

var submissions				= new Array(); // Layout: (Flash)[title, score, url, type, solo], (Audio)[title, score, url]
var submissionElements		= document.getElementById('rightcol').getElementsByClassName('feature');

if (submissionElements.length > 0)
{
	if (page == 'flash')
	{
		var bestDaily				= 0;
		var bestWeekly				= 0;
		var mostAwards				= 0;
		var awards					= new Array();
		if (document.getElementById('portal_trophy_count'))
		var awardElements = document.getElementById('portal_trophy_count').getElementsByClassName('award')[0].getElementsByTagName('li');
		
		for (var i = 0; i < submissionElements.length; i++)
		{
			var entry	= new Array();
			var s 		= submissionElements[i];
			
			var title	= s.getElementsByClassName('ftitle')[0].textContent;
			var type	= /(Game|Movie)/.exec(String(s.getElementsByClassName('fsub')[0].textContent))[1];
			var score	= /([0-5]\.[0-9]+) \/ 5.00/.exec(String(s.getElementsByClassName('fsub')[1].textContent))[1];
			var solo	= s.getElementsByClassName('fsub')[0].textContent.indexOf('Solo') > -1;
			var url		= s.href;
			
			entry[0] 	= title;
			entry[1] 	= score;
			entry[2]	= url;
			entry[3]	= type;
			entry[4]	= solo;
			
			submissions.push(entry);
		}
		
		if (awardElements != null)
		{
			for (var j = 0; j < awardElements.length; j++)
			{
				var a		= awardElements[j];
				var imgs	= a.getElementsByTagName('img');
				
				for (var k = 0; k < imgs.length; k++)
				{		
					if (k >= mostAwards) mostAwards = k + 1;
					
					var award	= Number(/awards_([0-9]+)/.exec(imgs[k].src)[1]);
					
					awards.push(award);
					
					if (/Weekly/.test(imgs[k].alt))
					{
						if (isAwardBetter(award, bestWeekly)) bestWeekly = award;
					}
					else if (/Daily/.test(imgs[k].alt))
					{
						if (isAwardBetter(award, bestDaily)) bestDaily = award;
					}
				}
			}
		}
	}
	else
	{
		for (var i = 0; i < submissionElements.length; i++)
		{
			var entry	= new Array();
			var s 		= submissionElements[i];
			
			var title	= s.getElementsByClassName('ftitle')[0].textContent;
			var score	= /([0-5]\.[0-9]+) \/ 5.00/.exec(String(s.getElementsByClassName('fsub')[1].textContent))[1];
			var url		= s.href;
			
			entry[0] 	= title;
			entry[1]	= score;
			entry[2]	= url;
			
			submissions.push(entry);
		}
	}
	
	var parent 	= document.getElementById('rightcol');
	
	var box	= document.createElement('div');
	box.className = 'box title twothird';
	
	var boxTop	= createBox('top');
	boxTop.appendChild(document.createElement('div'));
	
	var boxBot	= createBox('bot');
	boxBot.appendChild(document.createElement('div'));
	
	var boxl	= createBox('l');
	var boxr	= createBox('r');
	var boxm	= createBox('m');
	var headsizer 			= document.createElement('div');
	headsizer.className 	= 'headsizer';
	var heading 			= document.createElement('div');
	heading.className 		= 'heading';
	var h2 					= document.createElement('h2');
	h2.className 			= 'i-article';
	h2.textContent			= 'Submissions Stats';
	
	boxl.appendChild(boxr);
	boxr.appendChild(boxm);
	boxm.appendChild(headsizer);
	headsizer.appendChild(heading);
	heading.appendChild(h2);
	
	box.appendChild(boxTop);
	box.appendChild(boxl);
	box.appendChild(boxBot);
	
	parent.insertBefore(box, parent.firstChild);
	
	var content	= createBox('sizer');
	content.style.fontSize = '1.2em';
	var table 	= document.createElement('table');
	table.cellPadding = "4";
	
	if (page == 'flash')
	{
		table.innerHTML = 
			createRow('Submissions', getNumSubmissions(null)) 					+
			createRow('Movies', getNumSubmissions('Movie'))						+
			createRow('Games', getNumSubmissions('Game'))						+
			createRow('Lowest scoring', getFromScore('low'))					+
			createRow('Highest scoring movie', getFromScore('high', 'Movie'))	+
			createRow('Highest scoring game', getFromScore('high', 'Game'))		+
			createRow('Highest scoring solo', getFromScore('high', null, true))	+
			createRow('Best daily award', awardImage(bestDaily))				+
			createRow('Best weekly award', awardImage(bestWeekly))				+
			createRow('Most awards for a submission', mostAwards)				+
			createRow('Regular B/A (top 3)', (getNumSubmissions(null) < 3 ? 'N/A' : getBA(3)))	+
			createRow('Total B/A', getBA(null))									+
			createRow('Awards B/A', Number(awards.length / getNumSubmissions(null)).toFixed(2));
	}
	else
	{
		table.innerHTML = 
			createRow('Submissions', getNumSubmissions(null)) 					+
			createRow('Lowest scoring', getFromScore('low'))					+
			createRow('Highest scoring', getFromScore('high'))					+
			createRow('Regular B/A (top 3)', (getNumSubmissions(null) < 3 ? 'N/A' : getBA(3)))	+
			createRow('Total B/A', getBA(null));
	}
	
	content.appendChild(table);
	boxm.appendChild(content);	
}

function createRow(label, value)
{
	return '<tr><td style="width:140px">' + label + ':</td><td>' + value + '</td>';
}

function getBA(num)
{
	var sum 	= 0;
	var scores	= new Array();
	
	if (num == null || num > submissions.length) num = submissions.length;
	
	for (var i = 0; i < submissions.length; i++)
	{
		scores.push(Number(submissions[i][1]));
	}
	
	scores.sort(function(a,b){return b - a});
	
	for (var j = 0; j < num; j++)
	{
		sum += Number(scores[j]);
	}
	
	return Number(sum / num).toFixed(2);
}

function getFromScore(dir, type, solo)
{
	var scores	= new Array();
	
	for (var i = 0; i < submissions.length; i++)
	{
		if (page == 'audio')
		{
			scores.push(submissions[i]);
			continue;
		}
		
		if ((type == null || type == submissions[i][3]) &&
			(solo == null || solo == submissions[i][4]))
		{
			scores.push(submissions[i]);
		}
	}
	
	if (scores.length == 0) return '-';
	
	if (dir == 'high')
		scores.sort(function(a, b){return b[1] - a[1]});
	else
		scores.sort(function(a, b){return a[1] - b[1]});
	
	return '<a href="' + scores[0][2] + '">' + scores[0][0] + '</a> (' + scores[0][1] + ')';
}

function getNumSubmissions(type)
{
	if (type == null) return submissions.length;
	
	var num = 0;
	
	for (var i = 0; i < submissions.length; i++)
	{
		if (type == submissions[i][3]) num ++;
	}
	
	return num;
}

function isAwardBetter(award1, award2)
{
	switch(award1)
	{
		case 0:
		case 2:
		case 3:
		case 4:
		case 8: return false;
	}
	
	switch(award2)
	{
		case 0:
		case 2:
		case 3:
		case 4:
		case 8: return true;
	}
	
	if (award1 > 10) 		award1 -= 9;
	else if (award1 >= 5) 	award1 += 1;
	
	if (award2 > 10) 		award2 -= 9;
	else if (award2 >= 5) 	award2 += 1;
	
	return award1 < award2;
}

function createBox(class)
{
	var box = document.createElement('div');
	box.className = 'box' + class;
	
	return box;
}

function awardImage(num)
{
	if (num == 0) return '-';
	
	return '<img width="20" height="20" alt="" src="http://img.ngfiles.com/aicons/awards_' + num + '.gif">';
}