// ==UserScript==
// @name           CL
// @namespace      dacoinminster
// @description    CL
// @include        http*://accounts.craigslist.org/
// @include        http*://*.craigslist.*/search/*
// @include        http*://post.craigslist.org/*/S/bar/*
// @include        http*://post.craigslist.org/manage/*
// @include        http*://post.craigslist.org/k/*
// ==/UserScript==


var bodyhtml = document.body.innerHTML;
var TempRows = 'nothing';
var MyRows = '';
var top_page = false;

if (bodyhtml.indexOf('showing posts for the last') >= 0)
	top_page = true;

function rndinsert()
{
	return arguments[Math.floor(Math.random()*arguments.length)];
}
function randomize_list()
{
	var returnval = arguments[0];
	for( var i = 1; i < arguments.length; i++)
		if(Math.floor(Math.random()*2) == 0)
			returnval = returnval + ', ' + arguments[i];
		else
			returnval = arguments[i] + ', ' + returnval;
	return returnval;
}

window.checkTest = function()
{
	var searchstring = 'Your posting can be seen at <a href="http://';
	if(bodyhtml.indexOf(searchstring) < 0) searchstring = 'Votre annonce peut être observée sur <a href="http://';
	var cityname = bodyhtml.substring(bodyhtml.indexOf(searchstring) + searchstring.length);
	//alert(bodyhtml);
	searchstring = '.craigslist.';
	cityname = cityname.replace('.fr.','.en.');
	cityname = cityname.replace('.es.','.en.');
	cityname = cityname.replace('.en.','.en.');
	cityname = cityname.substring(0,cityname.indexOf(searchstring));
	var test_result = GM_getValue('test_' + cityname);
	//alert(test_result);
	if(test_result == null || test_result.length == 0)
	{
		window.setTimeout(checkTest,100);
		//alert('test_' + cityname);
	}
	else
	{
		//alert('Result: ' + test_result);
		var newhtml = document.body.innerHTML;
		if(test_result == 'ghosted')
			newhtml = newhtml.replace('lightgreen','white');
		else if(test_result == 'new')
			newhtml = newhtml.replace('lightgreen','lightgrey');
		else if(test_result != 'found')
			newhtml = newhtml.replace('lightgreen','lightblue');
		newhtml += '<br>Status: ' + test_result;
		document.body.innerHTML = newhtml;
		searchstring = 'PostingID: ';
		var postid = bodyhtml.substring(bodyhtml.indexOf(searchstring) + searchstring.length);
		postid = postid.substring(0,postid.indexOf('<br>'));
		GM_setValue('post_' + postid, test_result);
	}
}

window.checkForRows = function()
{ 
	if(top_page)
	{
		var rows30 = GM_getValue('rows30');
		var rows60 = GM_getValue('rows60');
		var rows90 = GM_getValue('rows90');
		var rows120 = GM_getValue('rows120');
		var allrows = rows30 + rows60 + rows90 + rows120;
		
		if( allrows == null || rows30 == '' || rows60 == '' || rows90 == '' || rows120 == '' )
			window.setTimeout(checkForRows,100);
		else
		{
			newbodyhtml = document.body.innerHTML;
			var thiscity = '';
			var thiscityname = '';
			var city = new Array();
			var cityname = new Array();
			var findstr = '<option value="';
			var loc = newbodyhtml.indexOf(findstr); 
			bodyhtml = newbodyhtml.substring(loc + findstr.length);
			loc = newbodyhtml.indexOf(findstr); 
			var counter = 0;
			var lastcity = '';
			var es_loc = newbodyhtml.indexOf('</select>');
			while(loc >= 0 && es_loc >= 0 && counter < 5000)
			{
				newbodyhtml = newbodyhtml.substring(loc + findstr.length);
				es_loc -= (loc + findstr.length);
				thiscity = newbodyhtml.substring(0,3);
				thiscityname = newbodyhtml.substring(newbodyhtml.indexOf('>')+1,newbodyhtml.indexOf('\n'));
				if(thiscity.substring(0, 1) != '"' && es_loc >= 0)
				{
					city[thiscity] = 'unposted';
					cityname[thiscity] = thiscityname;
				}
				lastcity = thiscity;
				loc = newbodyhtml.indexOf(findstr); 
				counter++;
			}

			var allrows_edited = '';
			findstr = '<tr style="background: ';
			var findstr2 = '<td';
			var td_loc = 0;
			var this_row = '';
			loc = allrows.indexOf(findstr); 
			thiscolor = '';
			counter = 0;
			var allcities = '';
			var this_postid = '';
			var this_status = '';
			while(loc >= 0 && counter < 1000)
			{
				this_row = allrows.substring(0,loc + findstr.length);
				allrows = allrows.substring(loc + findstr.length);
				thiscolor = allrows.substring(0,6);
				
				td_loc = allrows.indexOf(findstr2); 
				this_row += allrows.substring(0,td_loc + findstr2.length);
				allrows = allrows.substring(td_loc + findstr2.length);
				td_loc = allrows.indexOf(findstr2); 
				this_row += allrows.substring(0,td_loc + findstr2.length);
				allrows = allrows.substring(td_loc + findstr2.length);
				this_postid = allrows.substring(1,allrows.indexOf('</td>'));

				td_loc = allrows.indexOf(findstr2); 
				this_row += allrows.substring(0,td_loc + findstr2.length);
				allrows = allrows.substring(td_loc + findstr2.length);
				td_loc = allrows.indexOf(findstr2); 
				this_row += allrows.substring(0,td_loc + findstr2.length);
				allrows = allrows.substring(td_loc + findstr2.length);
				td_loc = allrows.indexOf('>'); 
				this_row += allrows.substring(0,td_loc + 1);
				allrows = allrows.substring(td_loc + 1);
				thiscity = allrows.substring(0,3);
				this_row += '<a href="https://post.craigslist.org/c/' + thiscity + '">' + cityname[thiscity] + '</a>';
				allrows = allrows.substring(3);

				td_loc = allrows.indexOf('</tr>'); 
				this_row += allrows.substring(0,td_loc);
				allrows = allrows.substring(td_loc);
				
				this_status = GM_getValue('post_' + this_postid);
				if(this_status == null || this_status.length == 0 || this_status == 'new' )
				{
					//this_row += '<td>never</td>';
					this_row = this_row.replace('lightgreen','grey');
				}
				else
				{
					//this_row += '<td>' + this_status + '</td>';
					if(this_status == 'ghosted')
						this_row = this_row.replace('lightgreen','white');

				}

				this_row += allrows.substring(0,5);
				allrows = allrows.substring(5);
				
				if(city[thiscity] == 'unposted')
				{
					city[thiscity] = thiscolor;
					allrows_edited += this_row;
				}
				else
				{
					//allrows_edited += this_row;
				}
				allcities += thiscity + ' ';

				loc = allrows.indexOf(findstr); 
				counter++;

				var unposted_cities = '';
				for (key in city)
				{
					if( city[key] == 'unposted' )
					{
						if( unposted_cities != '' )
							unposted_cities += ', ';
						unposted_cities += '<a href="https://post.craigslist.org/c/' + key + '">' + cityname[key] + '</a>';
					}
				}
			}
			//alert(thiscity);
			//alert(newbodyhtml.substring(0,300));

			document.getElementById('tablegoeshere').innerHTML = '<table cellpadding="3" width="100%">\n' +
					'<tbody><tr style="background: rgb(204, 204, 204) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">\n' +
					'<th>&nbsp;</th><th>ID</th><th>Date</th><th>Site</th><th>Title</th></tr>\n' + 
					 allrows_edited +
					'</tbody></table>' + unposted_cities;
		}
	}
}

if (bodyhtml.indexOf('Log in to your craigslist account') >= 0)
{
	//Anything on the login page goes here
}
else if (bodyhtml.indexOf('name="id" value="fs" ') >= 0)
{
	document.body.innerHTML = bodyhtml.replace('name="id" value="fs"', 'name="id" value="fs" checked');
	setTimeout("document.forms[0].submit()",2000);
}
else if (bodyhtml.indexOf('>barter</label><br>') >= 0)
{
	document.body.innerHTML = bodyhtml.replace('>barter</label><br>', ' checked>barter</label><br>');
	//document.forms[0].submit();
	setTimeout("document.forms[0].submit()",2000);
}
else if (bodyhtml.indexOf('>Troc</label><br>') >= 0)
{
	document.body.innerHTML = bodyhtml.replace('>Troc</label><br>', ' checked>Troc</label><br>');
	document.forms[0].submit();
}

else if (document.location.href.indexOf('accounts.craigslist.org/post/shwpst?pii=') >= 0 || document.location.href.indexOf('post.craigslist.org/manage/') >= 0 )
{
	//Manage posting page
	var searchstring = 'Your posting can be seen at <a href="http://';
	if(bodyhtml.indexOf(searchstring) < 0) searchstring = 'Votre annonce peut être observée sur <a href="http://';
	var cityname = bodyhtml.substring(bodyhtml.indexOf(searchstring) + searchstring.length);
	searchstring = '.craigslist.';
	cityname = cityname.replace('.fr.','.en.');
	cityname = cityname.replace('.es.','.en.');
	cityname = cityname.replace('.en.','.en.');
	var ext = cityname.substring(cityname.indexOf(searchstring) + searchstring.length);
	cityname = cityname.substring(0,cityname.indexOf(searchstring));
	var loc1 = ext.indexOf('%2F');
	var loc2 = ext.indexOf('/');
	if( loc1 < 0 || (loc2 >= 0 && loc2 < loc1))
		loc1 = loc2;
	ext = ext.substring(0,loc1);

	searchstring = '<h2>';
	var post_title = bodyhtml.substring(bodyhtml.indexOf(searchstring) + searchstring.length);
	post_title = post_title.substring(0,post_title.indexOf('</h2>'));
	post_title = post_title.replace(/ /g, '+');

	searchstring = 'Date: ';
	if(bodyhtml.indexOf(searchstring) < 0) searchstring = 'Date&nbsp;: ';
	newhtml = bodyhtml.substring(0, bodyhtml.indexOf(searchstring) + searchstring.length);
	var newbodyhtml = bodyhtml.substring(bodyhtml.indexOf(searchstring) + searchstring.length);
	//alert(newbodyhtml.substring(0,300));

	searchstring = '<br>';
	var datestr = newbodyhtml.substring(0, newbodyhtml.indexOf(searchstring));
	var pm_offset = 0; 
	if( datestr.substring(17,19) == 'PM' )
		pm_offset = 12;
	var d1 = new Date(parseInt(datestr.substring(0,4)),parseInt(datestr.substring(5,7)-1),parseInt(datestr.substring(8,10)),
							parseInt(datestr.substring(12,14)) + pm_offset,parseInt(datestr.substring(15,17)),0,0);
	var my_ms = d1 * 1 + 0;
	//alert (parseInt(datestr.substring(0,4)) + ',' + parseInt(datestr.substring(5,7)) + ',' + parseInt(datestr.substring(8,10)) + ',' + 
	//						parseInt(datestr.substring(12,14)) + ',' + parseInt(datestr.substring(15,17)));
	var hoursdiff = 0;
	var timezone = datestr.substring(20);
	
	if ( false == true )
		hoursdiff = 0;	// Dummy, for easier copy/paste below
	else if(timezone == 'AKDT')
		hoursdiff = 1;
	else if (timezone == 'PDT')
		hoursdiff = 0;
	else if (timezone == 'MST')
		hoursdiff = 0;
	else if (timezone == 'MDT')
		hoursdiff = -1;
	else if (timezone == 'CDT')
		hoursdiff = -2;
	else if (timezone == 'EDT')
		hoursdiff = -3;
	else if (timezone == 'CEST')
		hoursdiff = -9;
	else if (timezone == 'EEST')
		hoursdiff = -10;
	else if (timezone == 'IST')
		hoursdiff = -12.5;
	else if (timezone == 'BDT')
		hoursdiff = -13;
	else if (timezone == 'CST')
		hoursdiff = -15;
	else
		alert('Need to handle: ' + timezone);
	my_ms += 1000*60*60*hoursdiff;
	//alert(my_ms);
	var pstdate = new Date(my_ms);
	var rightnow = new Date();
	var elapsed = (rightnow - pstdate)/1000/60;
	//alert(pstdate);
	//alert(elapsed);
	if (elapsed > 15.5)
	{
		GM_setValue('test_' + cityname, '');
		//alert(cityname);
		newhtml += newbodyhtml + '<iframe id=frametest src=http://' + cityname + '.craigslist.' + ext + '/search/?query=' + post_title + '&srchType=T&catAbb=sss></iframe>\n';
		document.body.innerHTML = newhtml;
	}
	else
	{
		GM_setValue('test_' + cityname, 'new');
	}
	window.setTimeout(checkTest,100);


}
else if (document.location.href.indexOf('/search/?query=') >= 0)
{
	var cityname = document.location.href.substring(7,document.location.href.length-7);
	if( cityname.indexOf('.en.') >= 0 )
		cityname = cityname.substring(0,cityname.indexOf('.') + 3);
	else
		cityname = cityname.substring(0,cityname.indexOf('.'));
	//alert(cityname);
	if (bodyhtml.indexOf('Nothing found for that search') >= 0)
	{
		GM_setValue('test_' + cityname, 'ghosted');
		//alert('test_' + cityname + ': ghosted');
	}
	else
	{
		GM_setValue('test_' + cityname, 'found');
		//alert('test_' + cityname + ': found');
	}
}
else if(bodyhtml.indexOf('post new ad in:') >= 0)
{
	var newhtml = '';
	var findstr2;
	var td_loc;
	var td_count;
	var tr_count;
	var findstr;
	var loc;
	var myNow=new Date();
	var my30d=new Date();
	var my60d=new Date();
	var my90d=new Date();
	var my120d=new Date();
	myNow.setDate(myNow.getDate());
	my30d.setDate(my30d.getDate()-30);
	my60d.setDate(my60d.getDate()-60);
	my90d.setDate(my90d.getDate()-90);
	my120d.setDate(my120d.getDate()-120);

	findstr = '<em><small>use the [manage] link next to an entry to view, edit, delete, or repost that ad</small></em>';
	loc = bodyhtml.indexOf(findstr); 
	if (loc >= 0)
		bodyhtml = bodyhtml.substring(0,loc) + bodyhtml.substring(loc + findstr.length);

	findstr = '<small><i>all times Pacific</i></small>';
	loc = bodyhtml.indexOf(findstr); 
	if (loc >= 0)
		bodyhtml = bodyhtml.substring(0,loc) + bodyhtml.substring(loc + findstr.length);
	

	findstr = '<em><small>regardless of status (active, expired, deleted), all posts will appear on this list.  we are not able to offer a removal option at this time.</small></em>';
	loc = bodyhtml.indexOf(findstr);
	if (loc >= 0)
		bodyhtml = bodyhtml.substring(0,loc) + bodyhtml.substring(loc + findstr.length);


	findstr = '<p>total postings found:';
	loc = bodyhtml.indexOf(findstr); 
	if (loc >= 0)
	{
		var temphtml = bodyhtml;
		temphtml = bodyhtml.substring(0,loc);
		bodyhtml = bodyhtml.substring(loc);
		findstr = '</p>';
		loc = bodyhtml.indexOf(findstr); 
		bodyhtml = bodyhtml.substring(loc+4);
		temphtml += bodyhtml;
		bodyhtml = temphtml;
	}
	
	if (!top_page)
	{
		findstr = '<table cellpadding="3" width="100%">';
		loc = bodyhtml.indexOf(findstr); 
		if( loc >= 0 )
		{
			findstr = '<th>Category</th>';
			loc = bodyhtml.indexOf(findstr); 
			newhtml += bodyhtml.substring(0,loc);
			bodyhtml = bodyhtml.substring(loc + findstr.length);
			findstr = '<th>Fee</th>';
			loc = bodyhtml.indexOf(findstr); 
			newhtml += bodyhtml.substring(0,loc);
			bodyhtml = bodyhtml.substring(loc + findstr.length);
			findstr = '<tr style=';
			loc = bodyhtml.indexOf(findstr); 
			tr_count = 0;
			var TempRows = "";
			while (loc >= 0)
			{
				bodyhtml = bodyhtml.substring(loc);
				loc = bodyhtml.indexOf('</tr>'); 
				td_count = 0;
				findstr2 = '<td';
				td_loc = bodyhtml.indexOf(findstr2); 
				while (td_loc > -1 && td_loc < loc)
				{
					td_loc = bodyhtml.indexOf('</td>'); 
					if(td_count != 4 && td_count != 6)
						TempRows += bodyhtml.substring(0,td_loc+5);
					bodyhtml = bodyhtml.substring(td_loc+5);
					td_count++;
					td_loc = bodyhtml.indexOf(findstr2); 
					loc = bodyhtml.indexOf('</tr>'); 
				}
				TempRows += bodyhtml.substring(0,loc+5) + '\n';
				bodyhtml = bodyhtml.substring(loc+5);
				loc = bodyhtml.indexOf(findstr); 
				tr_count++;
			}
			//alert(TempRows);
			findstr = '</table>';
			loc = bodyhtml.indexOf(findstr); 
			bodyhtml = '';
		}
		else
			bodyhtml = 'none';
	}
	
	if(top_page)
	{
		findstr = '<table cellpadding="3" width="100%">';
		loc = bodyhtml.indexOf(findstr); 
		newhtml += bodyhtml.substring(0,loc); 
		bodyhtml = '';
		GM_setValue('rows30', '');
		GM_setValue('rows60', '');
		GM_setValue('rows90', '');
		GM_setValue('rows120', '');
		newhtml += '<div id=tablegoeshere>Table goes here</div><br><br>';
		newhtml += '<iframe id=frame30d src=https://accounts.craigslist.org/?doSrch=1&viewProfile=' +
					'&startYear=' + my30d.getFullYear() + 
					'&startMonth=' + (my30d.getMonth()+1) + 
					'&startDay=' + my30d.getDate() + 
					'&endYear=' + myNow.getFullYear() + 
					'&endMonth=' + (myNow.getMonth()+1) + 
					'&endDay=' + myNow.getDate() + '></iframe>\n';
		newhtml += '<iframe id=frame60d src=https://accounts.craigslist.org/?doSrch=1&viewProfile=' +
					'&startYear=' + my60d.getFullYear() + 
					'&startMonth=' + (my60d.getMonth()+1) + 
					'&startDay=' + my60d.getDate() + 
					'&endYear=' + my30d.getFullYear() + 
					'&endMonth=' + (my30d.getMonth()+1) + 
					'&endDay=' + my30d.getDate() + '></iframe>\n';
		newhtml += '<iframe id=frame90d src=https://accounts.craigslist.org/?doSrch=1&viewProfile=' +
					'&startYear=' + my90d.getFullYear() + 
					'&startMonth=' + (my90d.getMonth()+1) + 
					'&startDay=' + my90d.getDate() + 
					'&endYear=' + my60d.getFullYear() + 
					'&endMonth=' + (my60d.getMonth()+1) + 
					'&endDay=' + my60d.getDate() + '></iframe>\n';
		newhtml += '<iframe id=frame120d src=https://accounts.craigslist.org/?doSrch=1&viewProfile=' +
					'&startYear=' + my120d.getFullYear() + 
					'&startMonth=' + (my120d.getMonth()+1) + 
					'&startDay=' + my120d.getDate() + 
					'&endYear=' + my90d.getFullYear() + 
					'&endMonth=' + (my90d.getMonth()+1) + 
					'&endDay=' + my90d.getDate() + '></iframe>\n';
		newhtml += bodyhtml;
		//alert(bodyhtml.substring(0,300));
		document.body.innerHTML = newhtml;
	}
	else
	{
		if(document.location.href.indexOf('&endMonth=' + (myNow.getMonth()+1)) >= 0 &&
				document.location.href.indexOf('&endDay=' + myNow.getDate()))
			GM_setValue('rows30', TempRows);
		else if(document.location.href.indexOf('&endMonth=' + (my30d.getMonth()+1)) >= 0 &&
				document.location.href.indexOf('&endDay=' + my30d.getDate()))
			GM_setValue('rows60', TempRows);
		else if(document.location.href.indexOf('&endMonth=' + (my60d.getMonth()+1)) >= 0 &&
				document.location.href.indexOf('&endDay=' + my60d.getDate()))
			GM_setValue('rows90', TempRows);
		else if(document.location.href.indexOf('&endMonth=' + (my90d.getMonth()+1)) >= 0 &&
				document.location.href.indexOf('&endDay=' + my90d.getDate()))
			GM_setValue('rows120', TempRows);
	}
	
	
	if(top_page)
		window.setTimeout(checkForRows,100);
}
else if (document.location.href.indexOf('/x/') >= 0 || document.location.href.indexOf('/all/') >= 0)
{
	// Don't do anything to a repost
}
else if (document.location.href.indexOf('https://post.craigslist.org/') >= 0)
{
	var ttl = '';
	var ttl = rndinsert('BARTER','TRADE','EXCHANGE','Barter','Trade','Exchange');
	ttl = rndinsert(rndinsert(
						'For ' + ttl + ': ', 
						'Will ' + ttl + ': ', 
						ttl + ' with me' + ': ', 
						'Wanna ' + ttl + '? ', 
						'Looking to ' + ttl + ': '
					), ttl + ': ');
	var ttl2 = rndinsert('Radeon', '$240', 'Radeon HD', 'ATI', 'new') + rndinsert(' video',' graphics') + ' card';
	var ttl3 = rndinsert('use of the card','electricity','ELECTRICITY','computing power','computations');
	ttl += rndinsert(
						'You get a ' + ttl2 + ', I get ' + ttl3,
						ttl2 + ' for you, ' + ttl3 + ' for me',
						ttl2 + ' in exchange for ' + ttl3,
						ttl2 + ' in trade for ' + ttl3);

	
	var dsimp = rndinsert(
					'What you' + rndinsert('\'ll',' will','') + ' get: ',
					'You' +rndinsert('\'ll',' will','') + ' get' + rndinsert(': ',' '),
					'For this ' + rndinsert('barter','trade','exchange') + ', you' + rndinsert('\'ll',' will','') + ' get' + rndinsert(': ',' ')
				);
	dsimp +=	'a ' + rndinsert('new ','','','') + 'Radeon ' + rndinsert('HD ','') + '5870 ' + 
				rndinsert('multi-monitor ','') + rndinsert('high-end ','') + rndinsert('3D ','') + rndinsert('gaming ','') + 
				rndinsert('graphics','video') + ' card (' + 
				rndinsert(
						rndinsert('which ','') + rndinsert('retails','sells') + ' for ' + rndinsert('about ','approximately ','around ','') + '$240',
						rndinsert('worth ','') + rndinsert('about ','approximately ','around ','') + '$240' + rndinsert('',' retail',' retail value')
				) + ')'  + rndinsert('.','') + '\n';
	dsimp +=	rndinsert(rndinsert('In return, ', 'In exchange, ', 'In trade, '),'') + 
				'I' + rndinsert('\'ll',' will','') + ' get' + rndinsert(': ',' ') + 
				rndinsert('use of ','to use ','some of ','to use some of ','use of some of ') + 
				'your electricity ' + rndinsert('running on','through','via','utilizing') + ' the ' + 
				rndinsert('video ','graphics ','') + 'card' + rndinsert(' to perform computations','') + rndinsert(' for',' in') + 
				' my ' + rndinsert('distributed ','parallel ', 'distributed parallel ') + rndinsert('processing','computing') + 
				' project' + rndinsert('.','') + '\n';
	/*dsimp +=	rndinsert('','','',
					rndinsert('Yes, ','I know ') + rndinsert('it','this') + ' ' +
					rndinsert('does ' + rndinsert('sound','seem'),rndinsert('sounds','seems')) + ' ' + 
					rndinsert('strange','unusual','weird','out of the ordinary') + ' but ' + rndinsert('it','this') + ' is ' + 
					rndinsert('legitimate','for real','real','a real offer') + rndinsert('.','') + '\n'
				);*/
	dsimp +=    '\n' + rndinsert(	rndinsert(rndinsert('Also, in','In') + ' addition to ',rndinsert('Also, along','Along') + ' with ') + 
								rndinsert('paying to use ','using ','') + 'the 5870, ',
							'If you ' + rndinsert('currently','already') + rndinsert(' have',' own') + ' a ' + 
								rndinsert('nice ','fancy ','high-end ','new ') + rndinsert('video','graphics') + ' card, '
							);
	dsimp +=	'I pay ' + rndinsert('monthly','monthly payments','a set rate','a monthly rate','a set monthly rate') + ' to ' + 
				rndinsert('run','perform') + ' my ' + rndinsert('processing','computations') + ' on ' + rndinsert('several','many') +
				' other ' + rndinsert('video','graphics') + ' cards, including ' + rndinsert('the following ','these ') +
				rndinsert('ATI','Radeon','ATI Radeon') + rndinsert(' video',' graphics','') + ' cards: ' +
				randomize_list('6850','6870','6950','6970','6990') + ', ' + randomize_list('5750','5770','5830','5850','5870','5970') + ', ' +
				randomize_list('4850','4870','4890') + ', and ' + rndinsert('newer','also','also newer') + ' NVIDIA GTX ' + 
				rndinsert('graphics ','video ','','') + 'cards, ' + rndinsert('although','though') + ' NVIDIA ' +
				rndinsert('video ','graphics ','','') + 'cards run my ' + rndinsert('project ','computing ','processing ','') + 'software ' + 
				rndinsert('much ','') + 'more slowly' + rndinsert(' for some reason','') + rndinsert('.','') + '\n\n';
	dsimp +=	rndinsert('Interested? ','Sound interesting? ','','','') + 
				rndinsert('Email me','Contact me','Send me an email','Email') + ' ' + 
				rndinsert('for details','to learn more','for the details','for more info','for more information','for the specifics','for specifics') + 
				rndinsert('.','');

	//var delec = 'elec desc';
	//var dlong = 'long desc';
	//var desc = rndinsert(dsimp, delec, dlong);
	var desc = dsimp;

	var searchstring = 'Posting Title:';
	var loc = bodyhtml.indexOf(searchstring);
	if (loc < 0)
	{
		searchstring = 'Titre de l\'annonce';
		loc = bodyhtml.indexOf(searchstring);
	}
	var newhtml = bodyhtml.substring(0, loc);
	bodyhtml = bodyhtml.substring(loc);

	searchstring = 'id="';
	loc = bodyhtml.indexOf(searchstring);
	newhtml += bodyhtml.substring(0, loc + searchstring.length);
	bodyhtml = bodyhtml.substring(loc + searchstring.length);

	searchstring = '"';
	loc = bodyhtml.indexOf(searchstring);
	var title_id = bodyhtml.substring(0, loc);
	//alert(title_id);

	searchstring = 'Posting Description:';
	loc = bodyhtml.indexOf(searchstring);
	newhtml += bodyhtml.substring(0, loc);
	bodyhtml = bodyhtml.substring(loc);

	searchstring = '</textarea>';
	loc = bodyhtml.indexOf(searchstring);
	newhtml += bodyhtml.substring(0, loc) + desc;
	bodyhtml = bodyhtml.substring(loc);

	newhtml += bodyhtml;

	/*newhtml = newhtml.replace('value="Your email address"','value="jr.willett+craigslist@gmail.com"');
	newhtml = newhtml.replace('value="Type email address again"','value="jr.willett+craigslist@gmail.com"');
	newhtml = newhtml.replace('req df','');
	newhtml = newhtml.replace('req df','');*/
	

	document.body.innerHTML = newhtml;
	document.getElementById(title_id).value = ttl
}
else
{
	//alert('Unhandled URL: ' + document.location.href);
}
