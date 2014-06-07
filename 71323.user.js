// ==UserScript==
// @name           sciencedays
// @namespace      www.fatpuddingbabies.biz
// @description    show the days of a science project in human speak
// @include        *war-facts.com/view_colony.php*
// ==/UserScript==

function round_number(number,dec_places){
//(c) Copyright 2008, Russell Walker, Netshine Software Limited. www.netshinesoftware.com
var new_number='';var i=0;number=number.toString();dec_places=dec_places*1;dec_point_pos=number.lastIndexOf(".");if(dec_point_pos==0){number="0"+number;dec_point_pos=1}if(dec_point_pos==-1||dec_point_pos==number.length-1){if(dec_places>0){new_number=number+".";for(i=0;i<dec_places;i++){new_number+="0"}return new_number}else{return number}}var existing_places=(number.length-1)-dec_point_pos;if(existing_places==dec_places){return number}if(existing_places<dec_places){new_number=number;for(i=existing_places;i<dec_places;i++){new_number+="0"}return new_number}var end_pos=(dec_point_pos*1)+dec_places;var round_up=false;if((number.charAt(end_pos+1)*1)>4){round_up=true}var digit_array=new Array();for(i=0;i<=end_pos;i++){digit_array[i]=number.charAt(i)}for(i=digit_array.length-1;i>=0;i--){if(digit_array[i]=="."){continue}if(round_up){digit_array[i]++;if(digit_array[i]<10){break}}else{break}}for(i=0;i<=end_pos;i++){if(digit_array[i]=="."||digit_array[i]<10){new_number+=digit_array[i]}else{new_number+="0"}}if(dec_places==0){new_number=new_number.replace(".","")}return new_number}

//	var sciblock = document.evaluate( "/html/body/div/div/center/table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var science = document.evaluate( "//td[contains(@class,'strong')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	var projects;
	
	for(var i = 0; i < science.snapshotLength; i++){
		inhtml = science.snapshotItem(i).textContent;
		if(inhtml.indexOf("Budget") > 0){

			day1 = (inhtml.indexOf("Runtime:")+8);
			day2 = (inhtml.indexOf("days")-1);
			day = inhtml.substring(day1, day2);
			dayreal = day/60;
			dayreal = round_number(dayreal, 0);
			hour1 = (inhtml.indexOf("days")+4);
			hour2 = (inhtml.indexOf("hours")-1);
			hour = inhtml.substring(hour1, hour2);
			minute1 = (inhtml.indexOf("hours")+5);
			minute2 = (inhtml.indexOf("minutes")-1);
			minute = inhtml.substring(minute1, minute2);
			
			science.snapshotItem(i).innerHTML = science.snapshotItem(i).innerHTML+" <font style=\"color: red; font-weight: bold;\">Real Days: "+dayreal+"</font>";
		}
	}