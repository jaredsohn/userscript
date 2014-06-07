// ==UserScript==
// @name           yahoo football auction values
// @namespace      football.fantasysports.yahoo.com
// @description    Remove the need to manually cross-reference the Draft Results page to view the buy price
// @include        http://football.fantasysports.yahoo.com/*
// @author         Jim Halberg
// ==/UserScript==

var YahooFootballAuctionValues = {
  the_auction_values: undefined,
  
  go: function(stats_cells_for_player){
    var launcher = setInterval(function() {
      if (document.readyState === "complete") {
        if(document.getElementById('doc4')){
          document.getElementById('doc4').style.width = "90%";
        }
        if(YahooFootballAuctionValues.league_id()){
          YahooFootballAuctionValues.build_auction_values();
        }
        clearInterval(launcher);
      }
    }, 10);
  },
  display_auction_values: function(){
    if(document.getElementsByClassName("teamtable").length){
      YahooFootballAuctionValues.display_with_teamtable();
    }
    else{
      YahooFootballAuctionValues.display_with_rosterswapper();
    }
  },
  display_with_teamtable: function(){
    var player_tables = Array.prototype.slice.call(document.getElementsByClassName("teamtable"));
    var starting_rosters = document.getElementsByClassName("startingroster");
    for(var x = 0, starting_roster; starting_roster = starting_rosters[x]; x++){
      player_tables = player_tables.concat(Array.prototype.slice.call(starting_roster.getElementsByClassName("simpletable")));
    }
    for(var x = 0, player_table; player_table = player_tables[x]; x++){
      for(var y = 0, row; row = player_table.rows[y]; y++){
        var player = row.getElementsByClassName("player")[0];
        var player_anchor = player.getElementsByTagName("a")[0];

        if(player_anchor != undefined){
          player_anchor.innerHTML += ' <span style="color: #333">(' + YahooFootballAuctionValues.prices_for_display(player_anchor.href) + ')</span>';
        }
      }
    }
  },
  display_with_rosterswapper: function(){
    var player_tables = Array.prototype.slice.call(document.getElementsByClassName("ysf-rosterswapper"));    
    var starting_rosters = document.getElementsByClassName("startingroster");
    for(var x = 0, player_table; player_table = player_tables[x]; x++){
      for(var y = 0, row; row = player_table.rows[y]; y++){
        var player = row.getElementsByClassName("ysf-player-name")[0];
        if(player != undefined){
          var player_anchor = player.getElementsByTagName("a")[0];

          if(player_anchor != undefined){
            player_anchor.innerHTML += ' <span style="color: #dadada; font-size: 12px">(' + YahooFootballAuctionValues.prices_for_display(player_anchor.href) + ')</span>';
          }
        }
      }
    }
  },
  prices_for_display: function(player_url){
    var player_prices = YahooFootballAuctionValues.the_auction_values[player_url];
    if(player_prices){
      var val = player_prices.shift();
      while(player_prices.length > 0){
        val += "&nbsp;&middot;&nbsp;" + player_prices.pop();
      }
    }
    else{
      val = 'n/a'
    }
    return val;
  },
  build_auction_values: function(){
    var request = new XMLHttpRequest();
    request.open('GET', "http://football.fantasysports.yahoo.com/f1/" + YahooFootballAuctionValues.league_id() + "/draftresults", true);
    request.onreadystatechange = function (an_event){
      if(request.readyState == 4){
        if(request.status == 200){
          var response_text = request.responseText;
          var rows = response_text.match(/<tr class="(?:odd|even)"([\s\S]*?)<\/tr>/gi);
          YahooFootballAuctionValues.the_auction_values = {}

          var valid_data_found = false;
          for(var x = 0, a_tr; a_tr = rows[x]; x++){
            var reg_for_data = /<td class="player"><a href="([\s\S]*?)"[\s\S]*?<td class="cost">([\s\S]*?)</gi
            var player_vals = reg_for_data.exec(a_tr);
            if(player_vals && player_vals[1] && player_vals[2]){
              YahooFootballAuctionValues.the_auction_values[player_vals[1]] = [ player_vals[2] ];
              valid_data_found = true;
            }
          }
          if(valid_data_found){
            YahooFootballAuctionValues.add_in_season_additions(0);
          }
        }
      }
    };
    request.send(null);
  },
  add_in_season_additions: function(offset){
    var request = new XMLHttpRequest();

    request.open('GET', "http://football.fantasysports.yahoo.com/f1/" + YahooFootballAuctionValues.league_id() + "/transactions?filter=add&mid=&count=" + offset, true);
    request.onreadystatechange = function (an_event){
      if(request.readyState == 4){
        if(request.status == 200){
          var response_text = request.responseText;
          var valid_data_found = false;

          var waiver_response = document.createElement('div');
          waiver_response.setAttribute('id', 'waiver_response_' + offset);
          waiver_response.innerHTML = response_text;
          document.body.appendChild(waiver_response);

          var waiver_response_from_dom = document.getElementById('waiver_response_' + offset);
          var transactions = document.getElementById("transactions");
          var player_adds = Array.prototype.slice.call(document.getElementById("transactions").getElementsByClassName("Bd")[0].getElementsByTagName("tr")).slice(1); // discard the header row

          if(player_adds.length){
            valid_data_found = true
            for(var x = 0, player_add; player_add = player_adds[x]; x++){
              var player_url = player_add.getElementsByTagName("td")[1].getElementsByTagName("span")[0].getElementsByTagName("a")[0].href;
              var price = /(\$\d+)\s+Waiver/.exec(player_add.getElementsByTagName("td")[2].innerHTML);

              if(price){
                YahooFootballAuctionValues.add_price(player_url, price[1]);
              }
              else{
                YahooFootballAuctionValues.add_price(player_url, "$0");
              }
            }
          }
                    
          if(valid_data_found){
            // remove so that the next one can come in with the same ID (if there are more to do)
            document.body.removeChild(waiver_response);
            YahooFootballAuctionValues.add_in_season_additions(offset + 25);
          }
          else{
            YahooFootballAuctionValues.display_auction_values();
          }
        }
      }
    };
    request.send(null);
  },
  add_price: function(player_url, price_to_add){
    if(YahooFootballAuctionValues.the_auction_values[player_url]){
      YahooFootballAuctionValues.the_auction_values[player_url].push(price_to_add);
    }
    else{
      YahooFootballAuctionValues.the_auction_values[player_url] = [ 'n/a', price_to_add];
    }
  },
  league_id: function(){
    var league = /football\.fantasysports\.yahoo\.com\/[\s\S]*?\/([\s\S]*?)(\/|$)/.exec(document.URL)
    if(league){
      return league[1];
    }
    else{
      return null;
    }
  }
}
YahooFootballAuctionValues.go();
