// ==UserScript==
//
// @name          Jira Issue Finder
// @namespace     http://www.snuffelvoetbal.be
// @description   Autosuggest for search in Jira
// @include       */jira/*
//
// Author:    Ruben Van Gasse
//
// Version:   3.2
// Updated:   01/06/2007 (updates listed below)
// Updates:   Configuration : changed default @include to */jira/*
//
// Version:   3.1
// Updated:   15/04/2006 (updates listed below)
// Updates:   Options : projects are only read once, then stored in the about:config for faster retrieval
//
// Version:   3.0
// Updated:   26/03/2006 (updates listed below)
// Updates:   Options : project selection through dropdown
//
// Version:   2.0
// Updated:   21/03/2006 (updates listed below)
// Updates:   Options : added (click on the little calendar)
//
// ==/UserScript==
//
//

//
// Issue Finder
//
var boxId = 'quickSearchInput';
var searchLength = 2;
var projectId = 10000;
var sortField = 'updated';
var sortOrder = 'DESC';
var maxResults = 10;
var positionFromTop = 20;
var positionFromRight = 5;
// projects in form "100001-project1|100002-project2|100003-project3"
var projects = null;
var baseUrl = 'http://jira.domain.com'

var mf = {
	
	//
	// Init for Jira
	//
	initJira: function() {
	
	    // get our search box
	    var box = document.getElementById(boxId);
	    
	    var span = document.createElement('span');
	    span.setAttribute("class", "navItem");
	    
	    var newImg = document.createElement('img');
	    newImg.setAttribute("src", "data:image/gif,GIF89a%10%00%10%00%F7%00%00%00%00%00K%5E%7CO%5E%7FSc%7FRd%7FRd%80%5Dn%8B_p%8Cbs%8Fet%91hx%93jy%96kz%95o%7D%97q%80%9Au%82%9Cx%85%9Ex%84%9F%7B%87%A0%B3U%95%BBd%AC%B9c%B2%B6q%C0%8D%91%9C%86%91%AA%88%92%AB%8C%96%AD%8D%97%AF%90%9A%B0%90%9A%B3%90%9A%B5%92%9B%B6%9A%A2%B7%9C%A3%B5%9E%A5%B7%99%A3%BE%9B%A5%BF%A0%A7%B9%A1%A8%B9%A0%A9%BF%A4%AB%BB%A6%AD%BD%A8%AE%BE%B5%AE%B4%BD%A4%BC%BE%B5%B3%B9%B2%B8%9D%A7%C0%9E%A8%C1%9D%A8%C3%A0%AA%C3%A2%AC%C5%A4%AE%C6%A6%B0%C7%A8%B1%C9%A9%B3%C9%AB%B4%C9%AF%B7%CA%AD%B6%CB%B2%B8%C8%BE%BC%C0%BD%C3%D3%BF%C4%D1%BE%C4%D4%BF%C5%D5%C5%8C%B3%C7%92%BA%C9%A8%CE%C2%BD%C1%C3%BE%C3%C4%BD%C0%C6%BF%C2%DA%B7%DD%C9%C1%B9%C3%C1%C5%C2%C0%C6%C5%C1%C4%C7%C1%C7%C6%C2%C5%C6%C3%C8%C7%C4%C9%C8%C1%C7%C9%C2%C8%CA%C5%C8%C8%C6%C9%C9%C6%CA%CC%C5%CB%CC%C7%CB%CE%C9%CE%CD%CA%CC%CE%CB%CE%C0%C5%D2%C1%C7%D6%C3%C8%D6%C5%CA%D7%C5%CA%D8%C7%CC%D8%C8%C8%D2%CD%CC%D6%CB%CF%DD%CA%D0%DC%D0%CD%D0%D1%CE%D1%D0%CE%D8%D0%CF%D9%D9%D3%C7%D3%D0%D2%D3%D0%D3%D4%D0%D0%D5%D1%D2%D4%D1%D4%D4%D2%D4%D5%D2%D6%D0%D0%D8%D4%D2%DB%D4%D3%DC%DB%D6%D6%D9%D7%DF%DB%D8%DC%DC%D9%DC%DD%DA%DD%DF%DB%DE%DA%D8%E0%DD%DA%E1%E1%DC%DB%E3%DF%E0%E4%DF%E0%E3%E0%E4%E3%E1%E7%E7%E4%E7%E0%E3%EA%E8%E4%E6%E9%E6%E7%E8%E5%E8%EA%E6%E9%EC%E8%EA%EC%E9%EC%EE%EA%ED%EF%EB%EE%ED%EC%EA%EE%ED%EB%EF%EE%EB%EF%EE%EC%F5%F0%F4%F8%F4%F6%FA%FA%FA%FB%FB%FB%FC%FC%FC%FD%FD%FD%FE%FE%FE%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%FF%00%2C%00%00%00%00%10%00%10%00%00%08%ED%00%FF%09%1CH%B0%E0%3F2%82%BE%80%F9%F2%C5%CB%97.%5C%80%FC%E81%26%C7%BF-%02%06%10(P%80%C0F%8F%1B%03%7C%F8%E7c%81%81%03%08%12(%60%D0%C0%C1%03%08%12%22x%F8%B7%23%D0%1F%40%7B%EA%E8%913%07%8D%983a%E2t%F8%A7%82N%20%26%85%0A9%194e%D0!'%84%F8%60%F8%87b%D1%A45%93(%BD%89%04'%D2%243%92%1Ce%F8%97%C2%88%94%15V%AC%B8%88%D2%22%88%10%16M%8El%F8W%A2%D1%245%93*%B9%89%94f%02%05%24a5%FC3%C1%E6%0E%91%3Cy%8A%E0IR%C1%C2%10%3Bm8%FC%13%E1GQ%15D%88%AE%18%C2%F2%08R%95D%7D%24%87%B0k%26%EB%D67%92%26%95%89%C4H2%08'Kx%3C%81%A2%A4%0A%15-f%B2%A8isB%60%8C%11%24%5E%C0%901%83F%0D%1B7p%E8%B8%60%B0%B9%F3%E7%03%03%02%00%3B");
	    newImg.setAttribute("border", "0");
	    newImg.setAttribute("valign", "absmiddle");
	    newImg.addEventListener('click', mf.popupOptions, false);
	    
	    span.appendChild(newImg);
	    
	    box.parentNode.appendChild(span);
	
	    // if we have a box
	    if ( box ) {
	        // attach our envents
	        box.addEventListener('keyup', mf.fetchIssues, false);
	        box.addEventListener('blur', mf.blur, false);

	        // get top and left
	        top = mf.getPos(box,'top') + positionFromTop;
	        right = positionFromRight;
		
	        // general init
	        mf.init(top,right);
	        mf.readOptions();
	        
	        box.setAttribute("autocomplete", "off");
	        box.focus();
	    }
	
	},
	
	//
	// General Init
	//
	init: function(top,right) {

	    // create style element
	    style = document.createElement('style');
	    style.innerHTML = ' #mf_lm { position: absolute; display: none; top: 0px; left: 0px; padding: 4px; font-family: verdana; font-size: 7pt; background: grey; color: #fff; border: 2px solid white; } ' +
	                      ' #mf_rb { position: absolute; display: none; top: ' + top + 'px; right: '+ right +'px; border: solid 1px #000; background: #fff; padding: 5px; font-family: verdana; font-size: 8pt; } ' +
	                      ' #mf_rb ul { list-style: decimal; margin: 0px; padding: 5px 0 0 30px; font-family: verdana; font-size: 8pt; } ' +
	                      ' #mf_rb ul li a { color: #000; text-decoration: none; } ' +
	                      ' #mf_rb ul li a:hover { text-decoration: underline; }' +
	                      ' #mf_add { position: absolute; display: none; top:0; right:0; font-family: verdana; font-size:8pt; padding:5px; background: url(http://mf.travisjkuhl.com/html/images/add-bg.jpg) no-repeat; width:200px; height: 35px; text-align: center; } ' +
	                      ' #mf_add a { display: block; color: #fff; padding: 0px 6px 0 0; text-decoration: none; line-height: 20px; }';
	
	
	    // append style to header
	    document.getElementsByTagName('head')[0].appendChild(style);
	
	    // add our divs
	    mf_lm = document.createElement('div');
	    mf_lm.setAttribute('id','mf_lm');
	    mf_lm.innerHTML = '<img src="data:image/gif;base64,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" width="16" height="16" alt="..." border="0" /> Loading...';
	    
	    // rb 
	    mf_rb = document.createElement('div');
	    mf_rb.setAttribute('id','mf_rb');
	
	    // append
	    document.getElementsByTagName('body')[0].appendChild(mf_lm);
	    document.getElementsByTagName('body')[0].appendChild(mf_rb);
	
	},
	
	//
        // fetch jira issues
        //
        fetchIssues: function() {

            // check for string
            var str = document.getElementById(boxId).value;

            // if string run ajax
            if ( str && str.length > searchLength ) {

                // build url
                var url = baseUrl + '/jira/secure/IssueNavigator.jspa?view=rss&&pid=' + projectId + '&query=' + str + '*&summary=true&sorter/field=' + sortField + '&sorter/order=' + sortOrder + '&tempMax=' + maxResults + '&reset=true&decorator=none';
                
                // Make Request
                // -- Use GM built in xmlHttpRequest function to get jira issues list
                //    from the remote server.
                GM_xmlhttpRequest({
                  method:"GET",
                  url: url,
                  headers:{
                    "User-Agent":"monkeyagent",
                    "Accept":"text/xml",
                    },
                  onload:function(details) {
                        // parser
                        var dom = new XML(details.responseText.replace(/<\?xml.*?\?>/g, ""));
                        // give to function with parse
                        mf.displayIssues(dom);
                  },
                  onerror:function(details) {
                    // call internal error
                    mf.error(details);
                  }
                });

            }

            // show loading message
            document.getElementById('mf_lm').style.display = "block";

        },
	
	//
	// Display jira issues
	//
	displayIssues: function(dom) {
	
	    // rb
	    var rb = document.getElementById('mf_rb');
	
	    // holder
	    var list = "";
	
	    // check for dom
	    for ( var i = 0; i < dom..item.length(); i++ ) {
	        // get vars
	        var title    = dom..item[i].title; 
	        var issueKey   = dom..item[i].key; 

	        list += "<li> <a id='mf_r_"+i+"' href='javascript:void(0);' onclick=\"window.location.href='" + baseUrl + "/jira/browse/"+issueKey+"';\">"+title+"</a></li>";
	    }
	
	    // show box
	    rb.style.display = "block";
	
	    // do we have results
	    if ( dom..item.length() > 0 ) {
	        rb.innerHTML = ' <b> Issues: </b> ' +
	                       ' <ul> ' + list + ' </ul> ';
	    }
	    // no results
	    else {
	        rb.innerHTML = ' No Results ';
	    }
	
	    // hide loading
	    document.getElementById('mf_lm').style.display = "none";
	
	},
	
        fetchPID: function() {

        	if (!projects || projects.length < 2) {
        		// get converted string from xmlhttprequest
        		// method fetchPID itsel calls fillProjectOptions when
        		// asynchronous request is done
        		mf.fetchPIDStringFromHttp();
        	} else {
        		mf.fillProjectOptions(projects);
        	}     	    			                            	
        },
        
        fillProjectOptions: function(entries) {
        	// omgezette string parsen             		
		var title;
		var value;    			    			
		document.getElementById('txtProjectId').options[0] = new Option('All projects', '');    		
		projects = entries;
		parsedEntries = projects.split('|');
		for (var i = 1; i < parsedEntries.length; i++) { 
			parsedProjectEntry = parsedEntries[i].split('*');   								
											
			value = parsedProjectEntry[0];
			title = parsedProjectEntry[1];
												
			document.getElementById('txtProjectId').options[i] = new Option(title, value);
			
			// set selected if this is the correct project
			if (projectId == value) document.getElementById('txtProjectId').selectedIndex = i;
		} 
        },	
        
        fetchPIDStringFromHttp: function() {	
		// build url                
                var url = baseUrl + '/jira/secure/IssueNavigator.jspa?mode=show&createNew=true';
                                
                // Make Request
                // -- Use GM built in xmlHttpRequest function to get jira issues list
                //    from the remote server.
                GM_xmlhttpRequest({
                  method:"GET",
                  url: url,
                  headers:{"User-Agent":"monkeyagent", "Accept":"text/html",},
                  onload:function(details) {                                     	                  	
                  	var t = details.responseText;
                  	var selectbox = t.substring(t.search("<select name=\"pid\" id=\"pid\""), t.search('</select>') + 9);                  	                  							
			
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(selectbox, "application/xml");				                  	                  	                  	                  	
        		entries = xmlDoc.getElementsByTagName('option');
        		var stringEntries = '';
        		
        		for (var i = 1; i < entries.length; i++) {    								
				title = entries[i].getAttribute('title');								
				value = entries[i].getAttribute('value');
				
				if (stringEntries.length > 1) stringEntries += '|';									
				stringEntries += value + '*' + title;
			}   
			
			// save stringEntries in about:config
			GM_setValue('jira_issue_finder_projects', stringEntries);
			
			// fill options box 
			mf.fillProjectOptions(stringEntries);					    		    			    		
                  },
                  onerror:function(details) {
                    // call internal error
                    mf.error(details);
                  }
                });     	
        },
        
	//
	// error
	//
	error: function(details) {
	    // pass an error to the
	    // results box
	    d.getElementById('mf_rb').innerHTML = ' <div style="align:center"> ' +
	                                          '  <b style="color:red"> Error </b> <br/> ' +
	                                          '  There was an error processing your <br/> ' +
	                                          '  request. The server might be down. <br/> ' +
	                                          '  Please try again ' +
	                                          ' </div> ';
	},
	
	
	//
	// blur
	//
	blur: function() {
	    // avoid good blurs like clicking on a link
	    window.setTimeout(function() { document.getElementById('mf_rb').style.display = "none" }, 1000 );
	},
	
	//
	// Get Position
	//
	getPos: function( el, type ){
	    var total = ( type == "left" ) ? el.offsetLeft : el.offsetTop;
	    var parentEl = el.offsetParent;
	        while ( parentEl != null ){
	            total = ( type == "left" ) ? total + parentEl.offsetLeft : total + parentEl.offsetTop;
	            parentEl = parentEl.offsetParent;
	        }
	    return total;
	},  // END getPos         
	
	
	//
	// Options
	//
	popupOptions: function() {
		var div = document.getElementById('optionsDiv');
		if (!div) {
			mf.prepareOptionsPopup();
			div = document.getElementById('optionsDiv');
		}
		div.style.display = "";

		mf.fillOptions();
	},
	
	//
	// Options
	//
	fillOptions: function() {
		document.getElementById('txtBaseUrl').value = baseUrl;
		document.getElementById('txtSearchLength').value = searchLength;						
		mf.fetchPID();
		document.getElementById('txtSortField').value = sortField;
		document.getElementById('txtSortOrder').value = sortOrder;
		document.getElementById('txtMaxResults').value = maxResults;
	},
	
	//
	// Options
	//
	readOptions: function() {
		var myBaseUrl = GM_getValue('jira_issue_finder_baseUrl');
		if (myBaseUrl) baseUrl = myBaseUrl;
		
		var mySearchLength = GM_getValue('jira_issue_finder_searchLength');
		if (mySearchLength) searchLength = mySearchLength;
		
		var myProjects = GM_getValue('jira_issue_finder_projects');
		if (myProjects) projects = myProjects;
		
		var myProjectId = GM_getValue('jira_issue_finder_projectId');
		if (myProjectId) projectId = myProjectId;
		
		var mySortField = GM_getValue('jira_issue_finder_sortField');
		if (mySortField) sortField = mySortField;
		
		var mySortOrder = GM_getValue('jira_issue_finder_sortOrder');
		if (mySortOrder) sortOrder = mySortOrder;
		
		var myMaxResults = GM_getValue('jira_issue_finder_maxResults');
		if (myMaxResults) maxResults = myMaxResults;
	},
	
	
	//
	// Options
	//
	saveOptions: function() {
		var txtBaseUrl = document.getElementById('txtBaseUrl').value;
		if (!(txtBaseUrl == baseUrl)) {
			GM_setValue('jira_issue_finder_baseUrl', txtBaseUrl);
			baseUrl = txtBaseUrl;
		}
		
		var txtSearchLength = document.getElementById('txtSearchLength').value;
		if (!(txtSearchLength == searchLength)) {
			GM_setValue('jira_issue_finder_searchLength', txtSearchLength);
			searchLength = txtSearchLength;
		}
		
		var index = document.getElementById('txtProjectId').selectedIndex;		
		var txtProjectId = document.getElementById('txtProjectId').options[index].value;		
		if (!(txtProjectId == projectId)) {
			GM_setValue('jira_issue_finder_projectId', txtProjectId);
			projectId = txtProjectId;
		}
		
		var txtSortField = document.getElementById('txtSortField').value;
		if (!(txtSortField == sortField)) {
			GM_setValue('jira_issue_finder_sortField', txtSortField);
			sortField = txtSortField;
		}
		
		var txtSortOrder = document.getElementById('txtSortOrder').value;
		if (!(txtSortOrder == sortOrder)) {
			GM_setValue('jira_issue_finder_sortOrder', txtSortOrder);
			sortOrder = txtSortOrder;
		}
		
		var txtMaxResults = document.getElementById('txtMaxResults').value;
		if (!(txtMaxResults == maxResults)) {
			GM_setValue('jira_issue_finder_maxResults', txtMaxResults);
			maxResults = txtMaxResults;
		}
		
		mf.blurOptions();
	},
	
	
	//
	// prepare options popup
	//
	prepareOptionsPopup: function() {
		var tr;
		var td;
		var input;
		
		var table = document.createElement('table');
		
		// title
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		td.innerHTML = '<b>Jira Issue Finder Options</b>';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('style', "background-color:#F0C000; border: 1px solid black; display: block;");
		td.setAttribute('align', 'center');
		td.addEventListener('click', mf.saveOptions, false);
		td.innerHTML = '<a href="#" style="text-decoration: none;">X</a>';
		tr.appendChild(td);
		table.appendChild(tr);
		
		// empty
		tr = document.createElement('tr');
		td = document.createElement('td');
		tr.appendChild(td);
		td.setAttribute('width', '*');
		td = document.createElement('td');
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('width', '15px');
		tr.appendChild(td);
		table.appendChild(tr);
		
		// baseUrl
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('align', 'right');
		td.innerHTML = 'baseUrl: ';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'txtBaseUrl');
		input.setAttribute('style', "width: 150px; border: 1px solid #F0C000;");
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
		
		// searchLength
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('align', 'right');
		td.innerHTML = 'searchLength: ';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'txtSearchLength');
		input.setAttribute('maxlength', '1');
		input.setAttribute('style', "width: 15px; border: 1px solid #F0C000;");
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
		
		// projectId
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('align', 'right');
		td.innerHTML = 'Project : ';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		input = document.createElement('select');		
		input.setAttribute('id', 'txtProjectId');
		input.setAttribute('style', "border: 1px solid #F0C000;");
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
		
		// sortField
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('align', 'right');
		td.innerHTML = 'sortField: ';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'txtSortField');
		input.setAttribute('style', "width: 75px; border: 1px solid #F0C000;");
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
		
		// sortOrder
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('align', 'right');
		td.innerHTML = 'sortOrder: ';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'txtSortOrder');
		input.setAttribute('maxlength', '4');
		input.setAttribute('style', "width: 45px; border: 1px solid #F0C000;");
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
		
		// maxResults
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.setAttribute('align', 'right');
		td.innerHTML = 'maxResults: ';
		tr.appendChild(td);
		td = document.createElement('td');
		td.setAttribute('colspan', '2');
		input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('maxlength', '2');
		input.setAttribute('id', 'txtMaxResults');
		input.setAttribute('style', "width: 20px; border: 1px solid #F0C000;");
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
		
		var div = document.createElement('div');
		div.appendChild(table);
		div.setAttribute('id', 'optionsDiv');
		div.setAttribute('style', 'position: absolute; top: 20; left: 20; border: 1px solid #F0C000; background-color: #FFFFCE; padding: 10px; display: none;');
		//div.addEventListener('click', mf.blurOptions, false);
		document.getElementsByTagName('body')[0].appendChild(div);
	},
	
	//
	// blur options
	//
	blurOptions: function() {
	    // avoid good blurs like clicking on a link
	    //alert('blur');
	    window.setTimeout(function() { document.getElementById('optionsDiv').style.display = "none" }, 500 );
	},
}

window.addEventListener('load', mf.initJira, false);