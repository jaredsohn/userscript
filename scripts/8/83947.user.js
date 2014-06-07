// ==UserScript==
// @name           The-West Forum: Son Mesaj
// @namespace      www.the-west.org
// @description    Şehir forumunda "Son Mesaj" sütununa, konularda yazılmış olan son mesaja giden bir kısayol ekler.
// @include        http://*.the-west.*/forum.php*
// @include        http://*.innogames.*/forum.php*
// @author         Shulik
// @version        0.1
// ==/UserScript==


(function(){
	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements);
	}
	
	c = getElementsByClassName(document,"table","forum_table")[0];
	trs = c.getElementsByTagName("tr");
	for(i=1;i<=trs.length;i++) {		
		tds=trs[i].getElementsByTagName("td");
		themelink = tds[0].getElementsByTagName("a")[0].getAttribute('href');
		answers = tds[4].childNodes[0].nodeValue;
		lastpostauthor = tds[3].getElementsByTagName("a")[0];
		lastpostauthorparent = lastpostauthor.parentNode;
		temp = document.createElement('div');
		author = document.createElement('a');
		author.setAttribute('href',lastpostauthor.getAttribute('href'));
		author.innerHTML=lastpostauthor.childNodes[0].nodeValue+" ";
		temp.appendChild(author);
		page = Math.floor(answers/10);
		jump = document.createElement('a');
		jump.setAttribute('href',themelink+"&page_current="+page);
		jump.innerHTML="<img src='data:image/gif;base64,R0lGODlhDAAMAPUAAEYwJkAqJDcjHlM2L0w1K2hIO2BBNDgjHUwxKpeLeTUhHFAwJkIrJGVIOUovKI6AfGJFOFU8MHBPP2VCOGpKO084K5GDfb2umFM1LU84LUo1KkgzKWI/NDolHkwsI2M/NGA9NF47M35gWVU1K/v5+D0mIWtMPTklHjgjHk43K62fi0QrJVIzLE4xKlw6L0ctJmtMO4BjXF07MjYiHYx/fE4zLKWXhK6gi83ArEIrJfLu6V4+Nf///wAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAZiwJhIJvtwQJ6FLISRkHTQKPQSKeBqudpuu70RDLgczxJATLoAWJjHpgVau1vFtGa3B7cMpW6n4VNWYm0MDnFfaw8rLC4jcQANV1lcXRoQKjaYmZgJGy8lMzMdJygKBzMCAkEAOw%3D%3D'/>";
		temp.appendChild(jump);
		lastpostauthorparent.replaceChild(temp,lastpostauthor); 
		lastpostauthorparent.removeChild(lastpostauthorparent.getElementsByTagName("br")[0]);
	}
})();
/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_69', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_69', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=69&version=0.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();