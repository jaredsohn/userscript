// ==UserScript==
// @name           LibraryThing recommendations
// @namespace      gczobel
// @description    Fetch all the recommendation pages and sort by average rating
// @include        http://www.librarything.es/profile/*/recommendations
// ==/UserScript==

/////////Start!//////////////////////////////////////////
//Check updated.
CheckUpdated();
    
//Add div to store data.
var tmpLines = document.createElement( "div" );
tmpLines.style.display = 'none';
tmpLines.id = 'tmplines';
tmpLines.innerHTML = '';

//Add div to store header.
var tmpHeader = document.createElement( "div" );
tmpHeader.style.display = 'none';
tmpHeader.id = 'tmpheader';
tmpHeader.innerHTML = '';

//Add div to "loading" text
var tmpLoading = document.createElement( "div" );
tmpLoading.style.display = 'none';
tmpLoading.id = 'tmploading';
tmpLoading.innerHTML = '';

document.getElementById('maintabs').appendChild(tmpLines);
document.getElementById('maintabs').appendChild(tmpHeader);
document.getElementById('maintabs').appendChild(tmpLoading);


//Embed functions on page.
embedFunction(OrderByAverageRating);
embedFunction(do_writerecommendation);
embedFunction(loadmyrecs);

//Wait all loaded to start.
objLoadChecker = window.setTimeout(loadChecker, 1000);


////////////////END////////////////////////////////////


function loadChecker(){
    var form1 = document.getElementById('rightcolumn');
    var check = form1.childNodes[0];
    if (!check) {
        objLoadChecker = window.setTimeout(loadChecker, 1100);
    }
    else {
        //////Start here after loaded.      
        do_changes();
    }
}

//add the new link to order by average rating.
function do_changes() {
    
    var form1 = document.getElementById('rightcolumn');

    newlink = document.createElement('a');
    newlink.href="javascript:OrderByAverageRating();"
    newlink.innerHTML = "Ordenar por valoración promedio"; //Order by average rating
    //newlink.addEventListener('click',function () {hello2()}, false);

    form1.childNodes[0].appendChild(newlink);
}


//fetch lines from div 'tmplines' and sort them by average rating.
function do_writerecommendation() {
    var doc = document.getElementById('tmplines');
    var lis = []; // Will put <li>'s in here
    var xpath;
    var i = 0;
    
    xpath = doc.ownerDocument.evaluate( ".//li[@value and (contains(.,'copias') or contains(.,'copies'))]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    while ( (li = xpath.snapshotItem( i++ )) ) {
    	lis.push( li );
    	i++;
    }
    
    i = 0;
    xpath = null; // Clear memory
    
    // Sort them
    lis.sort(function(a, b) {
        
        b.innerHTML.match( regex )
    	var regex = /[0-9]{1}\.([0-9]{0,2}\.)?/;		
    
        var s2;
        if (!(b.innerHTML.match( regex ))) {
            s2 = new String('0.');
        }
        else {
            s2 = new String( b.innerHTML.match( regex )[0] );
        }

    	if (s2.length == 2) {
    	    //remove the final dot
    	    s2 = s2.substr(0,1);
        }
    
        var s1;
        if (!(a.innerHTML.match( regex ))) {
            s1 = new String('0.');
        }
        else{
            s1 = new String( a.innerHTML.match( regex )[0] );
        }

    	
    	var myfloat = parseFloat( s2 ) - parseFloat( s1 );
    	return (myfloat);
    });    
    
    
    var div = document.createElement( "div" ); // Where the sorted content will go
    while ( li = lis[ i++ ] ) {
    	div.appendChild( li ); // Put to our container div
    }
    
    i = null;
    
    var tmpheader = new String(document.getElementById('tmpheader').innerHTML);
    var lastchar = tmpheader.indexOf("</ol>");
    tmpheader = tmpheader.substring(0,lastchar-1); 
    
    
    $('recommendations').innerHTML =  tmpheader + div.innerHTML;
    
    loadrecs_right();
}

function loadmyrecs(page){
    
    var url = '/ajaxinc_recommendations.php?usernum='+usernum+'&page='+page+'&tag='+tag+'&type='+type+'&recent='+recentness;
    var params = { callback : 'loadrecs_right' }
    basic_ajax( url, params, function(r)
                    {
                        $('loading').textContent = 'Cargando página '+ page.toString() + ' de 10';
                        if (page == 1) {
                        	var firstline = r.responseText.search(/<li/);
                        	var tmpheader = document.getElementById('tmpheader');
                            tmpheader.innerHTML = r.responseText.substring(0,firstline-1);                           
                        }


                        //store lines
                        var tmplines = document.getElementById('tmplines');
                        tmplines.innerHTML = tmplines.innerHTML + r.responseText;
                                              
                        //Now that the page is loaded goto the next page...
                        if (page < 11) {
                            page ++;
                            loadmyrecs(page);
                        }
                        else {
                            //Write the page sorted after load all the pages.
                            hideloading();
                            //restore Loading text
                            var tmploading = document.getElementById('tmploading');
                            $('loading').textContent = tmploading.innerHTML;
                            //Write
                            do_writerecommendation();
                        }                       
                 }
    	      );    
}

function OrderByAverageRating() {

    //store Loading... text
    var tmploading = document.getElementById('tmploading');
    tmploading.innerHTML = $('loading').textContent; 

    var page = 1;
    tag = 0; //thistag;
    type = 'filter_otherstags';
    recentness = 0;
    yourtag = 0;
    
    //load all the pages (recursive)
    showloading();
    loadmyrecs(page);
}



//Embed a function in the current page
function embedFunction(s) {
    var thescript = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
    document.body.appendChild(document.createElement('script')).innerHTML=thescript;
}

function CheckUpdated() {
    var SUC_script_num = 53813; // Change this to the number given to the script by userscripts.org (check the address bar)
    try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'LibraryThing recommendations') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}