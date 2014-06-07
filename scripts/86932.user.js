// LocateIP v0.65
// By Dipesh Acharya (aka xtranophilist)

// ==UserScript==
// @name	  LocateIP
// @namespace	  http://motorscript.com/
// @author	  xtranophilist (Dipesh Acharya)
// @version	  v0.5
// @description	  Displays location information and map of an IP address within the page on mouseover.
// @include	  http://*
// @include	  https://*
// @include	  file:///*
// ==/UserScript==


function $(s) {
    return document.getElementById(s);
}


function getElementsByClassName(className, tagName) {
    tagName = typeof(tagName) != 'undefined' ? tagName : '*';
    var result = new Array();
    var c = 0;
    var tags = document.getElementsByTagName(tagName);
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className == className) {
            result[c++] = tags[i];
        }
    }
    return result;
}

function findLeft(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        do curleft += obj.offsetLeft;
        while ((obj = obj.offsetParent));
        
        return [curleft];
    }
    return false;
}

function init() {
    window.iCounter=0;
    var regex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/ig;
    //Use X-Path to evaluate the anchor-tags
    //an = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    an = document.evaluate('.//text()[normalize-space(.) != ""]',document.body,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    //loop though each anchor tag
    //alert(an[0]);
    for (var i = 0, item;
        (item = an.snapshotItem(i)); i++) {
        var source = item.data;

        if (regex.test(source)) {
        var span = document.createElement("span");
        item.parentNode.replaceChild(span, item);
        result=source.match(regex);
        var re = new RegExp(regex);
        startIndex=0;
        for (var j=0;j<result.length;j++){
            var m = re.exec(source);
            //get text except ip
            var non=source.substr(startIndex, m.index-startIndex);
            span.appendChild(document.createTextNode(non));
            span.appendChild(getdb(m));
            //create new start index
            startIndex=m[0].length+m.index;
        }
        //also catch the text after last found ip
        span.appendChild(document.createTextNode(source.substr(startIndex)));
        span.normalize();
        }
    }
}

function getdb(ip) {
    var db = document.createElement("span");
    db.id = 'iBox_' + ++window.iCounter;
    db.innerHTML=ip;
    db.className = 'iBox';
    db.setAttribute('style', ' border : 1px solid #ccc;');
    db.addEventListener("mouseover", createDiv, false);
    db.addEventListener("mouseout", function () { this.firstChild.nextSibling.style.display='none'}, false);
    return db;
}

function createDiv() { //creates the pulldown division
    
    var ip = this.innerHTML;
    var i = this.id.replace('iBox_', '');
    tmp=i;
        if ($('iCon_' + i)) {
        $('iCon_' + i).style.display = '';
        $('iCon_' + i).style.left = findLeft(this);
        
      }
    else {
        var d = document.createElement('div');
        d.className = 'iCon';
        d.setAttribute('style', 'color:black;font-family: arial;font-size: 12px;font-style:normal;position:absolute; text-align:left; border : 5px solid #ccc; -moz-border-radius: 20px 20px 20px 20px;background-color: #C7BF8D; padding:10px 10px 10px 10px;z-index:100;');
        d.style.left = findLeft(this)+'px';
        d.id = 'iCon_' + i;
        d.innerHTML = getInner(ip);
        $('iBox_' + i).appendChild(d);
        }

}

function getInner(ip) { //html for all e-mails
    var str = 'IP Address:- '+ip;
    str += '<div id="resultPlaceHolder_'+tmp+'">Retrieving Information...</div>';
   loadJS('http://www.geoplugin.net/json.gp?ip=' +ip);
    return str;
}



function loadJS(url) {
    setTimeout(function () {
        doRequest(url);
    }, 0);
}

function doRequest(url) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/json'
        },
        onload: function (xhr) {
            response = eval(xhr.responseText);
        }
    });
}


function getContinent(c){
    var n;
    switch (c){
        case 'EU':
            n='Europe';
            break;
        case 'AS':
            n='Asia';
            break;
        case 'AF':
            n='Africa';
            break;
        case 'OC':
            n='Oceania';
            break;
        default:
            break;
    }
    return (n+' ('+c+')');
}

function geoPlugin(obj){
         
     if (obj.geoplugin_countryName){
         var str='';
         if (obj.geoplugin_city!=""){
     str+='City : '+obj.geoplugin_city;
     
 }
 if (obj.geoplugin_regionName){
     str+='<br>Region : '+obj.geoplugin_regionName;
     if (obj.geoplugin_regionCode!="00"){
         str+=' ('+obj.geoplugin_regionCode+')';
     }
 }
    str+='<br>Country : '+obj.geoplugin_countryName+' ('+obj.geoplugin_countryCode+')';
    str+=' &nbsp; <img src="http://www.translatorscafe.com/cafe/images/flags/'+obj.geoplugin_countryCode+'.gif" alt="'+obj.geoplugin_countryCode+'">'
    

 if (obj.geoplugin_continentCode!="NA"){
     str+='<br>Continent : '+getContinent(obj.geoplugin_continentCode);
 }
 if (obj.geoplugin_areaCode!="0"){
     str+='<br>Area Code : '+obj.geoplugin_areaCode;
 }
 if (obj.geoplugin_dmaCode!="0"){
     str+='<br>DMA Code : '+obj.geoplugin_dmaCode;
 }
 if (obj.geoplugin_latitude!=""){
     str+='<br>Latitude : '+obj.geoplugin_latitude;
     str+='<br>Longitude : '+obj.geoplugin_longitude;

     var imgUrl='http://maps.google.com/maps/api/staticmap?center='+obj.geoplugin_latitude+','+obj.geoplugin_longitude+'&size=250x250&sensor=false&zoom=12';
     var mapUrl='http://maps.google.com/maps?q='+obj.geoplugin_latitude+',+'+obj.geoplugin_longitude+'+%28'
         +obj.geoplugin_city+', '+obj.geoplugin_regionName+', '+obj.geoplugin_countryName+'%29';
     str+='<br><a href="'+mapUrl+'" target="_href"><img src="'+imgUrl+'" alt="Google Map View" title="Click to browse the map!" style="border:none;"></a>';
          str+='<br><a href="'+mapUrl+'"  title="Click to browse the map!"  target="_href">Browse the Map!</a>';
 }
 str+='<br>'
 $('resultPlaceHolder_'+tmp).innerHTML=str;
}
else if (obj && obj.geoplugin_countryName==''){
     $('resultPlaceHolder_'+tmp).innerHTML="Looks like a reserved IP Address!"
}
else $('resultPlaceHolder_'+tmp).innerHTML="Error Occured! Please report this issue!";
}

//document.body.addEventListener('DOMNodeInserted', init, false);
init();
