// ==UserScript==
// @name          HabraTopicFilter
// @namespace     http://habrahabr.ru/
// @description   Special script that will filter habrahabr.ru topics
// @author        crea7or
// @include       http://habrahabr.ru/*
// @exclude       http://habrahabr.ru/qa/*
// @exclude       http://habrahabr.ru/companies/*
// @exclude       http://habrahabr.ru/people/*
// @exclude       http://habrahabr.ru/bloglist/*
// @require       http://crea7or.spb.ru/scripts/user.js.updater.php?id=87349&days=7
// @version       1.0.0
// ==/UserScript==
//

function vHtfManageArray( vHtfFilterName, vHtfArrayName, vHtfAObject )
{
	vHtfTemp = localStorage.getItem( vHtfArrayName );
	var vHtfStoredFilters = new Array();
	if ( vHtfTemp != null )
	{
	    vHtfStoredFilters = vHtfTemp.split("\n");
    }
	
	vHtfInd = vHtfStoredFilters.indexOf( vHtfFilterName );
	if ( vHtfInd != -1 )
	{
		vHtfStoredFilters.splice( vHtfInd, 1 );
		vHtfAObject.setAttribute('title', 'Добавить в фильтр ' + vHtfFilterName );
		vHtfAObject.firstChild.setAttribute( 'src','http://habrastorage.org/storage/1de584b3/d3d96a7c/37e5129f/a882c042.gif');
	}		
	else
	{
		vHtfStoredFilters.push( vHtfFilterName );
		vHtfAObject.setAttribute('title', 'Удалить из фильтра ' + vHtfFilterName );
		vHtfAObject.firstChild.setAttribute( 'src','http://habrastorage.org/storage/a54baf9e/2a226b30/5242f08d/66418d1d.gif');
	}
	localStorage.setItem( vHtfArrayName, vHtfStoredFilters.join("\n"));
}

function vHtfManageTopic( vHtfTopicID ) // 0 - hide, 1 - show
{
	if ( document.location.href.indexOf("habrahabr.ru/blogs") == -1 && document.location.href.indexOf("habrahabr.ru/company") == -1 )
	{
        vHtfDoNotShadeFiltered = vHtfGetItemLocalStore('vHtfDoNotShadeFiltered', 0 ); // 0 - no, 1 - yes
        vHtfShowVotingAndInfo = vHtfGetItemLocalStore('vHtfShowVotingAndInfo', 1 );
        vHtfTotallyHideTopic = vHtfGetItemLocalStore('vHtfTotallyHideTopic', 0 ); // 0 - no, 1 - yes

        vHtfTopicDiv = document.getElementById( vHtfTopicID );
        
        if ( vHtfTotallyHideTopic == 1 )
        {
            if ( vHtfTopicDiv.getAttribute('style') == 'display: none;')
		    {
    		    vHtfHideOrShow = 1; // show
			    vHtfTopicDiv.setAttribute('style', '');
		    }
            else
		    {		    
    			vHtfTopicDiv.setAttribute('style', 'display: none;');
		    }        
        }
        else
        {
        	vHtf2Hide = vHtfTopicDiv.querySelector('div.content');
        	var vHtfHideOrShow = 0; // 0 - show
    	    if ( vHtf2Hide )
    	    {   
    		    if ( vHtf2Hide.getAttribute('style') == 'display: none;')
		        {
        		    vHtfHideOrShow = 1; // show
			        vHtf2Hide.setAttribute('style', '');
		        }
                else
		        {		    
        			vHtf2Hide.setAttribute('style', 'display: none;');
		        }
	        }
	        vHtf2Hide = vHtfTopicDiv.querySelector('ul.tags');
	        if ( vHtf2Hide )
    	    {
    		    if ( vHtfHideOrShow == 0 )
		        {
        			vHtf2Hide.setAttribute('style', 'display: none;');
		        }
		        else
		        {
        			vHtf2Hide.setAttribute('style', '');
		        }
	        }
	        if ( vHtfShowVotingAndInfo == 0 )
	        {	    
    	        vHtf2Hide = vHtfTopicDiv.querySelector('div.entry-info');
	            if ( vHtf2Hide )
	            {
            		if ( vHtfHideOrShow == 0 )
		            {
            			vHtf2Hide.setAttribute('style', 'display: none;');
		            }
		            else
		            {
            			vHtf2Hide.setAttribute('style', '');
		            }
	            }
	        }
	        if ( vHtfHideOrShow == 0 )
	        {
        	    if ( vHtfDoNotShadeFiltered == 1 )
	            {
        	        vHtfTopicDiv.setAttribute('style', 'margin: 0px 0px 0px 0px;');
	            }
	            else
	            {
        	        vHtfTopicDiv.setAttribute('style', 'margin: 0px 0px 0px 0px; opacity: 0.4;');
	            }	   
	        }
	        else
	        {
    	        vHtfTopicDiv.setAttribute('style', '');
	        }
        }    
    }
}


function vHtfGetItemLocalStore( vHtfName, vHtfDefault )
{
    vHtfTemp = localStorage.getItem( vHtfName );
    if ( vHtfTemp == null )
    {
        vHtfTemp = vHtfDefault;
    }
    return vHtfTemp;    
}

// add scripts to the page
var vHtfScript=document.createElement("script");
vHtfScript.type="application/javascript";
vHtfScript.textContent = vHtfManageArray + vHtfManageTopic + vHtfGetItemLocalStore;
document.body.appendChild( vHtfScript );

// load
vHtfTemp = localStorage.getItem('vHtfBlogNames');
var vHtfBlogStoredNames = new Array();
if ( vHtfTemp != null )
{
    vHtfBlogStoredNames = vHtfTemp.split("\n");
}

vHtfTemp = localStorage.getItem('vHtfUserNames');
var vHtfUserStoredNames = new Array();
if ( vHtfTemp != null )
{
    vHtfUserStoredNames = vHtfTemp.split("\n");
}

var vHtfFilterMode = vHtfGetItemLocalStore('vHtfFilterMode', 0 ); // 0 - exclude items, 1 - include only items
var vHtfDoNotShadeFiltered = vHtfGetItemLocalStore('vHtfDoNotShadeFiltered', 0 ); // 0 - no, 1 - yes
var vHtfShowVotingAndInfo = vHtfGetItemLocalStore('vHtfShowVotingAndInfo', 1 ); // 0 - no, 1 - yes
var vHtfTotallyHideTopic = vHtfGetItemLocalStore('vHtfTotallyHideTopic',0 ); // 0 - no, 1 - yes
var vHtfAlwaysHideCompanies = vHtfGetItemLocalStore('vHtfAlwaysHideCompanies',0 ); // 0 - no, 1 - yes

var vHtfMainPage = 0; 
if ( document.location.href.indexOf("habrahabr.ru/blogs") == -1 && document.location.href.indexOf("habrahabr.ru/company") == -1 )
{
    vHtfMainPage = 1;
}

vHtfPanelDiv = document.querySelector('dl.panel-personal');
if ( vHtfPanelDiv )
{
	vHtfPanelDt = vHtfPanelDiv.getElementsByTagName('dt');
	if ( vHtfPanelDt )
	{
		// create options
		vHtfNewDiv = document.createElement('div');
		vHtfNewDiv.setAttribute('style', 'float: right;');
		vHtfNewDiv.setAttribute('id', 'js-tmdt');
		vHtfNewDiv.innerHTML = "<a onclick=\"var e = document.getElementById('js-vhtf-settings');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\" href=\"#\" title=\"Добавить в фильтр \">фильтр</a>";
		vHtfPanelDt[0].appendChild( vHtfNewDiv );
		
		vHtfNewDiv = document.createElement('div');
		vHtfNewDiv.setAttribute('style', 'display: none;');
		vHtfNewDiv.setAttribute('id','js-vhtf-settings');
		vHtfSettings = "<br><form><input type=\"checkbox\" id=\"vhtf-shade-filtered\" name=\"vhtf-shade-filtered\" onchange=\" var e = document.getElementById('vhtf-shade-filtered'); if ( e.checked == true ) { localStorage.setItem('vHtfDoNotShadeFiltered', 1 ); } else {  localStorage.setItem('vHtfDoNotShadeFiltered', 0 ); return false; } \"";
		if ( vHtfDoNotShadeFiltered == 1 )
		{
			vHtfSettings += " checked";
		}
		vHtfSettings += ">не делать полупрозрачными</form>";
		vHtfSettings += "<form><input type=\"checkbox\" id=\"vhtf-show-info\" name=\"vhtf-show-info\" onchange=\" var e = document.getElementById('vhtf-show-info'); if ( e.checked == true ) { localStorage.setItem('vHtfShowVotingAndInfo', 1 ); } else {  localStorage.setItem('vHtfShowVotingAndInfo', 0 ); return false; } \"";
		if ( vHtfShowVotingAndInfo == 1 )
		{
			vHtfSettings += " checked";
		}
		vHtfSettings += ">показывать оценки</form>";
		vHtfSettings += "<form><input type=\"checkbox\" id=\"vhtf-total-hide\" name=\"vhtf-total-hide\" onchange=\" var e = document.getElementById('vhtf-total-hide'); if ( e.checked == true ) { localStorage.setItem('vHtfTotallyHideTopic', 1 ); } else {  localStorage.setItem('vHtfTotallyHideTopic', 0 ); return false; } \"";
		if ( vHtfTotallyHideTopic == 1 )
		{
			vHtfSettings += " checked";
		}
		vHtfSettings += ">полностью скрывать</form>";
		vHtfSettings += "<form><input type=\"checkbox\" id=\"vhtf-hide-companies\" name=\"vhtf-hide-companies\" onchange=\" var e = document.getElementById('vhtf-hide-companies'); if ( e.checked == true ) { localStorage.setItem('vHtfAlwaysHideCompanies', 1 ); } else {  localStorage.setItem('vHtfAlwaysHideCompanies', 0 ); return false; } \"";
		if ( vHtfAlwaysHideCompanies == 1 )
		{
			vHtfSettings += " checked";
		}
		vHtfSettings += ">фильтровать блоги компаний</form>";
		vHtfSettings += "<form><input type=\"checkbox\" id=\"vhtf-exclude-mode\" name=\"vhtf-exclude-mode\" onchange=\" var e = document.getElementById('vhtf-exclude-mode'); if ( e.checked == true ) { localStorage.setItem('vHtfFilterMode', 1 ); } else {  localStorage.setItem('vHtfFilterMode', 0 ); return false; } \"";
		if ( vHtfFilterMode == 1 )
		{
			vHtfSettings += " checked";
		}
		vHtfSettings += ">показывать только фильтрованное</form><br>";		
				
		vHtfNewDiv.innerHTML = vHtfSettings;
		vHtfPanelDt[0].appendChild( vHtfNewDiv );		
	}
}

vHtfMainDiv = document.getElementById('main-content');
if ( vHtfMainDiv )
{	
	vHtfPostsDiv = vHtfMainDiv.querySelectorAll('div.hentry');
	if ( vHtfPostsDiv )
	{
		for ( vHtfCnt = 0; vHtfCnt < vHtfPostsDiv.length; vHtfCnt++ )
		{
			vHtfFoundInUsers = -1;
			vHtfFoundInBlog = -1;
			
			vHtfID = 'vhtf-tid' + vHtfCnt;
			vHtfPostsDiv[vHtfCnt].setAttribute('id', vHtfID );
			vHtfVoting = vHtfPostsDiv[vHtfCnt].querySelector('div.entry-info');
			vHtfH2 = null;
						
			vHtfA = vHtfPostsDiv[vHtfCnt].querySelector('a.nickname');
			if ( vHtfA )
			{   		
				vHtfFoundInUsers = vHtfUserStoredNames.indexOf( vHtfA.text ); // author
				vHtfVcard = vHtfPostsDiv[vHtfCnt].querySelector('div.vcard');
				vHtfEntryInfo = vHtfPostsDiv[vHtfCnt].querySelector('div.entry-info-wrap');
				if ( vHtfVcard && vHtfEntryInfo )
				{
					vHtfNewDiv = document.createElement('div');
					vHtfNewDiv.setAttribute('style', 'margin-right: 1px; margin-left: 10px;');
					if ( vHtfFoundInUsers == -1 )
					{
						// add as add
						vHtfNewDiv.innerHTML = "<a onclick=\"vHtfManageArray('" + vHtfA.text + "', 'vHtfUserNames', this ); vHtfManageTopic('" + vHtfID + "'); return false;\" href=\"#\" title=\"Добавить в фильтр " + vHtfA.text +"\"><img src=\"http://habrastorage.org/storage/1de584b3/d3d96a7c/37e5129f/a882c042.gif\"></a>";
					}
					else
					{
						// add as delete
						vHtfNewDiv.innerHTML = "<a onclick=\"vHtfManageArray('" + vHtfA.text + "', 'vHtfUserNames', this ); vHtfManageTopic('" + vHtfID + "'); return false;\" href=\"#\" title=\"Удалить из фильтра " + vHtfA.text +"\"><img src=\"http://habrastorage.org/storage/a54baf9e/2a226b30/5242f08d/66418d1d.gif\"></a>";
					}		
					vHtfEntryInfo.insertBefore( vHtfNewDiv, vHtfVcard );
				}			
			}

			vHtfA = vHtfPostsDiv[vHtfCnt].querySelector('a.blog');
			if ( vHtfA )
			{				
				vHtfFoundInBlog = vHtfBlogStoredNames.indexOf( vHtfA.innerHTML ); // blog name
				vHtfH2 = vHtfPostsDiv[vHtfCnt].querySelector('h2.entry-title');
				if ( vHtfH2 )
				{
					vHtfNewDiv = document.createElement('div');
					vHtfNewDiv.setAttribute('style', 'float: left; margin-top: 10px; margin-left: 15px;');
					if ( vHtfFoundInBlog == -1 )
					{
						// add as add
						vHtfNewDiv.innerHTML = "<a onclick=\"vHtfManageArray('" + vHtfA.innerHTML + "', 'vHtfBlogNames', this ); vHtfManageTopic('" + vHtfID + "'); return false;\" href=\"#\" title=\"Добавить в фильтр " + vHtfA.innerHTML +"\"><img src=\"http://habrastorage.org/storage/1de584b3/d3d96a7c/37e5129f/a882c042.gif\"></a>";
					}
					else
					{
						// add as delete
						vHtfNewDiv.innerHTML = "<a onclick=\"vHtfManageArray('" + vHtfA.innerHTML + "', 'vHtfBlogNames', this ); vHtfManageTopic('" + vHtfID + "'); return false;\" href=\"#\" title=\"Удалить из фильтра " + vHtfA.innerHTML +"\"><img src=\"http://habrastorage.org/storage/a54baf9e/2a226b30/5242f08d/66418d1d.gif\"></a>";
					}		
					vHtfPostsDiv[vHtfCnt].insertBefore( vHtfNewDiv, vHtfH2 );
				}
				// filter companies
				if ( vHtfFoundInBlog == -1 && vHtfAlwaysHideCompanies == 1 )
				{
				    vHtfFoundInBlog = vHtfPostsDiv[vHtfCnt].getAttribute('class').indexOf('corporative');
				}
			}
			
			if (( vHtfFilterMode == 0 && (( vHtfFoundInBlog + vHtfFoundInUsers ) > -2 )) || ( vHtfFilterMode == 1 && (( vHtfFoundInBlog + vHtfFoundInUsers ) == -2 )))
		    {
   			    vHtfManageTopic( vHtfID );
				if ( vHtfShowVotingAndInfo == 1 )
				{
				    if ( vHtfVoting != null )
				    {
				        vHtfVoting.setAttribute('style', 'font-size: 9px; margin-top: 0px; margin-bottom: 20px;');
				    }
				    if ( vHtfH2 != null )
				    {   
				        vHtfH2.setAttribute('style', 'margin-bottom: 5px;');
			        }
				}
		    }			
		}
	}
}
