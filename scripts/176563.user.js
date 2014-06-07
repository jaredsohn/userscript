// ==UserScript==
// @name          ppostpost
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       https://www.facebook.com/
// @include       http://www.facebook.com/
// @include       https://www.facebook.com/QualityForLifePhilippines?sk=page_insights&section=navPosts&subsection=navPostsAllPosts
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		  http://download.pouchdb.com/pouchdb-nightly.min.js
// ==/UserScript==

alert("first all post");
var data = []; // the data grasp from the facebook
var db_data = []; // the data read from the indexedDB
$(document).ready(function(){
   login();
    setTimeout(function(){
        garsp_data();
    },8000);
});

window.setInterval(function(){
	read_from_indexedDB("All_Posts");
	setTimeout(function(){
		download(db_data);				
	}, 2000);
}, 86400000);


function grasp_data() {

    setTimeout(function(){
        selectOnFans();
    },5000);
	
	setTimeout( function(){ 
		seeMore();
		}, 10000);
			
	setTimeout(function(){
			getData();

		}, 185000);
	setTimeout(function(){
			write_to_indexedDB(data);
		}, 186000);
	
}




function login(){
    document.getElementById('email').value='dsmqflphilippines@hotmail.com';
    document.getElementById('pass').value='dsmph.com';
    document.getElementById('u_0_1').click();
}

function getData(){
    var count=document.querySelectorAll('tr._52sf').length;
    while(count>0){
       var c=count;
       var ele=document.querySelectorAll('tr._52sf')[c-1];
       var time=ele.querySelector('span').innerHTML;
       var content=ele.querySelector('div._5591').innerHTML;
       var reach=ele.querySelector('div._5a2s').innerHTML;
       var fans=ele.querySelectorAll('div._5bbb')[0].innerHTML;
       var nofans=ele.querySelectorAll('div._5bbb')[1].innerHTML;
       var postclicks=ele.querySelectorAll('div._5bbb')[2].innerHTML;
       var likes=ele.querySelectorAll('div._5bbb')[3].innerHTML;
       var datas=[];
       datas[0]=time;
       datas[1]=content;
       datas[2]=reach;
       datas[3]=fans;
       datas[4]=nofans;
       datas[5]=postclicks;
       datas[6]=likes;
       data[c-1]=datas;
        count--;
    }
    
}

function selectOnFans(){
    document.querySelector('div._6a._6b.uiPopover._5a31>a').click();
    document.querySelector('div#js_2 ul>li:last-child').click();
}
function seeMore(){
    //16times
    var i=0;
    while(i<16){
    window.setTimeout(function(){
    document.querySelector('div._55m-').click();
    },5000+5000*i);
    i++;
    }
}
function write_to_indexedDB(data)
{
	var pouchdb = new Pouch('All_Posts');
	for(i = 0; i < data.length; i++){
		pouchdb.post({ time:data[i][0],content:data[i][1],_reach:data[i][2],fans:data[i][3],nofans[i][4],postclicks:data[i][5],likes[i][6]}, function(err, response) {
		})
	}
}
function read_from_indexedDB(db_name){
	var pouchdb = new Pouch(db_name);
	pouchdb.allDocs({include_docs: true}, function(err, response) {
		db_data = response.rows;
		for(i = 0; i < response.rows.length; i++){
			db_data[i] = [response.rows[i].doc.time, response.rows[i].doc.content, response.rows[i].doc._reach, response.rows[i].doc.fans, response.rows[i].doc.nofans, response.rows[i].doc.postclicks, response.rows[i].doc.likes];
		}
	});
}
function download(data){
	var exp = document.createElement("a");
	exp.innerHTML = '<a id="export" href="#" class="export" display:none>Export Table data into Excel</a>';
	document.body.insertBefore(exp, document.body.lastChild);

	$(document).ready(function () {
		function exportTableToCSV( filename) {
			csv = 'time,content,reach,fans,nofans,postclicks,likes\r\n';
			for(i = 0; i < data.length; i++){
				csv += data[i][0] + "," + data[i][1] + "," + data[i][2] + "," + data[i][3] +"," + data[i][4] +"," + data[i][5] +"," + data[i][6] +"\r\n";
			}
			// Data URI
			csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
			$(this)
				.attr({
				'download': filename,
				'href': csvData,
				'target': '_blank'
			});
		}
		// This must be a hyperlink	
		exportTableToCSV.apply($(".export"), ['export.csv']); 
		var node_export = document.getElementById("export");
		node_export.click();
	});
}
