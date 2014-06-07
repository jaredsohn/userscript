// ==UserScript==
// @id             userstyles.org-ed666697-353d-4aa6-8e9e-d4fb14b1235f@scriptish
// @name           userstyles sort
// @version        1.0.1
// @history        1.0.1 Прописал в код обработку ошибок в css (маленький желтый треугольничек), теперь они показываются, но таблица стала визуально немного больше по высоте.
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/179816
// @author         Black_Sunlight
// @include        http://userstyles.org/users/*
// @require	   https://raw.github.com/Black-Sunlight/lib-files/master/jquery.js
// @require	   https://raw.github.com/Black-Sunlight/lib-files/master/jquery.tinysort.min.js
// @run-at         document-end
// ==/UserScript==

function isEmpty( el ){
      return !$.trim(el.html())
  }
var sort = {
a:{
	Asc:[],
	clicked:0,
	iLnH:'',
	$Tb:$('.author-styles>tbody'),
	$Td:$('.author-styles>tbody>tr>td'),
	$The:$('.author-styles>thead'),
	$Th:$('.author-styles>thead>tr>th')
},
begin:function(){
$('.author-styles>tbody>tr').each(function(i){
	$(this).attr({
	style:'height:70px',
	valign:'top'});
    if($(this).hasClass('style-warnings')){
    $(this).prev().append($(this).css({left:'31%',position:'absolute',marginTop:'36px',height:'10px'}));
    }
    
if (isEmpty($(this))){$(this).remove()}

});
	sort.a.$Tb.css({position:'relative',height:sort.a.$Tb.height()});
	sort.a.$Td.attr('rowspan','1')
	sort.a.$The.css({textAlign:'right'});
	sort.a.$Th.eq(0).css({textAlign:'center'});
	sort.a.$Th.eq(1).css({textAlign:'center'});
	sort.a.$Td.css({minWidth:'95px'});
	sort.a.$The.css({position:'relative',height:sort.a.$The.height()});
	sort.a.$Th.css({minWidth:'80px'});
	$('.author-styles>thead>tr>th:first-child').css({minWidth:'200px'});	
	$('.author-styles>tbody>tr').each(function(i,el){
		var iY = $(el).position().top;
		$.data(el,'h',iY);
		if (i===1) iLnH = iY;
	})
	$('.author-styles>tbody>tr>td').each(function(){
	if($(this).hasClass('date-value')){var innertext=$(this).text().split(' ');
	if(innertext[1]==''){var abbrtxt=innertext[3]}
	else{var abbrtxt=innertext[2];}
	
	}

		$(this).attr('abbr',abbrtxt?abbrtxt.split(',').join(''):$(this).text())
	})
	$('.author-styles>thead>tr>th').each(function(i){
	if($(this).text()=="")$(this).text('Name')

		$(this).click(function(){sort.go(i)})
	})
},
go:function(nr) {
	sort.a.Asc[nr] = sort.a.Asc[nr]=='desc'?'asc':'desc';
	$('.author-styles>tbody>tr').tsort('td:eq('+nr+')[abbr]',{order:sort.a.Asc[nr],attr:'abbr'}).each(function(i,el){
	var $El = $(el);
	var iFr = $.data(el,'h');
	var iTo = i*iLnH;
	$El.css({top:iFr}).animate({top:iTo},500);
});
}
}
$(function(){
sort.begin()

});