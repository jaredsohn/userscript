// ==UserScript==
// @name       Maximize Training Grounds
// @version    0.1
// @include        	http://www.erepublik.com/*/economy/training-grounds
// ==/UserScript==

tg_names= ["Weights Room", "Climbing Center", "Shooting Range", "Special Forces Center"];
tg_cost = [0, 0.19, 1.49,  1.79];
tg_str  = [5, 2.5 , 5,    10   ];

max_level = 4;

ground_objs = document.getElementsByClassName("listing grounds ");

for (i = 0; i < ground_objs.length; ++i ) {
    
    ground = ground_objs[i];
    
    img    = ground.getElementsByTagName("img")[1];     // tg picture
    span   = ground.getElementsByTagName("span")[0];    // q stars (below picture)
    strong = ground.getElementsByTagName("strong")[1];  // strength provided
    
    full_title = img.title.split(" - "); 
    bldg_name  = full_title[0];
    title      = full_title[1].split(" ");
    
    /* Update the max strength */
    q = tg_names.indexOf(bldg_name); // 0-indexed    
    strong.innerHTML = "+" + (max_level * tg_str[q]);
    
    /* Change Image picture/alt text/title */
    img.title = img.title.replace(/(Quality )[0-9]/, "$1"+max_level);
    img.alt   = img.alt.replace(  /(Quality )[0-9]/, "$1"+max_level);
    img.src   = img.src.replace(  /(_q[0-9])?(\.png)/, "_q"+max_level+"$2");
    
    /* Maximize all upgrade stars */
    span.className = span.className.replace(  /( q)[0-9]/, "$1"+max_level);
    
}