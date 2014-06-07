// ==UserScript==
// @name           flickr Aerotags
// @namespace      http://www.andrewferguson.net
// @description    Adds a link to Airliners.net for tail number lookup
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// ==/UserScript==

var getTags = document.getElementsByTagName('a');
var aerotagsPresent = false;
var aeroTest = new RegExp("^aero:", "i");
var aeroTags = new Array();

//helping vars
var splitTag = new Array();
var splitValue = new Array();


//

for(var i = 0; i < getTags.length; i++){
	if(getTags[i].className == 'Grey'){
		if(getTags[i].innerHTML.toLowerCase() == 'aerotagged'){
			aerotagsPresent = true;
		}
		
	}
}

for(i = 0; i < getTags.length; i++){
	if(aeroTest.test(getTags[i].innerHTML)){
		splitTag = getTags[i].innerHTML.split(":");
		splitValue = splitTag[1].split("=");
		aeroTags[splitValue[0]] = splitValue[1];
	}
}



var tailNum_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAYCAMAAABdhlSLAAAABGdBTUEAAK/INwWK6QAAABl0RVh0' +
'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAwUExURf///3FxcZ+fn9DQ0GNjYz8/P7e3' +
't/T09EtLS9zc3FdXV4eHh5OTk6urq+jo6MTExLb+HB8AAAFbSURBVHjajFRXssMgDFSll/vf9gkc' +
'PyDxTMKPEazarjA0ZkcU4ddFqppKwF/xXRgNnOp9EFEQURx4nGfFgSsL37SpVRMDvw48cxbmBlXS' +
'sJGA9uyJLRaAC23VOO+lh/iAL1Tz+GbxB76pz/mFl6MBrzM04oG3KD2MNG/xvUIuo3gvecdLYdb+' +
'WY/VyTo786EufFNjKeUHfClwMWckuX98lUnCA74L9AS7w7iXOmvtV7/MvEZAvZF6O4yN6eNxclDq' +
'1GsIuDTDDkX12rvwfZQoA+stLy0ZtiHoUJfFVr2428oPDkywt2yj4Jb94EAu7ni0YVzj4+XdAZNI' +
'2mZ0DFBWpdvhIwN6cpsZTZap/SrpZEmAeLcHickdr462cKgSZL/OxpY7RI8Y8kg4u2oIcuQbWD+l' +
'NeHH+7eVg6ak9UVnOvWwYZSQRHW8XaR78dU3O1/eBKkjMH//PfwJMADvMwkBZoHtWgAAAABJRU5E' +
'rkJggg==';

if(aeroTags['tail']){
	document.getElementById('button_bar').innerHTML = document.getElementById('button_bar').innerHTML + "<a href=\"http://www.airliners.net/search/photo.search?regsearch=" + aeroTags['tail'] + "\"><img src=\"" + tailNum_image + "\"></a>";
}


