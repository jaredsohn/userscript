// ==UserScript==
// @name       Scrolls Guide Trade Helper
// @namespace  http://vozzel.net
// @version    0.1
// @description  Adds a little helper on scrollsguide.com/prices
// @match      http://www.scrollsguide.com/prices
// @copyright  2014+, Matic Leva
// ==/UserScript==

var filter = [];
var filterTable;


function saveFilter(){
    localStorage.setItem("filter", JSON.stringify(filter));
    console.log("Saved");
}

function updateFilter()
{
    saveFilter();
    filterTable.empty();
    for (var i = filter.length - 1; i >= 0; i--){
		var filterScroll = filter[i];
		
		var scroll = getScrollById(filterScroll.id);
		var type = filterScroll.t == "b" ? "I'm selling" : "I'm buying";
        var price = filterScroll.pn ? filterScroll.pn + "(" + filterScroll.p + ")" : (filterScroll.p > -1 ? filterScroll.p : "-");
        var user = filterScroll.u || "-";
        var room = filterScroll.r || "-";

		var newRow = $(Mustache.render(tpl, { 
			scroll: scroll.name, 
			img: scroll.image, 
			id: scroll.id,
			user: user,
			room: room,
			type: type,
			type2: filterScroll.t == "b" ? "buy" : "sell" + "ing",
			price: price
		}));
		
        $(newRow).css("cursor", "pointer").click(function(){
            var index = -1;
            for(var i = 0; i < filter.length; i++){
                if(filter[i].id == $(this).attr("data-scroll"))
                    index = i;
            }
            if(index > -1)
                filter.splice(index, 1);
        	$( this ).fadeOut(500);
        	saveFilter();
        });
        
		filterTable.prepend(newRow);
		newRow.fadeIn(500);
        saveFilter();
	}
}
function compareFilter(tradeMessage)
{
    var tscrolls = tradeMessage.tr;
	for (var i = 0; i < tscrolls.length; i++) //loop through all scrolls you get in tradeMessage
    {
        for (var j = 0; j < filter.length; j++)
            if(tscrolls[i].id == filter[j].id && tscrolls[i].t == filter[j].t && ((filter[j].p == undefined) || (filter[j].p == -1) || (tscrolls[i].t == "b" && tscrolls[i].p >= filter[j].p) || (tscrolls[i].t == "s" && tscrolls[i].p <= filter[j].p)))
            {
            	filter[j].u = tradeMessage.u;
                filter[j].r = tradeMessage.r;
                filter[j].pn = tscrolls[i].p;
                updateFilter();
                $('#sound_match_found').get(0).play();
                $('<input type="button" value="Mute">').insertAfter("input[type='button']").css({"margin-left": "10px", "height": "25px"}).click(function(){
                    $('#sound_match_found').get(0).pause();
   					$('#sound_match_found').get(0).currentTime = 0;
                    $(this).remove();
                });
            }
	}
}


onConnected = (function() {
    var cached_function = onConnected;
    return function() {
        cached_function.apply(this);
		$("#tradetable").before("<table class='tablebg' cellspacing='1' width='100%' id='tradetable'><thead><tr id='tablehad'><th></th><th>Scroll</th><th>User</th><th>Room</th><th>Type</th><th>Price</th></tr></thead><tbody id='realtimefilter'></tbody></table>");
    	$("#tradetable").before("<audio src='http://static1.grsites.com/archive/sounds/nature/nature005.mp3' id='sound_match_found' loop='true'>  Your browser does not support the <code>audio</code> element.</audio>");
        filterTable = $("#realtimefilter");
        filter = JSON.parse(localStorage.getItem("filter")) || [];
    	updateFilter();
        $('<select name="type"><option value="s">Buying</option><option value="b" selected>Selling</option></select>').insertAfter("input#filter").css({"margin-left": "10px", "height": "25px"});
        $('<label id="price">Price: <input type="text"></label>').insertAfter("select[name=type]").css({"margin-left": "10px", "height": "25px"}).find("input").css({"height": "25px", "width": "30px"});
        $('<input type="button" value="Add to filter">').insertAfter("label#price").css({"margin-left": "10px", "height": "25px"}).click(function(){
            if($("input#filter").get(0).value != "")
                $.get("http://a.scrollsguide.com/scrolls", {
                    name: $("input#filter").get(0).value
                }).done(function(data){
                    if(data.msg != "fail")
                    {
                        var cur_id = data.data[0].id;
                        var cur_price = parseInt($("label#price input").val());
                        if(!(cur_price > 0))
                            cur_price = -1;
                        var cur_type = $('select[name=type] option:selected').val();
                        
                        var index = -1;
                        for(var i = 0; i < filter.length; i++)
                            if(filter[i].id == cur_id)
                                index = i;
                        if(index > -1)
                       		filter.splice(index, 1);
                        
                        filter.push({
                            id: cur_id,
                            p: cur_price,
                            t: cur_type
                        });
                        updateFilter();
                    }
                });
            else
                alert("You forgot scroll's name!");
        });
        $('<input type="button" value="Export">').insertAfter("input[type='button']").css({"margin-left": "10px", "height": "25px"}).hover(function(){
            var selling = [];
            var buying = [];
            for (var i = 0; i < filter.length; i++){
                var scroll_api = getScrollById(filter[i].id);
                var scroll = scroll_api.name + " " + filter[i].p + "g"
                if(filter[i].t == "s") //WTB
                    buying.push(scroll);
                else if(filter[i].t == "b") //WTS
                    selling.push(scroll);
            }
            var message = "";
            if(selling.length > 0)
            	message += "WTS " + selling.join(", ") + " ";
            if(buying.length > 0)
            	message += "WTB " + buying.join(", ");
            $('<textarea id="export"></textarea>').insertAfter('input[type="button"][value="Export"]').val(message).css({"width": "100px", "height": "100px", "position": "absolute"}).focus().get(0).select();
        }, function(){
            $('textarea#export').remove();
        });
        console.log(filter);
    };
}());

log = (function() {
    var cached_function = log;
    var args;
    return function() {
        cached_function.apply(this, args = arguments);
        compareFilter(args[0]);
    };
}());
    