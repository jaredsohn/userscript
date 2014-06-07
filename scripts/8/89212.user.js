//
// ==UserScript==
// @name          Dirty Ranks
// @namespace   http://dirty.ru/
// @description   Dirty Feature Pack
// @author	crea7or
// @include       http://dirty.ru/*
// @include       http://www.dirty.ru/*
// @version        1.0.1
// ==/UserScript==
//

function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}

function vRanksGetRankFromNote()
{
	vRankUserNote = document.getElementById('js-usernote');
	if ( vRankUserNote )
	{
		vRanksNote = vRankUserNote.innerHTML;
		vRanksIndex = vRanksNote.indexOf('#');
		if ( vRanksIndex > -1 )
		{
			return  vRanksNote.substring( vRanksIndex + 1 , vRanksNote.length );
		}
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
	vRankUserNote = document.getElementById('js-usernote');
	if ( vRankUserNote )
	{
		vRanksNote = vRankUserNote.innerHTML;
		vRanksIndex = vRanksNote.indexOf('#');
		if ( vRanksIndex > -1 )
		{
			// some name already in the note
			vRanksNote = vRanksNote.substring( 0, vRanksIndex );
			if ( vRanksName != null )
			{
				document.getElementById('js-usernote').innerHTML = vRanksNote + " #" + vRanksName;
			}
			else
			{
				document.getElementById('js-usernote').innerHTML = vRanksNote;
			}
			vRanksFireEvent(document.getElementById('js-usernote'), 'click');
			vRanksFireEvent(document, 'click');
		}
		else
		{
			// no name at all
			if ( vRanksName != null )
			{
				document.getElementById('js-usernote').innerHTML = vRanksNote + " #" + vRanksName;
			}
		}
	}
}

function vRanksSetRank( e )
{
	var vRanksDivUser = document.querySelector('div.user_name_inner');
	if ( vRanksDivUser )
	{
		vRanksA = vRanksDivUser.getElementsByTagName('a');
		vRanksUserName = vRanksA[0].innerHTML;

		vRanksName = prompt('Как назовём?', vRanksGetRankFromLocStor( vRanksUserName ));
		if( vRanksName )
		{	
			var vRanksDivUser = document.querySelector('div.user_name_inner');
			if ( vRanksDivUser )
			{
				if ( vRanksName.indexOf('#') > -1 )
				{
					vRanksName = null;
				}
				vRanksSetNameLocStor( vRanksUserName, vRanksName );
				vRanksSetRankNote( vRanksName );
			}
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


if ( document.location.href.indexOf("dirty.ru/user/") >= 0 )
{
	// user page
	var vRanksUserName;
	var vRanksDivUser = document.querySelector('div.user_name_inner');
	if ( vRanksDivUser )
	{
		vRanksA = vRanksDivUser.getElementsByTagName('a');
		vRanksA[0].setAttribute('href', '#');
		vRanksUserName = vRanksA[0].innerHTML;
		addEvent( vRanksA[0], "click", vRanksSetRank );
	
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
	if ( vRanksLocalStoreArray.length > 1 )
	{
		// other pages
		var vRanksDivDD = document.querySelectorAll('div.dd');
		if ( vRanksDivDD )
		{
			for ( vRanksInd = 0; vRanksInd < vRanksDivDD.length; vRanksInd++ )
			{	
				if ( vRanksDivDD[vRanksInd].children.length > 2 )
				{
					vRanksUserName = vRanksDivDD[vRanksInd].childNodes[3].innerHTML;
					vRanksNameInd = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
					if ( vRanksNameInd > -1 )
					{
						var vRanksTxt =  document.createTextNode(" " + vRanksLocalStoreArray[ vRanksNameInd + 1 ] + " ");
						vRanksDivDD[vRanksInd].insertBefore( vRanksTxt, vRanksDivDD[vRanksInd].childNodes[3]);
					}
				}		
			}
		}
		var vRanksDivFooter = document.querySelectorAll('div.c_footer');
		if ( vRanksDivFooter )
		{
			for ( vRanksInd = 0; vRanksInd < vRanksDivFooter.length; vRanksInd++ )
			{	
				if ( vRanksDivFooter[vRanksInd].children.length > 2 )
				{
					vRanksUserName = vRanksDivFooter[vRanksInd].childNodes[3].innerHTML;
					vRanksNameInd = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
					if ( vRanksNameInd > -1 )
					{
						var vRanksTxt =  document.createTextNode(" " + vRanksLocalStoreArray[ vRanksNameInd + 1 ] + " ");
						vRanksDivFooter[vRanksInd].insertBefore( vRanksTxt, vRanksDivFooter[vRanksInd].childNodes[3]);
					}
				}		
			}
		}
	}
}
