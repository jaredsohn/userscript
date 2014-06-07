// ==UserScript==
// @name          Download songs from music.pz10.com.
// @description   Adds wma download links to music.pz10.com.
// @copyright     SurinderSingh (surindersingh83_ece@yahoo.com)
// @include       http://player.pz10.com/player/*
// ==/UserScript==

function main() {
	var object1 = document.getElementById('mediaPlayer');
	var params  = document.getElementsByTagName('param');
	var filepath = params[0].getAttribute('value');
	getfiles('http://player.pz10.com/player/'+filepath);
}
function getfiles(url){ 
    var xhr; 
    xhr = new XMLHttpRequest();  
    xhr.onreadystatechange  = function(){ 
         if(xhr.readyState  == 4){
              if(xhr.status  == 200){
					var files_div 				= document.createElement('div');				
					files_div.innerHTML 		= xhr.responseText;
					var play_list 				= document.getElementsByClassName('sizedplaylist');					
					//alert(files_div.innerHTML);
					var new_list 				= play_list[0].innerHTML.replace(/[0-9*]\./g,'');					
					new_list 					= new_list.replace(/<b>/g,'');
					list_array 					= new_list.split('<br>');
					var song_title_array     	= files_div.getElementsByTagName('title');
					var song_file_path_array 	= files_div.getElementsByTagName('ref');
					//alert(song_file_path_array[0].getAttribute('href'));
					play_list[0].innerHTML 		= "<b style='font-size:12px;color:#ff0000;'>Right click on download link and save it</b><br>";
					for(var i=0;i<list_array.length; i++){						
						song_title 					= list_array[i];						
						play_list[0].innerHTML  	+="<b>"+(i+1)+". "+song_title+" <a target='_blank' href='"+song_file_path_array[i].getAttribute('href')+"' >Download</a></b><br>";
					}				
			  }else{
				  //
			  }
         }
    }; 
   xhr.open('GET', url,  true); 
   xhr.send(null); 
}     
window.addEventListener('load', main, false);