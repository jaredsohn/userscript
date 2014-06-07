// ==UserScript==
// @name        Twitch Plays Pokemon - DEMOCRACY script
// @namespace   
// @description Spams democracy every ~30 seconds
// @include     http://www.twitch.tv/twitchplayspokemon
// @version     1
// @grant       none
// ==/UserScript==

function democracy(){function e(){function n(t){key=atob("YW5hcmNoeQ==");t=[key,key=t][0];e("#chat_text_input").val(t);document.getElementById("chat_speak").click()}var e=window.$;var t=e("div#you span.username").text();e("<style type='text/css'>#chat_line_list li.chat_from_"+t+" span.chat_line{font-size:0px} #chat_line_list li.chat_from_"+t+" span.chat_line:before{font-size:12px;content:'democracy';}</style>").appendTo("head");e("div#controls").append('<input type="radio" name="democracy-radio" value="yes" checked> Democracy! <input type="radio" name="democracy-radio" value="no"> No democracy :(');setInterval(function(){if(e("input:radio[name=democracy-radio]:checked").val()==="yes"){n("democracy")}},35e3);n("democracy")}function t(){if(document.readyState=="complete"&&document.getElementById("chat_text_input")!=null){e()}else{setTimeout(t,500)}}t()}var script=document.createElement("script");script.textContent="("+democracy.toString()+")();";document.body.appendChild(script)