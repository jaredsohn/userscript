// ==UserScript==
// @name       CountAttackWins
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  usage:go to a characters combat log, you have to run it (visit if using some monkey) on all(well not all, only these since evente\ started) the log's pages.tested only on chrome and tempermonkey
// @match      http://www.lordswm.com/*
// @copyright  2012+, You
// ==/UserScript==



var officialDates=new Array();
officialDates[0]="2013-06-12 15:30,2013-06-12 13:00";
officialDates[1]="2013-06-12 19:30,2013-06-12 17:00";
officialDates[2]="2013-06-12 23:30,2013-06-12 21:00";
officialDates[3]="2013-06-13 03:30,2013-06-13 01:00";
officialDates[4]="2013-06-13 15:30,2013-06-13 13:00";
officialDates[5]="2013-06-13 18:30,2013-06-13 16:00";
officialDates[6]="2013-06-14 14:30,2013-06-14 12:00";
officialDates[7]="2013-06-15 05:30,2013-06-15 03:00";
officialDates[8]="2013-06-15 15:30,2013-06-15 13:00";
officialDates[9]="2013-06-16 04:30,2013-06-16 02:00";
officialDates[10]="2013-06-17 04:30,2013-06-17 02:00";
officialDates[11]="2013-06-18 05:30,2013-06-18 03:00";
officialDates[12]="2013-06-18 18:30,2013-06-18 16:00";
officialDates[13]="2013-06-19 05:30,2013-06-19 03:00";
officialDates[14]="2013-06-19 06:30,2013-06-19 04:00";
officialDates[15]="2013-06-21 04:30,2013-06-21 02:00";
officialDates[16]="2013-06-21 16:30,2013-06-21 14:00";
officialDates[15]="2013-06-24 04:30,2013-06-24 02:00";

function filter_official(s){
    var output="";
    //split the data to lines
    var data=s.split('&nbsp;&nbsp;');
   
    for(i=1;i<data.length;i++){//1 removes the pagination menu
        
        if(data[i].match('<b>Survilurgs</b></i> vs') || data[i].match('Survilurgs</i> vs')){//filter defenses
           // alert('found defense:'+data[i]);
            continue;
        }
        var tempDate=new Date(start_Date(data[i]));
       
        for(j=0;j<officialDates.length;j++){
           
            var date1=new Date(officialDates[j].split(',')[0]);
            var date2=new Date(officialDates[j].split(',')[1]);
            
            if((tempDate>=date2) && (tempDate<date1)){
                output=output+data[i]+"\r\n";
                break;
            }
        }
    }
    return output;
}

function main(){

	
	var is_combat_log=false;

	if (document.URL.match('pl_warlog.php')){
		is_combat_log=true;
		
        var totalcombatssum=count_total_combats();
		alert((totalcombatssum-count_loses())+" wins in "+totalcombatssum+" fights");
	}

	
}

function count_total_combats(){
   
    //the right table is the last table
	
    var the_main_table=document.getElementsByTagName("TABLE")[30];
	
    var data=the_main_table.innerHTML;
	
    data=filter_official(data);
    try{
	var total_fights_count = data.match(/Survilurgs/g).length;  
	
    }
    catch(err){
       return 0;
    }
   
	return total_fights_count;
}

function count_loses(){
    var the_main_table=document.getElementsByTagName("TABLE")[30];
	
    var data=the_main_table.innerHTML;
     data=filter_official(data);
    try{
 		var loses=data.match(/\<b\>Survilurgs\<\/b>/g).length;
    }
    catch(err){
        return 0;
    }
    return loses;
}



function date_test(s){
    var testDate=new Date(s);
    alert(testDate.toString());
}

function start_Date(s){
	start=s.indexOf('warlog.php?warid');
    end=s.indexOf('\<\/a\>',start);
    return ((s.substring(start,end)).substring(s.substring(start,end).indexOf('\>')+1));
}

function end_Date(){
	;   
}




main();

void(0);
