// ==UserScript==
// @name           SCI-KMUTNB POLL
// @namespace      http://www.meddlesome.in.th
// @include        *stu_poll.php

// ==/UserScript==


//Pre retriving data
data_table = document.getElementsByClassName('datatable')[0];
data_table_row = data_table.getElementsByTagName('tr');
var tab = RegExp( "\\t", "g" );
	
//retriving student data
stu_id = document.getElementsByTagName('table')[1].getElementsByTagName('tr')[1].getElementsByTagName('td')[0].getElementsByTagName('u')[1].innerHTML;
	
stu_data = data_table_row[0].getElementsByTagName('td')[0].innerHTML;	 
year = stu_data.substring(stu_data.indexOf("25"),stu_data.indexOf("25")+4);
semester = stu_data.substring(stu_data.indexOf("ษา ")+3,stu_data.indexOf("ษา ")+4)

//retriving data
for(var i=2;i<=data_table_row.length;i++){
	aaa = data_table.getElementsByTagName('tr')[i];
	test2 = aaa.getElementsByTagName('td')[5];
	test3 = test2.getElementsByTagName('a')[0];
		
	//retriving data
	var data=Array();
	var b = 1;
	for(var a=0;a<=2;a++){
		var temp = aaa.getElementsByTagName('td')[b];
			if(temp.getElementsByTagName('div')[0])
				data[a] = temp.getElementsByTagName('div')[0].innerHTML;
			else
				data[a] = temp.innerHTML;
		data[a] = data[a].replace(tab, "");
		b++;
	}
				

//change link
	if(test3.innerHTML.indexOf("ยังไม่กรอก")!=-1){
		test3.setAttribute('href','http://www.scibase.kmutnb.ac.th/pollwebnew2009/stu_chk_poll.php?trm_yr=' + year + '&trm_num=' + semester + '&stu_code=' + stu_id +'&crs_code=' + data[0] + '&crs_section=' + data[1] + '&teacher_code=&crs_name='  + data[2] + '&pren_thi=&teacher_namethai=&teacher_surnamethai=');
		test3.innerHTML = 'กรอกซะ !';
	}
}