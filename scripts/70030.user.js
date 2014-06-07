// ==UserScript==
// @name           nffUS
// @namespace      lsrr
// @description    nFF mods.
// @include        http://freak.no/*
// @require        http://userscripts.org/scripts/source/69456.user.js 
// ==/UserScript==

//####################
//### CONFIG

var scrollto	= true; // Enables autoscroll
var fixedMenu	= true; // Fixed menu
var removeAd	= true;	// Remove the ad between navbar and content
var imageUpload	= true;	// Function for posting images to http://0o2471.net/ and get link
var textarea	= true; // Increasing the width for textareas

//####################
//### Script start, don't change if noob = true

//////////
// Vars
var screenWidth	= document.body.clientWidth;
var scrollToID	= 'pstart'; // The ID of the element the page scrolls to when scrollto = true

//////////
// Functions

// Checks if str is in url
function inUrl(str)
{	return ( document.URL.search(str) >= 0 ) ? true : false;	}

function _scroll(id)
{	document.getElementById(id).scrollIntoView(true);}

// Get contents of class
function getClass(tag,cName)
{
	var node	= document.getElementsByTagName(tag);

	for(i = 0; i < node.length; i=i+1)
	{
		if( node[i].className == cName )
		{
			return node[i];
			break;
		}
	}
}

//////////
// Lol

// Fixed Menu
if( fixedMenu && !inUrl('newthread.php') && !inUrl('newreply.php') && !inUrl('do=newpm') )
{		
	var menu	= getClass('div','tborder');
	menu.setAttribute('style','position:fixed; top: 0px; width: 1200px;'+
					  '-moz-box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px;');
}

// Scrollto
if( scrollto && !inUrl('#') )
{
	if( inUrl('showthread.php') )
		scrollToID = 'contentWrapper';
	else
		getClass('table','tborder').setAttribute('id',scrollToID);

	//alert(scrollToID);
	//_scroll(scrollToID);
	
	offset	= document.getElementById(scrollToID).offsetTop;
	sb = 0;
	
	if( fixedMenu )
	{
		switch(true)
		{
			case(scrollToID == 'contentWrapper'):
				sb = 65;
				break;
			default:
				sb = 20;
				break;
		}
	}
	
	window.scroll(0, offset - sb);

}

// Remove ad
if( removeAd )
{	getClass('div','alt1 adBelowNavbar').setAttribute('style','display:none');	}

// ImageUpload
if( imageUpload || inUrl('newreply.php') || inUrl('newthread.php') || inUrl('showthread.php') || inUrl('?do=newpm') )
{	
	// Obvious
	/*if( !inUrl('showthread.php') && scrollto)
		_scroll('contentWrapper');*/
		
	// Start creating Box
	
	// Vars
	boxWidth	= 350;
	leftMargin	= (screenWidth / 2 ) - ( boxWidth / 2);
	
	// Functions
	function startUpload()
	{
		document.getElementById('iu_txt').style.display		= 'none';
		document.getElementById('iu_file').style.display	= 'none';
		document.getElementById('iu_submit').style.display	= 'none';
		document.getElementById('iu_loading').style.display = '';
		
		file 	= document.getElementById('iu_file').files[0];
		
		BinaryRes.post({
			url: 'http://0o2471.net/upload.php',
			callback: finishUpload,
			data: {
				MAX_FILE_SIZE: {
					value: 1500000,
				},
				
				userfile: {
					value: file.getAsBinary(),
					filename: file.fileName,
					type: BinaryRes.guessType()
				}
			}
		});

	}
	
	function finishUpload(res)
	{
		document.getElementById('iu_txt').style.display		= '';
		document.getElementById('iu_file').style.display	= '';
		document.getElementById('iu_submit').style.display	= '';
		
		document.getElementById('iu_loading').style.display = 'none';
		
		res_str	= res.responseText;
		eval('res='+res_str);
		
		if( res.msg )
		{
			domain	= '0o2471.net';
			url		= 'http://'+ domain +'/'+ res.msg;
			bbCode	= '[URL=http://'+ domain +'/'+ res.msg +'][img]http://'+ domain +'//'+ res.msg +'.jpg[/img][/url]';
			
			div	= document.createElement('div');
			div.innerHTML	= '<hr/><table>'+
					'<tr><td><b>BBkode:</b></td><td><input type="text" value="'+bbCode+'" onClick="javascript:this.select()"/></td></tr>'+
					'<tr><td><b>Url:</b></td><td><input type="text" value="'+ url +'" onClick="javascript:this.select()"/></td></tr>'+
					'</table>'+
					'<a href="http://'+ domain +'/">'+ domain +'</a>';
							
			document.getElementById('imgUploadBox').appendChild(div);
		}
	}
	
	function showBox()
	{
		id	= document.getElementById('imgUploadBox');
		id.style.display	= (id.style.display == 'none') ? '' : 'none';
	}
	
	// Box
	var	imgUploadBox	= document.createElement('div');
	imgUploadBox.setAttribute('id','imgUploadBox');
	imgUploadBox.setAttribute('style','background:#EEE; font-size:11px; -moz-box-shadow:0 0 10px black; border:1px solid grey;'+
							  'position:fixed; top:10%;left:'+ leftMargin +'px; width:'+boxWidth+'px;padding: 5px; display:none');
	
	
	imgUploadBox.innerHTML	= '<a style="text-decoration:none; color:black; font-weight:bold;" title="Lukk"'+
								'href="javascript:void(document.getElementById(\'imgUploadBox\').style.display=\'none\');">[x]</a>';

	// Form
	var form	= document.createElement('form');
	form.setAttribute('action','javascript:void(true);');
	
	var iu_txt		= document.createElement('span');
	iu_txt.setAttribute('id','iu_txt');
	iu_txt.innerHTML	= 'Bilde: ';
	
	var iu_file		= document.createElement('input');
	iu_file.setAttribute('id','iu_file');
	iu_file.setAttribute('type','file');
	
	var iu_submit	= document.createElement('button');
	iu_submit.setAttribute('id','iu_submit');
	iu_submit.innerHTML	= 'Last opp!';
	iu_submit.addEventListener('click', startUpload, false);
	
	var iu_loading	= document.createElement('div');
	iu_loading.setAttribute('id','iu_loading');
	iu_loading.setAttribute('style','display:none');
	iu_loading.innerHTML = 'Loading...<img src="/forum/images/custom/voting.gif" style="margin-bottom:-3px;"/>';
	
	form.appendChild(iu_txt);
	form.appendChild(iu_file);
	form.appendChild(iu_submit);
	form.appendChild(iu_loading);

	// Append
	imgUploadBox.appendChild(form);
	document.body.appendChild(imgUploadBox);
	
	// Add Clickable button
	var appendTo	= document.getElementById( (inUrl('showthread.php') ? 'vB_Editor_QR_controls' : 'vB_Editor_001_controls') );
	appendTo	= appendTo.getElementsByTagName('table')[0].getElementsByTagName('td');
	appendTo	= appendTo[appendTo.length - (inUrl('showthread.php') ? 2 : 3) ];
	
	var button	= document.createElement('span');
	button.setAttribute('id','ui_icon');
	button.addEventListener('click', showBox, false);
	
	button.setAttribute('style','display:block; cursor:pointer; width: 12px; height: 12px; line-height:15px; text-align:center; padding:4px;');
	button.innerHTML = '<img src="http://www.dropboks.com/images/icn_upload.gif" alt="Last opp bilde" title="Last opp bilde"/>'+
						'<style type="text/css">#ui_icon{border: 1px solid #E1E1E2;}#ui_icon:hover { background: #C1D2EE; border:1px solid #316AC5;}</style>';

	// Append Button
	appendTo.innerHTML = '';
	appendTo.appendChild(button);
}

// Textarea
if( textarea && (inUrl('newreply.php') || inUrl('newthread.php') || inUrl('?do=newpm')) && !inUrl('showthread.php') )
{
	//id	= document.getElementById( (inUrl('showthread.php') ? 'vB_Editor_QR_textarea' : 'vB_Editor_001_textarea') )	
	id	= document.getElementById('vB_Editor_001_textarea');
	
	if( inUrl('do=newpm') && id)
		id.style.width = '775px';
	else
		id.style.width = '850px';
}
