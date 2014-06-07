// ==UserScript==
// @name           Youtube Quicklist QuickAdd
// @namespace      ACMB
// @description    Allows seperate parts of a multipart video to be added to the Quicklist
// @include        http://www.youtube.*/results?search_query=*
// @include        http://youtube.*/results?search_query=*
// ==/UserScript==


var k=0;
var vids = new Array(1);
var eps = new Array(1);

var d = document.getElementById('video_grid');
if (d)
{
var a = d.getElementsByTagName("div");
for(i=0;i<a.length;i++)
	{
	if(a[i].className == "vlepisode-inner")
		{
		b = a[i].getElementsByTagName("a");
		if(b){
		for (j=0;j<b.length;j++)
			{
			var vidcode = b[j].href.split("=")[1];
			if(vidcode){
					b[j].id = "ACMB" + k;
					var partt = b[j].innerHTML.split("part ")[1];
					partt = partt.split(" ")[0];
					b[j].name = partt;
					vids[k] = vidcode;
					partt = partt - 0;
					eps[partt] = vidcode;
					k++;
					}
			}
			thispart = a[i].innerHTML.substring(a[i].innerHTML.lastIndexOf(" ",a[i].innerHTML.indexOf("</b>"))+1,a[i].innerHTML.indexOf("</b>")) - 0;
			vidcode = a[i].parentNode.parentNode.innerHTML.split("watch?v=")[1].split("\"")[0];
			eps[thispart] = vidcode;
			vids[k] = vidcode;
			a[i].innerHTML = a[i].innerHTML.substr(0,a[i].innerHTML.indexOf("<b ")) + "<span id=\"ACMB"+k+"\" name=\"" + thispart + "\" ><strong>part "+thispart+"</strong></span>" + a[i].innerHTML.substr(a[i].innerHTML.indexOf("</b>")+4);
			k++;
			f = a[i].innerHTML + "<span class=\"vlepisode-sep\"> - <small><a href=\"watch?v="+eps[1]+"&playnext=1\" title=\"Add all (in order) to QL first, then click here to watch from Part 1\" >Watch Quicklist from Part 1 (add first)</a><small></span>";
			a[i].innerHTML = f;
			}
		  }  
	}
		
}	
var newbumpf = "";
var bumpf = new Array(2);

	bumpf[0] = " <a class=\"nowrap\" href=\"#\" title=\"Add Video to QuickList\" onclick=\"clicked_add_icon(this, '";
	bumpf[1] = "', 0);_hbLink('QuickList+AddTo','na');return false;\" >[+]</a>";
	
for(i=0;i<k;i++)
	{
	n = "ACMB" + i;
	a = document.getElementById(n);
	vidcode = vids[i];
	partt = a.innerHTML.substr(a.innerHTML.indexOf("part "));
	newbumpf = bumpf.join(vidcode);
	a.innerHTML = partt + newbumpf;
	}
