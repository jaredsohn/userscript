// ==UserScript==
// @name           sdbYearInTorrent
// @namespace      poem
// @author         poetic
// @description    fetches the year from IMDB and adds it to the torrent title
// @include        http://sdbits.org/browse.php*
// ==/UserScript==


///////// CONFIG /////////


var CACHE_LIMIT = 100  // remember the x (default 100) most recently looked up values

var USE_COLORS = true        // may be true or false

var YEAR_COLOR = '#840000'    // #RRGGBB (hexadecimal)

var YEAR_COLOR_BRACKETS = '#893d3b'


////// CONFIG [end] //////


var sdbImdbYears = GM_getArray('sdbImdbYears'); // load Array

links = document.getElementsByTagName('a');
imdbs = new Array();

for (j=0;j<links.length;j++){
    if (new String(links[j].firstChild.nodeValue).indexOf('IMDB:') == 0) {
        imdbID = new String(links[j].href).match(/[0-9]{7}/);
        //if(imdb=='0061233') {alert(imdb='0061233');}
        if (sdbImdbYears[imdbID] != null){
            imdbYearInLink(links[j],sdbImdbYears[imdbID]);
        }else{
            imdbs[imdbID] = j;  // save for processing later
            
            ////// ajax start ///////
            GM_xmlhttpRequest({
                method: 'GET',
                url: links[j].href,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails) {
                    yearFromTitle = new String(responseDetails.responseText).match(/[<]title[>][^(]+[(]([0-9]{4})[)][^<]*[<][/]title[>]/)[1];
                    imdbIDFromHead = new String(responseDetails.responseText).match(/[<]link .*tt([0-9]{7})/)[1];
                    sdbImdbYears[imdbIDFromHead] = yearFromTitle;
                    imdbYearInLink(links[imdbs[imdbIDFromHead]],yearFromTitle);
                    GM_setArray('sdbImdbYears',sdbImdbYears);  // store Array
                }
            });
            ////// ajax end ///////            
        }
    }    
}

// function imdbYearInLink places the year (in val) into the torrent-link belonging to domObj
function imdbYearInLink(domObj,val){
    tLink = domObj.parentNode.getElementsByTagName('a')[0];
    var tStr = '';
    if (USE_COLORS) {
        tStr = ' <span style="color:'+YEAR_COLOR_BRACKETS+'">(<span style="color:'+YEAR_COLOR+'">'+val+"</span>)</span> $1";
    } else {
        tStr = ' ('+val+") $1";
    }
    tLink.innerHTML = new String(tLink.firstChild.nodeValue).replace(/(PAL|NTSC|DVD|x264|$)/i,tStr);
}

//
// load and store assoc Array functions
//

function GM_getArray(gm_key){
    tmp = GM_getValue(gm_key,'new Array()');
    eval('tmp = ' + tmp);
    return tmp;    
}

function GM_setArray(gm_key, arr){      
    var tArr = new Array();
    var j = 0;    
    
    for(key in arr){  //  var ob={x:1,y:2,z:3} 
        tArr[j] = "'"+key+"'" + ":unescape('" + escape(arr[key]) + "')";
        //tArr.push(key + ":unescape('" + escape(arr[key]) + "')");
        j++;
    }
    
    while(tArr.length > CACHE_LIMIT) {
        tArr.shift();
    }
    
    var serializedArr = '{'+tArr.join(',')+'}';    
    GM_setValue(gm_key,serializedArr);    
    /*test*///str = 'targetArr = ' + serializedArr;
    /*test*///alert(str);
    /*test*///return str;
}