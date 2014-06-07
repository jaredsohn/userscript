// ==UserScript==
// @name            Bazaar.tf Chem Set & Fabricator prices
// @version         1.0
// @description     Shows if a chem set or fabricator trade on bazaar is worth it.
// @match           http://bazaar.tf/*
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
$(function() {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ include +')();'));
    document.head.appendChild(script);
    
    function include() {
        $('.item').has('img.contained-item').each(function(){
            var item = $(this);
            var owner = $(item).parentsUntil('.tradetitle').find('a.rank').attr('href');
            owner = owner.split('/');
            owner = owner[2];
            var url = 'http://api.tf2calculator.com/input.php';
            var data = 'id=' + owner + '&item=' + $(item).attr('i-oid');
            console.log(data);
            $.ajax({
                method: 'GET',
                url: url,
                data: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .done(function(x){
                data = JSON.parse(x);
                var notes = $(item).attr('i-notes');
                notes = notes.split('"');
                notes = notes[1];
                $(item).attr('i-notes','"' + notes + '<p class=\'estimated-price\'>Total cost to craft: '+ data.prices.total_cost + ' ref <br> Price of output: '+ data.prices.total_worth + ' ref <\/p>"');
            });
        });
        
        // ####################################
        //        Stop editing here
        // ####################################
    }
});
