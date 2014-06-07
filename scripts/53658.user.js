// ==UserScript==
// @name           Nexus Extra Stats
// author          HugePinball
// @namespace      http://userscripts.org
// @description    Adds extra calculated stats/ratings to FO3 and TES Nexus pages
// @include        http://www.fallout3nexus.com/downloads/*
// @include        http://www.tesnexus.com/downloads/*
// ==/UserScript==


function setStyle(objId, style, value){
   document.getElementById(objId).style[style]= value;
}

function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function get_file_age(date){
	var temp = date.split(' ');
	switch (temp[2]){
		case "January":
		temp[2]=0;
		break;
		case "February":
		temp[2]=1;
		break;
		case "March":
		temp[2]=2;
		break;
		case "April":
		temp[2]=3;
		break;
		case "May":
		temp[2]=4;
		break;
		case "June":
		temp[2]=5;
		break;
		case "July":
		temp[2]=6;
		break;
		case "August":
		temp[2]=7;
		break;
		case "September":
		temp[2]=8;
		break;
		case "October":
		temp[2]=9;
		break;
		case "November":
		temp[2]=10;
		break;
		case "December":
		temp[2]=11;
		break;
		default: ;
	}	
	var today = new Date();
	var upload_date = new Date();
	upload_date.setFullYear(temp[3],temp[2],temp[1]);
	//Set 1 day in milliseconds
	var one_day=1000*60*60*24;
	//Calculate difference btw the two dates, and convert to days
	var file_age = Math.ceil((today.getTime()-upload_date.getTime())/(one_day));
	return file_age;
}

//var tdate = new Date();
var file_age = [];
var endorsement = [];
var download = [];
var temp;

var cat_div = document.getElementsByClassName('cat');

//  /html/body/div[3]/div/div[2]/div[5]/div/h3
var expr = "//div[@class='cat']/div[@class='cat_fname']/h3";
var upload_date_html = document.evaluate(expr, document, null, 7, null);
//var upload_dates = result.snapshotItem(0);
//alert(upload_dates.innerHTML);

// /html/body/div[3]/div/div[2]/div[5]/div[8]
var expr = "//div[@class='cat']/div[@class='cat_att'][2]";
var endorsement_html = document.evaluate(expr, document, null, 7, null);

var expr = "//div[@class='cat']/div[@class='cat_att'][3]";
var download_html = document.evaluate(expr, document, null, 7, null);

for (var i = 0; i < cat_div.length; i++){
	temp = upload_date_html.snapshotItem(i).innerHTML.split(',');
	file_age[i] = get_file_age(temp[1]);
	//alert(file_age[i]);
	temp = endorsement_html.snapshotItem(i).innerHTML.split('>');
	temp = temp[1].split(' ');
	endorsement[i] = temp[1];
	//alert(endorsement[i]);
	temp = download_html.snapshotItem(i).innerHTML.split('>');
	temp = temp[1].split(' ');
	download[i] = temp[1];
	//alert(download[i]);
	
	var e_a = Math.round(endorsement[i]  / file_age[i] * 100)/100;
	var e_d = Math.round(endorsement[i]  / download[i] * 100000)/100;
	
	var new_div = document.createElement('div');
	new_div.setAttribute('class','cat_att');
	new_div.innerHTML = "<img src='/images/icons/star.png'> " + e_a + " Endorsements/Day";
	cat_div[i].appendChild(new_div);
	var new_div = document.createElement('div');
	new_div.setAttribute('class','cat_att');
	new_div.innerHTML = "<img src='/images/icons/star.png'> " + e_d + " Endorsements/1K Downloads"; 
	cat_div[i].appendChild(new_div);
	var new_div = document.createElement('div');
	new_div.setAttribute('class','cat_att');
	// var qual = Math.round(endorsement[i] * endorsement[i] / file_age[i] / download[i] * 100000);
	// new_div.innerHTML = "<img src='/images/icons/award_star_gold_2.png'> " + qual + " Quality Rating"; 
	// cat_div[i].appendChild(new_div);

} 

var cat_att_div = document.getElementsByClassName('cat_att');
for (var i = 0; i < cat_att_div.length; i++){
	cat_att_div[i].style.height="20px";
}

var cat_desc_block = document.getElementsByClassName('cat_desc_block');
for (var i = 0; i < cat_desc_block.length; i++){
	cat_desc_block[i].style.height="160px";
}