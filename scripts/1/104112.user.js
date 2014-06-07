// ==UserScript==
// @name           Atrium Casetracker highligh
// @namespace      Sourcetop Inc
// @description    Highlights Casetracker Case Table 
// @include        http://<your_siteurl>/*
// ==/UserScript==

// This section is highlights colors of rows based on priority and status 


var main = function () {

    // use $ or jQuery here, however the page is using it

var status_bg = {
   'qa' : {
     'background-color' : '#aff991',
     'color' : 'black'
   },
   'approved' : {
     'background-color' : '#d9c9e1',
     'color' : 'black'
   }
};

var priority_bg = {
   'critical' : {
     'background-color' : '#f1d2d2',
     'color' : 'black'
   },
   'high' : {
     'background-color' : 'yellow',
     'color' : 'black'
   },
   'normal' : {
     'background-color' : '#d4eff1',
     'color' : 'black'
   }

};




 $('.view-casetracker-cases table.cases tr').each(function(i){


    priority = $(this).find('.priority').html();
    c_status = $(this).find('.status').html();
    assigned = $(this).find('.username').html();

    if( priority != null )  priority = priority.trim().toLowerCase();
    if( c_status != null )  c_status = c_status.trim().toLowerCase();
    if( assigned != null )  assigned = assigned.trim().toLowerCase();

    // looking if there is any color plattee of this combo

    h_light = status_bg[ c_status ]

    if( typeof(h_light) != 'undefined' ){
      $(this).css( h_light );  
    }else {
      h_light = priority_bg[ priority ];
      if( typeof(h_light) != 'undefined') {
        $(this).css(h_light);
      }
    }


 });


};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
