// ==UserScript==
// @name           Beatport Camelot Key Display Addon
// @namespace      local
// @description    Appends the corresponding Camelot Easymix code to the music key text in Beatport's now playing waveform display
// @author         Riley Brazal
// @include        http://www.beatport.com/*
// ==/UserScript==

var nowPlaying = document.getElementById("player-item");
nowPlaying.addEventListener('load', 
                              function (){ 
                                var newtext = "";
                                var bs=document.getElementById("waveform_metadata").getElementsByClassName("padL");
                                var textcase = trim(bs[0].innerHTML);
                                switch (textcase){
                                 case "G\u266fmin":
                                    newtext = "1A";
                                    break;
                                 case "Bmaj":
                                    newtext = "1B";
                                    break;
                                 case "D\u266fmin":
                                    newtext = "2A";
                                    break;
                                 case "F\u266fmaj":
                                    newtext = "2B";
                                    break;
                                 case "A\u266fmin":
                                    newtext = "3A";
                                    break;
                                 case "C\u266fmaj":
                                    newtext = "3B";
                                    break;
                                 case "Fmin":
                                    newtext = "4A";
                                    break;
                                 case "G\u266fmaj":
                                    newtext = "4B";
                                    break;
                                 case "Cmin":
                                    newtext = "5A";
                                    break;
                                 case "D\u266fmaj":
                                    newtext = "5B";
                                    break;
                                 case "Gmin":
                                    newtext = "6A";
                                    break;
                                 case "A\u266fmaj":
                                    newtext = "6B";
                                    break;
                                 case "Dmin":
                                    newtext = "7A";
                                    break;
                                 case "Fmaj":
                                    newtext = "7B";
                                    break;
                                 case "Amin":
                                    newtext = "8A";
                                    break;
                                 case "Cmaj":
                                    newtext = "8B";
                                    break;
                                 case "Emin":
                                    newtext = "9A";
                                    break;
                                 case "Gmaj":
                                    newtext = "9B";
                                    break;
                                 case "Bmin":
                                    newtext = "10A";
                                    break;
                                 case "Dmaj":
                                    newtext = "10B";
                                    break;
                                 case "F\u266fmin":
                                    newtext = "11A";
                                    break;
                                 case "Amaj":
                                    newtext = "11B";
                                    break;
                                 case "C\u266fmin":
                                    newtext = "12A";
                                    break;
                                 case "Emaj":
                                    newtext = "12B";
                                    break;
                                 default:
                                    newtext =  "*";
                                }                     
                                 if (textcase.indexOf(" - ") < 1) {
                                    bs[0].innerHTML = textcase + " - " + newtext;
                                 }
// debug ----->        alert("mdata2: " + bs[0].innerHTML);
                                },
                            true);
function trim(s)
{
  var l=0; var r=s.length -1;
  while(l < s.length && s[l] == ' ')
  {l++; }
  while(r > l && s[r] == ' ')
  {r-=1;}
  return s.substring(l, r+1);
}
