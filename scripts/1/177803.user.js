// ==UserScript==
// @name        TSL Expand/Collpase Threads
// @namespace   TSLExpandCollapse
// @description TSL Expand/Collpase Threads
// @metadata    TechSideline,TSL
// @include     http://chat.virginiatech.sportswar.com/message_board/*
// @include     http://chat.virginia.sportswar.com/message_board/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     1.2.1
// ==/UserScript==

    $(document).ready(function()
                      {
						  var oldSrc = 'http://chat.virginiatech.sportswar.com/images/message_board/lvl0.gif';
                          var inThreadSrc = 'http://chat.virginiatech.sportswar.com/images/message_board/lvl1.gif';
                          var Expand = "http://findicons.com/files/icons/1156/fugue/16/toggle_expand.png";
                          var Collapse = 'http://findicons.com/files/icons/1156/fugue/16/toggle.png';
                          $('img[src*="' + oldSrc + '"]').parent().addClass('parent');
                          $('img[src*="' + oldSrc + '"]').parent().parent().addClass('NoChildren');
                          $('img[src*="' + oldSrc + '"]').attr('src', Collapse);
                          $('img[src*="' + inThreadSrc + '"]').parent().addClass('children');
                          $('img[src*="' + inThreadSrc + '"]').parent().parent().removeClass('NoChildren').addClass('HasChildren');
                          $('img[src*="' + inThreadSrc + '"]').parent().parent().parent().removeClass('NoChildren').addClass('HasChildren');
                          
                          $('.NoChildren').children('.parent').children('.expand').attr('src',oldSrc);
                        
                          $('.entry-header').append("<br/><a href='#' id='ExpandAll'>Expand All</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='#' id='CollapseAll'>Collapse All</a>");

                          $( "#ExpandAll" ).click(function(e) {
                              e.preventDefault();
                              $('.children').show();
                              
                              $('img[src="' + Expand + '"]').attr('src', Collapse);
                            });
                          
                          $( "#CollapseAll" ).click(function(e) {
                              e.preventDefault();
                              $('.children').hide();
                              $('img[src="' + Collapse + '"]').attr('src', Expand);
                            });
                       
						//Default to Collapse
						      $('.children').hide();
                              $('img[src="' + Collapse + '"]').attr('src', Expand);
							  
                      $('.post').on('click', '.expand', function (){
                              var CurrentIMG = $(this).attr('src');
                              var SubjectContent = $(this).parent().html();

                              if (CurrentIMG == Expand)
                              {
                                  $(this).attr('src',Collapse);
                                  $(this).parent().parent().find('.children').show();
                                  
                                  var MainSubject = $(this).parent().parent().html();
                                  MainSubject = MainSubject.replace(SubjectContent,"");
                                  MainSubject = MainSubject.replace("display:none","");
                                  
                                  $(this).parent().parent().html(MainSubject);

                              } else {
                                  $(this).attr('src',Expand);
                                  var MainSubject = $(this).parent().html();
                                  MainSubject = "<div class='MainSubject'>" + MainSubject + "</div>";
                                  var ThreadContent = $(this).parent().parent().html();
                                  ThreadContent = MainSubject + "<div style='display:none' class='collapsedContent'>" + ThreadContent + "</div>";
                                  $(this).parent().parent().html(ThreadContent);
                              }
                          });
                      });