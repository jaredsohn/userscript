// ==UserScript==
// @name		Comment Link Extractor
// @namespace	CLE
// @description	Extract rapidshare,megaupload,hotfile links from blog comments
// @version		0.0.5
// @copyright	2010+, Hypercas (hypercas.com)
// @include        http://www.rlslog.net/*
// @include        http://sceper.eu/*
// @include        http://www.scnsrc.me/*
// @include        http://www.oneddl.eu/*
// ==/UserScript==
    
    
//Domain Settings
var $settings = [];
/*
	jq_Post			jQuery - Post entry selector
	jq_PostUrlCont		jQuery - Post's url container (usually the title element)
	jq_PostUrlAdd		jQuery - Appened to Post's url to get all it's comments
	t_CommentSplit		Regex - split comments
*/

//www.rlslog.net
var $set_rlslog=[];
$set_rlslog["jq_Post"]			= '.entry';
$set_rlslog["jq_PostUrlCont"]		= 'h3';
$set_rlslog["jq_PostUrlAdd"]		= 'all-comments/';
$set_rlslog["t_CommentSplit"]		= 'id="comment-';

//www.scnsrc.net
var $set_scnsrc=[];
$set_scnsrc["jq_Post"]			= '.post';
$set_scnsrc["jq_PostUrlCont"]	= 'h2';
$set_scnsrc["jq_PostUrlAdd"]	= '';
$set_scnsrc["t_CommentSplit"]	= 'id="comment-';

//www.oneddl.eu
var $set_oneddl=[];
$set_oneddl["jq_Post"]			= '.article-inside';
$set_oneddl["jq_PostUrlCont"]	= 'h1';
$set_oneddl["jq_PostUrlAdd"]		= '';
$set_oneddl["t_CommentSplit"]	= 'id="comment-';


//#Site Setting combined
$settings["www.rlslog.net"]		= $set_rlslog;
$settings["www.scnsrc.me"]		= $set_scnsrc;
$settings["www.oneddl.eu"]		= $set_oneddl;



//Choose settings to use for this domain
var $ap_set = $settings[window.location.host];

//Apply Settings
var $T_POST		= $ap_set["jq_Post"];
var $T_LINK		= $ap_set["jq_PostUrlCont"];
var $T_LINK_ADD	= $ap_set["jq_PostUrlAdd"];
var $T_SPLIT	= $ap_set["t_CommentSplit"];



//File host regex settings
var $filehost  = []; 
/*
	regex		Regex match pattern for host
	css		link element css
	tgl_img	Filehost icon for toggle menu
*/
//Filehost: Rapidshare.com
$host__rapidshare_com = [];
$host__rapidshare_com["tgl_img"]  = 'data:image/png;base64, R0lGODlhEAAQAPeLACc1hSg2hSk3hik4hio4hio4hyo5hys5hyw6iC88iS89iTA9iTE/izNBjDpHjzxJkDxJkT1KkUBMk0FNk0JPlENPlENPlURQlUhUmElVmEtXmU1Zm1BcnFFcnVFdnVJdnVNenlRfnlZhn1hjoFtmol5ppGBqpWFspmRvp2ZwqGdxqWt0q2x1rGx2rG12rG13rG95rnF6r3J8r3V+sXd/sneAsniBsnqDtHuEtHyFtX6GtoCIt4OLuYOMuYWNuoePu4mRvIuTvY+Wv5GZwZSbwpWcw5ifxZuhxpyjx52kyJ6kyKCmyaCnyqGoyqKoyqSqy6aszKaszaeszaiuzqqvz6qwz6uwz6yx0Kyy0K600a+00bC10rG207K307S51Li917m+17u/2LvA2b7D2sHF3MTI3sXJ3svO4cvP4s/S5NHU5dTX59XY59XY6NbZ6NfZ6Nfa6dja6Nja6dze6+Di7eHj7uPk7+Tm8OXn8ebn8ejp8unq8uzt9O7v9e/w9vDx9vLz+PT1+fX1+ff3+vj5+/r6/Pr7/Pv7/fv8/fz8/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAjYABcJXGQoTZg2hAYqHGjoiYQGFWycMbRw4JcMBgJkfDCED6E/CvG8WIIEowEDCF4E8aKwjAIhi+bQWGDggEYrCts4EMFn0SAlD04amKJw0IqhAgfFAJCRKEE9eK5wMNEGD5kbNF7cQANVjQgZKjjw4GDjxxUdFaKI4ZDCyQIdI0LoMDACRpgXD3QEGcHjxYUUC7QsSZFBwhEjKEooMaFlQ40uF6Y4IfLCRpQvOop0idFGTR5AbezIYSMHj5QdXfjwqUOxokA+XX508eO6Ip8yX+rUrjiIz6CAADs='
$host__rapidshare_com["regex"]  = /href="http\:\/\/rapidshare.com\/files\/[0-9]{6,12}\/[A-Za-z-.0-9_]{1,120}(.rar|.avi.html|.0[0-9]{2})"/g
$host__rapidshare_com["css"]  = {	
							//display:'block',
							background:'url("'+$host__rapidshare_com["tgl_img"]+'") no-repeat',
							padding:'0px 0px 0px 18px',
							color:'#990000',
							height:'16px'
						}
						
//Filehost: filefactory.com
$host__filefactory_com = [];
$host__filefactory_com["regex"]  = /href="http\:\/\/(www.filefactory.com\/(f|file)\/[A-Za-z-.0-9_\-\/]{1,100})"/g
$host__filefactory_com["tgl_img"]  = 'data:image/png;base64, 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'
$host__filefactory_com["css"]  = {	
							background:'url("'+$host__filefactory_com["tgl_img"]+'") no-repeat',
							padding:'0px 0px 0px 18px',
							color:'#801010',
							height:'16px'
						};

//#Filehost settings combined
$filehost["rapidshare_com"]		= $host__rapidshare_com;
$filehost["filefactory_com"]	= $host__filefactory_com;


//jQuery Presets
var $CSS__CLE_BOX = {
				padding: '10px', 
				background: '#ffc', 
				border:'1px solid #959595', 
				margin:'0em',
				color:'#111111'
			};
var $CSS__CLE_POST_LINKS = {
				margin: '5px'
			};
var $CSS__CLE_OPT = {
				float: 'right'
			};
var $CLE_LOADING_IMG = 'data:image/gif;base64, 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';
var $CLE_TOGGLE_IMG = 'data:image/jpeg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8cHh4jJzIqIyUvJR4eKzssLzM1ODg4ISo9QTw2QTI3ODUBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1MTQ1NTU1NTU1NTU1LDU1NTU1LDU1Nf/AABEIABYAFgMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAABAYHBQP/xAAtEAABAgQEBAQHAAAAAAAAAAABAgMABAURBhIxQRMhUYEHImGxFDNCYnGh4f/EABcBAAMBAAAAAAAAAAAAAAAAAAIEBgP/xAAhEQACAQMEAwEAAAAAAAAAAAABAgADESEEEjFhIrLhBf/aAAwDAQACEQMRAD8A0DEONZmnYjap8nLWS1Zbqn0lIeB2Semvm58xvY3nTWJjOsJRS87Th+Y463fhfbbQn9W7RXvFDE1LYTLyCCh6pNOZ7pseAncKPVXLy+gJ2vSHsTOjgmYU6WrhRQlRRnTfnYjuLwlUrlHK3+Sm035Y1NBKgSx9ptlHqRqcopa0ZHWlltzLzSVDdJ3HtodIR54dqtNq9FYmKOpHw2XKGwLFsj6SNiP7CHBkScqKVYgi3U5GLPD+n4lmmZ3hobm2lDOdEvp6Kt79vxFr2CJnEsgxJzjdOlkS9g07LBedtO4APIj0hCB2Kb45mw1VddtnPjx1LPSKPJ0KmNSNPZDTDY03UdyTuT1hCEGBaLsxYlmOZ//Z';
var $CSS__LOADING_IMAGE = {
				border: '0px',
				margin: '8px'
			}


function createLink( type, url )
{
	return '<br/><a class="CLE__L_'+type+'" href="'+url+'">'+url+"</a>";
}

function attachLinkClasses( $box )
{
	for (id in $filehost)
	{
		var $tog_control = 'CLE__L_TOG_'+id;
		var $tog_target = '.CLE__L_'+id;
		
		$( $tog_target ).css( $filehost[id]["css"] );
		$( '<span class="'+$tog_control+'" >'
			+'<img src="'+$filehost[id]["tgl_img"]+'" rel="'+$filehost[id]["tgl_img"]+'"/>'
			+'</span>' ).appendTo( $box.children( '.opt' ) );
		$box.children( '.opt' ).css($CSS__CLE_OPT);
		
		
		//alert('.'+$tog_control);
		/*.toggle(
			function()
			{
				//$($(this).attr("rel")).parent().slideUp();
				//alert( $(this).attr("rel")  );
				
				$(this).parent().parent().find( $(this).attr("rel") ).parent().slideUp();
			},
			function()
			{
				//$($(this).attr("rel")).parent().slideDown();
				$(this).parent().parent().find( $(this).attr("rel") ).parent().slideDown();
			}
		)*/
		
		/*
		.dblclick(
			function()
			{
				//$($(this).attr("rel")).parent().slideDown();
				$(this).parent().parent().find( $(this).attr("rel") ).parent().slideDown();
			}
		)
		*/
		
		$('.'+$tog_control)
		.attr('rel',$tog_target)
		.toggle(
			function()
			{
				//$($(this).attr("rel")).parent().slideUp();
				//alert( $(this).attr("rel")  );
				
				$(this).parent().parent().find( $(this).attr("rel") ).parent().slideUp();
				$(this).children('img').attr('src', $CLE_TOGGLE_IMG);
			},
			function()
			{
				//$($(this).attr("rel")).parent().slideDown();
				$(this).parent().parent().find( $(this).attr("rel") ).parent().slideDown();
				$img = $(this).children('img').attr('rel');
				$(this).children('img').attr('src',$img)
			}
		)
		.data( "target", $tog_target );
		
	}
}

function removeLinkClasses( $box )
{
	$box.children( '.opt' ).children('span').remove()
}
			
function parsePosts( source )
{
	$htmlOut = '';
	
	//Create regex objects for each filehost
	$regObjs = [];
	for (id in $filehost)
	{
		$regObjs[id] = new RegExp( $filehost[id]["regex"] );
	}
	
	//Split page is posts
	source = source.split($T_SPLIT);
	
	//for each post, parse links
	for (var i=0;i<source.length;i++)
	{
		//$htmlOut += "<br>#"+i;
		for (host in $regObjs)
		{
			var dummy = source[i];
			links = dummy.match( $regObjs[host] );
			
			//$htmlOut += "<div>"+$regObjs[host]+"</div>";
			
			if(links)
			{
				$htmlOut += "<div>";
				$htmlOut += "<br>#"+i;
				for (var j=0;j<links.length;j++)
				{
					link = links[j].substring(6,(links[j].length - 1));
					$htmlOut += createLink(host,link);
				}
				$htmlOut += "</div>";
			}
		}
		
	}
	
	$htmlOut += '<br/><br/><br/>'
	return $htmlOut
}


function startCLE() {
	
	$.noConflict();
		
	$bar = $('<div class="CLE_BOX"><span class="tog"><b>Download Links<b></span><span class="opt"></span><br></div>')
		.css($CSS__CLE_BOX);
		
	$bar.appendTo($T_POST);
	
	$linkbox = $('<div class="lnk"> </div>')
		.css($CSS__CLE_POST_LINKS);
	
		
	$('.CLE_BOX > .tog').toggle(
	
	function()
	{
		
		$me = $(this).parent();
		$url = $($me).parent().children($T_LINK).children('a').attr('href');
		if($url == undefined) $url = window.location;
		if($T_LINK_ADD != '')$url = $url+$T_LINK_ADD;
		
		
		$($me).append( '<img class="CLE_LOADING_IMG" src="'+$CLE_LOADING_IMG+'" />' )
		$('.CLE_LOADING_IMG').css($CSS__LOADING_IMAGE);
		
			$.get(
					$url,null,
					function(data)
					{
						$links = parsePosts(data);
						$temp = $($linkbox).clone();
						$temp.append( $links );
						$temp.append( $url );
						$($me).append( $temp );
						attachLinkClasses($me);
						$($me).children('img').remove();
					}
			
				);

	}
	,
	
	function()
	{
		$me = $(this).parent();
		$($me).children('div').remove();
		removeLinkClasses( $me );
		
	}
	
	
	);
}

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; startCLE(); }
    }

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	GM_wait();
    }
    else
    {
	$ = unsafeWindow.jQuery;
	startCLE();
    }