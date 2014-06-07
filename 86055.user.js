// ==UserScript==
// @name           Record CF Links plus Stats
// @namespace      http://*kingsofchaos.com/*
// @description    Record CF Links
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// ==/UserScript==


(function(){

var am = 0;
var CurrentURL = document.URL
TehURL = CurrentURL.split(".com/");
TehURL = TehURL[1].split(".php");

//recordLink();

if (TehURL[0] == "click") {
//recordLink();
}



if (TehURL[0] == "battlefield") {


Battlefield();
}


if (TehURL[0] == "stats") {
CF_Stats();
}




})();




function check()
{


  GM_xmlhttpRequest({
    method: "GET",
     url: "http://www.kingsofchaos.com/buddylist.php",
     onload: function(xhr) { 
	 
		var sid = xhr.responseText.split("stats.php");
		if(sid.length < 10)
		{
		
			var stuff = document.body.innerHTML;
			var np = "http://www.kingsofchaos.com/battlefield.php?start=" + FindText(stuff,'td colspan="2"><a href="battlefield.php?start=','">');
			window.location = np;
//			alert(np);
		}else{
		
				get("http://www.kingsofchaos.com/recruit.php", function(xx) {
					var rid = FindText(xx,"&uniqid=",'"');
					var sid = FindText(xx,"stats.php?id=",'"');
						bah = 'user_id=' + sid + '&buddy_type=none';
						get("http://shane.skaro.ws/recruiters/admin/gm_Addlink2.php?id=" + rid + "&sid=" + sid, function(yy) {
							Buddy(bah, function(aa) {
							
							});
						});
				});
		
			setTimeout(check, 1500);
		}
		
	 }
  });
	

}


function getBuddy()
{

	gb("http://www.kingsofchaos.com/buddylist.php", function(x){
		var sid = x.split("stats.php");
		return sid.length;
	})

}


function CF_Stats()
{


var stuff = document.body.innerHTML;

c = stuff.split("table_lines officers");
c = c[1].split("officers total");
c = c[0].split("stats.php?id");

	for (i=1;i<c.length;i++)
	{
		
		
		
			var bah = 'user_id=' + FindText(c[i],"=",'"') + '&buddy_type=friend';
			//alert(bah);
			Buddy(bah, function(responseText) {
				//recordLink();
			});
		
	}

}

function Battlefield()
{

setTimeout(check, 1500);

const bsRE=/\?\?\? Gold/ig;
const goldRE=/>([0-9,]+) Gold/ig;
const trRE=/\<tr\>/ig;
cands=document.getElementsByTagName("tr");
var usetgold = '';
		//recordLink();
	//	recordLink();

	var alltables = document.getElementsByTagName('table');
	for (i=0;i<alltables.length;i++)
	{
		if(alltables[i].rows[0].cells.length>1){
			if(alltables[i].rows[0].cells[1].innerHTML.match("Alliance"))
			{
				var ms_table = alltables[i];
			}
		}
	}
	rows = ms_table.rows;
	ii=0;
	iii=0;

	var ids=Array();

	for (i=1;i<rows.length-1;i++)

	{
	

			ids[ii]=rows[i].cells[2].childNodes[0].href.replace("http://www.kingsofchaos.com/stats.php?id=","");
	
		//}
		
		//    
		


			var bah = 'user_id=' + ids[ii] + '&buddy_type=friend';
			
			Buddy(bah, function(responseText) {
				
				get("http://www.kingsofchaos.com/recruit.php", function(xx) {
					var rid = FindText(xx,"&uniqid=",'"');
					var sid = FindText(xx,"stats.php?id=",'"');
						bah = 'user_id=' + sid + '&buddy_type=none';
						get("http://shane.skaro.ws/recruiters/admin/gm_Addlink2.php?id=" + rid + "&sid=" + sid, function(yy) {
							Buddy(bah, function(aa) {
							
							});
						});
				});
				
			});
					ii++;
		

	}
		
	//	recordLink();




}







function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { 
//alert(xhr.responseText);
	cb(xhr.responseText); 	 
	 }
  });
}


function getx(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { 
alert(xhr.responseText);
	//cb(xhr.finalUrl); 	 
	 }
  });
}


function gb(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { 
	 
//alert(xhr.responseText);
		var sid = xhr.split("stats.php");
		cb(sid.length);
		
	 }
  });
}

function get1(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { 

	cb(xhr.responseText); 	 
	 }
  });
}

 function Buddy(data,cb){
   GM_xmlhttpRequest({
    method: "POST",
    url: 'http://www.kingsofchaos.com/addbuddy.php',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(xhrx) { cb(xhrx.responseText); }
  });
  }
  
  

  
  function InStr(strSearch, strFind)
{
	strSearch = String(strSearch);
	strFind = String(strFind);
	return (strSearch.indexOf(strFind) >= 0);
}




function FindText(str, str1, str2)
{
  var pos1 = str.indexOf(str1);
  if (pos1 == -1) return '';
  
  pos1 += str1.length;
  
  var pos2 = str.indexOf(str2, pos1);
  if (pos2 == -1) return '';
  
  return str.substring(pos1, pos2);
}