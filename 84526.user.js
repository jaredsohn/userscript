// ==UserScript==

// @name          NukeThief V 0.02
// @namespace     http://userscripts.org/scripts/show/84526
// @description   NukeThief Helper
// @include       http://www.nukezone.nu/show.asp?Action=Players*
// @exclude      http://www.google.com/*

// ==/UserScript==
var allTables, thisTable, allTrs, thisTr, provinceTr, clanTr, nwTr, landTr;
var Ctime = new Date();
var milli_C = Ctime.getTime();
function removeChar(string,chart) {
	return string.split(chart).join('');
}
function removeHTMLTags(htmlString){
        if(htmlString){
          var mydiv = document.createElement("div");
           mydiv.innerHTML = htmlString;
            if (document.all) // IE Stuff
            {
                return mydiv.innerText;
            }
            else // Mozilla does not work with innerText
            {
                return mydiv.textContent;
            }
      }
}
allTables = document.getElementsByTagName('table');
thisTable = allTables[11];
allTrs = thisTable.getElementsByTagName('tr');
if(window.location.href.search( /X=/ ) != '-1'){
	for (i = 0 ; i < allTrs.length ; i++){
		if(allTrs[i].innerHTML.search( /Province/ ) != '-1'){
			provinceTr = allTrs[i];
			clanTr = allTrs[i+1];
			nwTr = allTrs[i+2];
			landTr = allTrs[i+3];
			break;
		}
	}
	var provinceTd = provinceTr.getElementsByTagName('td');
	var province = provinceTd[1].innerHTML;
	var clanTd = clanTr.getElementsByTagName('td');
	var clan = removeHTMLTags(clanTd[1].innerHTML);
	var nwTd = nwTr.getElementsByTagName('td');
	var nw = removeHTMLTags(nwTd[1].innerHTML);
	var landTd = landTr.getElementsByTagName('td');
	var land = removeHTMLTags(landTd[1].innerHTML);
	var GMsave = Ctime + ';' + province + ';'  + clan + ';' + nw + ';' + land;
	var OldData = GM_getValue(province, 'False');
	GM_setValue(province, GMsave);
	var SplitData = OldData.split(';');
	var days =new Date(SplitData[0]);
	var milli_O = days.getTime();
	var T_diff = milli_C - milli_O;
	var num_days =Math.floor ((((T_diff / 1000) / 60) / 60) / 24) ;
	var num_h = Math.floor (((T_diff / 1000) / 60) / 60)%24 ;
	var message = '<tr class="header"><td colspan="3" height="4" align="center">Saved on  ' + num_days +' day(s) and '+ num_h +' hour(s) ago</td></tr>' +
	'<tr><td><b>Province Name: </b></td><td colspan="2">'+ SplitData[1] +'</td></tr>'+
	'<tr><td><b>Clan: </b></td><td colspan="2">'+ SplitData[2] +'</td></tr>'+
	'<tr><td><b>Networth: </b></td><td colspan="2">'+ SplitData[3] +' (current: ' + nw + ')</td></tr>'+
	'<tr><td><b>Land: </b></td><td colspan="2">'+ SplitData[4] + ' (current: ' + land + ')</td></tr>'+
	'<tr class="header"><td colspan="3" height="4" align="center" >New information has been saved !!!</td></tr>';
	if (OldData == 'False'){
	message = '<tr class="header"><td colspan="3" height="4" align="center">New information has been saved !!!</td></tr>';
	}
	thisTable.innerHTML = thisTable.innerHTML + message;
}
else{
	for(i = 1 ; i < allTrs.length-1 ; i++){
		allptd = allTrs[i].getElementsByTagName('td');
		allptd2 = allptd[0].innerHTML;
		allProv = removeChar(removeHTMLTags(allptd2), '*');
		if(allProv.search(/]/) != '-1'){
		allProv = allProv.split(']');
		allProv = allProv[1];
		}
		alldata = GM_getValue(allProv, 'False');
		allSData = alldata.split(';');
		otime = new Date(allSData[0]);
		milli_all = otime.getTime();
		all_diff = milli_C - milli_all;
		all_days =Math.floor ((((all_diff / 1000) / 60) / 60) / 24) ;
		all_h = Math.floor (((all_diff / 1000) / 60) / 60) % 24 ;
		if(alldata == 'False'){
			img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/red.jpg';
			img_title= "Not Found";
		}
		else{
			img_title = 'Saved on : ' + all_days +' day(s) and ' + all_h +' hour(s) ago';
			if(all_days== '0'){
				img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/green.jpg';
			}
			else if(all_days==1){
				img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/green1.jpg';
			}
			else if(all_days==2){
				img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/green2.jpg';
			}
			else if(all_days==3){
				img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/green3.jpg';
			}
			else if(all_days > 3){
				img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/yellow.jpg';
			}
			else{
				img_url = 'http://www.glamdring.se/users/54ee7f3daeb872952468114a5d9d295e/red.jpg';
				img_title= "Not Found";
			}
		}
		allptd[0].innerHTML = '<img title="' + img_title + '" src="' + img_url + '">' + allptd[0].innerHTML;
	}
}