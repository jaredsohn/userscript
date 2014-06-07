//
// ==UserScript==
// @name          Lepra Ranks
// @namespace   http://leprosorium.ru/
// @description   Lepra Feature Pack
// @author	crea7or
// @include       http://leprosorium.ru/*
// @include       http://www.leprosorium.ru/*
// @version        1.0.0
// ==/UserScript==
//

function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}

function vRanksGetRankFromNote()
{
	vRanksNote = document.getElementById('js-usernote_inner').innerHTML;
	vRanksIndex = vRanksNote.indexOf('#');
	if ( vRanksIndex > -1 )
	{
		return  vRanksNote.substring( vRanksIndex + 1 , vRanksNote.length );
	}
	return null;
}

function vRanksFireEvent(el, evnt) 
{
	if(!el) 
	{
		return;
	}
	if(document.createEventObject) 
	{
		var ev = document.createEventObject();
		el.fireEvent('on'+evnt, ev);
	}
	else if (document.createEvent) 
	{
		var ev = document.createEvent('HTMLEvents');
		ev.initEvent(evnt, true, true);
		el.dispatchEvent(ev);
	} 
	else if (el['on'+evnt]) 
	{
		el['on'+evnt]();
	}
}

function vRanksSetRankNote( vRanksName )
{
	vRanksNote = document.getElementById('js-usernote_inner').innerHTML;
	vRanksIndex = vRanksNote.indexOf('#');
	if ( vRanksIndex > -1 )
	{
		// some name already in the note
		vRanksNote = vRanksNote.substring( 0, vRanksIndex );
		if ( vRanksName != null )
		{
			document.getElementById('js-usernote_inner').innerHTML = vRanksNote + " #" + vRanksName;
		}
		else
		{
			document.getElementById('js-usernote_inner').innerHTML = vRanksNote;
		}
		vRanksFireEvent(document.getElementById('js-usernote_inner'), 'click');
		vRanksFireEvent(document, 'click');
	}
	else
	{
		// no name at all
		if ( vRanksName != null )
		{
			document.getElementById('js-usernote_inner').innerHTML = vRanksNote + " #" + vRanksName;
		}
	}
}

function vRanksSetRank( e )
{
	var vRanksDivUser = document.querySelector('div.usernote_inner');
	if ( vRanksDivUser )
	{
		vRanksA = document.querySelector('h2.username');
		vRanksUserName = vRanksA.firstChild.innerHTML;

		vRanksName = prompt('Как назовём?', vRanksGetRankFromLocStor( vRanksUserName ));
		if( vRanksName )
		{	
			if ( vRanksName.indexOf('#') > -1 )
			{
				vRanksName = null;
			}
			vRanksSetNameLocStor( vRanksUserName, vRanksName );
			vRanksSetRankNote( vRanksName );
		}
	}
	e.preventDefault();
	return false;
}

function vRanksGetNameIndexInLocStor( vRanksArray, vRanksUserName )
{
	for ( vRanksIndex = 0; vRanksIndex < vRanksArray.length; vRanksIndex+= 2 )
	{
		if ( vRanksArray[vRanksIndex] == vRanksUserName )
		{
			return vRanksIndex;
		}	
	}
	return -1;
}

function vRanksGetRankFromLocStor( vRanksUserName )
{
	var vRanksArrLocalStore = localStorage.getItem('vRanksStore' );
	var vRanksLocalStoreArray = new Array;
	if ( vRanksArrLocalStore )
	{
		vRanksLocalStoreArray = vRanksArrLocalStore.split("#");
	}
	vRanksNameIndex = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
	if ( vRanksNameIndex > -1 )
	{
		return vRanksLocalStoreArray[ vRanksNameIndex + 1 ];
	}
	else
	{
		return null;
	}
}

function vRanksSetNameLocStor( vRanksUserName, vRanksRank )
{
	var vRanksArrLocalStore = localStorage.getItem('vRanksStore' );
	var vRanksLocalStoreArray = new Array;
	if ( vRanksArrLocalStore )
	{
		vRanksLocalStoreArray = vRanksArrLocalStore.split("#");
	}
	vRanksNameIndex = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
	if ( vRanksNameIndex > -1 )
	{
		if ( vRanksRank != null )
		{
			vRanksLocalStoreArray[ vRanksNameIndex + 1 ] = vRanksRank;
		}
		else
		{
			vRanksLocalStoreArray.pop( vRanksNameIndex );
			vRanksLocalStoreArray.pop( vRanksNameIndex + 1 );
		}
	}
	else
	{
		if ( vRanksRank != null )
		{
			vRanksLocalStoreArray.push( vRanksUserName );
			vRanksLocalStoreArray.push( vRanksRank );
		}
	}

	var vRanksArrToStr = new String; 
	for ( vRanksInd = 0; vRanksInd < vRanksLocalStoreArray.length; vRanksInd++ )
	{
		if ( vRanksArrToStr.length > 0 )
		{
			vRanksArrToStr += "#";
		}
		vRanksArrToStr += vRanksLocalStoreArray[ vRanksInd ];
	}
	localStorage.setItem('vRanksStore', vRanksArrToStr );
}


if ( document.location.href.indexOf("leprosorium.ru/users/") >= 0 )
{
	// user page
	var vRanksUserName;
	var vRanksDivUser = document.querySelector('div.usernote_inner');
	if ( vRanksDivUser )
	{
		vRanksA = document.querySelector('h2.username');
		vRanksA.firstChild.setAttribute('href', '#');
		vRanksUserName = vRanksA.firstChild.innerHTML;
		addEvent( vRanksA.firstChild, "click", vRanksSetRank );

		vRanksNoteRank = vRanksGetRankFromNote();
		vRanksLocStorRank = vRanksGetRankFromLocStor( vRanksUserName );
		if ( vRanksLocStorRank == null && vRanksNoteRank != null )
		{
			vRanksSetNameLocStor( vRanksUserName, vRanksNoteRank );
		}
		else if ( vRanksLocStorRank != null && vRanksNoteRank == null )
		{
			vRanksSetRankNote( vRanksLocStorRank );
		}
		else if ( vRanksLocStorRank != vRanksNoteRank )
		{
			vRanksSetRankNote( vRanksLocStorRank );			
		}
	}
}
else
{
	var vRanksArrLocalStore = localStorage.getItem('vRanksStore' );
	var vRanksLocalStoreArray = new Array;
	if ( vRanksArrLocalStore )
	{
		vRanksLocalStoreArray = vRanksArrLocalStore.split("#");
	}
	
	var vRanksComments = document.location.href.indexOf("leprosorium.ru/comments/");
	// main page
	var vRanksDivDD = document.querySelectorAll('div.p');
	if ( vRanksDivDD )
	{
		for ( vRanksInd = 0; vRanksInd < vRanksDivDD.length; vRanksInd++ )
		{	
			if ( vRanksDivDD[vRanksInd].children.length > 1 )
			{
				if ( vRanksComments > -1 )
				{
					vRanksUserName = vRanksDivDD[vRanksInd].childNodes[3].innerHTML;
				}
				else
				{
					vRanksUserName = vRanksDivDD[vRanksInd].childNodes[1].innerHTML;
				}
				vRanksNameInd = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
				if ( vRanksNameInd > -1 )
				{
					if ( vRanksComments > -1 )
					{
						vRanksTxt = vRanksDivDD[vRanksInd].childNodes[2].nodeValue;
					}
					else
					{
						vRanksTxt = vRanksDivDD[vRanksInd].firstChild.nodeValue;
					}
					vRanksIndSp = vRanksTxt.indexOf(' ');
					if ( vRanksIndSp > -1 )
					{
						vRanksModText = vRanksTxt.substring( 0, vRanksIndSp );
						vRanksModText +=  " " + vRanksLocalStoreArray[ vRanksNameInd + 1 ] + " ";
						if ( vRanksComments > -1 )
						{
							vRanksDivDD[vRanksInd].childNodes[2].nodeValue = vRanksModText;
						}
						else
						{
							vRanksDivDD[vRanksInd].firstChild.nodeValue = vRanksModText;
						}
					}
				}
			}		
		}
	}
}
