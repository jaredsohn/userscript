// ==UserScript==
// @name            Colorfull reddit usernames (CRU)
// @version         0.5.4
// @description     Colorizes usernames on reddit comments
// @namespace       sxxe@gmx.de
// @updateURL       https://userscripts.org/scripts/source/156297.meta.js
// @downloadURL     https://userscripts.org/scripts/source/156297.user.js
// @include         http://*.reddit.com/r/*/comments/*
// @require         https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js

// ==/UserScript==

/*
    Features:
    - Colors are assigned so that a username will always have the same color, even in different comments and posts.
    - OPs username highlighter
         (If OP's username color is red text on yellow background, that indicates OP has answered a comment in his post or made a comment. If the color is something else OP did not participate in his post so far.)
    - VIP username highlighter 
        (a simple GUI to add as many usernames you want to be highlighted) (Open the script options to open it)
 */

//make jquerry available 
var $ = unsafeWindow.jQuery;

// Add config style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#GM_config { width: 700px ! important; height: 280px ! important;}');


// add configuration options
GM_config.init('Colorfull reddit usernames Options', 

        {
            'vip_users':
            {
                'section': ['Highlight Usernames','Add usernames you wish to be highlighted'],
                'label': 'Usernames to highlight (seperated by space):',
                'type': 'text', 
                'cols': '50',
                'default': 'xNotch rocket2guns' // Dont add your VIPs here. There is a GUI to add them
            },
            'vip_color_bg':
            {
                'section': ['Highlight Colors','Customize the highligt color. ( <a target="_blank" href="http://www.w3schools.com/html/html_colornames.asp">Available Colors</a> )'],
                'label': 'Background color of highlighted users:',
                'type': 'text', 
                'default': 'yellow' // Dont add your VIPs here. There is a GUI to add them
            },
            'vip_color_border':
            {
                'label': 'Border color of highlighted users:',
                'type': 'text', 
                'default': 'red' // Dont add your VIPs here. There is a GUI to add them
            }
        },
        '#GM_config_header { text-align: center ! important; } \
        #GM_config_wrapper label { margin-left: 4px; } \
        #GM_config_wrapper input { position: absolute; right: 10px; width: 400px;} \
        .config_var { margin-top: 4px; } \
        .section_header_holder { }'
);


GM_registerMenuCommand("CRU - Options", function(){GM_config.open()}, "");

var GM_U;
window.addEventListener ("load", function () {
        //console.log("Ping");
        var username = GM_config.get('vip_users');
        var vipColorBg = GM_config.get('vip_color_bg');
        var vipColorBorder = GM_config.get('vip_color_border');

        GM_U = new GM_UserColor (username, vipColorBg, vipColorBorder);        
    },
    false
);

function GM_UserColor (username, vipColorBg, vipColorBorder) {
    //console.log(username);
    var vip_users=0;
    vip_users=username.split(" ");
    highlighted_users = new Array();

  
    function add_colors () {
        //console.log ("Ping");
      
        var authors = $('a.author');

        // Check if the link submitter has posted
        var submitter = $('.author.submitter');

        if (submitter.length > 0 ) {
            submitter = submitter.eq(0).text();
        }

        // Logged in user
        var loggedInUser = $('span.user a').text();;

        for (var i = 0; i < authors.length; i++) {
            var elem = authors.eq(i);
            var author = elem.text();

            //elem.textContent = "";

            // Get character sum
            var sum = 0;
            for (var j = 0; j < author.length; j++)
                sum += author.charCodeAt(j);

            // get random color 
            var color = generate_color(sum);

            // Create new span element and set the color
            var newStyle = { 
                'color': getContrastYIQ (color), 
                'border-width': '0px',
                'padding': '1px 3px',
                'border-radius': '4px',
                'background-color': color
            };
        
            //Add special look to vip users, OP, and highlighted users
            if ( author==submitter || (vip_users.indexOf(author) > -1) || 
                    (highlighted_users.indexOf (author) > -1) ) {

                newStyle = {
                    'background-color': vipColorBg,
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': 'red',
                    'padding': '1px 3px',
                    'text-align': 'justify',
                    'color': vipColorBorder
                };

            }
            elem.css(newStyle);
            elem.parent().css({'padding': '2px'});
            


            // Add temp highlight button
            var hightlightButton = $('<a>')
                .addClass('GM_highlight')
                .attr({
                    'name': author,
                    'href': '#'
                })
                .text('[h]');


            if (elem.parent().hasClass('tagline')) {
                if ( ( elem.parent().children().eq(2).text() != "[h]") && 
                    ( author != submitter )  && ( author != loggedInUser ) ) {
                    elem.after(hightlightButton);
                }
            }
            
        }
    }

     // add a new user to the highlighted user array
    function add_highlighted_user (user) {

        if (highlighted_users.indexOf (user) == -1) {
            highlighted_users.push(user);
        } else {
            highlighted_users.remove(user);
        }
        add_colors();
    }

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    // generate random color but skip white
    function generate_color (sum) {
        
        var colorcode = ((1<<24)*sum/1000|0).toString(16);
        
        if (colorcode.length > 6) 
            colorcode = colorcode.substring(colorcode.length-6,colorcode.length);
        
        if (colorcode == "ffffff")
            colorcode = "654f76";
        
        colorcode = colorLuminance(colorcode, 0);
        
        return colorcode;
    }

    // calculate the contrast of a color to decide if white or black text color should be used
    function getContrastYIQ (hexcolor){
            if (hexcolor.length > 6) 
            hexcolor = hexcolor.substring(hexcolor.length-6,hexcolor.length);
            
            var r = parseInt(hexcolor.substr(0,2),16);
            var g = parseInt(hexcolor.substr(2,2),16);
            var b = parseInt(hexcolor.substr(4,2),16);
            var yiq = ((r*299)+(g*587)+(b*114))/1000;
            return (yiq >= 128) ? 'black' : 'white';
    }

    // Calculates lighter or darker colors
    //http://www.sitepoint.com/javascript-generate-lighter-darker-color/
    function colorLuminance (hex, lum) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            lum = lum || 0;
            // convert to decimal and change luminosity
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                    c = parseInt(hex.substr(i*2,2), 16);
                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                    rgb += ("00"+c).substr(c.length);
            }
            return rgb;
    }

    add_colors ();

    // Add "load more comments" links onclick even
    $('.commentarea').on('click', 'a.button', function() {
        setTimeout( function() {add_colors();}, 3000 );
    });

    //Add highlighted users onclick even
    $('.commentarea').on('click', 'a.GM_highlight', function(event) {
        event.preventDefault();
        var user = $(this).attr('name');
        add_highlighted_user(user);
    });
}
