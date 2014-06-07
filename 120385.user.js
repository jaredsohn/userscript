// ==UserScript==
// @name           The-West Poznámkový blok
// @author         Blood Killer
// @version           1.0
// @include        http://*.the-west.*
// ==/UserScript==

function createButton_(){
                                     var picture = "http://img16.imageshack.us/img16/9081/notepadp.png"; 
                                     var bt = document.createElement('div');
                                     bt.innerHTML = '<img src="'+picture+'" onmousedown="return false" style="cursor:pointer;" />';

                                     function openWindow(title, html){
                                              var NewWindow = unsafeWindow.wman.open("tw_notepad");
                                              NewWindow.setTitle(title).appendToContentPane(html);
                                         };
                                     bt.addEventListener("click", function(){
                                                                                              var name = "Poznámkový blok";
                                                                                              var content = "<span class='tw2gui_textarea '><div class='tw2gui_bg'></div><div class='tw2gui_bg_tl'></div><div class='tw2gui_bg_br'></div><div class='tw2gui_bg_tr'></div><div class='tw2gui_bg_bl'></div><div class='tw2gui_textarea_wrapper'><textarea style='height: 320px; width: 675px;' id='notepad_text'></textarea></div></div></span><br><div style='margin-left:5px;'><a id='notepad_save'><div class='tw2gui_button'><div class='tw2gui_button_right_cap'></div><div class='tw2gui_button_left_cap'></div><div class='tw2gui_button_middle_bg'></div><div class='textart_title' style='width: 100px; height: 19px; font: bold 10pt Arial;'>Uložiť</div></div></a><a id='notepad_delete'><div class='tw2gui_button'><div class='tw2gui_button_right_cap'></div><div class='tw2gui_button_left_cap'></div><div class='tw2gui_button_middle_bg'></div><div class='textart_title' style='width: 100px; height: 19px; font: bold 10pt Arial;'>Zmazať</div></div></a></div>"+
                                                                                                                     "<span style='float:right;margin-right:15px;margin-top:-22px;'><b>Copyright (c) 2011 Blood Killer</b></span>";
                                                                                              openWindow(name, content);
                                                                                              document.getElementById("notepad_save").addEventListener("click", function(){
                                                                                                                                                                                                                             var all_text = document.getElementById("notepad_text").value; 
                                                                                                                                                                                                                             unsafeWindow.localStorage.setItem("tw_notepad", all_text);
                                                                                                                                                                                                                             new unsafeWindow.HumanMessage("Text bol uložený",{type:'success'});
                                                                                                                                                                                                                        }, false);
                                                                                              document.getElementById("notepad_delete").addEventListener("click", function(){
                                                                                                                                                                                                                             var confirm_delete = confirm("Ste si istý, že chcete zmazať všetok text?");
                                                                                                                                                                                                                             if(confirm_delete){
                                                                                                                                                                                                                                     unsafeWindow.localStorage.setItem("tw_notepad", "");
                                                                                                                                                                                                                                     new unsafeWindow.HumanMessage("Text bol zmazaný",{type:'success'});
                                                                                                                                                                                                                                     document.getElementById("notepad_text").value = "";
                                                                                                                                                                                                                                  };
                                                                                                                                                                                                                        }, false);
                                                                                              document.getElementById("notepad_text").value = localStorage.getItem("tw_notepad");

                                                                                              (window_minimize = (document.getElementsByClassName("tw2gui_window tw2gui_win2 tw2gui_window_notabs tw_notepad")[0]).getElementsByClassName("tw2gui_window_buttons_minimize")[0]).parentNode.removeChild(window_minimize);
                                                                                              (window_minimize_snow = (document.getElementsByClassName("tw2gui_window tw2gui_win2 tw2gui_window_notabs tw_notepad  snow")[0]).getElementsByClassName("tw2gui_window_buttons_minimize")[0]).parentNode.removeChild(window_minimize_snow);
                                                                                           }, false);

                                     document.getElementById("left_menu").appendChild(bt);
                                  
                                     var resizeLeftMenu = 0;
                                     resizeLeftMenu = setInterval(function(){
                                                                          if(document.getElementById("workbar_left")){
                                                                                 document.getElementById("workbar_left").style.top = eval(document.getElementById("workbar_left").offsetTop+26)+"px";
                                                                                 resizeLeftMenu = clearInterval(resizeLeftMenu);
                                                                                 document.getElementById("workbar_left").style.marginTop = "0px";
                                                                              };
                                                                      }, 100);

   };
window.addEventListener("load", createButton_, false);