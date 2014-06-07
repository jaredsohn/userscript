// ==UserScript==
// @name		Univision Hack
// @version		1.2
// @include	http://tv.univision.mn/*
// @grant    none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
$("div[class='grid_11 now-playing roboto']").html("<select id='suvag'> \
                    <option id='1' value='mnb'>MNB</option> \
                    <option id='24' value='mnb_2' selected='selected'>MNB2</option> \
                    <option id='23' value='edu'>Education</option> \
                    <option id='3' value='ubs'>UBS</option> \
                    <option id='22' value='mn25'>TV25</option> \
                    <option id='4' value='ntv'>ntv</option> \
                    <option id='26' value='tv5'>TV5</option> \
                    <option id='25' value='eagle'>Eagle</option> \
                    <option id='27' value='sbn'>SBN</option> \
                    <option id='8' value='shuud'>Shuud</option> \
                    <option id='31' value='tv9'>TV9</option> \
                    <option id='32' value='sportbox'>SportBox</option> \
                    <option id='5' value='etv'>ETV</option> \
                    <option id='2' value='mongolhd'>Mongol TV</option> \
                    <option id='38' value='royal'>Royal</option> \
                    <option id='39' value='mnc'>MNC</option> \
                    <option id='9' value='ehoron'>Эх Орон</option> \
                    <option id='41' value='bloomberg'>Bloomberg</option> \
                    <option id='42' value='parliament'>Parliament</option> \
                 </select>");
$(window).load(function(){
	$(".schedule-live .archive").each(function(i,div){
        $('a',div).click(function(e){
            e.preventDefault();
      		accessArchive($('.time',div).html());  	
        });
    });
    
    setInterval(function(){
        $(".schedule-live .archive").each(function(i,div){
        $('a',div).click(function(e){
            e.preventDefault();
      		accessArchive($('.time',div).html());  	
        });
    });
    }, 1000);
});

function accessArchive(time)
{
    var suvag = $("#suvag option:selected").val();
    var t = $("script:contains('jwplayer')").text();
    
    var str = "http://202.70.32.50/vod/_definst_/mp4:tv/medium/"+suvag+".stream-"+$(".dialog-date").html()+"-"+time.replace(':','-')+"-00";
    
    eval(t.replace(t.substring(t.indexOf("http"), t.indexOf("/play")), str));
}

$("#suvag").change(function() {
    var suvag = $("#suvag option:selected").val();
    var t = $("script:contains('jwplayer')").text();
    eval(t.replace(t.substring(t.indexOf("smil:")+5, t.indexOf(".smil")), suvag));
    var d = new Date();
    cDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    nDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+1);
    pDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()-1);
    
    $.post(
			"http://tv.univision.mn/",
			{id: $("#suvag option:selected").attr("id"), cDate: cDate },
			function(data){
				updateChannel(data);
               	setInterval(function(){getPrograms($("#suvag option:selected").attr("id"), cDate);},60000);
                $(".page-title.roboto").html("<img src='/uploads/tv/"+data.Channel.Logo+"'>"+data.Channel.Title);
                $(".schedule-live .archive a").each(function(){$(this).attr('href', '#')});
                $(".schedule-live .archive").each(function(i,div){
        $('a',div).attr('href', '#');
        $('a',div).click(function(){
      		accessArchive($('.time',div).html());  	
        });
    });
			},
			"json"
		);
    
});