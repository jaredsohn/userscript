// ==UserScript==
// @name           Facepunch Alt Finder
// @namespace      fp-alt
// @description    List User's alt accounts
// @include        http://facepunch.com/*
// ==/UserScript==

function openAlts(userid){
	alert(userid);
	return true;
}


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	//Check if posts exists
	
	var image = ""
	
	if($("#posts").length>0){
		console.info("This is a thread.");
		
		//////////////
		var userid, hash,username, hashes = [],hashjson;
		/////////////
		
		$(".postcontainer").each(function(index,val){
			userid = $(this).find("a.username").attr("href");
			userid = userid.replace("members/","");
			userid = parseInt(userid);
			
			username = $(this).find("a.username").html();
			
			
			hash = $(this).find(".postlinking").children("a").attr("href");
			if(hash = hash.replace("http://flagdog.facepunchstudios.com/?ipe=","")){
				hash = hash.replace("&get=info","");
				hashes[index] = [userid,hash,username];
			}
			
			$(this).find(".postlinking").append("<a href='javascript:void(0);' class='openAlts' userid='"+userid+"' hash='"+hash+"'><img alt=\"\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAINSURBVBgZBcG/r55zGAfg6/4+z3va01NHlYgzEfE7MdCIGISFgS4Gk8ViYyM2Mdlsko4GSf8Do0FLRCIkghhYJA3aVBtEz3nP89wf11VJvPDepdd390+8Nso5nESBQoq0pfvXm9fzWf19453LF85vASqJlz748vInb517dIw6EyYBIIG49u+xi9/c9MdvR//99MPPZ7+4cP4IZhhTPbwzT2d+vGoaVRRp1rRliVvHq+cfvM3TD82+7mun0o/ceO7NT+/4/KOXjwZU1ekk0840bAZzMQ2mooqh0A72d5x/6sB9D5zYnff3PoYBoWBgFKPKqDKqjCpjKr//dcu9p489dra88cydps30KswACfNEKanSaxhlntjJ8Mv12Paie+vZ+0+oeSwwQ0Iw1xAR1CiFNJkGO4wu3ZMY1AAzBI0qSgmCNJsJUEOtJSMaCTBDLyQ0CknAGOgyTyFFiLI2awMzdEcSQgSAAKVUmAeNkxvWJWCGtVlDmgYQ0GFtgg4pNtOwbBcwQy/Rife/2yrRRVI0qYCEBly8Z+P4qMEMy7JaVw72N568e+iwhrXoECQkfH91kY7jwwXMsBx1L93ZruqrK6uuiAIdSnTIKKPLPFcvay8ww/Hh+ufeznTXu49v95IMoQG3784gYXdTqvRmqn/Wpa/ADFX58MW3L71SVU9ETgEIQQQIOOzub+fhIvwPRDgeVjWDahIAAAAASUVORK5CYII=\" /></a>");
			
			
			//$(this).find(".postbody").prepend("<div style='color:rgba(0,0,0,.6);font-size:16px;float:right;margin-bottom:12px;margin:10px;clear:both;'>User ID: "+userid+" | Hash: "+hash+"</div>");
		});
		
		$(".openAlts").click(function(){
			hash = $(this).attr("hash");
			userid = $(this).attr("hash");
			var div = CreateFloatingDiv( MouseX, MouseY, 'Alts_' + userid, 'report');
			div.innerHTML = "Wait...";
			
			$.ajax({
				type: "POST",
				url: "http://jessecar96.net/fpalts.php",
				data: "hash="+hash,
				success: function(html){
					div.innerHTML = html;
				}
			});
			
		});
		
		hashjson = JSON.stringify(hashes);
		
		$.ajax({
			type: "POST",
			url: "http://jessecar96.net/fpalts.php",
			data: "array="+hashjson,
			success: function(html){
  				console.log(html);
  			}
		});
	}
	
}

addJQuery(main);

