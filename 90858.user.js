// ==UserScript==
// @name           avgm
// @namespace      avgm.uc.js
// @description    A strengthen scripts for AcFun which based on GreaseMonkey.
// @include        http://www.acfun.cn/*
// @include        http://124.228.254.229/*
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery()
{
//============================================================================================================================
/*AVGM 0.11*/
/*2010.5.15*/

stageJudgement();
mimikoSearch();
niconicoLink();
multipage();
advImage();

//$('#stageSizer').click();
//$('#lightSwitch').click();

function stageJudgement(){
//----------------------------------------------------------------------------------------------------------------------------
$('body')
.attr( 'id', 'mimiko' );
//----------------------------------------------------------------------------------------------------------------------------
if( $('embed[src*="newflvplayer"]').length>0 ){
	var stageSrc=$('embed[src*="newflvplayer"]').attr('src');
	var stageFlashvars=$('embed[src*="newflvplayer"]').attr('flashvars');
	if(stageFlashvars){
		stageFlashvars='&'+stageFlashvars;
	}else{
		stageFlashvars='';
	};
	var stageUrl="http://124.228.254.229"+stageSrc+stageFlashvars;
	var stageLink="<iframe src='"+stageUrl+"&logo=http://sisituan.com/yukidoll/avplayer/image/logo.png' style='width:950px; height:432px; border:none; margin:0; padding:0;'></iframe>";
	
	$('#mimiko')
	.append('<span id="curtain"></span>');
	
	$('#curtain')
	.css({
		 width:window.document.body.offsetWidth,
		 height:window.document.body.offsetHeight+60,
		 left:0,
		 top:0,
		 background:'rgba(0,0,0,0.8)',
		 position:'absolute',
		 cursor:'pointer',
		 'z-index':2
		 })
	.click(function(){
					$('#lightSwitch')
					.click();
					})
	.hide();
	
	$('embed[src*="newflvplayer"]')
	.attr( 'src', stageSrc+'&logo=http://sisituan.com/yukidoll/avplayer/image/logo.png')
	.attr( 'id', 'mimikoStage' )
	.wrap( '<div id="mimikoStageShadow"></div>' );
	
	$('#mimikoStageShadow')
	.wrap( '<div id="mimikoStageCan"></div>' )
	.after("<span id='lightSwitch' class='stageTool stageToolLeft'>★</span><span id='stageSizer' class='stageTool'>←</span><a id='videoDownloader' class='stageTool stageToolRight' href='http://www.flvcd.com/parse.php?flag=&format=&kw="+self.location.href+"' target='_blank'>↙</a><input id='stageUrlTextarea' class='stageTool stageToolLeft stageToolRight' type='text' value='' readonly='readonly'></input>");
	
	$('#mimikoStageCan')
	.wrap('<div id="mimikoStageSpace"></div>')
	.css({
		 position:'absolute',
		 'z-index':65535,
		 width:950,
		 height:448,
		 });
	
	$('#mimikoStageSpace')
	.css({
		 width:950,
		 height:448,
		 });
	
	$('#mimikoStageShadow')
	.css({
		 overflow:'hidden',
		 width:950,
		 height:432,
		 background:'#000',
		 cursor:'pointer',
		 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)'
		 });
	
	$('#mimikoStageCan>.stageTool')
	.css({
		 background:'#000',
		 color:'#fff',
		 height:16,
		 'line-height':'16px',
		 'font-size':12,
		 'text-align':'center',
		 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 margin:0,
		 padding:'0 16px',
		 cursor:'pointer',
		 border:'none',
		 'z-index':'6'
		 })
	.hover(
		   function(){
			   $(this)
			   .css({
					background:'#fff',
					color:'#000',
					'z-index':'5'
					});
		   },
		   function(){
			   $(this)
			   .css({
					background:'#000',
					color:'#fff',
					'z-index':'6'
					});
		   }
		   );
	$('#mimikoStageCan>.stageToolLeft')
	.css({
		 'border-bottom-left-radius':8,
		 '-moz-border-radius-bottomleft':8,
		 '-webkit-border-bottom-left-radius':8
		 });
	$('#mimikoStageCan>.stageToolRight')
	.css({
		 'border-bottom-right-radius':8,
		 '-moz-border-radius-bottomright':8,
		 '-webkit-border-bottom-right-radius':8
		 });
	
	$('#lightSwitch')
	.css({
		 width:16,
		 })
	.toggle(function(){
					$(this)
					.html('●');
					
					$('#curtain')
					.show();
					
					$('table[bgcolor="#c5cdbe"], div.nicoWindows')
					.hide();
					},
			function(){
					$(this)
					.html('★');
					
					$('#curtain')
					.hide();
					
					$('table[bgcolor="#c5cdbe"], div.nicoWindows')
					.show();
					});
	$('#mimikoStageShadow')
	.click(function(){
					$('#mimikoStageShadow')
					.css({
						 position:'static',
						 left:0,
						 top:0,
						 width:950,
						 height:432,
						 margin:0,
						 padding:0,
						 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
						 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
						 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)'
						 });
					});
	$('#stageSizer')
	.css({
		 width:16,
		 })
	.toggle(
			function(){
				$('#stageSizer')
				.html('→');
				$('#mimikoStageCan, #mimikoStageShadow')
				.css({
					 width:537,
					 });
			},
			function(){
				$('#stageSizer')
				.html('←');
				$('#mimikoStageCan, #mimikoStageShadow')
				.css({
					 width:950,
					 });
			}
			);
	
	$('#videoDownloader')
	.hover(
		   function(){
			   $('#videoDownloader>a').css({
										   color:'#000'
										   });
		   },
		   function(){
			   $('#videoDownloader>a').css({
										   color:'#fff'
										   });
		   }
		   );
	
	$('#stageUrlTextarea')
	.css({
		 'font-weight':'bold',
		 float:'right',
		 width:120,
		 cursor:'text'
		 })
	.val( stageLink );
	
}else{
//alert('No Video!');
};
//----------------------------------------------------------------------------------------------------------------------------
};

function niconicoLink(){
if( $('span[style^="border-bottom"]').length>0 ){
	$('span[style^="border-bottom"]')
	.html( $('span[style^="border-bottom"]').html().replace( /<wbr>|\s+|<\/wbr>/g,'').replace( /(sm\d+|nm\d+)/g, '<div class="nicoWindows" style="display:inline-block; width:320px; height:196px; padding:16px;"><a class="nicoTab nicoTabLeft nicoTabRight" target="_blank" href="http://www.nicovideo.jp/watch/\$1" style="float:left;">\$1</a><a class="nicoTab nicoTabLeft nicoTabRight" target="_blank" href="http://nicosound.anyap.info/sound/\$1" style="float:right;">nicosound</a><iframe class="nicoCan" src="http://ext.nicovideo.jp/thumb/\$1" scrolling="no" style="" frameborder="0"><a href="http://www.nicovideo.jp/watch/\$1"></a></iframe></div>' ) );
	
	$('a.nicoTab')
	.css({
		 background:'#000',
		 color:'#fff',
		 height:16,
		 'line-height':'16px',
		 'font-size':12,
		 'text-align':'center',
		 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 margin:0,
		 padding:'0 16px',
		 cursor:'pointer',
		 'z-index':'6'
		 })
	.hover(
		   function(){
			   $(this)
			   .css({
					background:'#fff',
					color:'#000',
					'z-index':'5'
					});
		   },
		   function(){
			   $(this)
			   .css({
					background:'#000',
					color:'#fff',
					'z-index':'6'
					});
		   }
		   );
	$('a.nicoTabLeft')
	.css({
		 'border-top-left-radius':8,
		 '-moz-border-radius-topleft':8,
		 '-webkit-border-top-left-radius':8
		 });
	$('a.nicoTabRight')
	.css({
		 'border-top-right-radius':8,
		 '-moz-border-radius-topright':8,
		 '-webkit-border-top-right-radius':8
		 });
	$('iframe.nicoCan')
	.css({
		 width:320,
		 height:180,
		 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)'
		 });
};
};

function multipage(){
if( $('#dedepagetitles').length>0 ){
	$('#dedepagetitles')
	.after( '<br /><br />'+
		   $('#dedepagetitles').html()
		   .replace(/\<option/g,'<a class="pageTitle"')
		   .replace(/\<\/option\>/g,'</a>')
		   .replace(/value/g,'href')
		   .replace(/\s+\</g,'<')
		   .replace(/\>\s+/g,'>')
		   +'<br /><br />'
									  );
	$('a.pageTitle')
	.css({
		 background:'#000',
		 color:'#fff',
		 height:16,
		 'line-heigth':'16px',
		 'font-size':12,
		 'text-align':'center',
		 margin:0,
		 padding:'0 8px',
		 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 'z-index':'6'
		 })
	.hover(
		   function(){
			   $(this)
			   .css({
					background:'#fff',
					color:'#000',
					'z-index':'5'
					});
		   },
		   function(){
			   $(this)
			   .css({
					background:'#000',
					color:'#fff',
					'z-index':'6'
					});
		   }
		   );
	
	$('a.pageTitle:first')
	.css({
		 padding:'0 8px 0 16px',
		 'border-top-left-radius':8,
		 '-moz-border-radius-topleft':8,
		 '-webkit-border-top-left-radius':8,
		 'border-bottom-left-radius':8,
		 '-moz-border-radius-bottomleft':8,
		 '-webkit-border-bottom-left-radius':8,
		 });
	$('a.pageTitle:last')
	.css({
		 padding:'0 16px 0 8px',
		 'border-top-right-radius':8,
		 '-moz-border-radius-topright':8,
		 '-webkit-border-top-right-radius':8,
		 'border-bottom-right-radius':8,
		 '-moz-border-radius-bottomright':8,
		 '-webkit-border-bottom-right-radius':8,
		 });
		 
	
	if( $('a.pageTitle[selected="selected"]').length>0 ){
		$('a.pageTitle[selected="selected"]')
		.css({
			 background:'rgb(255,255,255)',
			 color:'rgb(0,0,0)'
			 })
		.unbind();
	}else{
		$('a.pageTitle:first')
		.css({
			 background:'rgb(255,255,255)',
			 color:'rgb(0,0,0)'
			 })
		.unbind();
	};
};
};

function mimikoSearch(){
if($('td[width="880"]').length>0){
	$('td[width="880"]')
	.append( " | <a href='http://218.28.89.99/'>维基</a><input id='mimikoSearch' type='text' value=''></input><span id='searchButton'>Search!</span>" );
	
	$('#mimikoSearch')
	.css({
		 float:'right',
		 width:320,
		 height:16,
		 'line-height':'16px',
		 'font-size':12,
		 'font-weight':'bold',
		 margin:'0 4px',
		 padding:'0 108px 0 16px',
		 'box-shadow':'0 0 2px rgba(0,0,0,1)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1)',
		 border:'none',
		 'border-radius':8,
		 '-moz-border-radius':8,
		 '-webkit-border-radius':8
		 })
	.keydown(function(mimikoSearchKeyDownEvent){
					  if( mimikoSearchKeyDownEvent.keyCode== 13){
						  $('#searchButton').click();
					  };
					  });
	
	$('#searchButton')
	.css({
		 position:'relative',
		 float:'right',
		 left:328,
		 top:0,
		 cursor:'pointer',
		 background:'#000',
		 color:'#fff',
		 width:64,
		 height:16,
		 'line-height':'16px',
		 'font-size':12,
		 'text-align':'center',
		 margin:'0 4px',
		 padding:'0 16px',
		 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
		 'border-radius':8,
		 '-moz-border-radius':8,
		 '-webkit-border-radius':8
		 })
	.hover(
		   function(){
			   $('#mimikoSearch')
			   .css({
					background:'#000',
					color:'#fff'
					});
			   $(this).css({
						   background:'#fff',
						   color:'#000'
						   });
		   },
		   function(){
			   $('#mimikoSearch')
			   .css({
					background:'#fff',
					color:'#000'
					});
			   $(this).css({
						   background:'#000',
						   color:'#fff'
						   });
		   }
		   )
	.click(function(){
					window.open( 'http://124.228.254.229/plus/search.php?kwtype=0&searchtype=titlekeyword&imageField.x=1&imageField.y=0&keyword='+$('#mimikoSearch').val().replace(/\s+/g,'+') );
					});
};
};

function advImage(){
$('img[src^="http"]')
.each(function(){
if( $(this).width()>(window.screen.availWidth)*0.8 ){
	$(this)
	.height( $(this).height()*(window.screen.availWidth)*0.8/$(this).width() )
	.width( (window.screen.availWidth)*0.8 );
};
$(this)
.css({
	 cursor:'pointer',
	 margin:0,
	 padding:0,
	 'box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
	 '-moz-box-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
	 '-webkit-border-shadow':'0 0 2px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,0.5)',
	 })
.click(function(){
				window.open( $(this).attr('src') );
	   });
			   });

};
//============================================================================================================================
}

<html xmlns="http://www.w3.org/1999/xhtml"><body xmlns="http://www.w3.org/1999/xhtml"><div xmlns="http://www.w3.org/1999/xhtml"><img width='77' height='5' src='chrome://livemargins/skin/monitor-background-horizontal.png' style='position: absolute;left:-77px;top:-5px'/> <img src='chrome://livemargins/skin/monitor-background-vertical.png' style='position: absolute;left:0;top:-5px;'/> <img id='monitor-play-button' src='chrome://livemargins/skin/monitor-play-button.png' onmouseover='this.style.opacity=1' onmouseout='this.style.opacity=0.5' style='position: absolute;left:1px;top:0;opacity:0.5;cursor:pointer'/>