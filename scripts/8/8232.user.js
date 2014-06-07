// ==UserScript==
// @name           Newzbin + SABnzbd in Amazon
// @namespace      http://mywebsite.com/myscripts
// @description    Adds a Newzbin section to amazon's DVD, Music and Software stores with support for OneClick(tm) Downloads with SABnzbd.
// @include        *amazon.*
// ==/UserScript==
//-------------------------
//
// ----- Change Log -------
//
// Version 1
//     First Release.
// 
// -= ToDo =-
//
// Add boomarks
// SADnzbd Queue options
// Sample File List
// Comments
// nfo View
//
// -= Bugz =-
//
// Opening a record tree node before a previouse report has loaded will cause the report to be appended to most recent record.
//
//-------------------------
// Load stored preferences  // Use same setting as SABTab
//
var SABLocation = GM_getValue("SABLocation","http://127.0.0.1:8080");

// Load uname/pwd for SAB server
var tmpSABuname = GM_getValue("SABuname");
var tmpSABpwd = GM_getValue("SABpwd");

var useSABData = GM_getValue("useSABData",false);
//var SABDataReloadInterval = GM_getValue("SABDataReloadInterval",30); // in seconds
//var SABAddDefault = GM_getValue("SABAddDefault",3);
//var putSABTabFirst = GM_getValue("putSABTabFirst",false);
//var useSABQueue = GM_getValue("useSABQueue",false);
//var use1ClickSABAdd = GM_getValue("use1ClickSABAdd",true);
//
//-------------------------

// Global variable to determine if SAB is running. Needed because GM_xmlhttpRequest is buggy when server doesn't respond.
var SABRunning = false;
// Global variable to determine if we are on a post page
var postPage = unescape(location.href).indexOf("browse/post/");

var divnode;
var productname = '';
var productyear = '';
var space = document.createTextNode(' ');
var newzbinlink = document.createElement('a');
var newzsearch = document.createElement('a');
var title = document.createElement('b');
var subtitle = document.createElement('div');
var messageline = document.createTextNode('');
var status = document.createElement('span');
var nzbbucket;

(function(){
    
    if (getStoreId() == '') return;
    
        subtitle.style.textAlign = "center";
	subtitle.style.fontSize = "14px";	
	subtitle.style.fontWeight = "bold";
        
	var results = document.evaluate("//b[@class='sans']",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);

	if (results)
	{
	    divnode = results.singleNodeValue;
	    productname = divnode.innerHTML;
	}
	else return;
        
	var roottable = document.evaluate("//HR[@class='bucketDivider']",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null).singleNodeValue;

	nzbbucket = createBucket('Download');
        
	nzbbucket.id = 'nzbbucket';
	roottable .parentNode.insertBefore(nzbbucket, roottable );
	roottable .parentNode.insertBefore(roottable .cloneNode(true), nzbbucket);

	title.appendChild(document.createTextNode('Download'));
	title.style.marginRight = '10px';

	nzbbucket.style.fontSize = '1.0em';
	nzbbucket.innerHTML = '';
	nzbbucket.appendChild(title);
	nzbbucket.appendChild(getStore(getStoreId()));
    
        nzbbucket.appendChild(messageline);

        var ajaximg = document.createElement('img');
        ajaximg.src = ajaxloader();
        ajaximg.style.marginRight = '10px';
        status.style.display = 'none';
        status.appendChild(ajaximg);
        status.appendChild(document.createTextNode('Searching'));
	var statusbox = document.createElement('p');
        
	statusbox.style.float = 'left';
        statusbox.style.marginLeft = '50px';
	statusbox.style.width='auto';
	statusbox.style.fontSize='1.0em';
	statusbox.appendChild(status);
        
        var dlbucket = new OptionsTable('Download via Newzbin.co.uk');
        dlbucket.FrameingContainer.id = 'nzbframebucket';
	dlbucket.FrameingContainer.firstChild.style.marginTop = '10px';
	dlbucket.FrameingContainer.firstChild.style.width = '300px';
	
        var logo = document.createElement('img');
	logo.src = amazonimg();
	logo.style.marginLeft = '60px';
	logo.style.marginTop = '10px';
	logo.id = 'dlLogo';
	dlbucket.Container.appendChild(logo);
        dlbucket.onClick.addEventListener('click', function(event){getOptionsBox(dlbucket.FrameingContainer);}, false);
        var altatrib = document.createAttribute('class');
        altatrib.value = "Configure SABnzbd";
         dlbucket.onClick.attributes.setNamedItem(altatrib);
    
	nzbbucket.appendChild(dlbucket.FrameingContainer);
	nzbbucket.appendChild(statusbox);
        
        var listboxbucket = document.createElement('div');
        listboxbucket.id = 'newzbinbucket';
        nzbbucket.appendChild(listboxbucket);
        
    var titleclass = document.createAttribute('class');
    titleclass.value = 'h1';
    title.setAttributeNode(titleclass);

    divnode.insertBefore(space,
                         divnode.lastChild.nextSibling);

    newzbinlink.innerHTML = '(Newzbin search)';

    divnode.insertBefore(newzbinlink,
                         divnode.lastChild.nextSibling);

    divnode.insertBefore(space,
                         divnode.lastChild.nextSibling);

    var subcat = document.createElement('select');
    subcat.innerHTML='<option value="0" selected>All</option><option value="2">DVD</option><option value="16">xVid</option>';

    divnode.insertBefore(space,
                         divnode.lastChild.nextSibling);

    
    newzbinlink.target = "_blank";
    newzbinlink.href = "http://v3.newzbin.com/search/query/p/?q="+getSearchString(productname)+"&emu_subcat=-1&searchaction=Go&emu_subcat_done=-1";
    //newzbinlink.href = 'javascript:void(null);';

    newzbinlink.addEventListener('click', function(){getnewzbin();}, false);

})();


function createBucket(strtitle)
{
    var txtbucket = '<b class="h1">'+strtitle+'</b><div class="content"></div>'
    var oBucket = document.createElement('div');
    var classatrib = document.createAttribute('class');
    classatrib.value = "bucket";
    oBucket.attributes.setNamedItem(classatrib);
    return oBucket;
}

function getOptionsBox(box)
{
    box.style.display = 'none';
    
    config = new OptionsTable('SABnzbd Configuration');
    config.FrameingContainer.id = 'loginbox';
    config.FrameingContainer.firstChild.style.width = '300px';
    config.FrameingContainer.firstChild.style.marginTop = '10px';
    config.onClick.firstChild.style.display = 'none';
    box.parentNode.replaceChild(config.FrameingContainer,box);
    config.Container.align = 'right';
    config.Container.appendChild(new SabLoginForm());
}

function saveOptionBox(form, box)
{
    var formContainers = form.getElementsByTagName('p');
    
    SABLocation = formContainers[0].getElementsByTagName('input')[0].value;
    GM_setValue('SABLocation',SABLocation);
    
    tmpSABuname = formContainers[1].getElementsByTagName('input')[0].value
    GM_setValue("SABuname",tmpSABuname);
    
    tmpSABpwd = formContainers[2].getElementsByTagName('input')[0].value
    GM_setValue("SABpwd",tmpSABpwd);
    
    clearOptionBox(box);
}

function clearOptionBox(box)
{
    box.style.display = 'none';
    
    var dlbucket = new OptionsTable('Download via Newzbin.co.uk');
    dlbucket.FrameingContainer.id = 'nzbframebucket';
    dlbucket.FrameingContainer.firstChild.style.marginTop = '10px';
    dlbucket.FrameingContainer.firstChild.style.width = '300px';
	
    var logo = document.createElement('img');
    logo.src = amazonimg();
    logo.style.marginLeft = '60px';
    logo.style.marginTop = '10px';
    logo.id = 'dlLogo';
    
    var listboxcontainer = document.getElementById('newzbinbucket');
    
    var oSel = document.getElementById('videoformat');
    if (oSel.options[oSel.selectedIndex].value != "-1")
        logo.style.display = 'none';
    
    box.parentNode.replaceChild(dlbucket.FrameingContainer,box);
    
    dlbucket.Container.appendChild(logo);
    dlbucket.onClick.addEventListener('click', function(event){getOptionsBox(dlbucket.FrameingContainer);}, false);
}

function createEditTable()
{
    var container = document.createElement('div');
    var classatrib = document.createAttribute('class');
    classatrib.value = "buying";
    container.attributes.setNamedItem(classatrib);
    var tblstring = '<table class="moreBuyingChoices" border="0" cellpadding="0" cellspacing="0" width="215"><tbody><tr><td class="topLeft" valign="top" width="190"></td><td valign="top" class="topRight" width="13">&nbsp;</td></tr><tr><td class="bottomLeft">&nbsp;</td><td class="bottomRight" height="12">&nbsp;</td></tr></tbody></table>'
    container.innerHTML = tblstring;
    return container;    
}

function OptionsTable(strtitle)
{
    this.FrameingContainer=createEditTable();
    this.Container = this.FrameingContainer.firstChild.firstChild.firstChild.firstChild;
    this.OpenLink = this.FrameingContainer.firstChild.firstChild.firstChild.childNodes[1].firstChild;
    this.onClick;
    
    var newzframetitle = subtitle.cloneNode(true);
    this.Title = document.createTextNode(strtitle);
    newzframetitle.appendChild(this.Title);
    this.Container.appendChild(newzframetitle);
    
    var expanderBtn = document.createElement('a');
    expanderBtn.href = 'javascript:void(null);';
    var expanderImg = document.createElement('img');
    expanderImg.border = 0;
    expanderImg.Title = 'Configure';
    expanderImg.src = openconfig();
    expanderBtn.appendChild(expanderImg)
    expanderBtn.style.float = 'right';
    expanderBtn.style.display = 'block';
    expanderBtn.style.marginLeft='-3px';
    expanderBtn.style.marginTop='-3px';
    this.onClick = expanderBtn;
    this.FrameingContainer.firstChild.firstChild.firstChild.childNodes[1].appendChild(expanderBtn);
}

function SabLoginForm()
{
    this.SabLoginContainer = document.createElement('div');
    this.SabLoginContainer.style.padding = '3px';
    this.SabLoginContainer.style.float = 'right';
    var p = document.createElement('p');
    p.style.display = 'block';
    p.style.float = 'right';
    var paddress = p.cloneNode(true);
    
    this.address = document.createElement('input');
    this.address.type = 'text';
    this.address.style.width = '200px';
    this.address.value = SABLocation;
    paddress.appendChild(document.createTextNode('Address '));
    paddress.appendChild(this.address);
    this.SabLoginContainer.appendChild(paddress);
    
    var puname = p.cloneNode(true);
    
    this.uname = document.createElement('input');
    this.uname.type = 'text';
    if (tmpSABuname)
       this.uname.value = tmpSABuname;
    
    puname.appendChild(document.createTextNode('User '));
    puname.appendChild(this.uname);
    
    this.SabLoginContainer.appendChild(puname);
    
    var ppwd = p.cloneNode(true);
    
    this.pwd = document.createElement('input');
    this.pwd.type = 'password';
    if (tmpSABpwd)
       this.pwd.value = tmpSABpwd;
    
    ppwd.appendChild(document.createTextNode('Password '));
    ppwd.appendChild(this.pwd);
    
    this.SabLoginContainer.appendChild(ppwd);
    
    var pbuttons = p.cloneNode(true);
    pbuttons.appendChild(document.createTextNode('Save Changes? '));
    this.btnok = document.createElement('a');
    this.btokimg = document.createElement('img');
    this.btokimg.src = 'http://ec1.images-amazon.com/images/G/02/nav2/dp/btn-yes-tiny.gif';
    this.btokimg.style.marginLeft = '10px';
    this.btokimg.style.marginRight = '10px';
    this.btokimg.border = 0;
    this.btnok.href = 'javascript:void(null)';
    this.btnok.appendChild(this.btokimg);
    pbuttons.appendChild(this.btnok);
    this.btcancel = document.createElement('a');
    this.btcancelimg = document.createElement('img');
    this.btcancelimg.src = 'http://ec1.images-amazon.com/images/G/02/nav2/dp/btn-no-tiny.gif';
    this.btcancelimg.border = 0;
    this.btcancel.href = 'javascript:void(null)';
    this.btcancel.appendChild(this.btcancelimg);
    pbuttons.appendChild(this.btcancel);
    this.btnok.addEventListener('click', function(event){saveOptionBox(this.parentNode.parentNode, document.getElementById('loginbox'));}, false);
    this.btcancel.addEventListener('click', function(event){clearOptionBox(document.getElementById('loginbox'));}, false);
    
    this.SabLoginContainer.appendChild(pbuttons);
    
    return this.SabLoginContainer;
}

function getSearchString(productname)
{
    oyear = productname.match("\\b[1-2][7-9|0][0-9]{2}\\b");
    if (oyear && oyear.length > 0) productyear = oyear[0].replace(' ','');

    var re = new RegExp("\\[[^\\[]+?\\]|\\([^\\(]+?\\)","gi");
    productname = productname.replace(re, '');
    
    if (oyear && oyear.length > 0)
    {
    	productname = productname.replace(productyear,'');	
    }

    if (productname.split('-').length > 1)
    {
        var phrases = productname.split('-');
        productname = "(" + trim(phrases[1]) + ") or (" + trim(phrases[0]) + ")";
    }

    if (productname.split(':').length > 1)
    { 
        var phrases = productname.split(':');
        productname = "(" + trim(phrases[1]) + ") or (" + trim(phrases[0]) + ")";
    }

    return trim(productname);
}

function trim(strText) { 
    // this will get rid of leading spaces 
    while (strText.substring(0,1) == ' ') 
        strText = strText.substring(1, strText.length);

    // this will get rid of trailing spaces 
    while (strText.substring(strText.length-1,strText.length) == ' ')
        strText = strText.substring(0, strText.length-1);

   return strText;
} 

function getStoreId()
{
    oStoreId = document.getElementById('storeID');
    
    if (!oStoreId) return '';
    
    switch(oStoreId.value)
    {
    case 'dvd':
      break;
    case 'music':
      break;
    case 'software':
      break;
    default:
      return '';
    }
    
    return oStoreId.value;
}

function getStore(id)
{
    var subcat = document.createElement('select');
    subcat.name = 'videoformat';
    subcat.id = 'videoformat';
    switch(id)
    {
    case 'dvd':
      subcat.innerHTML='<option value="-1" selected>None</option><option value="0">All</option><option value="2">DVD</option><option value="17">Xvid</option>';
      break  
    case 'music':
      subcat.innerHTML='<option value="-1" selected>None</option><option value="0">All</option><option value="8">MP3</option><option value="2">Lossless</option>';
      break;
    case 'software':
      subcat.innerHTML='<option value="-1" selected>None</option><option value="0">All</option>';
      break;  
    default:
      subcat.innerHTML='<option value="-1" selected>None</option>';
    }
    subcat.addEventListener('change', function(){getnewzbin();}, false);
    
    subcat.style.marginRight = '20px';
    
    return subcat;
}

function getFormat(id)
{
    var oSel = document.getElementById('videoformat');

    switch(id)
    {
    case 'dvd':
      return '&category=6'+'&ps_rb_video_format='+oSel.options[oSel.selectedIndex].value;
      break;
    case 'music':
      return '&category=7&ps_rb_audio_format='+oSel.options[oSel.selectedIndex].value;
      break;
    case 'software':
      return '&category=1&ps_rb_media='+oSel.options[oSel.selectedIndex].value;
      break;       
    default:
      return '';
    }
}

function getSearchQuery(q,nzbcontainer)
{
    GM_xmlhttpRequest({
    method: 'GET',
    url: q,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails)
    {
	var parser = new DOMParser();
        showSearchResults(parser.parseFromString(responseDetails.responseText, "application/xml"),nzbcontainer);
    }
    });
}


function createList(cid)
{
    var listboxbucket = document.createElement('div');
    
    var classatrib = document.createAttribute('class');
    classatrib.value = cid;
    listboxbucket.attributes.setNamedItem(classatrib);
    
    return listboxbucket;
}

function createListItem(itemID)
{
    listitm = document.createElement('div');
    var classatrib = document.createAttribute('class');
    classatrib.value = itemID;
    listitm.attributes.setNamedItem(classatrib);
    
    return listitm;
}

// List ID name, Open List [true,false]
// return ListContainer
function getList(lid,openlist)
{
    var newzbinlist = document.getElementById('newzbinbucket').childNodes;
    var listboxcontainer;
    
    if (newzbinlist)
    {    
        if (newzbinlist.length == undefined)
        {
            newzbinlist = new Array(newzbinlist);
        }
         
        for (var pointer=0;pointer<newzbinlist.length;pointer++)
        {
            var clid = newzbinlist[pointer].getAttribute('class');
            
            if (clid == lid)
            {
                listboxcontainer = newzbinlist[pointer];
            }
            else if (openlist)
            {
                newzbinlist[pointer].style.display = 'none';
            }
        }
        
        if (listboxcontainer && openlist)
            listboxcontainer.style.display = 'inline';
        
    }
    return listboxcontainer;
}

function getnewzbin()
{
    var oSel = document.getElementById('videoformat');
    var listboxcontainer = getList(oSel.options[oSel.selectedIndex].text,true);
    
    
    if (oSel.options[oSel.selectedIndex].value == "-1")
    {
        if (document.getElementById('nzbframebucket'))
            document.getElementById('dlLogo').style.display ='block';
	return;
    }
    else
    {
        if (document.getElementById('nzbframebucket'))
            document.getElementById('dlLogo').style.display ='none';
    }
        
    // or create a new bucket
    if (!listboxcontainer)
    {
        listboxcontainer = createList(oSel.options[oSel.selectedIndex].text)
        listboxcontainer.style.display = 'inline';
        document.getElementById('newzbinbucket').appendChild(listboxcontainer);    
        getSearchQuery(newzbinlink.href+getFormat(getStoreId())+'&feed=atom', listboxcontainer);
        status.style.display = 'inline';
    }
    else
        listboxcontainer.style.display = 'inline';
}

function showSearchResults(dom,nzbcontainer)
{
    //var nzbcontainer = document.getElementById('newzbinbucket');
    var entries = dom.getElementsByTagName('entry');

    status.style.display = 'none';

    for (var i = 0; i < entries.length; i++)
    {
	var itementry= entries[i];
        var contents = itementry.getElementsByTagName('content')[0]
        var nzblink = document.createElement('a');
	var desc = document.createElement('a');
	var sabque = document.createElement('a');
        var getnzb = document.createElement('a');
	var sabstatus = document.createElement('text');
	var listitem = document.createElement('p');
  	var mediaformat = document.createElement('div');
		
	mediaformat.style.display = 'none';

	var refid = '';

	for( var x = 0; x < itementry.getElementsByTagName('link')[0].attributes.length; x++ ) {
	if( itementry.getElementsByTagName('link')[0].attributes[x].nodeName.toLowerCase() == 'title' ) {
	    refid = itementry.getElementsByTagName('link')[0].attributes[x].nodeValue;
	    }
	}

	refid = refid.split('\#')[1];
	mediaformat.id = refid;

        var para = createListItem(refid);

	var refidattr = document.createAttribute('refid');
	refidattr.value = refid;

	nzblink.innerHTML = itementry.getElementsByTagName('title')[0].textContent;
	nzblink.href = itementry.getElementsByTagName('id')[0].textContent;
        nzblink.target='_blank';
	nzblink.style.marginRight = '10px';
	nzblink.style.display = 'inline';
	nzblink.style.float = 'none';

	var opentreeimage = document.createElement('img');
	opentreeimage.src=opentree();
	opentreeimage.border = 'none';
	desc.href = 'javascript:void(null);';
	desc.setAttributeNode(refidattr);
	desc.appendChild(opentreeimage);
	desc.style.marginRight = '5px';
	desc.addEventListener('click', function(event){getcontent(this.parentNode.parentNode);}, false);

	var dlbtnimage = document.createElement('img');
	dlbtnimage.src=downloadbtn();	
	dlbtnimage.border = 'none';
	sabque.href = 'javascript:void(null);';
	sabque.appendChild(dlbtnimage);
	sabque.style.marginRight = '0px';
	sabque.style.textDecoration = 'none';
	sabque.id = 'sabdownload-' + refid;
	sabque.addEventListener('click', function(event){SABAdder(this.id.split('\-')[1],3);}, false);
	sabque.style.fontSize = '0.8em';
	
        var getnzbimage = document.createElement('img');
        getnzbimage.src=nzbdownload();	
	getnzbimage.border = 'none';
        getnzb.href = 'http://v3.newzbin.com/browse/post/'+ refid +'/nzb';
        getnzb.style.marginRight = '18px';
        getnzb.appendChild(getnzbimage);	
                
	sabstatus.id = 'sabstatus-'+refid;
	sabstatus.style.fontSize = '0.8em';
	sabstatus.appendChild(document.createTextNode(''));

	listitem.appendChild(desc);
	listitem.appendChild(nzblink);
        listitem.appendChild(getnzb);
	listitem.appendChild(sabque);
	listitem.appendChild(sabstatus);
        

	mediaformat.appendChild(contents.getElementsByTagName('div')[0]);
        var tblreport = document.createElement('table');
        //tblreport.id = 'report_' + refid;
        tblreport.appendChild(document.createElement('tr'));
        tblreport.style.marginTop = '10px';
        tblreport.style.marginBottom = '10px';
        
        var tdState = document.createElement('td');
        
        var ajaximg = document.createElement('img');
        ajaximg.src = ajaxloader();
        ajaximg.style.marginRight = '10px';
        
        tdState.appendChild(ajaximg);
        tdState.appendChild(document.createTextNode('Loading'));
        tblreport.firstChild.appendChild(tdState);
        mediaformat.appendChild(tblreport);

	para.appendChild(listitem);
	para.appendChild(mediaformat);
	mediaformat.style.marginLeft='40px';
	mediaformat.style.marginTop='0px';
	mediaformat.style.marginBottom='5px';
	listitem.style.padding = "0px";
	listitem.style.margin = "5px";
	nzbcontainer.appendChild(para);
		
    }
}

function getcontent(expanderlink)
{
var refid = expanderlink.getAttribute('class');
infpanel = expanderlink.childNodes[1];
var inftable = infpanel.getElementsByTagName('table')[0];

if (infpanel.style.display == 'none')
{
	infpanel.style.display = 'block';
	expanderlink.firstChild.firstChild.firstChild.src = closetree();
	if (inftable.childNodes.length > 1 ) return;
}
else if (infpanel.style.display == 'block')
{
	expanderlink.firstChild.firstChild.firstChild.src = opentree();
	infpanel.style.display = 'none';
	
	return;
}
var infposted = document.createElement('p');
var infSize = document.createElement('p');
var infAttrib = document.createElement('p');
if (!inftable) return;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://v3.newzbin.com/browse/post/'+refid,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	var newzbin = document.createElement('span');
        newzbin.innerHTML = responseDetails.responseText;        
	inftable.removeChild(inftable.firstChild);
	var contentform = newzbin.getElementsByTagName('table');

	if (contentform[0].getElementsByTagName('TR').length < 3)
	{
		return;
	}
	else
	{
		inftable.appendChild(contentform[0].getElementsByTagName('TR')[0]);
		inftable.appendChild(contentform[0].getElementsByTagName('TR')[7]);
		inftable.appendChild(contentform[0].getElementsByTagName('TR')[7]);
		inftable.appendChild(contentform[0].getElementsByTagName('TR')[8]);
	}
        infpanel.appendChild(inftable);
    }
});
}

//---------------------------------------------------------------------------------------------------------------------
//
//     ===   SABnzbd Section   ===
//
// --------------------------------------------------------------------------------------------------------------------

// Login to SAB
function SABLogin (SABStatus_out){
	if(!(tmpSABuname && tmpSABpwd)){
		// No storprompt for SAB U/P
		messageline.nodeValue = 'SABnzbd login incorrect!';
                
                if (document.getElementById('nzbframebucket'))
                getOptionsBox(document.getElementById('nzbframebucket'));
        }
	else{
		GM_xmlhttpRequest({
			method: 'POST',
			url: SABLocation + "/sabnzbd/",
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
				'Content-type': 'application/x-www-form-urlencoded',
			},
			data: "ma_username=" + tmpSABuname + "&ma_password=" + tmpSABpwd,
			onload: function(responseDetails) {
				if (responseDetails.status == 200 && responseDetails.responseText.indexOf("<title>Login</title>")!= -1){
					// Login failed, reset U/P and try again
					GM_setValue("SABuname", "");
					GM_setValue("SABpwd", "");
					tmpSABuname = "";
					tmpSABpwd = "";
					SABLogin(SABStatus_out);
				}
				else
                                {
                                    GetSABData();
                                }
			}	
		});
		
	}
	
}

// Adds a post(s) to the SAB queue, if no post given looks for checked posts in lists to add
function SABAdder (postNumber, argAddType) {
	var addType = ( argAddType==undefined)? SABAddDefault : argAddType;
	if (postNumber) {
		//GM_log("add Post: " + postNumber + " Type: " + addType);
		GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/addID?pp=' + addType + '&id=' + postNumber,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				var SABStatus_out = document.getElementById('sabstatus-'+postNumber);
				if (responseDetails.status == 200){
					if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin(SABStatus_out.firstChild);
					var SABHome = document.createElement('span');
					SABHome.innerHTML = responseDetails.responseText;
					checkSABadd:
					for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++){
						if (SABHome.getElementsByTagName('div')[i].id == "SABData"){
							SABStatus_out.firstChild.nodeValue = "Added Post: " + postNumber + " to Queue";
                                                        document.getElementById('sabdownload-'+postNumber).removeEventListener('click', function(event){SABAdder(this.id.split('\-')[1],0);}, false);
                                                        document.getElementById('sabdownload-'+postNumber).style.display = 'none';
							setTimeout(GetSABData, 3000);
							break checkSABadd;
						}
						else{
							messageline.nodeValue= "SAB Data not available";
						}
					}	
				}
				else{
					messageline.nodeValue = "SAB Data not available";
				}
			}
		});
	}
}

// Gets SAB main page and updates SAB Status with results
// also scans result for word 'paused' to determine if SAB is paused 
function GetSABData(SABPage){
	  var SABPAGE = "";
	  if (typeof SABPage == 'string') {SABPAGE=SABPage;}
		
			GM_xmlhttpRequest({
			method: 'GET',
			url: SABLocation +'/sabnzbd/' + SABPAGE,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				if(responseDetails.status == 200)
                                {
					if(responseDetails.responseText.indexOf("<title>Login</title>")!= -1) return SABLogin();
					SABRunning = true;
					var SABHome = document.createElement('span');
					if(useSABData)
                                        {
						SABHome.innerHTML = responseDetails.responseText;
						findSABData:
						for( var i = 0; i<SABHome.getElementsByTagName('div').length; i++)
                                                {
							if (SABHome.getElementsByTagName('div')[i].id == "SABData")
                                                        {
								messageline.nodeValue = SABHome.getElementsByTagName('div')[i].innerHTML;
								break findSABData;
							}
							else
                                                        {
								messageline.nodeValue  = 'SAB Data not available';
							}
						}
					}
					else
                                        {
                                            messageline.nodeValue  ='';				
					}
                                        
                                        if(responseDetails.responseText.toUpperCase().indexOf("PAUSED") != -1)
                                        {
						messageline.nodeValue='Resume';
						
                                        }
                                        else
                                        {
                                            messageline.nodeValue = "Paused";
                                        }
                                }
                                else
                                {
					messageline.nodeValue  = 'SAB invalid response';
                                }
				
			},
			onerror: function(responseDetails) { 
				messageline.nodeValue  = "SAB Data not available";
				},
			onreadystatechange: function(responseDetails) { 
				if(responseDetails.readyState == 2 && SABRunning == false){		
					messageline.nodeValue  = "SAB unavailable";
				}
				SABRunning = false;
			}
		});
}
//---------------------------------------------------------------------------------------------------------------------
//
//     ===   Resource Section   ===
//
// --------------------------------------------------------------------------------------------------------------------

function amazonimg(){ return "data:image/gif,GIF89a%B0%000%00%87%00%00%00%00%00%0A%00%08%10%10%10%20%20%20000%40%40%40PPP%60%60%60fffpppyyy%7F%7F%7F%FF%99%00%FF%9F%10%FF%A6%20%FF%AC0%FF%B3%40%FF%B9P%FF%BF%60%FF%C6p%FF%CC%7F%83%83%83%8C%8C%8C%8F%8F%8F%96%96%96%9F%9F%9F%A0%A0%A0%A9%A9%A9%AF%AF%AF%B2%B2%B2%BC%BC%BC%BF%BF%BF%FF%D2%8F%FF%D9%9F%FF%DF%AF%FF%E5%BF%C5%C5%C5%CF%CF%CF%D9%D9%D9%DF%DF%DF%FF%EC%CF%FF%F2%DF%E2%E2%E2%EC%EC%EC%EF%EF%EF%FF%F9%EF%F5%F5%F5%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%000%00%2C%00%00%00%00%B0%000%00%00%08%FF%00a%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%19%9AP%E1%02%86%89%88%183j%DC%C8%B1%A3G%83.%3AX%F0%B0%02%C1%C7%93(S%AA%5Cy%D0B%85%0D%15T%96X%60%A0%80%CD%02%098d%E4%B0%A0g%06%16%06y%FA%04%CApf%CD%9B9%15%9E%F8%C0%B4%A9%D3%A7%0A%3F%F4%F4y%22%E3%CC%A9%25Zj%A8%D0%01e%86%01%00%C2%8A%15%2B%60%C1%C1%12c%01%18%80Q%02%ECX%01%19%06~p%3B6%81%C2%AFi%DF%9A%3D%98%B7%AF%D8%03%07%17%D0%1D%5B%20%AB%C1%13i%09%C0%60Q%20o%01%A2%03I%AC(q%D1%23c%BF%89!%0B%FC%90%B6%B0%00%BFq3%60%06l%F02f%B1%044%0B%3C%ED%B8%20%0B%02%AC%2F%18%E4%9C%F6%B5%DF%D4%2C%05%C2f-%D6.A%DAb%0B%EC%EE%2B%A0%C4g%CCq%0B%0E%E7%ED%9B%20o%C2%04m%F3%DE%2B7%EF%82%D3%0Ar_%7F.%B6ju%EE%DC%15%13%FF%DC%0E%DE%FB%40%F0%00%0A%104%00%FE%C3o%F4%00%06%E4%3E%3E%F6%00%D3%05%F4%C5%CA%FE%0E%9Fu%C1%FCa%D9'%15%80%00%EC7%10%81%C8%F1GV%02%19%1C%90%97%7C%0A%3E%17%00K%C0%89%95%9C%40%A2%A5%D5%1C%0C%15%8A5%40O%CB%BD%95%C0%02%8D%E5%E5%9E%40%24%E4u!%0C%19%D6%C5%10%0B%04%AA7P%89c%19%06%83%05*F%D8%DB%07%0E%A65%E1J%1C%24fPk%3A%0E%40%14%0B%83%85U%DC%8C%26%0E%D4bX%E29%D7%19C%EC%A5%25%80y%88%A5E%DA%40I%CA%08C%8A9%0AD%9EX%B9%7D%90%C1%02%09%14%A0%93rS%EAh%20%0Cc%86%B5a%90i%9D%88%E2%99i%AEIP%97%0B%5D%D0%97%9E76IP%8Fc%11%D5!%00QZ%94Wn%0C%D1%18%96%97_%0A%BA%99%A4%1CR%DAh%9B%08%9D%40%E0Z%EB%E5%A5Z%9C%00%9Cx(u%AB%A5%C5(A'%F0TS%92%8F%BE%97%96y%91%D6%FF%E9%EAXv%1E%A6j%01%AC%A6%A7P%88%F1%A9%E6hXAY7%A9%ACR%8Eu*%8B%BC%F6%05%E9%A1%05%1DZ%AB%B3%07e%90%2C%91%81%F5Uk%A9%A66%2Bl%A5%C4%9E%97-Km%81%B7%EC%A2%B3%8AU%2B%98%B4%16%14.w%90%12%84%D6%B6%05%F55%1B%91%D0%16K%26%B8%08%C6W%00%80%E3~%3Bl%BA%3A%D6j%9C_%03%EC%8Bit%AC%26j%EF%BD%E5%B6%1A%2B%C0%DE%1A%BB%12%92%8Eq%40%D4%AF%FDJ%1Cp%C3%A1%0E%04c%C5%17%1F%3CP%02y-%C9%17%B9%1C%CBXo%C4%0C%A7%E4%A7%96%05a%CC%B1%B6%DDr%0B1%A8%5B%0A%C4gAt%A6%F5fA%AC%CE%9B%D6%5E%2Bc%DB2J%BC%AAF%AD%CDG%17%BDr%D2%F1%8A%FC%B1%C81%7B%CA%F3%B6%E8%9A%1B%B5%C6)-m%B4%C3%FF6M%E9%CA%5E%C3%E0u%95%1A%F6%C4%01%AC%02%91%5C3%9C%82f%1D%D6%B5(w-r%CF%1E%CE%CC%F1%B3%82f%FF%09%1DAxC%09%F8s%03%24%60%5E%E0%00%90%0AC%88%02l%BC0%00%2C%3D%C8%A6%A4%CC%EEm%B9%A2iA8P%B2vN%EBWs%00j%8Ey%7D%8E%B3%0C%ECJ%7D%F9%C6%02%A1B%86%7Dz%E9%0Fk%FDuX%7B%AD~%9B%E9%CF%8D%9C%17i%26%F0jc%D1f%FB%8Bt_%05%E7K%BB%EB%90%13%24w%C7%A5'%5B%FCi%FB%F5%E71%81%05%F7%95%F3%F2t%0B%7F%D2%CB%FD%11%5D7%D3s%2B%2F)%F7%F0E%0F%1FAO%9Ef%E4%E5%B8%B3%24%DDhq%1AX9%EC%2B%BF%EF%D7%01%F1%B3%5C%F8%05Ne%90%C0r%05a%9D_L%06%BB%E0q-%25%25%98%16%5C%04B%A3%15%CD%0Fy%7C%ABY%02%07%98%9C%06%EEI%00%86S%8A%60%1AW%90%0C%18%AF%00l%8B%5D%F8%1E%C7(%16%5C%609%04X%80yX%60%80%01%D8H%20'%B8%89M85%90%18%CA%90%86%02a%E1%0DUcB%14.%002%2CtaA%FFN%A0%1A%A5%1C%E4%04%09H%92%01V%14%9D%A3%CC%F0S2l%D7%B1%A6HE%83%A4%60%04%20%A0%80%16G%80%82%87%2C%85)U%0C%A3%18U%82%02%098%80%01hL%23%1A%1D%20%821%BA%F1!%13p%40%08%DE%18%91%14%40%40%8DxL%23%04%0C%D2%81%3E%F6%B12*YA%07V%D0%91%0E%00%D2%23!%40%E3%03F%40G%874%40%8D%10%88%E4%03%F0%B8%C7%82%20%E0%92%98L%C0%0B%3Fb%02%04%1C2%23%08%E8%0AJB%F0H%06%40%80%91%8DT%08%0AF%D0%02%83%B4%40%02z4%08%02%2C0%90%12%24%00%01*HI'%3F%89%91P%92%B1%94%0Cx%C0%1CS%19%11%14%A4%91%02%B2%A4%E5%40%3A%A9%81%1C%8AD%03%24%80%81%20%2Bc%82%0ET%04%06%1D(%81%20U%E0%01%0Bl%20%97%BB%84%E1%06%BC%09HAZ%00%03%1E%F0X75%D0%C9%AE%B8%C0%03%18%40%E757%D2%82%3B%A6%D1%01%14H%011%11%D2%FF%02%10%40%00%04%02%19A%1A%DB%18%40e%0Ed%01%D9a%C1--%A0%00%0443%01%CA%B4%00%02%B2R%12%0FtrD%12M%80%0B%C2Y%02%04%40%F4%96%D1T(D%1B%BA%81%C5T%60%96'%F5%E5I%5D2%CB%8FP%20%8F%11%18%E6%3Ea%20%02X%A6Q%20%20Hc%2B-iP%81%5C%C0%24%18%C0%A5%40%82%AA%02%0D%98%04%06%97%2C%A9%07%10%B0%82NV%A0%22%24%F0d8GT%11%17(%C0.%1D%10*%0C*%40%CB%ACF%13%9B%BED%40Ia%B0%81%A3z%04%05%93%C4c%03%24%40%D07%D6%14%98h%04(%0C%22%80%C6%08%1C%E4%00%3D%85%C1O%91%8A%01%8F%85%B2%A3%26%60fL0%10%93N~u%97%88E%40%3A7%E3%C9%A6n%D4%03%10%BDQvr%E8%CB%04%24%60%03%25%98%E7I%5E%9A%C7%BA%82%A0%8BSLA%08%22%00WE%82%16%06%A5%94%E9%A0%F2%BA%80%98%F8r%20%95%E5%40%07*%D0Q%17%FF%24%25%9C%16%91%AAn%01%B9K%15H%14%01%15%88%AC%05z%AA%80%AE%A8%20%A8IU%89%1D%3B%9B%C6%06D%00%04%A8D%09%0A%40%60F%E66%00%99%03%11%C1%1A%11%D2%D2e%3A%94%AF~%ED%0Aa%BD%E9%82P%0A%15%B7'%D8m'%17%0B%83%A5%9A%00%03%19%BC%11-%19%1A%DE%8DV%E4%BDfM%C9%08%EC%C9%DC%7BB%80%02!%E0%E2CZ0%02%11P%40%02i%ED%2F%03%24%A0O%82%D8%B4%AD%3C%8D%CC-%09I%D4%A1%0A5%AA%08%88%E6I'%8B%DB%C4%5E%24%01%0A%A8%08%0B%AEz%A3%98%C0%00%89%B4%5C%EAW%B3%DA%01%15(V%20%1De%D4~%15%DC_%07D%F2%C68%E6%2F%8D%D5%C8%60W%D65!%98%CC%A4a%14%3A%CB%866s1%97%24dY%C7%DA%E1%DD%B2%C5%A3%16%00)Y%81%9B%D1%04%90%C0%05'%AD%40J%BB%92%E5(o%88%25%23%B0%E9%8E%C7Lf46%60%02%0D6HN%1F%B0%D3%83%F8%B1x%8F%99%8D%CE3%BF%BA%19Q%AA%60%90%02%11%24!%173H%3D%0B%C4%04%E3%DC%00%20%3F%60%01h%FA6%2B%EF%2Ct5%2F%F2N%0CX%00%CFS%ECg%82%CBLi5%C6t!%11%60%F3L7%DD%11%14P%60%D2%95V%B0sC%D0fN%9B%FAX-%08%C1%04%40%1D%EA%06%FC7%BA%A7%8E%B5%18G%10%02%0AD%00%02g%EC%EF%03%20%20%01%0A%8C%20%CD%B2%0E%B6%B0%87%7D%EA%80%00%00%3B";}


function opentree(){ return "data:image/gif,GIF89a%0E%00%0E%00%F7%00%00%E6%E6%C4%C7%C7%A5%D9%D9%B7%CC%CC%AD%97%97d%AA%AA%80%7F%7FK%B3%B3%93%EC%EC%D5%F4%F4%EF%F8%F8%EA%C0%C0%9D%CE%CE%B6%C4%C4%A8%9F%9Fq%F5%F5%E6%E0%E0%BE%F8%F8%EE%E7%E7%C2%9B%9Bh%FA%FA%F1%E4%E4%C0%F4%F4%E3%F7%F7%E8%94%94c%F6%F6%E8%9E%9Em%98%98faa3%F5%F5%E4%E9%E9%C5%E9%E9%C4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0E%00%0E%00%00%08%94%00%130(%A0%A1%A0%C1%82%05%06%08%0C%80%40%01%85%87%10%15%20%080%10A%04%05%172jT%10%01A%81%09%18%3B%88%3C%00%40d%87%0B%0A%26L%88%60%B2%03%07%06-%23%A8%8C%A0%F1%C2%CB%9A27P%F8P%80%83%CF%9F%1F%3EP%D8%B0!%E8%82%02%3D7%20%0D%FA%81%A8%84%A7O9%2C%80%FAt%03%81%0A%00%B2%02%90%AA%15%40%05%02%04%20T%18K%B6%2C%04%02%0E%06%08X%CB%B6%ED%00%07%0D%0A%2C%08%40%B7.%DD%A3%0D%12%0C(%80%A1%AF%DF%BEp%13%04%04%00%3B";}

function closetree(){ return "data:image/gif,GIF89a%0E%00%0E%00%F7%00%00%E6%E6%C4%C7%C7%A5%D9%D9%B7%CC%CC%AD%97%97d%AA%AA%80%7F%7FK%B3%B3%93%EC%EC%D5%F4%F4%EF%F8%F8%EA%C0%C0%9D%CE%CE%B6%C4%C4%A8%9F%9Fq%F5%F5%E6%E0%E0%BE%F8%F8%EE%E7%E7%C2%9B%9Bh%FA%FA%F1%E4%E4%C0%F4%F4%E3%F7%F7%E8%94%94c%F6%F6%E8%9E%9Em%98%98faa3%F5%F5%E4%E9%E9%C5%E9%E9%C4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0E%00%0E%00%00%08%94%00%134%D8%60%A0%A0%C1%82%18%16%24X%80a%83%86%87%10%1FNH%B8%E1%40%83%01%183b%0Cp%60%03%81%01%10B%8A%1C9%80%C0%04%08%12%3C%A8%5C%A9RB%85%09%13R%B2%9C)a%C2%86%0F%1F%3C%E0%DC%C9s%C3%06%0A8%0Bp%18J%F4%03%05%9F%14%22P%60p%E0%40%81%02M%95%FA%8C%F0%20%83%D5%ABV%1FD%F0%F8%A0%83%85%AF%60%BFvx%40%C0%01%82%0C%5E%C3Z%E8%90%01%81%83%06%0B%00X%C0j%D5%02%82%05%0D%12%0C(%80%A1%AF%DF%BE%1A%F2%06%04%00%3B";}

function downloadbtn(){ return "data:image/gif,GIF89aD%00%0E%00%87%00%00%00%00%00%00%00%40%03%03B%07%07D%0B%0BF%0E%0EH%12%12J%16%16M%1A%1AO%1D%1DQ!!S%25%25U))X%2C%2CZ88%60%3B%3Bc%3F%3FeCCgFFiJJkNNnUUrYYt%5D%5Dvdd%7Bhh%7Dll%7Fpp%81ss%84%7B%7B%88%88%88U%90%90a%9C%9Cl%9F%9Fp%A8%A8x%82%82%8C%86%86%8F%8A%8A%91%8D%8D%93%95%95%97%99%99%9A%A6%A6%80%AE%AE%82%A0%A0%9E%B1%B1%82%B3%B3%86%B2%B2%8C%BE%BE%8C%B9%B9%92%BF%BF%94%A4%A4%A0%A8%A8%A2%AF%AF%A7%B3%B3%A9%B6%B6%AB%BA%BA%AD%BE%BE%B0%C1%C1%8E%C7%C7%94%C5%C5%9D%CB%CB%9A%CC%CC%99%C5%C5%AC%CD%CD%A2%CD%CD%AE%C2%C2%B2%C5%C5%B4%C9%C9%B6%CD%CD%B4%CD%CD%B8%D1%D1%A5%D8%D8%AB%D0%D0%B6%D0%D0%BB%D1%D1%BA%D4%D4%BD%DD%DD%B3%D8%D8%BF%DF%DF%BA%E3%E3%BB%E1%E1%BC%D5%D6%C1%D9%D9%C4%DC%DC%C1%DF%DF%C2%E0%E0%C3%E3%E3%C5%E7%E7%C8%EB%EB%C7%ED%ED%CF%EE%EE%CC%E6%E6%D7%E7%E7%DC%E8%E8%DE%F0%F0%D1%F4%F4%DD%EC%EC%E1%F2%F2%E6%F6%F6%E5%F9%F9%ED%F7%F7%F0%F8%F8%F5%FD%FD%FA%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00h%00%2C%00%00%00%00D%00%0E%00%00%08%FF%00%D1%08%04%83%04%86%08%0F%08%13*%5C%C8%B0%A1%C3%87%0FE%C0%40%02F%A0E)-%80l)s%E6%8C%99%8E%1F%3D%82%1C)%B2d%C8%93%24%3F%A24%99%F2L%18*%3BXH%B9%B8%23%CC%98%2F%5E%B4%E8%DC%C9%B3%A7%CF%9F%40%83%06%F5%F2%E5%0B%94%183%C1%B4%08%23%A6g%80%A7%04l%08%9D%BA3%00U%A7%3F%B3%40QA%10%C8%18%9F%01%94(%19!%60%C5U%A1V%CF%EAL%EB%F3%C9%0E%220%B6%7C%01%BBs%85%00-E%1C%04x%D0D%8B%02%25Zh%04(%A2e%88%81%2B%01J0%200C%8B%D5%BC%7B%FB%DE%60%10%00%01%0A-M%2208%C1%B6%E7%13%23.D%90%C9%89%B5%AA%16%07%15%82L%B8%A0%85%83%09-%19%0Ct%D0%B2%01%83c%0CBL%DC%B5%8AZ5%EB%06%25%94%ACP%A0%85B%06%1C%11%3A%F3%C4b%24%84%880%A4yv%B6%3A%00%B0a-A%24h%B1%DC%60%3B%0E%C7V%D6%3A%E7%D6R%BD%B0%01-5880%60%D5%00%E0%20%CAwb%E1%01%02%06%95%B9%A5%B5%D8%25%DFWH%02%9D%0D%D8%E0%C0v%260%20%9Ex%D4%F5%F7_%03%26%C8P%83U%05%F4%B5D%7C%3A%3D%91%83%0AH%EC%80%9Ft%3A%AD0%80Y%10h%D0D%05%16%E8%C4A%01%24%D0F%C0%08%07%8EgU%88%23%96x%C0%0DA%24%A7%85%04%1A(%B1%00%85Z%1C%D1%82%0F%60%A8%00E%16N%3DU%96NC4%10%80%03U%E8%14%84%00S%60'%40_%E3!X%98%92LjaB%01%04%90%60%D5%12%0C%180%03%85L%E4%10B%17hD%01%83%13O%3C%81%85Zp%C6%E9%13%16O%1Cqa%12%16E!B%0C%3F%18%D1%C3%9F%80%06*%E8%A0%84%16j%A8%A1%3A%BC%C0%02%08xZ%84F%17%3E%A4%F0%01D%94Vj%A9C%1F%A4%E0%03%17%16%05%04%00%3B";}

function ajaxloader() { return "data:image/gif,GIF89a%10%00%10%00%F4%00%00%FF%FF%FF%00%00%00%F0%F0%F0%8A%8A%8A%E0%E0%E0FFFzzz%00%00%00XXX%24%24%24%AC%AC%AC%BE%BE%BE%14%14%14%9C%9C%9C%04%04%04666hhh%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%1DBuilt%20with%20GIF%20Movie%20Gear%204.0%00!%FE%15Made%20by%20AjaxLoad.info%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05w%20%20%02%02%09!%E5%A8%02DB%08%C7A%90%ABH%1C%89%E0%C8%C2%AC%12%B3%C1a%B0%03%A6D%82%C2%10%E6%40%20%5E%B6%14A%E9X%F8%90P%A4%40%F1%B8%22U%83%82%B3Q%23%09%CE%E1B%81%5C%3B%9F%CD%0B%C31%AA%12%0C%18%05o%CF%3A2%24%1Av%03%40%04%0A%24%7C%2C3%04%0F%0B%0A%0D%04%82_%23%02%08%06%00%0Dd%04%805%04%063%97%22%0Bs5%0B%0Be!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05v%20%20%02%02i%40e9%8EDA%08%C9A%10%8C%B2%8A%C4%F1%C0%0E%11%2F%AB%19%60ph%24%18%8DCa%25%40%20%05%8C%C7%E9pH%A9%08%08%9D%10%B0x%BDF%02%81%C2uS%89%14%10%83%01x%23%85%05%0D%04%04%C2.%BF%DD%84%86Y%14f%8E%11%04L%02_%22%03%05%0Ap%0A3B%83W%81%04%10%04%0B%88%5D%7CL%06%0D%5C6%92%7B%7Cz%9A8%9D7%5B7!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05x%20%20%02%02%D9%0Ce9%8E%04D%08E%22%08%8F%B2%8A%84%83%C02r%2C%AB%17%A0qP%C4%14%87%02%80%00%14%18j%B4%C2%60%F08%10%06%07%EB%12%C2%40%10%088b%16H%12%2C%20*%D1%E20%18-%A6%0D%F0mFW%18%EE%E49%BDLP%A4E3%2B%02%0A%10(%82%02B%22%0D%06%0Bf%8D%7B%88*BW_%2F%89%7F%02%0D%40_%24%89%82~Kr%817Ar7!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05v%20%20%02%02%D94e9%8E%84!%08H%F1%22%CB*%12%8F%1B%0B%D0Q%8F%2F%40%83%B1%88-%0E%10%12%814%80%10%04%05%C3%A9p%104%0E%8CR%2B%F7%BC-%12%07%9F%E8%B5p%AD%08%C8%A7%60%D1P(%966%08%83%E1%A0%9D%1A%F0U%2F%FC%20%09%08%0B*%2C%04%84)%04%03(%2B%2F%5D%22lO%85%2F%86*Ak%91%7F%93%8A%0BK%94%8C%8A%5DA~66%A06!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05l%20%20%02%02i%18e9%8E%04%22%08%C7%F1%1E%CB*%12%87%1B%0B%0C%BD%BE%00%03-%D680H%04%12%82%B1%80%3DN%3B%A1%0C%D0%CA%11T%84E%EC%D0%10%BD%16%AE%15%EEq%15%10%1A%E8%A4%ED%B1e%9E%0C%EAUoK2_WZ%F2%DD%8CV%89%B41jgW%04e%40tuH%2F%2Fw%60%3F%85%89f~%23%92%89%966%94%93%23!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05~%20%20%02%02%B9%2Ce9%8E%82%22%08%83%F1%1A%C4*%0A%86%3B%0CpR%B3%25%02%84%B0%230%06%A4%9A%60%A1%20%C0%1A'%C3c%99(%A4%16%03%94J%40%40%1C%1E%BF%17%C1%B5%12%14%1A%2F1%C1i%034%10%88%C2%60%BDV%AD%1A%89%04%03B%E2%BEV%04%0F%0Du%7D%84%22c%07%07%05aNi%2F%0C%07%5D%07%0C))%8D-%07%08%00Lel%7F%09%07%0Bmi%7D%00%04%07%0Dme%5B%2B!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02I%10e9%8E%C2%22%08M%F36%C4*%C2%A8%227E%CD%96%84%81%40G((L%26%D4pqj%40Z%85%A7%89%F9%BA%11%20%0C%84%EF%25%40%AD%04%10%05w%ACZ)%20%10%84pl%03(%0A%8F%87%81%D4%AD%8E%08%08q%F5u*%13%16%07%07R%26c%06%10%09%07%60%07%0F))(%0C%07%03%07s%7F_J%90%04%88%3E_%5C%0E%07'%0EGm7%08%8C%24%2B!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05w%20%20%02%02I%10e9%8E%02*%2C%8B%20(%C4*%BE(%FCB5%5B%121%18%01%B2%20%A5Z%B2%D3Iah!%06G%97%AAex%18z%B2%ECJ0%88e%BF6%C0%C2%40V%7CU%AB%05%04%F14%BA%B6Dm%B2%85%25%24%0E%CD%9B%EBp%18%0C%0A%09%5C%07%05G%00%03x%09%09%0D%7D%00%40%2B%04%7C%04%0C%0C%02%0F%07%3D%2B%0A%071%93-%09Ea5%02l)%2B!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02)%9C%E4%A8%9E'A%9CK%A9%92%AF%E0%DA%8D%2C%A2%B6%FD%0E%04%93%89E%5C(l%83%9C%A9%26%3B5%20%8D%E0%105%12D%89%C4%19%800%E8%1E%B33%82a%AC0-%12%8B%15%90%B5-%1C%0E%D1%1D%A1%C0%18%94%04%8E%C3%83pH4%14%10%05V%09%10%25%0Di%03%07%03%0F%0F%0Ap%5BR%22%7C%09%02%8C%02%08%0E%91%23%0A%99%02%09%0F6%05iZwcw*!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02)%9C%E4%A8%9E%2CK%94*%F9%B6%C4%02%8B%A80%9F%0Ba%9A%3B%D7%8B%D0%B0%01Y8%81b%604%E9n%A4%1E%0B%C2%A8Bb%00%82b%BBx%1C%BE%05%2C%B1%C1%D4%11%19%BE%91%A0%B1%CB%16%BE%CD%13%E4%D1(%09%12%07%C8%BD%B0%1D%20%04%0B%08%06%25%0A%3E%03%07%0D%08%05%0B%0C%0A2*%04%07%0F%02%8A%02%06%0Fi*%0B%09%2F%05%05%3A%10%99%2B%24%03%03v*!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05u%20%20%02%02)%9C%E4%A8%9El%5B%AA%24%E1%0A%B2J%10q%5B%A3%C2q%0C3%99%60Q%5B%F8%0E5%13%81%F8%3A%19%0E%8A%95%F0%04IX!0%C0rAD8%18%0CCv%AB%90%C9%14%05%DCHPfi%11%BE%E4i%00Q%94%04%8F%83AP%40p%1B%10C%06%0D%25D%00%0DP%06%10%04%0FQ46%0C%05%02%8A%02%0Dici%02%10%08Nj0w%0D%84)%23!%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02)%9C%E4%A8.%0Cq%BE%A8%0A%2CG%02%0B%AEJ%10%00r(%AF%1CJ%908%0C%08%87C%F0%E4*%11%8A%87%86B%B4%2C%99%1A%8E%85%EA%26%18%3C%0A%85%81%8C%B4%DB%19%12h%B1%0CW~-%10%BC%91%60%D1%2C%09%0C%87%96%F5%A4%18%2C%EC%3E%03%02%10%06%3B%0A%0D8RN%3C%2C%0B%03%85%10%3C1T%0F%10%5D%06%02%0A%98c%04%91%97'%0Dqk%24%0A%40)%23!%00%3B%00%00%00%00%00%00%00%00%00";}

function openconfig() { return "data:image/gif,GIF89a%0B%00%0B%00%80%00%00%FF%FF%FF%184%90!%F9%04%00%00%00%00%00%2C%00%00%00%00%0B%00%0B%00%00%02%17D%8Eh%C0%DD%E7%22%8C%2F%B0dM%D6%7B%5E%E7Q%A1%B4%89%1Cf%15%00%3B";}

function nzbdownload() { return "data:image/gif,GIF89a%0D%00%0F%00%87%00%00%00%00%00%00%04%00%08%18%00%08%20%08%08%24%08BEBJIJceckik%8C%8AR%84%86%84%CE%CF%9C%E7%E3%BD%EF%EF%CE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%0F%00%2C%00%00%00%00%0D%00%0F%00%00%08f%00%1F%08%7C%00%A0%20%80%03%03%13%02h%C0%B0%C1%02%84%09%096t%08Q%E1%C4%87%09%03%10%20p%91%C0%80%81%01%18Ll%98%40%C1%40%01%23%1D%16%88%98%60b%02%00%06%22%3Eh%C9%10%80%03%00%03%0B%124h%13%00%02%82%0En%DA%0C%3A%D4gO%A1G%7B%26EzSh%D3%A1Mo%22%40%60%94jA%AB%3F%03%02%00%3B";}