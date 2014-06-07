// ==UserScript==
// @name         Naruto-Arena Mission Helper
// @namespace    admin@sandspirit.netii.net
// @version		 1.0
// @include      http*://*naruto-arena.com/*
// @author       Sand_Spirit
// @description  This script gives you the ability to quickly take a look at your mission progress.
// @history		 1.0 - First release
// ==/UserScript==

var jq = document.createElement('script');
jq.src = 'http://code.jquery.com/jquery-latest.min.js';
jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jq);

GM_addStyle('#missionHelper_tab{ \
	width: 120px; \
	height: 30px; \
	position: fixed; \
	left: 30px; \
	bottom: 0px; \
	background: #eee url(http://www.naruto-boards.com/images/forum/backgroundpattern_2.gif); \
	border: #00a solid 1px; \
	cursor: pointer; \
	text-align: center; \
	display: none; \
} \
 \
#missionHelper_tab span{ \
	color: #00a; \
	font-weight: bold; \
	font-size: 12px; \
	line-height: 30px; \
} \
 \
#missionHelper_popup{ \
	position: fixed; \
	left: 0px; \
	bottom: 31px; \
	width: 500px; \
	max-height: 600px; \
	overflow-y: scroll; \
	background: #eee url(http://www.naruto-boards.com/images/forum/backgroundpattern_3.gif); \
	border: #00a solid 1px; \
	display: none; \
} \
 \
#missionHelper_catSelect, #missionHelper_questSelect{ \
	display: none; \
	width: 95%; \
	height: 25px; \
} \
 \
#missionHelper_popup div.leftSelect, #missionHelper_popup div.rightSelect{ \
	width: 45%; \
	height: 30px; \
	float: left; \
	padding: 5px; \
} \
 \
#missionHelper_popup div.main{ \
	width: 100%; \
	background: #eee url(http://www.naruto-boards.com/images/forum/backgroundpattern_2.gif); \
	display: none; \
	color: black; \
	float: left; \
	padding: 10px; \
	border-top: 1px solid black; \
} \
 \
br.clear{ \
	clear: both; \
} \
#missionHelper_popup div.reload{ \
    width: 5%; \
    height: 30px; \
    float:left; \
} \
#missionHelper_reload{ \
	width: 25px; \
	margin-top: 6px; \
	cursor: pointer; \
} \
');

var base = 'http://www.naruto-arena.com';

function xhr(url, fn){
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: fn,
	});    
}

$('<div id="missionHelper_tab"><span>Mission Helper<span></div>').appendTo('body').show(200);
$('<div id="missionHelper_popup"> \
        <div class="leftSelect"> \
        	<select id="missionHelper_catSelect"> \
        		<option value="0" disabled selected>Select a Mission Category...</option> \
        	</select> \
        </div> \
        <div class="rightSelect"> \
        	<select id="missionHelper_questSelect"> \
        		<option value="0" disabled selected>Select a Mission...</option> \
        	</select> \
        </div> \
		<div class="reload"> \
			<img id="missionHelper_reload" src="http://assets6.warofninja.com/images/friends/linked.png" /> \
		</div> \
        <br class="clear" /> \
        <div class="main" /> \
	</div>').appendTo('body');

xhr(base+'/ninja-missions', function(data){
    var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    var doc = document.implementation.createDocument(null, null, dt);  
    var html = document.createElement('html');
    html.innerHTML = data.responseText;
    doc.appendChild(html);
    data.responseXML = doc;
    for(var i=0;i<doc.getElementsByClassName('descrheader').length;i++){
        var catTitle = doc.getElementsByClassName('descrheader')[i].getElementsByTagName('a')[0].getElementsByTagName('h2')[0].innerHTML;
        var catHref = doc.getElementsByClassName('descrheader')[i].getElementsByTagName('a')[0].getAttribute('href');
        var catOption = '<option value="'+catHref+'">'+catTitle+'</option>';
        $('#missionHelper_catSelect').append(catOption);
    }
    $('#missionHelper_catSelect').show(200);
});

$('#missionHelper_tab').click(function(){
	$('#missionHelper_popup').slideToggle(200);
});

$('#missionHelper_catSelect').change(function(){
    if($('#missionHelper_catSelect option:selected').attr('value')!='0'){
        $('#missionHelper_questSelect').html('<option value="0" disabled selected>Select a Mission...</option>');
        xhr(base+$('#missionHelper_catSelect option:selected').attr('value'), function(data){
            var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    		var doc = document.implementation.createDocument(null, null, dt);  
    		var html = document.createElement('html');
    		html.innerHTML = data.responseText;
    		doc.appendChild(html);
    		data.responseXML = doc;
            for(var i=0;i<doc.getElementsByClassName('pt10').length;i++){
                var questTitle = doc.getElementsByClassName('pt10')[i].getElementsByClassName('title')[0].getElementsByTagName('h5')[0].innerHTML;
                var questHref = doc.getElementsByClassName('pt10')[i].getElementsByClassName('padding')[0].getElementsByTagName('a')[0].getAttribute('href');
                var questOption = '<option value="'+questHref+'">'+questTitle+'</option>';
                $('#missionHelper_questSelect').append(questOption);
            }
        });
        $('#missionHelper_questSelect').show(200);
    }
});

$('#missionHelper_questSelect').change(function(){
	if($('#missionHelper_questSelect option:selected').attr('value')!='0'){
    	xhr(base+$('#missionHelper_questSelect option:selected').attr('value'), function(data){
            var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    		var doc = document.implementation.createDocument(null, null, dt);  
    		var html = document.createElement('html');
    		html.innerHTML = data.responseText;
    		doc.appendChild(html);
    		data.responseXML = doc;
            $('#missionHelper_popup div.main').show(200);
            var questGoals = doc.getElementsByClassName('mgoals')[0].getElementsByClassName('brspacer')[0].innerHTML;
            var questRewards = '<br /><br /><span class="title"><img class="pre" src="http://www.naruto-arena.com/images/pres/pre3.gif"> Mission Rewards</span><br />'
            +doc.getElementsByClassName('minfo')[0].getElementsByClassName('padding2')[3].innerHTML;
            $('#missionHelper_popup div.main').html(questGoals+questRewards).show(200);
        });
    }
});

$('#missionHelper_reload').click(function(){
	if($('#missionHelper_questSelect option:selected').attr('value')!='0'){
    	xhr(base+$('#missionHelper_questSelect option:selected').attr('value'), function(data){
            var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    		var doc = document.implementation.createDocument(null, null, dt);  
    		var html = document.createElement('html');
    		html.innerHTML = data.responseText;
    		doc.appendChild(html);
    		data.responseXML = doc;
            $('#missionHelper_popup div.main').show(200);
            var questGoals = doc.getElementsByClassName('mgoals')[0].getElementsByClassName('brspacer')[0].innerHTML;
            var questRewards = '<br /><br /><span class="title"><img class="pre" src="http://www.naruto-arena.com/images/pres/pre3.gif"> Mission Rewards</span><br />'
            +doc.getElementsByClassName('minfo')[0].getElementsByClassName('padding2')[3].innerHTML;
            $('#missionHelper_popup div.main').html(questGoals+questRewards).show(200);
        });
    }
});