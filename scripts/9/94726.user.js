// ==UserScript==
// @name           bvs_snakeman
// @namespace      SirDuck36
// @description    snakeman science
// @include        http://*animecubed.com/billy/bvs/partyhouse*
// ==/UserScript==


// global data
var data = new Object();

function LoadData()
{
    // Load data
    var strData = GM_getValue("SNAKEMAN_data", null);
    if (strData)
    {
	var arrTemp = strData.split("\n");
	for (var i=0;i<26;i++)
	{
	    var tmp = arrTemp[i].split(":");
	    data[tmp[0]] = tmp[1].split(" ");
	}
    }
    else
    {
	data = {
	    a0: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a11: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a100: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
	    a200: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a300: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a400: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
	    a500: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a750: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
	    a1K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a2K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
	    a3K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a4K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a5K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a6K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a7K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a8K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a9K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a10K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a20K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a30K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a40K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a50K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a75K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a100K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a200K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), 
	    a500K: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
	};
    }
}

function ShowData()
{
    // Show the data
    var strDisp = '<div style="background-color:white; width:250px; height:250px; overflow-x:auto;'
	+ 'overflow-y:auto; left:5px; top:150px; position: fixed;"><table>';
    for (var j in data)
	strDisp += '<tr><td>' + j + '</td><td>' + data[j].join('</td><td>') + '</td></tr>';
    strDisp += '</table></div>';

    document.body.innerHTML = strDisp + document.body.innerHTML;
}

function SaveData()
{
    // Save the data
    var strData = "";
    for (var j in data)
    {
	strData += j + ":" + data[j].join(" ") + "\n";
    }
    
    GM_setValue("SNAKEMAN_data", strData);
}

function GatherData()
{
    var arrMsg = new Array(); 

    LoadData();
	
    // Gather data
    var snapBucketList = document.evaluate("//table/tbody/tr/td/img", document, null,
					   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var arrMsg = new Array();
    
    var i;
    var count = 0;
    for (i=0; i<snapBucketList.snapshotLength; i++)
    {
	var snap = snapBucketList.snapshotItem(i);
	
	var temp = /billy\/layout\/snake_bucket\/snake_bucket_(.*)\.gif/.exec(snap.src);
	
	if (temp)
	{
	    data["a" + temp[1]][count]++;
	    count++;
	}
    }

    SaveData();
}

function PlaySnake()
{
    var mini = 0;
    for (var i=1; i<26; i++)
	if (data.a0[i] > data.a0[mini])
	    mini = i;

    unsafeWindow.snakecheck('newsnkbox' + (mini+1));

    document.evaluate("//input[@name='start_snake' and @type='checkbox']", document, null, 
		      XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.checked = true;

    document.evaluate("//input[@name='quick_burn' and @type='checkbox']", document, null, 
		      XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.checked = true;

    unsafeWindow.document.newsnake.submit();
}

function KeyCheckSnakeman(event)
{
    var KeyID = event.keyCode;

    if (KeyID == 192)
    {
	if (unsafeWindow.document.newsnake)
	    PlaySnake();
	else
	{
	    LoadData();
	    ShowData();
	}
    }
}

document.documentElement.addEventListener("keyup", KeyCheckSnakeman, true);


// Page load code

if (document.body.innerHTML.indexOf("You burned your Bucket!") > -1)
{
    GatherData();
    ShowData();
}