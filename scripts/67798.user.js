// ==UserScript==
// @name           LiveJournal Savedraft
// @namespace      blog.laptev.info
// @description    Save posting draft
// @version    1.0
// @include        http://*.livejournal.com/*
// ==/UserScript==

GM_registerMenuCommand( "Remember draft", TRem );
GM_registerMenuCommand( "Show and insert drafts", TIns );
var showed = '0';
var drafts = [];

try
  {
cook = GM_getValue("DRAFTS");
drafts = cook.split("*****");
var tmp = cook;

}
  catch(ex)
  { 
    //alert(ex);
GM_setValue("DRAFTS", "");
tmp = "";
  } 
try
  {
var zls = document.getElementById('lj_controlstrip_user');
zls.innerHTML = zls.innerHTML+'·<a href="http://www.livejournal.com/inbox/">Messages</a>';
}
  catch(ex)
  { 
  } 

var zpmenu = document.getElementById('ljbreadcrumbs');
zpmenu.innerHTML = '<a href="javascript:lins()">Remember </a>·<a href="javascript:lsh()">Show/hide drafts </a>·'+zpmenu.innerHTML; 


unsafeWindow.ld = function(aa) 
			{ 
                          	//TShow(aa);
				unsafeWindow.usePlainText('draft');
				unsafeWindow.document.getElementById('draft').value = unsafeWindow.document.getElementById('draft').value+drafts[aa];
				if (showed != 0){TUpd()};
                        }  

unsafeWindow.lins = function() 
			{ 
                          	TRem();
				window.setTimeout(dsave, 0 );
                        } 

unsafeWindow.lf = function(aa) 
			{ 
				drafts.splice( aa,1);
				tmp =  drafts.join('*****');
				window.setTimeout(dsave, 0 );
				if (showed != 0){TUpd()};
                        }

unsafeWindow.lsh = function() 
	{ 
		if (showed == '0') 
		{
 			 TIns();
		} else 
		{		
			if (showed == '1') 
			{
			ddiv=unsafeWindow.document.getElementById('zdraftlist');
			ddiv.style.display = "none" ;
			showed = '2'; 
			} else
			{ 
			if (showed == '2') 
			{
			ddiv=unsafeWindow.document.getElementById('zdraftlist');
			ddiv.style.display = "" ;
			 showed = '1';
			} ;
			}
		}                          	
               
        }


function TRem()
{
unsafeWindow.usePlainText('draft');
var draft = document.getElementById('draft').value;
if (draft != "")
	{
	drafts.push(draft);
        tmp = drafts.join('*****');
	dsave(tmp);
	alert ('Draft is saved');
	}
if (showed != 0){TUpd()};
 }

function dsave()
{
  GM_setValue("DRAFTS", tmp);
}
function TIns()
{
  	var ini = document.body.firstChild; 
  	var init = document.createElement("div");
        init.id='zdraftlist';
	var ztable = createtable();
    	init.innerHTML = ztable;
    	document.body.insertBefore(init, ini); 
        showed = '1';
}

function TUpd()
{
 var zdiv = document.getElementById('zdraftlist');
 var ztable = createtable();
 zdiv.innerHTML = ztable;
}



function createtable()
{
          zhtml = '<table>';
	 for (i in drafts)
		{
		if (drafts[i]!='') 
			{
			zhtml = zhtml+'<tr>';
	                zhtml=zhtml+'<td>'+i+'</td>'+'<td >'+drafts[i]+'</td><tr><td></td><td ><a href="javascript:ld('+i+')">Insert draft</a>··············<a href="javascript:lf('+i+')">Delete draft</a></td>';
	                zhtml = zhtml+'</tr>';
			}   
		}
	zhtml = zhtml+'</table>';
return zhtml;
}

