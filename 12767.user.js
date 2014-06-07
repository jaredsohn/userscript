// ==UserScript==
// @name           IES-HKLD Plus
// @namespace      mailto:ch_xxvi@yahoo.com.hk
// @version        0.5.0
// @include        http://www*.vst.jobs.gov.hk/SrchNewJob/SrchNewJobMain.aspx*
// @include        http://sc.jobs.gov.hk/*/www.vst.jobs.gov.hk/SrchNewJob/SrchNewJobMain.aspx*
// @include        http://www*.vst.jobs.gov.hk/jobCard/JobCardMain.aspx*
// @include        http://sc.jobs.gov.hk/*/www.vst.jobs.gov.hk/jobCard/JobCardMain.aspx*
// ==/UserScript==


// Define objects
document = unsafeWindow.document;


if (window.location.href.indexOf("/SrchNewJob/")>=0) {
	// Define objects
	ListArea = document.getElementsByTagName('table')[4];
	ListHead = document.getElementsByTagName('table')[10];
	ListBody = document.getElementsByTagName('table')[11];

	ListLayer = document.createElement('div');

	CardLayer = document.createElement('div');
	CardFrame = document.createElement('iframe');
	CardFrame.name = 'CardFrame';

	// Altering properties of job list
	// list head
	{
	  innerRow = ListHead.rows[0];
	  innerRow.cells[3].width = 90;
	  innerRow.cells[7].width = 140;
	  innerRow.cells[7].align = 'center';
	  innerRow.cells[9].width = 120;
	  innerRow.cells[9].align = 'center';
	}
	// list body
	function extractParam(str) {
	  //tmp = str.substr(str.indexOf("rowOnClick('")+1);
	  //tmp = tmp.substr(0,tmp.indexOf("')");
	  tmp = str.substr(24);
	  tmp = tmp.substr(0,tmp.length-2);
	  return tmp.split("', '");
	}
	for (i=1; i<=ListBody.rows.length; i+=2) {
	  ListBody.rows[i].style.cursor = 'pointer';
	  innerRow = ListBody.rows[i].cells[1].getElementsByTagName('table')[0].rows[0];
      var br = innerRow.cells[3].getElementsByTagName("br")[0];
      br.parentNode.removeChild(br);
	  innerRow.cells[3].width = 90;
	  innerRow.cells[7].width = 140;
	  innerRow.cells[9].width = 120;
	  // correct hyperlink method
	  p = extractParam(ListBody.rows[i].getAttribute('onclick'));
	  url = '/jobCard/JobCardMain.aspx'+window.location.search+'&OrdNo='+p[0]+'&PoundSign='+p[1]+'&OrdPgSeq='+p[2];
	  ListBody.rows[i].onclick = eval("function(){open('"+url+"','CardFrame')}");
	}

	// Put objects
	document.body.innerHTML = '';
	ListLayer.appendChild(ListArea);
	document.body.appendChild(ListLayer);
	document.body.appendChild(CardFrame);
	ListArea.rows[0].style.display = 'none'; 
	ListArea.rows[2].style.display = 'none'; 

	// Define objects' style
	ListLayer.style.position     =  'absolute';
	ListLayer.style.overflow     =  'auto';
	CardFrame.style.position     =  'absolute';
	CardFrame.style.display      =  'block';
	CardFrame.style.border       =  0;
	function remakeuppage() {
	  ListLayer.style.width      =  window.innerWidth;
	  CardFrame.style.width      =  window.innerWidth;
	  if (CardFrame.contentWindow.location=='about:blank') {
	    ListLayer.style.top      =  0;
	    ListLayer.style.height   =  window.innerHeight;
	    CardFrame.style.display  =  'none';
	  }
	  else {
	    ListLayer.style.top      =  0;
	    ListLayer.style.height   =  window.innerHeight*3/5;
	    CardFrame.style.top      =  window.innerHeight*3/5+1;
	    CardFrame.style.height   =  window.innerHeight*2/5-2;
	    CardFrame.style.display  =  '';
	  }
	}
	unsafeWindow.onresize = remakeuppage;
	CardFrame.onload = remakeuppage;
	remakeuppage();
}


else if (window.location.href.indexOf("/jobCard/")>=0) {
	table0 = document.getElementsByTagName('table')[7].cloneNode(true);
	table1 = document.getElementsByTagName('table')[8].cloneNode(true);
	document.body.innerHTML = '';
	document.body.appendChild(table1);
	document.body.appendChild(table0);

	table1.width = 480;

	cells = table1.getElementsByTagName('td');
	table1.rows[0].cells[0].onclick = function() {
	  paragraph='';
	  for (i=1; i<cells.length-2; i++) {
	    paragraph +=
	      //cells[i].innerHTML.replace('<br>　　','');
	      '<b>'+cells[i].childNodes[1].textContent+'</b>\t'+
	      cells[i].childNodes[3].textContent.replace('　　','')+'<br/>';
	  }
	  paragraph += cells[cells.length-1].textContent;
	  table1.innerHTML = paragraph;
	  table1.ondblclick = null;
	}
}