// ==UserScript==
// @name           IMDBParser
// @namespace      http://userscripts.org/users/88478
// @description    Saves Episode Information from IMDB
// @include        http://www.imdb.com/title/*
// ==/UserScript==

episodeList = new Array()


//alert('test');
//If on Sorren importSetValueView
if (location.href.indexOf('/ImportSetValueView.asp') != -1)
{
	try
	{
		

		var loadButton = document.createElement("li");
			loadButton.setAttribute("style", "left: 10px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
			loadButton.innerHTML = "Reload Episodes";
			loadButton.addEventListener('click', loadEpisodeList, false);
			document.getElementById("domBoxBody").appendChild(loadButton);

		var episodeviewLogButton = document.createElement("li");
			episodeviewLogButton.innerHTML = "view episode log";
			episodeviewLogButton.setAttribute("style", "left: 10px;font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
			episodeviewLogButton.addEventListener('click', toggleEpisodeLogBox, false);
			document.getElementById("domBoxBody").appendChild(episodeviewLogButton);

		var episodelogOpen=false;
		var episodeLogBox = document.createElement("div");
			episodeLogBox.innerHTML = GM_getValue('episodeTxt', 'log empty').replace("\n","<br>");
			episodeLogBox.setAttribute("style", "position: absolute; overflow: scroll; right: 100px; top: 21px; width: 800px; height: 250px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999997;");
			document.body.appendChild(episodeLogBox);

			loadEpisodeList();
	}
	catch (ex)
	{
		alert(ex);
	}

	try
	{
		var episodes=document.evaluate("//form[@class='episodeForm']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//		alert(episode.snapshotLength);
		var setNum=document.getElementById("setNum").innerHTML;

		for (var index=0;index<episodes.snapshotLength ;index++ )
		{
			var episode=episodes.snapshotItem(index);
			var episodeNum=index+1
			var addButton = document.createElement("div");
			addButton.setAttribute("style", "padding: 15px; font-family: tahoma; font-size: 15pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
			addButton.innerHTML="&lt;--Update from episode log";
			var episodeButtonBoxID="episodeButtonBox" + episodeNum;
			addButton.setAttribute('SetNum',setNum);
			addButton.setAttribute('EpisodeNum',episodeNum);
			addButton.addEventListener('click', addEpisodeInfo, false);

/*
			if (index==3)
			{
				alert(episodeButtonBoxID);
			}
*/
			document.getElementById(episodeButtonBoxID).appendChild(addButton);

		}

	}
	catch (ex)
	{
		alert(ex);
	}

}



//If on IMDB episode list
if (location.href.indexOf('/episodes') != -1)
{

	try
	{
		var saveButton = document.createElement("div");
			saveButton.setAttribute("style", "position: absolute; left: 5px; top: 55px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
			saveButton.innerHTML = "Save Episodes";
			saveButton.addEventListener('click', saveEpisodeList, false);
			document.body.appendChild(saveButton);

		var episodeviewLogButton = document.createElement("div");
			episodeviewLogButton.innerHTML = "view episode log";
			episodeviewLogButton.setAttribute("style", "position: absolute; left: 5px; top: 70px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
			episodeviewLogButton.addEventListener('click', toggleEpisodeLogBox, false);
			document.body.appendChild(episodeviewLogButton);

		var episodelogOpen=false;
		var episodeLogBox = document.createElement("div");
			episodeLogBox.innerHTML = GM_getValue('episodeTxt', 'log empty').replace("\n","<br>");
			episodeLogBox.setAttribute("style", "position: absolute; overflow: scroll; right: 100px; top: 21px; width: 800px; height: 250px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999997;");
			document.body.appendChild(episodeLogBox);


	}
	catch (ex)
	{
		alert(ex);
	}

	try
	{
		var content=document.getElementById("tn15content");
		var episodes=document.evaluate("//td[h3]",content,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		for (var index =0;index<episodes.snapshotLength ;index++ )
		{
			var title=episodes.snapshotItem(index).getElementsByTagName('h3')[0]
			var link=title.getElementsByTagName("a")[0]
			var name = link.innerHTML;

			var a=/Season (\d+),/.exec(title.innerHTML);
			var setNum=a[1];
			var a=/Episode (\d+):/.exec(title.innerHTML);
			var episodeNum=a[1];



			var outerH3=episodes.snapshotItem(index).getElementsByTagName('h3')[0];
			var outerSpan=episodes.snapshotItem(index).getElementsByTagName('span')[0];
			var outerBr=episodes.snapshotItem(index).getElementsByTagName('br')[0];


			episodes.snapshotItem(index).removeChild(outerH3);
			episodes.snapshotItem(index).removeChild(outerSpan);
			episodes.snapshotItem(index).removeChild(outerBr);


try
{
			var outerH5=episodes.snapshotItem(index).getElementsByTagName('h5')[0];
			var outerTable=episodes.snapshotItem(index).getElementsByTagName('table')[0];
			episodes.snapshotItem(index).removeChild(outerH5);
			episodes.snapshotItem(index).removeChild(outerTable);	
}
catch (ex)
{
}

			var descr = episodes.snapshotItem(index).innerHTML.replace(/^\s+|\s+$/g,"");

			descr=descr.replace("<br>","");



			var descrDiv = document.createElement('div');
			descrDiv.innerHTML=descr;

			
			episodes.snapshotItem(index).innerHTML="";
			episodes.snapshotItem(index).appendChild(outerH3);
			episodes.snapshotItem(index).appendChild(outerSpan);
			episodes.snapshotItem(index).appendChild(outerBr);
			episodes.snapshotItem(index).appendChild(descrDiv);

//			descr=descr.ltrim().rtrim();





			episodeList[index]=new Array(index, setNum, episodeNum, name, descr);

		}
		
	
	}
	catch (ex)
	{
		alert(ex);
	}



}


function saveEpisodeList()
{
//	alert('test');
	try
	{
	
		var episodeTxt="";
		for (var i=0; i<episodeList.length; i++)
			episodeTxt = episodeTxt + episodeList[i][0] + '~' + episodeList[i][1] + '~' + episodeList[i][2] + '~' + episodeList[i][3] + '~' + episodeList[i][4] + "\n";
		GM_setValue('episodeTxt', episodeTxt);
		alert('Episode List Saved');
	}
	catch (ex)
	{
		alert(ex);
	}
}

function loadEpisodeList()
{
	try
	{
		var episodes=GM_getValue('episodeTxt','').split("\n");
		for (var i=0; i<episodes.length; i++)
		{
			episodeList[i]=episodes[i].split("~");
		}
//		alert('Episode List Loaded');
	}
	catch (ex)
	{
		alert(ex);
	}
}

function addEpisodeInfo(evt)
{
	try
	{
		setNum=evt.target.getAttribute('SetNum');
		episodeNum=evt.target.getAttribute('EpisodeNum');

		for (var i=0; i<episodeList.length; i++)
		{
			if (episodeList[i][1]==setNum && episodeList[i][2]==episodeNum)
			{
				document.getElementById("episodeName" + episodeNum).value=episodeList[i][3];
				document.getElementById("episodeDescr" + episodeNum).value=episodeList[i][4];
				//alert(episodeList[i][0] + '~' + episodeList[i][1] + '~' + episodeList[i][2] + '~' + episodeList[i][3] + '~' + episodeList[i][4] + "\n");

				var updateButton=document.getElementById("episodeUpdateButton" + episodeNum);
				updateButton.click();
//				var form=document.getElementById("episodeForm"+episodeNum);
//				var SeriesID=form.getElementsByTagName("input")[0].innerHTML;
		//		alert(form.SeriesID.value);
//				var episodeName=document.getElementById("episodeName"+episodeNum).value;
//				var episodeDescr=document.getElementById("episodeDescr"+episodeNum).value;

//				alert(form.getElementsByTagName("input")[0]);
//				url='ImportSetAction.asp?SeriesID=' + escape(form.SeriesID.value) + '&SetNum=' + escape(form.SetNum.value) + '&DiskNum=' + escape(form.DiskNum.value) + '&DiskEpisodeNum=' + escape(form.DiskEpisodeNum.value) + '&EpisodeNum=' + escape(form.EpisodeNum.value) + '&EpisodeName=' + escape(episodeName) + '&EpisodeDescr=' + escape(episodeDescr) + '&action=updateepisode'
//				request.open("GET", url); 
//				alert(url);


				return;
			}
		}

	}
	catch (ex)
	{
		alert(ex);
	}


}


function toggleEpisodeLogBox()
{
    if(episodelogOpen == false)
    {
        episodelogOpen = true;
        episodeviewLogButton.innerHTML = "hide episode log";
        episodeLogBox.innerHTML = GM_getValue('episodeTxt', 'log empty').replace(/\n/g,"<br>");

        episodeLogBox.style.visibility = "visible";
    }
    else
    {
        episodelogOpen = false;
        episodeviewLogButton.innerHTML = "view episode log";
        episodeLogBox.style.visibility = "hidden";
    }
}


