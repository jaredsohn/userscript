// ==UserScript==
// @name		Mass Unjoin
// @namespace 	http://orkut.com
// @description	Ajax based custom choice community unjoiner. Easy to use with checkboxes and sleek user interface.
// @include	http://www.orkut.*Communities*
// @require   	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(".displaytable").children("thead").children("tr").append("<th width='95px;vertical-align: middle;'><span class=\"grabtn\" style=\"margin-left: -15px;\"><a href=\"javascript:void(0);\" id='unjoin_1' title=\"aa\" class=\"btn\">unjoin</a></span><span class=\"btnboxr\"><img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"5\"></span><span class=\"grabtn\" ><a href=\"javascript:void(0);\" class=\"btn\" id='unjoin_2'>all</a></span><span class=\"btnboxr\"><img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"5\"></span></th>");
$(".displaytable").children("tbody").children("tr").each(function(i)
{
    $(this).append("<td width='60px' style='text-align: center;vertical-align: middle;'><input type='checkbox' name='cmm' id='cmm"+i+"' value='"+$(this).html().match(/cmm=([0-9]+)/)[1]+"'></td>")
}
);
$("#unjoin_1").click(function()
{
    ajx($("input[name=POST_TOKEN]").serialize()+"&"+$("input[name=signature]").serialize()+"&Action.unjoin=1")
}
);

$("#unjoin_2").toggle(function()
{
    $("input[type=checkbox]").attr({
		checked: true
    });
    $(this).html('none');
}
,function()
{
    $("input[type=checkbox]").attr({
		checked: false
    });
    $(this).html('all');
}
)

j=0;
function ajx(val){
	$("input:checked").each(
							function(){
										$.ajax({
												type: "POST",
												url: "/CommunityUnjoin?cmm="+$(this).val(),
												data: val,
												success: sleep(200)												
										})
										j++
									}
							)
	alert(j+" Communities Unjoined!");						
	window.location.reload();									
}


$("tr[class=listdark]").hover(function(){$(this).css('background-color','orange')},function(){$(this).css('background-color',null)});
$("tr[class=listlight]").hover(function(){$(this).css('background-color','orange')},function(){$(this).css('background-color',null)});function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

