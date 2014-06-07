// ==UserScript==
// @name           GC Event Day
// @namespace      delta68.gc_event_day
// @include        http://www.geocaching.com/geocache/*
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// @include        http://www.geocaching.com/calendar/default.aspx*
// @include        http://www.geocaching.com/CITO/calendar.aspx

// ==/UserScript==
var m=new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var body = document.body.innerHTML
var pos =body.indexOf('eventCacheData')

var countries=GM_getValue('countries','')
var country=countries.split(',')

// this section is for the date on the actual event page
if(pos>0)
{
	var strtemp = body.substring(pos+18)
	pos =strtemp.indexOf('}')
	strtemp = strtemp.substring(0,pos)
	var ecd = strtemp.split('\n')
	pos =ecd[1].indexOf('(')
	ecd[1]=ecd[1].substring(pos+1)
	pos =ecd[1].indexOf(')')
	ecd[1]=ecd[1].substring(0,pos).replace(/,/g,'')
	var d =ecd[1].split(' ')
	var date= new Date(d[1]+ '/' + d[2] + '/' + d[0])
	var span_date = getDateSpan()
	span_date.innerHTML= "Event Date: " + date.toDateString()
}


// this is for the list of caches
if(filename=='nearest.aspx')
{
	if(document.title.length >0)
	{
	
	var t =getTable()
	
	var row = t.getElementsByTagName("tr");
	for(var i=0;i<row.length;i++)
	{
		if(row.item(i).innerHTML.indexOf('Event')>0){ // only want events
			var cell = row.item(i).getElementsByTagName("td");
			
			//for(var j=0;j<cell.length;j++)
			//{
					
					var dnd = cell.item(1).innerHTML
					var guid = getGCcode1(cell.item(4).innerHTML)
					
					appendToCountryList(cell.item(5).innerHTML)
					
					GM_setValue(guid,dnd)
					
					j=8
					if(cell.item(j).innerHTML.indexOf("/images/new3.gif") > 0)
					{
				       var s = cell.item(j).innerHTML.replace(/\//g,' ').replace(/-/g,' ').split(' ')
				       var d =normDate(s[53] + '/' + s[54] +  '/' + s[55])
				        
				        cell.item(j).innerHTML="<span class='small'>" + d + "&nbsp;<img src='/images/new3.gif' alt='New!' title='New!' /></span>"          
					}
			//}
		}
	}
	
	GM_setValue('countries',countries)
	}
}

//calendar display page filter
if((filename=='default.aspx')||(filename=='calendar.aspx'))
{
	if(document.title.length >0)
	{
		//single day event list
		var table = document.getElementsByClassName("CacheCalendarTable Table")
	
	
		try{
			var tr=table[0].getElementsByTagName("tr");
			for(var i=0;i<tr.length;i++)
			{
				
					if(isWanted(tr[i].innerHTML)==1)
					{	//load distance image if known
						var td=tr[i].getElementsByTagName("td");
						td[2].innerHTML= GM_getValue(getGCcode2(td[5].innerHTML),'')
					}else{	
					 	tr[i].innerHTML=''
					}
			}
		 }catch(err){
				//Handle errors here
		}

		//calendar table
		var table=document.getElementById("ctl00_ContentBody_CalendarEvents")
		var tr=table.getElementsByTagName("tr");
		for(var i=3;i<tr.length;i++)
		{	
			var td= tr[i].getElementsByTagName("td");
			for(var j=0;j<td.length;j++)
			{	
				var str=td[j].innerHTML.replace(/\<span\>/gi,'')
					str=str.replace(/\<\/span\>/gi,'')
				var c = str.split("<br>")
				var newtext=c[0] + "<br>"
				
				for(var k = 1;k<c.length;k++)
				{

						if(isWanted(c[k])==1)
						{
						 newtext = newtext + c[k]+ '<br>'
						 
						}

				}
				td[j].innerHTML=newtext
			}
		}
	}
}

// functions

function isWanted(s)
{var retval=0
if(country.length==1)
{
	retval=1
}else{

	for(var l=0;l<country.length;l++)
	{
		if(country[l].length>0)
		{
			if(s.indexOf(country[l])>-1)
			{
				retval=1
			}
		
		}
	}
}
		return retval
}


function getGuid(s)
{
//var g = s.substring(s.indexOf('guid=')+5)
var g = s.substring(s.indexOf('/geocache/')+10)
return g.substring(0,g.indexOf('"'))

}

function getGCcode1(s)
{ //for use in nearest.aspx
var g = s.substring(s.indexOf('/geocache/')+10)
return g.substring(0,g.indexOf('_'))
}

function getGCcode2(s)
{//for use in calander page
var g = s.substring(s.indexOf('(GC')+1)
return g.substring(0,g.indexOf(')'))
}

function appendToCountryList(s)
{
var g = s.split('|')
var c1 = g[2].substring(0,g[2].indexOf('<')).split(',')	
var c2 = ',' + c1[c1.length-1].trim() + ','
if(countries.indexOf(c2)==-1)
{
	countries = countries + c2
}
}

/*function getDateSpan()
{
var s=document.getElementsByTagName("span");

for(var i=1;i<s.length;i++)
	{
		if(s.item(i).innerHTML.indexOf('Event Date:')>0)
		{
	        return(s.item(i))
		}
	}

}*/


function getDateSpan()
{
var s=document.getElementById("ctl00_ContentBody_mcd2");
	return(s)
}




function getM(strin)
{
	for(var j=0;j<m.length;j++)
	{
		if(m[j]==strin)
		{
			return j+1	
		}
	}
}


function getTable()
{
var s=document.getElementsByTagName("table");
	//alert(s.length)
	
	for(var i=0;i<s.length;i++)
	{
		if(s.item(i).getAttribute("class")=="SearchResultsTable Table")
		{
	        return(s.item(i))
		}
	}

}



function Right(str, n)
{
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function normDate(strDate)
{
/*posibilities
2011-10-13
2011/10/13
10/13/2011 //can't be sure
13/10/2011 //can't be sure
13/Oct/2011
Oct/13/2011
13 Oct 11
*/

var strtemp = strDate.replace(/-/g, '/')
strtemp=strtemp.replace(/ /g, '/')
var s=strtemp.split('/')
if(s[0].length==4)
{ 
	var d = new Date(Number(s[1]) + '/' + Number(s[2]) + '/' +s[0])
	return d.toDateString()
}else if(s[0].length==3){
	var d = new Date(getM(s[0]) + '/' + Number(s[1]) + '/' +s[2])
	return d.toDateString()
}else if(s[1].length==3){
	var d = new Date(getM(s[1]) + '/' + Number(s[0]) + '/20' +s[2])
	return d.toDateString() 
}else{
	return strDate
}

}
