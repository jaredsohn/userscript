// ==UserScript==
// @name           keen-vote
// @namespace      stackoverflow
// @description    Let Commander Keen do the downvoting
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://meta.serverfault.com/*
// @include        http://meta.superuser.com/*
// @include        http://stackapps.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @include        http://meta.answers.onstartups.com/*
// @include        http://mathoverflow.net/*
// @include        http://area51.stackexchange.com/proposals/*
// @author         Benjamin Dumke

// ==/UserScript==
// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/46562
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    sprites = {
        keen_l_fall: { "background-position": "0 0", width: "44px", height: "62px" } ,
        keen_l_fall_shoot: { "background-position": "0 -112px", width: "64px", height: "62px" } ,
        keen_l_pogo: { "background-position": "0 -224px", width: "32px", height: "58px" } ,
        keen_moon_0: { "background-position": "0 -332px", width: "32px", height: "64px" } ,
        keen_moon_1: { "background-position": "0 -446px", width: "40px", height: "64px" } ,
        keen_r_fall: { "background-position": "0 -560px", width: "48px", height: "62px" } ,
        keen_r_walk_0: { "background-position": "0 -672px", width: "34px", height: "64px" } ,
        keen_r_walk_1: { "background-position": "0 -786px", width: "38px", height: "64px" } ,
        keen_r_walk_2: { "background-position": "0 -900px", width: "32px", height: "64px" } ,
        keen_r_walk_3: { "background-position": "0 -1014px", width: "40px", height: "64px" }
    };
    imageurl = "http://i.imgur.com/oGHU0.gif";
    never_used_except_to_preload_the_image = $("<img src='" + imageurl + "'>");
    
    function make_keen(keen, votecount)
    {
        
        keen.sprite = function(name) {keen.css(sprites[name]);}
        keen.votecount = votecount;
        keen.sig = votecount.closest("tr").find(".post-signature:last");
        
        keen.step = 0;
        keen.walking = false;
        keen.walk = function()
        {
            if (keen.walking)
            {
                keen.sprite("keen_r_walk_" + keen.step);
                keen.step = (keen.step + 1) % 4;
                setTimeout(keen.walk, 250);
            }
            
        };
        keen.shot = $("<div></div>").addClass("shot").css(
                    {"position": "absolute", "top": "100px", "left": "200px",
                     "background": "url(" + imageurl + ") no-repeat top left",
                     "width": "32px", "height": "32px", "z-index": 1234}
                    ).prependTo($("#content")).hide();
        keen.shot.stage = function(i)
        {
            x = 0;
            y = -(70 + 110*i + ((i < 3) ? 0 : 15));
            keen.shot.css({"background-position": x + " " + y + "px"})
            keen.shot.curstage = i
        }
        keen.shot.explode = function(i)
        {
            if (keen.shot.curstage < 5)
            {
                keen.shot.stage(keen.shot.curstage + 1)
                setTimeout(keen.shot.explode, 100)
            }
            else
            {
                keen.shot.hide()
            }
        }
        
        keen.fall_in = function()
        {
            keen.sprite("keen_l_fall");
            keen.css({top: keen.y_of(keen.votecount) - 600, left: keen.x_of(keen.votecount) + 750});
            keen.show();
            keen.animate({top: keen.y_of(keen.votecount) + 300, left: keen.x_of(keen.votecount) + 650}, 2000, "linear", keen.fall_pogo);
        };
        keen.fall_pogo = function()
        {
            keen.sprite("keen_l_pogo");
            keen.animate({top: keen.y_of(keen.votecount) + 525, left: keen.x_of(keen.votecount) + 625}, 500, "linear", keen.jump_pogo);
        };
        keen.jump_pogo = function()
        {
            keen.sprite("keen_l_pogo");
            keen.animate({top: keen.y_of(keen.votecount) - 35, left: keen.x_of(keen.votecount) + 200}, 1000, "swing", keen.fall_to_bottom);
            setTimeout(function() {keen.sprite("keen_l_fall_shoot");}, 500);
        };
        keen.shoot = function()
        {
            keen.shot.stage(0);
            keen.shot.css({"top": keen.position().top, "left": keen.position().left - 20});
            keen.shot.animate({left: keen.x_of(keen.votecount) + 5}, 300, "linear", keen.shot.explode);
            keen.shot.show()
            
        }
        keen.fall_to_bottom = function()
        {
            keen.shoot()
            keen.sprite("keen_l_fall");
            keen.animate({top: keen.y_of(keen.sig) + keen.sig.height() - keen.height() + 5 , left: keen.x_of(keen.votecount) + 175}, 1000, "swing", keen.walk_to_sig);
        };
        keen.walk_to_sig = function()
        {
            keen.walking = true;
            keen.walk();
            keen.animate({left: keen.x_of(keen.sig) - 50}, 2000, "linear", keen.moon_0);
        };
        keen.moon_0 = function()
        {
            keen.walking = false;
            keen.sprite("keen_moon_0");
            setTimeout(keen.moon_1, 500);
        };
        keen.moon_1 = function()
        {
            keen.walking = false;
            keen.sprite("keen_moon_1");
            setTimeout(keen.moon_2, 1000);
        };
        keen.moon_2 = function()
        {
            keen.walking = false;
            keen.sprite("keen_moon_0");
            setTimeout(keen.walk_away, 500)
        };
        keen.walk_away = function()
        {
            keen.walking = true;
            keen.walk();
            keen.animate({left: keen.x_of(keen.sig) + keen.sig.width() + 20}, 1500, "linear", keen.fall_out);
        };
        keen.fall_out = function()
        {
            keen.walking = false;
            keen.sprite("keen_l_fall");
            keen.animate({top: keen.y_of(keen.sig) + 2000}, 2000, "swing", keen.done);
        };
        keen.done = function() {keen.hide()}
    
        keen.y_of = function(elem)
        {
            return elem.offset().top - keen.offset().top + keen.position().top
        };
        keen.x_of = function(elem)
        {
            return elem.offset().left - keen.offset().left + keen.position().left
        };
        
        return keen;
    }
    do_the_deed = function()
    {
        keen = $("<div></div>").addClass("keen").css(
                    {"position": "absolute", "top": "100px", "left": "200px",
                     "background": "url(" + imageurl + ") no-repeat top left",
                     "width": 48, "height": 64, "z-index": 1234}
                    ).prependTo($("#content")).hide();
        keen = make_keen(keen, $(this))
        keen.fall_in()
    };
    
    $(".vote-down-off").click(do_the_deed);
    

});