// ==UserScript==
// @name          OSNews Premium
// @namespace     http://www.osnews.com/
// @description	Turns OSNews into the Premium Version
// @include       http://www.osnews.com/*
// @exclude       http://www.osnews.com/demo.html
// ==/UserScript==

// Not officially endorsed by OSNews

(function() {
  window.addEventListener("load", function(e) {
	

//	titleBar = '<table width=610 border=1 cellpadding=0 cellspacing=0 bgcolor="#DEDEDE" bordercolor="#666666" bordercolorlight="#999999" class="table">';
	titleBar = '<tr>';
	titleBar += '<td style="border: 0px" align="center" valign="middle" rowspan=2 width=143 bgcolor="#eeeeee"><A HREF="/index.php" TITLE="OSNews Front Page"><IMG SRC="/images/osn.gif" WIDTH=143 HEIGHT=54 BORDER=0 ALT="OSNews Front Page"></A></td>';
	titleBar += '<td style="border: 0px" align="center" width=95 height=27 class="td2"><B><A HREF="/article.php?kind=News&offset=0&rows=70" class="non"><FONT FACE="Arial" Size=2 color="#000000">News Archive</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27 class="td2"><B><A HREF="/article.php?kind=Feature&offset=0&rows=70" class="non"><FONT FACE="Arial" Size=2 color="#000000">Features</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27  class="td2"><B><A HREF="/article.php?kind=Interview&offset=0&rows=70" class="non"><FONT FACE="Arial" Size=2 color="#000000">Interviews</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27  class="td2"><B><A HREF="/article.php?kind=Editorial&offset=0&rows=70" class="non"><FONT FACE="Arial" Size=2 color="#000000">Editorials</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27 class="td2" bgcolor="#eeeeee"><font face="Arial" size=1>';

	titleBar += '<input type="text" size=9 name="search" value="" maxsize=20 maxlength=20 style="background-color: #F6F6F6; color: #FF6600; border-style: groove; border-color: #cccccc">';

	titleBar += '</font></td>';
	titleBar += '</tr>';
	titleBar += '<tr height=27>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27  class="td2"><B><A HREF="/topic.php" class="non"><FONT FACE="Arial" Size=2 color="#000000">View Topics</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=95 height=27  class="td2"><B><A HREF="/submit.php" class="non"><FONT FACE="Arial" Size=2 color="#000000">Submit News</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27  height=29 class="td2"><B><A HREF="/phorum/" class="non"><FONT FACE="Arial" Size=2 color="#000000">OS Forums</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27  class="td2"><B><A HREF="/contact.php" class="non"><FONT FACE="Arial" Size=2 color="#000000">Contact Us</font></a></b></td>';
	titleBar += '<td style="border: 0px" align="center" width=93 height=27 class="td2" bgcolor="#eeeeee"><input SRC="images/go.gif" NAME="submit" TYPE="image" WIDTH=79 HEIGHT=18 alt="Search OSNews" title="Search OSNews"></font></td>';
	titleBar += '</tr>';
//	titleBar += '</table>';


	var tableNodes = document.getElementsByTagName("table"); 

	var tableNew = document.createElement('table');
	tableNew.className = "table";
	tableNew.style.border="1px solid #666";
	tableNew.style.backgroundColor="#DEDEDE";
	tableNew.style.width="610";
	tableNew.style.padding="0px";
	tableNew.style.margin="10px";
	tableNew.innerHTML = titleBar;

	var formNode = document.createElement('form');
	formNode.setAttribute('action','search.php?search=');
	formNode.setAttribute('method','post');
	formNode.style.margin="0px";
	formNode.appendChild(tableNew);

	tableNodes[1].style.width="610px";
	tableNodes[1].style.marginLeft="auto";
	tableNodes[1].style.marginRight="auto";

	tableRows = tableNodes[1].getElementsByTagName("tr");
	rowCells = tableRows[0].getElementsByTagName("td");
	tableRows[0].removeChild(rowCells[0]); 

//	tableNodes[0].parentNode.removeChild(tableNodes[0]);
//	tableNodes[1].parentNode.insertBefore(formNode, tableNodes[1]);
	tableNodes[0].parentNode.replaceChild(formNode, tableNodes[0]);

	var centerNodes = document.getElementsByTagName("center"); 
	for(i=1;i<centerNodes.length;i++){
		if(centerNodes[i].innerHTML.match("pricegrabber")){
			centerNodes[i].style.display="none";
			break;
		}

	} 
  }, false);
})();
