// ==UserScript==
// @name       RaffleMonitor
// @version    1.1
// @namespace  rafflemonitor
// @description  Notifies you when your raffles are finished
// @match      https://peerbet.org/list.php*
// ==/UserScript==

// This script finds your raffles on the list.php page, then polls the server until the raffle is closed, updating the raffle's progress bar.

// The most efficient way of polling the server is to use the api, however currently the api requires you to request a key using your username and password, instead of accepting the login browser cookie. To use the api method, type:
// > raffleMonitor.login('username', 'password'); 

// Otherwise this script will request the raffle info from raffles.php then parse the results, since raffles.php accepts the login cookie

// version 1.1
// added public method .setHotKey(), implementing 'createRaffle'
// updates the "Tickets (sold/total)" element on the list.php page
// refreshes balance while polling open raffles (not yet implemented for api.php)
// renamed public method .monitorRaffle() to .monitor()

var script = function(){

var RaffleMonitor = function(){

    that = this;
    this.log = "";
    
    var log = function(message){
        var d = new Date();
        var timestamp = d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds();
        that.log += timestamp + "\t" + message + "\n"; 
    }

    this.openStatusPollTime = 3000;     // wait 3 seconds before checking if raffle still open
    this.waitingStatusPollTime = 30000;   // wait 30 seconds before checking if still waiting for next block

    var loginKey = false;

    this.getMyRaffles = function(){
        return _getMyRaffles();
    }

    var _getMyRaffles = function(){
        elements = $(".progress-warning").parent().parent(); 
        // each element has an id="raffle-row-nnnn"
        // we want to extract the "nnnn" into an array     
        myRaffles = new Array();
        elements.each(function(i,e){
            // remove "raffle-row-" from element id
            myRaffles.push(e.id.substring(11));
        });
        return myRaffles;
    }


    var getStatus = function(html){
        // returns 'open', 'win', 'lose' or 'finished' from the raffle.php response or 'unknown' if there is a problem parsing
        var status = 'unknown';
        searchString = "var status = '";
        try{
            status = html.split(searchString)[1].split("';")[0];        
            if(status == 'finished'){
                if(html.indexOf('WIN') != -1){
                    status = 'win';
                } else if(html.indexOf('LOSE') != -1){
                    status = 'lose';
                }    
            }
        } catch(e){
            // var status = 'open', etc not found in html response
        }
        return status;
    }

    var getProgress = function(html){
        searchString = '<div class="bar" style="width: ';
        try{
            return html.split(searchString)[1].split(";")[0];         
        } catch(e){
            log("var ticketsAvailable not found");
        }
        return null;
    }

    this.monitor= function(raffleId){
        poll(raffleId);
    }

    var setTicketsSold = function(raffleId, newText){
        var ticketsSoldElement = $("#raffle-row-"+raffleId+" .progress ~ div");
        var oldText = ticketsSoldElement.text().trim();
        ticketsSoldElement.text(ticketsSoldElement.text().replace(oldText, newText));    
    }

    var poll = function(raffleId){

        var raffleUrl = loginKey ? 
            "api.php?method=getraffleinfo&raffle="+raffleId+"&key="+loginKey :
            "raffle.php?id="+raffleId;

        $.ajax({url: raffleUrl}).done(function(data, textStatus){
            
            if(textStatus != 'success' || data == null)
                throw new Error('Poll error from ' + raffleUrl);

            //update tickets sold element
            var ticketsSold;
            if(data.hasOwnProperty('tickets_sold') && data.hasOwnProperty('tickets_total')){
                ticketsSoldText = data.tickets_sold + '/' + data.tickets_total;
            } else {
                    try{
                        ticketsSoldText = data.split('<p>Tickets (sold/total): <strong>')[1].split("</strong>")[0];         
                    } catch(e){
                        log("tickets sold unavailable");
                    }
            }
            setTicketsSold(raffleId, ticketsSoldText);
            //////////////////////////////

            //update balance            
            if(data.hasOwnProperty('tickets_sold')){
                //api.php?method=getuserinfo
                //response.balance --> as BTC --> parse according to settings
                log("balance request not implemented");
            } else {
                    try{
                        var balance = data.split('<span id="user-balance">')[1].split("</span>")[0];
                        $('#user-balance').text(balance);
                    } catch(e){
                        log("balance unavailable");
                    }
            }
            ///////////////////////////////

            var status;
            if(data.hasOwnProperty('status')){  // if response is coming from "api.php?raffleid=nnnn" gives status property
                status = data.status;
            } else {                                // if response is coming from "raffle.php?id=nnnn" gives status in html string
                status = getStatus(data);
            }
            log("raffle " + raffleId + ": " + status);    

            switch(status){        
                case 'open': 
                    // set progress bar width
                    
                    var raffleComplete = $("#raffle-row-"+raffleId+" div.bar").css("width");
                    
                    if(data.hasOwnProperty('tickets_sold') && data.hasOwnProperty('tickets_total')){
                        raffleComplete = Math.round( (data.tickets_sold / data.tickets_total) * 100 ) + "%";
                    } else {
                        var progress = getProgress(data);
                        if(progress != null)
                            raffleComplete = progress;
                    }
                    $("#raffle-row-"+raffleId+" div.bar").css("width", raffleComplete );
                
                    // poll again in 3 seconds
                    setTimeout(poll, that.openStatusPollTime, raffleId);
                    break;
                case 'waiting':                                                                 //  fall through
                    setTimeout(poll, that.waitingStatusPollTime, raffleId);                     //      v
                case 'win':                                                                     //      |
                    $("#raffle-row-"+raffleId+" div").addClass("progress-success");             //      |
                case 'lose':                                                                    //      |
                    $("#raffle-row-"+raffleId+" div").addClass("progress-danger");              //      |
                case 'finished':                                                                //      v
                    $("#raffle-row-"+raffleId+" div").removeClass("progress-warning");          
                    $("#raffle-row-"+raffleId+" div.bar").css("width", "100%");
                    break;
                case 'default':
                    log("Status " + status + " not recognised");
            }
        });
    }


    this.login = function(user,password){
        var loginUrl = 
            "/api.php?"+
            "method=login&username="+ user +
            "&password="+ password;        
        $.ajax({url: loginUrl}).done(function(loginResponse){
            if(loginResponse.success){
                loginKey = loginResponse.key;
                if(loginKey){
                    _getMyRaffles().forEach(function(raffleId){
                        poll(raffleId); // start polling
                    });
                }
            } else {
                throw new Error("login error: " + loginResponse.error);
            }
        });
    }

    this.setHotKey = function(hotkey, method){
        // currently only 'createRaffle' method is supported
        if(method != 'createRaffle')
            throw new Error('This method is not yet supported');

        if(hotkey.length != 1 || typeof(hotkey) != 'string')
            throw new Error('Invalid hot key: ' + hotkey + '. Hot key must be only one letter');

        // stop the hotkey activating while typing in chat
        $('#chat-input').bind('keypress', function(e){
            e.stopPropagation();
        });

        if(method == 'createRaffle'){
            //hotkey activates 'createRaffle' method, same action as clicking button
            $(document).bind('keypress', function(e){
                if(!$('#create-form').is(":visible") && e.which == hotkey.charCodeAt(0)){
                    createRaffle();
                }
            });

            //stop the createRaffle hotkey being entered into the first field
            $('#tickets-total').on('input', function(e){
                if($('#tickets-total').val() == hotkey)
                    $('#tickets-total').val('');
            });
        }        
    }
}

raffleMonitor = new RaffleMonitor();
raffleMonitor.setHotKey('c', 'createRaffle');
raffleMonitor.getMyRaffles().forEach(function(raffleId){
    raffleMonitor.monitor(raffleId); // start polling
});    

// raffleMonitor.login('user', 'password'); // to use api

}

var inject = function(){
    var injectScriptElement = document.createElement("script");
    var txt = script.toString();
    injectScriptElement.innerHTML = "(" + txt + ")();";
    injectScriptElement.type = "text/javascript";
    injectScriptElement.id = "rafflemonitor";
    document.getElementsByTagName("head")[0].appendChild(injectScriptElement);
}

var checkReadyState = function(){
    if(document.readyState == 'complete'){
        inject();                    
    } else {  
        setTimeout(checkReadyState, 500)
    }
}

checkReadyState();