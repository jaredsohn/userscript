// ==UserScript==
// @name           Speed Battle
// @namespace      http://www.jessregal.com/LegendsOfZork/SpeedBattle
// @description    Automatically loads character statistics into the arena table.
// @include        http://legendsofzork.com/arena*
// ==/UserScript==


// Regular expression for parsing the opponent out of a.href
//<a  href="javascript: select('58818-magnamund');" > Magnamund</a>
var rxOpponent = /javascript: select\('(.*)'\);/i;


// We're just going to go ahead and hijack jQuery from the unsafeWindow.
$ = unsafeWindow.jQuery;
$.fx.off = true;
$(function() {
// Wait for jQuery to execute.
	GM_log("Speed Battle starting!");
	
	
	// Expand the width of the table
	$("#full_opponents_list").css("width", "880px");
	
	// Add our new column headers.
	$("#full_opponents_list .table-header")
		.append("<th>Clan</th>")
		.append("<th>AR</th>")
		.append("<th>DR</th>")
		.append("<th>Magic</th>")
		.append("<th>Attitude</th>")
		.append("<th>Fight!</th>");
	
	//$("#full_opponents_list").scrollIntoView();
	
	var list = document.getElementById("full_opponents_list");
	if (list) {
		list.scrollIntoView(true);
	}

	
	// Now to query up the data for our rows..
	$("#full_opponents_list tr").not(".table-header, .table-gap").each(function(index, domElement) {
		var row = this;
		var opponent = rxOpponent.exec($(this).find("a:first").attr("href"))[1];
		GM_log("Opponent " + opponent + ": Starting first ajax call.");
		$.ajax({
			url: "/arena/select?opponent=" + opponent,
			type: 'GET',
			datatype: 'json',
			success: function(data) {
					GM_log("Opponent " + opponent + ": Starting first ajax callback.");
					data = eval('(' + data + ')');
					/*
					for (var x in data) {
						GM_log(x + " = " + data[x]);
					}
					data = {
						"defense":"Studded Miznian Leather +200<br/>Flatheadian Chainmail Coif +30<br/>Holy Barrier +100<br/>Fanucci Gambit +500",
						"dr":830,
						"attack":"Gurthian Blunderbuss +298<br/>Flame Thrower +50<br/>Fanucci Gambit +500",
						"magic":"High - Magic of Creation",
						"ar":848,
						"level":35,
						"pvpratio":"66.12",
						"clanname":"The BGL",
						"name":"Der Bus",
						"clanid":3094,
						"attitude":"Shock & Awe",
						"fame":122161.0,
						"id":"357623-der-bus",
						"avatar":"http://s3.amazonaws.com/zork-assets/avatar_images/265/122.png"
					}
					*/
					
					// Stick our data in there..
					$(row)
					.append("<td>" + data["clanname"] + "</td>")
					.append("<td>" + data["ar"] + "</td>")
					.append("<td>" + data["dr"] + "</td>")
					.append("<td>" + data["magic"].substring(0, data["magic"].indexOf(" ")) + "</td>")
					.append("<td>" + data["attitude"] + "</td>")
					.append("<td></td>");
					
					if (data["clanname"] == "RoHawks") {
						return;
					}
					
					GM_log("Opponent " + opponent + ": Completed first ajax callback, starting second ajax call.");
					$.ajax({
						url: "/arena/confirm?opponent=" + opponent,
						type: 'GET',
						datatype: 'json',
						//cache: false,
						success: function(data) {
								GM_log("Opponent " + opponent + ": Starting second ajax callback.");
								data = eval('(' + data + ')');
								//$(row).append("<td><input type='submit' value='Fight!' class='lightbox-form-button' title='Fight!' alt='Fight!'></td>");
								$("td:last", row).append("<input type='submit' value='Fight!' class='lightbox-form-button' title='Fight!' alt='Fight!'>");
								$(row).find("input").click(function () {
										// Set the opponent..
										$("#selected-opponent-confim").val(opponent);
										// Populate the wager..
										$("#fight-form input[name='wager']").val("99999");
										// And attack!
										GM_log("Opponent " + opponent + ": Submitting attack!");
										$("#fight-form input:last").click();
									});
								GM_log("Opponent " + opponent + ": Completed second ajax callback.");
							}
					});
				}
		});
				
	});
	
	
	

	
	/*
	function select(opponent) {
		$.ajax({
			URL: "/arena/select?opponent=" + opponent,
			type: 'GET',
			datatype: 'json',
			success: function(data) {
					var transport = eval('(' + data + ')');
					$('#op-name').html("<a href='/heroes/" + transport["id"] +  "'>" + transport["name"] + "</a>");
					$('#selected-opponent-select').val(transport['id']);
					$('#op-fight-span').html("Fight!");
					//$('op-fight-link').href = "/arena/confirm?opponent=" + transport["id"];
					$('#op-fame').html(transport["fame"]);
					$('#op-level').html(transport["level"]);
					$('#op-ratio').html(transport["pvpratio"] + "%");
					$('#op-attack').html(transport["ar"]);
					$('#op-defense').html(transport["dr"]);
					$('#op-magic').html(transport["magic"]);
					$('#op-attitude').html(transport["attitude"]);
					//$('#character_data_link').attr('href',"#TB_inline?height=425&width=600&inlineId=character_data");
					/*if(transport["clanid"]){
					$('#op-clan').html("Clan: <a href='/clans/" + transport["clanid"] + "'>" + transport["clanname"] + "</a>");
					}else{
					$('#op-clan').html("");
					}* /
					
					if (transport["attack"] && transport["attack"].length > 0) {
						$('#op-attack').addClass("hover-hint");
					}
					if (transport["defense"] && transport["defense"].length > 0) {
						$('#op-defense').addClass("hover-hint");
					}
					$('#fight-lightbox-confim-text').hide();
					$('#fight-lightbox-text-item').show();
					if (transport["avatar"] != null) {
						$('#op-avatar').attr('src', transport["avatar"]);
					}
				}
		});
		
		$("#character_data-link").nyroModalManual({
			url: this.href,
			minWidth: 600,
			width: 600,
			minHeight: 450,
			height: 450,
			padding: 0,
			processHandler: function(elts, settings) {
					$.nyroModalSettings({
						padding: 0,
						width: 600,
						height: 450
						})
				}
		});
	}
	*/
	
	
	GM_log("unsafeWindow.show_result = " + unsafeWindow.show_result);

	
	GM_log("Speed Battle finishing!");
});


/*
  <div id="full_opponents_list" class="arena-table">
    <table class="rankings">

      <tr class="table-header">
        <th></th>
        <th style="width: 125px;">Name<span class="sort-up"><a title="Click to sort" class="a-sort-up" href="javascript: sort('name', 'asc');">&nbsp;</a></span><span class="sort-down"><a class="a-sort-down" title="Click to sort" href="javascript: sort('name', 'desc');">&nbsp;</a></span></th>
        <th>Battle Record</th>
        <th>Level</th>

        <th>Fame</th>
      </tr>
      <tr class="table-gap"></tr>

      
        <tr class="">
          <td class="tab-table-mail"><a href="javascript: select('58818-magnamund');" ><img src="http://s3.amazonaws.com/zork-assets/avatar_images/359/214.png" title="Character Avatar" ></img></a></td>
          <td>
            
            <a  href="javascript: select('58818-magnamund');" > Magnamund</a>

            
          </td>
          <td>70.36%</td>
          <td>35</td>
          <td>13829.0</td>
        </tr>
        <tr class="table-gap"></tr>
      
        <tr class="table-alt">

          <td class="tab-table-mail"><a  href="javascript: select('159505-glenda-fadith');" ><img src="http://s3.amazonaws.com/zork-assets/avatar_images/289/144.png" title="Character Avatar" ></img></a></td>
          <td>
            
              You have already fought Glenda Fadith today
            
          </td>
          <td>31.22%</td>
          <td>35</td>
          <td>222.0</td>
        </tr>

        <tr class="table-gap"></tr>
*/