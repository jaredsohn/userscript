// ==UserScript==
// @name        EVE Radio Rewind History
// @namespace   iambubbus
// @description Tracks Rewind clicks and fades listened shows on the EVE Radio Rewind pages.
// @include     http://eve-radio.com/radio/rewind*
// @include     http://www.eve-radio.com/radio/rewind*
// @include     http://eve-radio.com/radio/premium-rewind*
// @include     http://www.eve-radio.com/radio/premium-rewind*
// @grant       none
// @version     1
// ==/UserScript==



var clickdict;



/*
	ER's source uses duplicate ids in the rewind cells.  Invalid by spec, so a workaround is required.
	Code adapted from Paul Butcher's contribution at Stack Overflow;
		http://stackoverflow.com/questions/3607291/javascript-and-getelementbyid-for-multiple-elements-with-the-same-id
	
	(not ideal, like he says)
	
	@param	id	The id tag to find all instances of.
	@return array of all elements using the passed id.
//*/
function getElementsById(id)
{
    var n = document.getElementById(id);
    var a = [];
    var i;
    while(n) {
        a.push(n);
        n.id = "a-different-id";
        n = document.getElementById(id);
    }

    for(i = 0; i < a.length; ++i) {
        a[i].id = id;      
    }
    return a;
}




function supports_local_storage()
{
	try
		{return 'localStorage' in window && window['localStorage'] !== null;}
	catch(e)
		{return false;}
}




function strHash(str)
{
	var hash = 0;
	var chr;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+chr;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}




function getShowKey(show)
{
	var nodes = show.childNodes;
	if (nodes.length != 1) {alert("ER Rewind History ERROR:\nFound show without nodes!"); throw new Error();}
	nodes = nodes[0].childNodes;
	if (nodes.length != 4) {alert("ER Rewind History ERROR:\nFound show with not 4 elements!"); throw new Error();};
	// assume node structure:
	var dj =       nodes[0].innerHTML;
	var weektime = nodes[1].innerHTML;
	var date =     nodes[2].innerHTML;
	
	var inputstr = dj+weektime+date;
	
	return ""+strHash(inputstr);
}




function linkClicked(show)
{	
	var key = getShowKey(show);
	var clicktime = Math.round((new Date()).getTime() / 3600000);	// hour	precision

	clickdict[key] = clicktime;
	
	show.id = "erRWClicked";
}



function retrieveClickDict()
{
	var storedVal
	try
		{storedVal = localStorage["ER-RW-Hist"];}
	catch (e)
		{alert("ER Rewind History ERROR:\nListen history retrieval failed!"); throw new Error();}
	
	if (!storedVal || storedVal == "" || storedVal == "[]") {return {};}
	return JSON.parse(storedVal);
}



function storeClickDict()
{
	var val = JSON.stringify(clickdict);
	try
		{localStorage["ER-RW-Hist"] = val;}
	catch (e)
		{alert("ER Rewind History ERROR:\nFailed to record your clicked show to history!");}
}



// listener addition code by adios, from the discussion at http://www.codingforums.com/archive/index.php/t-165749.html
function addListener(obj, evt, handler)
{
	if (obj.addEventListener)
		{obj.addEventListener(evt, handler, false);}
	else if (obj.attachEvent)
		{obj.attachEvent('on' + evt, handler);}
}




function main()
{
	if (!supports_local_storage()) {alert("ER Rewind History ERROR:\nThis addon requires a HTML5 browser!"); throw new Error();}
	if (!JSON) {alert("ER Rewind History ERROR:\nThis addon requires a browser with JSON!"); throw new Error();}
	
	var shows = getElementsById("erRW");
	
	if (shows.length <= 0) {return;}
	
	
	// this code adapted from the discussion at http://www.webdeveloper.com/forum/archive/index.php/t-130717.html
	// it makes available a new css id for clicked shows.
	var str= "#erRWClicked{width:179px; height:165px; background-image:url('http://eve-radio.com/modules/mod_rewind/images/er.png'); background-repeat:no-repeat; padding:10px; color:white; opacity:0.3;}}"
	var pa= document.getElementsByTagName('head')[0];
	var el= document.createElement('style');
	
	el.type= 'text/css';
	el.appendChild(document.createTextNode(str));
	pa.appendChild(el);
	// adapted code ends
	
	
	
	
	
	clickdict = retrieveClickDict();
	var curtime = Math.round((new Date()).getTime() / 3600000);	// hour precision
	var timeout = 720;	// hours in 30 days
	
	for (var key in clickdict)
	{
		var clicktime = parseInt(clickdict[key]);
		if (curtime - clicktime >= timeout)
			{delete clickdict[key];}
	}
	
	
	var loopContent = function(i, shows)
		{
			var show = shows[i];
			var nodes = show.childNodes[0].childNodes;
			if (nodes.length != 4) {alert("ER Rewind History ERROR:\nFound show with not 4 elements!"); throw new Error();};
			
			var dj = nodes[0].innerHTML;
			var link = nodes[3].childNodes;
			if (link.length != 1) {alert("ER Rewind History ERROR:\nFound show linknode without a link!"); throw new Error();}
			link = link[0];
			link.addEventListener("click", function() {linkClicked(show);}, false); 
			
			var key = getShowKey(show);
			var time = clickdict[key];
			
			if (time)
				{show.id = "erRWClicked";}
		};
		
	for (j=0; j < shows.length; ++j)
		{loopContent(j, shows);}
	
	
	window.addEventListener("beforeunload", storeClickDict, false);
	
}




main();

