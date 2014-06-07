// ==UserScript==
// @name           GC PQ Defaults
// @namespace      delta68.gc_pq_defaults
// @include        http://www.geocaching.com/pocket/gcquery.aspx
// @include        http://www.geocaching.com/pocket/urquery.aspx*
// ==/UserScript==



var url = document.location.toString();


if(isNewQuery())
{
	window.addEventListener('submit', newsubmit, true);
	
	var NorthSouth = GM_getValue("NorthSouth","N")
	var EastWest = GM_getValue("EastWest","W")
	
	settext("ctl00_ContentBody_tbResults","1000");
	setradio("ctl00_ContentBody_cbOptions_0",true);//haven't found
	setradio("ctl00_ContentBody_cbOptions_2",true);// don't own
	setradio("ctl00_ContentBody_cbOptions_6",true);// not on ignore list
	
	
	setselect("ctl00_ContentBody_LatLong:_selectNorthSouth",NorthSouth)
	setselect("ctl00_ContentBody_LatLong:_selectEastWest",EastWest)
	
	setcheckbox("ctl00_ContentBody_cbIncludePQNameInFileName",true);// include filename
}


if(url.indexOf('urquery.aspx') > 0)
{
	setradio("ctl00_ContentBody_cbOptions_0",true);//haven't found
	setradio("ctl00_ContentBody_cbOptions_2",true);// don't own
	setradio("ctl00_ContentBody_cbOptions_6",true);// not on ignore list
}




//setradio("ctl00_ContentBody_rbCountries",true);

//setselect("ctl00_ContentBody_lbCountries" ,"United Kingdom");
//setradio("ctl00_ContentBody_rbPlacedBetween",true);





function isNewQuery()
{

return document.getElementById('ctl00_ContentBody_lbHeading').innerHTML=='New Pocket Query'

}
 
function setselect(id,txt)
 {
 var s = document.getElementById(id)
 var l
    for (var i =0;i< s.length;i++)
    { l=s.options[i].text
        if(l==txt )
        { s.options[i].selected = true }
     }
 }


function settext(id,txt)
 {
	 try{
		var s = document.getElementById(id)
		s.value=txt
	 }catch(err){}
 }


function setradio(id,value)
 {
 var s = document.getElementById(id)
 s.checked=value
 }
 
 function setcheckbox(id,value)
 {
 var s = document.getElementById(id)
 s.checked=value
 }
 
 function newsubmit(event) 
{
    var target = event ? event.target : this;
    
	var ns = document.getElementById('ctl00_ContentBody_LatLong:_selectNorthSouth').value
	if(ns==-1){GM_setValue('NorthSouth', 'S')}
	if(ns==1){GM_setValue('NorthSouth', 'N')}
	
	var ns = document.getElementById('ctl00_ContentBody_LatLong:_selectEastWest').value
	if(ns==-1){GM_setValue('EastWest', 'W')}
	if(ns==1){GM_setValue('EastWest', 'E')}
	
	
   	    
    
        // call real submit function
        this._submit();
}
 
 