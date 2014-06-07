// ==UserScript==
// @name MyEpisodes to NZBmatrix/NZBs.Org
// @namespace [173166]-[MyEpisodesToNZB]-v1.1.1
// @description Search NZBmatrix from MyEpisodes
// @include http*://*.myepisodes.com/*
// @include http*://myepisodes.com/*
// @Website 
// @UserScripts 
// @license Free
// @version 1.1.1
// ==/UserScript==

    //======[Settings]======\\
    var SearchEpisodeNumber = 'no';    //==['yes' or 'no']
    var ConvertEpisodeText = 'yes';     //==['yes' or 'no']
    var SearchURL = 'http://www.filestube.com/search.html?q=--Search'; //==[The Key is ( --Search )]
    var SearchText = '[FT]';    //==[keep it empty ( '' ) to disable]
    var ChangeWidth = 'no';   //==['yes' or 'no', Change the table width to 100%]
    var AddTopLink = '';   //==['keep it empty ( '' ) to disable]
    var AddTopLinkLocation = '2';   //==['1' = Before show name, '2' = after last checkbox]
    //======[Settings]======\\ 
    
    
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

	var ShowsText = getElementsByClass('showname');
    var EPText = getElementsByClass('longnumber');
    var StatusChk = getElementsByClass('status');
    
    for (ii = 0; ii < ShowsText.length; ii++) {
        var SPtemp=ShowsText[ii].innerHTML.split('>');
        var SPtext=SPtemp[1].split('</a');
        if (SPtext[0].trim() == '') {SPtext[0] = '';}
        
        
        }
        
        if (AddTopLink != '') {
            if (AddTopLinkLocation == '1') {
                ShowsText[ii].innerHTML = '<a href="#">'+AddTopLink+'</a> ' + ShowsText[ii].innerHTML;
            }else{
                StatusChk[ii*2+1].innerHTML += ' <a href="#">'+AddTopLink+'</a>';   
            }
        }
        
        if (SearchText != '') {
            ShowsText[ii].innerHTML = '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="100%">'+ShowsText[ii].innerHTML+'</td><td><small><a href="' + SearchURL.replace(/--Search/i,SPtext[0].trim() + EpisodeNo) + '" target="_blank">' + SearchText + '</a></small></td></tr></table>'; 
            }
        
        if (SearchText2 != '') {
            ShowsText[ii].innerHTML = '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="100%">'+ShowsText[ii].innerHTML+'</td><td style="padding-left:2px"><small><a href="' + SearchURL2.replace(/--Search/i,SPtext[0].trim() + EpisodeNo) + '" target="_blank">' + SearchText2 + '</a></small></td></tr></table>';
            }
        
	}

    if (ChangeWidth == 'yes'){    
        var ChangeW = document.getElementsByTagName('div');
        ChangeW[0].id = '';
        
        ChangeW = '';
        ChangeW = document.getElementsByTagName('td');
        for (i = 0; i < ChangeW.length; i++) {
            if (ChangeW[i].width == "50%") ChangeW[i].width = "";
            if (ChangeW[i].width == "760px") ChangeW[i].width = "100%";  
        }
    }