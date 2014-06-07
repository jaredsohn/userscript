// ==UserScript==
// @name           HitRunDetector
// @namespace      gmtest
// @include        http://animebyt.es/alltorrents.php?*action=history*
// ==/UserScript==

function cleanup(str) {
	/* Small function to cleanup a string, remove html tags, underscores, weird characters etc. */
	str = str.replace(/ \(?(\+|sur)?(\s*a(lt)?.*\.?b.*\.[a-z0-9\.\-_@]+)\s*\)?/ig, '')
		.replace(/(autres? post|\*.*\*)/i, '')
		.replace(/\"/g, '') // "
		//.replace(/\'/g, '') // '  //do not replace '
		.replace(/\./g, ' ') // . --> space
		.replace(/_/g, ' ') // underscore to space
		.replace(/\(/g, ' ')//(
		.replace(/\)/g, ' ')//)
		.replace(/ +/g, ' ') // double spaces
		.replace(/ $/, '') // remove last lonely space
		.replace(/&amp;/g, 'et') 
		.replace(/<\/?[^>]+(>|$)/g, ""); // HTML TAGS
	return str;
}


function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
	//alert(doc_links[i].href);
	if ((doc_links[i].href.match('/torrents.php') || doc_links[i].href.match('/torrents2.php')) && doc_links[i].href.match('id=')){
		//var link_html = trim(doc_links[i].innerHTML);
		GM_log(doc_links[i].href);
		var tr_torrent = doc_links[i].parentNode.parentNode;
		GM_log(tr_torrent.innerHTML);

		var seed = 0;
		if(tr_torrent.getElementsByTagName("td")[4].innerHTML != "--"){
			seed = tr_torrent.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerHTML;
			seed = parseInt(seed);
		}
		GM_log(seed);

		var completion = tr_torrent.getElementsByTagName("td")[3].innerHTML;
		var comp_split=completion.split('(');
		completion = comp_split[1];
		var comp_split=completion.split('%');
		completion = comp_split[0];
		completion = parseInt(completion);
		GM_log("completion="+completion); 

		var taille = tr_torrent.getElementsByTagName("td")[3].innerHTML;
		var taille_split=taille.split(' GB');
		if(taille_split.length > 1){
			taille = taille_split[0];
		}
		else{
			taille = "1";
		}
		taille = parseInt(taille);		
		GM_log(taille);

		var seed_hour = 0;
		if(tr_torrent.getElementsByTagName("td")[7].innerHTML != "Never"){
			var seed_hour_txt = tr_torrent.getElementsByTagName("td")[7].innerHTML;
			GM_log(seed_hour_txt);

			var seed_split = seed_hour_txt.split(" year");
			var seed_year = 0;
			if(seed_split.length > 1){
				seed_year = seed_split[0];
				seed_year = seed_year.replace(" ","");
				seed_year = seed_year.replace(" ","");
				seed_year = seed_year.replace(" ","");
				seed_year = seed_year.replace("s","");
				seed_year = seed_year.replace("and","");
				seed_hour_txt = seed_split[1];
				seed_year = parseInt(seed_year);
			}
			GM_log("year="+seed_year);

			var seed_split = seed_hour_txt.split(" month");
			var seed_month = 0;
			if(seed_split.length > 1){
				seed_month = seed_split[0];
				seed_month = seed_month.replace(" ","");
				seed_month = seed_month.replace(" ","");
				seed_month = seed_month.replace(" ","");
				seed_month = seed_month.replace("s","");
				seed_month = seed_month.replace("and","");
				seed_month = parseInt(seed_month);
				seed_hour_txt = seed_split[1];
			}
			GM_log("month="+seed_month);

			var seed_split = seed_hour_txt.split(" week");
			var seed_week = 0;
			if(seed_split.length > 1){
				seed_week = seed_split[0];
				seed_week = seed_week.replace(" ","");
				seed_week = seed_week.replace(" ","");
				seed_week = seed_week.replace(" ","");
				seed_week = seed_week.replace("s","");
				seed_week = seed_week.replace("and","");
				seed_week = parseInt(seed_week);
				seed_hour_txt = seed_split[1];
			}
			GM_log("week="+seed_week);

			var seed_split = seed_hour_txt.split(" day");
			var seed_day = 0;
			if(seed_split.length > 1){
				seed_day = seed_split[0];
				seed_day = seed_day.replace(" ","");
				seed_day = seed_day.replace(" ","");
				seed_day = seed_day.replace(" ","");
				seed_day = seed_day.replace("s","");
				seed_day = seed_day.replace("and","");
				seed_day = parseInt(seed_day);
				seed_hour_txt = seed_split[1];
			}
			GM_log("day="+seed_day);

			var seed_split = seed_hour_txt.split(" hour");
			var seed_hhour = 0;
			if(seed_split.length > 1){
				seed_hhour = seed_split[0];
				seed_hhour = seed_hhour.replace(" ","");
				seed_hhour = seed_hhour.replace(" ","");
				seed_hhour = seed_hhour.replace(" ","");
				seed_hhour = seed_hhour.replace("s","");
				seed_hhour = seed_hhour.replace("and","");
				seed_hhour = parseInt(seed_hhour);
				seed_hour_txt = seed_split[1];
			}
			GM_log("hhour="+seed_hhour);

			seed_hour = (seed_year*360*24) + (seed_month*30*24) + (seed_week*7*24) + (seed_day*24) + seed_hhour;
			
			GM_log(seed_hour_txt);

		}
		GM_log("NBR heures = " + seed_hour);

		
		var nbr_heure_mini = 72;
		if(taille>10){
			nbr_heure_mini = nbr_heure_mini + ((taille-10)*5);
		}
			
		tr_torrent.getElementsByTagName("td")[7].innerHTML = tr_torrent.getElementsByTagName("td")[7].innerHTML + " (="+seed_hour+"h / " + nbr_heure_mini + "h)";

		var est_ok = true;
		if(completion > 10){
			if(seed<1){
				if(seed_hour < nbr_heure_mini) est_ok = false;
			}
		}

		if(est_ok) tr_torrent.style.backgroundColor='lightblue';
		else tr_torrent.style.backgroundColor='#FCDEDE';
	}
   }

   return links;
}


getLinks();
