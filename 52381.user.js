// ==UserScript==
// @name		MyEpisodes->Binsearch	
// @namespace    	http://www.quilliam.info
// @description	  	Add links to Binsearch search on MyEpisodes.com
// @include       	http://www.myepisodes.com/*
// @include		http://*myepisodes.com/*
// ==/UserScript==

(function() {
	function Tracker(shortname, icon, searchurl, useNumbers) {
		this.shortname = shortname;
		this.icon = icon;
		this.searchurl = searchurl;
		this.useNumbers = useNumbers;
		
		this.getHTML = function (quary) {
			var html = "<font face=\"Verdana, Arial, Helvetica, sans-serif\" size=\"-2\"><b>" +
							"<a target=\"_blank\" href=\"" + this.searchurl;	
			html += escape(quary);
			html += "\">";

			if (this.icon != "") {
				html += "<img width=\"14\" heigth=\"14\" border=\"0\" src=\"" + this.icon + "\" alt=\"" + this.shortname + "\">";
			} else {
				html += this.shortname;
			}
			html += "</a></b></font>";
			return html;
		}
	}
	
	
	function addnzbsWatch(usenet) {
	
		var rows = document.getElementsByTagName('table')[2].getElementsByTagName('tr');

		for(var i = 0; i < rows.length; i++){
			var nzbtd = document.createElement("td");
			if(i==0){
				nzbtd.innerHTML = "Download";
				nzbtd.style.borderBottom = "solid 1px black";
				
			}else if (rows[i].childNodes.length > 10 && rows[i].childNodes[1].getElementsByTagName('a').length>0){

				var name = rows[i].childNodes[3].childNodes[1].textContent;
			//	var episode = removeZero(rows[i].childNodes[9].textContent.substring(7,9)) 
			//			+ " " + removeZero(rows[i].childNodes[9].textContent.substring(10,12));
				var episode = "S" + rows[i].childNodes[9].textContent.substring(7,9) 
						+ "E" + rows[i].childNodes[9].textContent.substring(10,12);

				nzbtd.appendChild(createLinks(usenet, name, episode));
			}
			rows[i].appendChild(nzbtd);
		}
	}

	function addnzbsList(usenet) {
	
		var rows = document.getElementsByTagName('table')[4].getElementsByTagName('tr');

		for(var i = 0; i < rows.length; i++){
			var nzbtd;
			if(i==0){
				nzbtd = document.createElement("th");
				nzbtd.innerHTML = "Download";
			}else{
				nzbtd = document.createElement("td");
				var name = rows[i].childNodes[3].childNodes[0].textContent;
	//			var episode = removeZero(rows[i].childNodes[5].textContent.substring(0,2)) 
	//					+ " " + removeZero(rows[i].childNodes[5].textContent.substring(3,5));
				var episode = "S" + rows[i].childNodes[5].textContent.substring(0,2) + "E" + rows[i].childNodes[5].textContent.substring(3,5);
				nzbtd.className = "status"; 
				nzbtd.appendChild(createLinks(usenet, name, episode));
			}
			rows[i].appendChild(nzbtd);
		}
	}

	function removeZero(num){
		if(num.substring(0,1) == "0"){
			return num.substring(1,2);
		} else{
			return num;
		}
	}

	function createLinks(usenet, quary, episode){
		var div = document.createElement("div");
		for (var j = 0; j < usenet.length; j++){
			var search;

			if(usenet[j].useNumbers){
				search = quary + " " + episode;
			} else{
				search = quary;
			}

			div.innerHTML += usenet[j].getHTML(search);
			div.innerHTML += "&nbsp";
		}
		return div;
	}

	function getTitle(){
		return document.getElementsByTagName('title')[0].textContent
	}
	
	
	// --------------- usenet --------------- 
	var usenet = new Array();
	usenet.push(new Tracker("Binsearch", "http://binsearch.info/favicon.ico", "http://binsearch.info/index.php?m=&max=25&adv_g=&adv_age=999&minsize=&maxsize=&font=&postdate=&q=", true));

	// --------------- END OF usenet --------------- 

	if(getTitle() == "MyEpisodes.com: SeriesWatch"){
		addnzbsWatch(usenet);
	} else if(getTitle() == "MyEpisodes.com: Private Show List"){
		addnzbsList(trackers);
	}	
	
})();
