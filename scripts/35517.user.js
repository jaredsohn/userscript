// ==UserScript==
// @name           Reddit Comment Highlighter
// @namespace      gmonkeyfilter
// @description    Highlights comments for reddit stories based on comment points
// @include        http://www.reddit.com/*/comments/*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// ==/UserScript==

var ChangeFontSize=true;
var yellowthresholds={
.75:'#f8f8dd',
.9:'#f8f8bb',
.95:'#f8f8aa',
.98:'#f8f899'
}
var bluethresholds={
.75:'#ddddff',
.9:'#ccccff',
.95:'#bbbbff',
.98:'#aaaaff'
}
var greenthresholds={
.75:'#ddf8dd',
.9:'#bbf8bb',
.95:'#aaf8aa',
.98:'#99f899'
}
var prevFontFactor="";
var fontFactor=GM_getValue("reddithighlightcommentfontfactor",2);
var highlightColor=GM_getValue("reddithighlightcommentcolor","yellow");

function highlightComments(){
  var thresholds=yellowthresholds;
  if(highlightColor=="blue")thresholds=bluethresholds;
  if(highlightColor=="green")thresholds=greenthresholds;
	var arRecs=new Array();
	$(".nestedlisting .entry .score.unvoted").each(function(){
		var recs=$(this).text().split(' ')[0];
		arRecs.push(parseInt(recs));
	});
	arRecs.sort(function (a, b) {return a - b;});
	$(".nestedlisting .entry .score.unvoted").each(function(){
		var recs=$(this).text().split(' ')[0];
		var numrecs=parseInt(recs);
		var newbgcolor='';
		var newfontsize=13;
		for(t in thresholds)
			if(numrecs>=arRecs[Math.floor(arRecs.length*t)]){
				newbgcolor=thresholds[t];
				newfontsize+=fontFactor;
			}else{
				break;
			}
		if(newbgcolor!=''){
      $(this).parents("div.entry").css({backgroundColor: newbgcolor, '-moz-border-radius':'7px', 'webkit-border-radius':'7px', 'padding':'2px 2px 2px 6px','border': 'solid black 1px'});
      if(fontFactor>0 || prevFontFactor!=""){
        $(this).parents("div.entry").find(".md").css({fontSize: newfontsize});
        $(this).parents('.tagline').css({fontSize: newfontsize,color:'black'});
        $(this).css({fontSize: newfontsize,color:'black'});
      }
  }
	});
		drawHighlightColorSelect();
		drawFontFactorSelect();

	}
	
	function changeHighlightColor(){
	 highlightColor=$('#colorselect').val();
	 GM_setValue("reddithighlightcommentcolor",highlightColor);
	 highlightComments();
  }
  
  function changeFontFactor(){
   prevFontFactor=fontFactor;
	 fontFactor=parseInt($('#fontfactorselect').val());
	 GM_setValue("reddithighlightcommentfontfactor",fontFactor);
	 highlightComments();
  }
	
	function drawHighlightColorSelect(){
  var colorselect=null;
	$('#colorselect').remove();
	$('#colorselectlabel').remove();
		var selecthtml="<label id='colorselectlabel' for='colorselect'>Highlight Color:</label><select id='colorselect'>";
	selecthtml+="<option value='blue' "+(highlightColor=='blue'?"selected":"")+">blue</option>";
	selecthtml+="<option value='green' "+(highlightColor=='green'?"selected":"")+">green</option>";
	selecthtml+="<option value='yellow' "+(highlightColor=='yellow'?"selected":"")+">yellow</option>";
	selecthtml+="</select>";
	colorselect=$(selecthtml).change(function(){changeHighlightColor()});

  $('.menuarea').append(colorselect);
  }
  
  function drawFontFactorSelect(){
  var fontfactorselect=null;
	$('#fontfactorselect').remove();
	$('#fontfactorselectlabel').remove();

	var selecthtml="<label id='fontfactorselectlabel' for='fontfactorselect'>Font Adjustment:</label><select id='fontfactorselect'>";
	selecthtml+="<option value='0' "+(fontFactor==0?"selected":"")+">0</option>";
	selecthtml+="<option value='1' "+(fontFactor==1?"selected":"")+">1</option>";
	selecthtml+="<option value='2' "+(fontFactor==2?"selected":"")+">2</option>";
	selecthtml+="<option value='3' "+(fontFactor==3?"selected":"")+">3</option>";
	selecthtml+="</select>";
	fontfactorselect=$(selecthtml).change(function(){changeFontFactor()});
  $('.menuarea').append(fontfactorselect);
  }
	
  $(document).ready(function(){
    highlightComments();
  });
  