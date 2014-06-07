// ==UserScript==
// @name           CR-Publiher 4
// @namespace      Combat Report Publisher 4
// @description    -
// @include        http://s*.*.ikariam.com/index.php?view=militaryAdvisorReportView&combatId=*
// ==/UserScript==

// detect ikariam version for css files used in published report
var ikaVersion = document.getElementsByTagName("link")[1].href.split("/skin/ik_common_")[1].split(".css")[0];

// get report name and date for title of published report
var reportName = document.getElementById("troopsReport").innerHTML.split('<h3 class="header">')[1].split('</span>')[0].replace('<span class="date">','');

// get report id and add some random numbers
var reportId = location.href.split("combatId=")[1];
var publishedReportId = reportId + "-" + Math.floor(Math.random()*10000000);

// ------- INTERFACE ------- //

createBox();

function createBox()
	{
	var element = document.getElementById("backTo");
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="cr_publisher_4">';
	innerHTML += '<h3 class="header">CR-Publisher 4</h3>';
	innerHTML += '<div class="content">';
	innerHTML += '<br><center><div id="cont2"><a class="button" id="publish">Julkaise Taisteluraportti</a></div></center><br>';
	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
	}
	
document.getElementById("publish").addEventListener("click", publishReport, false);


	
function convertSource()
	{
	var source = document.getElementById("troopsReport").innerHTML.replace('<tr class="line"><td colspan="8"></td></tr>',' ').replace('<tr class="line"><td colspan="8"></td></tr>',' ').split('<p class="link">')[0]+'<div class="footer"></div>';

	for (i=0;i<=1000;i++)
		{
		source = source.replace('<a ','<font ');
		source = source.replace('</a>','</font>');
		source = source.replace('Rakennusmateriaali:',' <img src="http://s1.fi.ikariam.com/skin/resources/icon_wood.gif" alt="">')
		source = source.replace('Viini:',' <img src="http://s1.fi.ikariam.com/skin/resources/icon_wine.gif" alt="">')
		source = source.replace('Rikki:',' <img src="http://s1.fi.ikariam.com/skin/resources/icon_sulfur.gif" alt="">')
		source = source.replace('Kristallilasi:',' <img src="http://s1.fi.ikariam.com/skin/resources/icon_glass.gif" alt="">')
		source = source.replace('Marmori:',' <img src="http://s1.fi.ikariam.com/skin/resources/icon_marble.gif" alt="">')
		}
	var crpSource = '<title>'+reportName+'</title>';
	crpSource += '<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">';
	crpSource += '<link href="http://s1.fi.ikariam.com/skin/ik_common_'+ikaVersion+'.css" rel="stylesheet" type="text/css" media="screen" />';
	crpSource += '<link href="http://s1.fi.ikariam.com/skin/ik_militaryAdvisorReportView_'+ikaVersion+'.css" rel="stylesheet" type="text/css" media="screen" />';
	crpSource += '<body id="militaryAdvisorReportView">';
	crpSource += '<center><div id="troopsReport"><br>';
	crpSource += source;
	crpSource += '</div></center>';
	crpSource += '</body>';
	return crpSource;
	}

function publishReport(){
	var s = convertSource();
	var postData = "name="+publishedReportId+"&dcrSource="+escape(s);
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://vilik.org/crpublisher/submit.php",
	  data: postData,
	  headers: {
		"Content-Length": s.length,
		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
	  },
	});
	var click = "this.innerHTML='<b>Linkki</b>'; document.getElementById('c2').innerHTML='BBcode'; document.getElementById('urli').value='http://vilik.org/crpublisher/reports/"+publishedReportId+".html';";
	var click2 = "this.innerHTML='<b>BBcode</b>'; document.getElementById('c1').innerHTML='Linkki'; document.getElementById('urli').value='[url=http://vilik.org/crpublisher/reports/"+publishedReportId+".html]"+reportName+"[/url]';";
	document.getElementById("cont2").innerHTML='<span id="c1" style="cursor:pointer;" onclick="'+click+'"><b>Linkki</b></span> | <span id="c2" style="cursor:pointer;" onclick="'+click2+'">BBcode</span><br><input type="text" style="background-color:#f6ebbc;" onclick="this.select();"  value="http://vilik.org/crpublisher/reports/'+publishedReportId+'.html" size="28" id="urli">';
	}

