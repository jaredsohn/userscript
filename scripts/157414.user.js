// ==UserScript==
// @name       Sort Pluralsight
// @namespace  Stimul8d
// @version    1.0
// @description  Takes the full course list and makes it awesome
// @include    http://pluralsight.com/training/Courses
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js
// @copyright  2013+, Stimul8d
// ==/UserScript==

$(function()
  {
      $('head').append('<link rel="stylesheet" type="text/css" href="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css">');
      $('.mainHeader').hide();
      $('#contentSection').append("<table id='DavesTable'><thead><th>Category</th><th>Name</th><th>Author</th><th>Rating</th><th>Difficulty</th><th>Duration</th><th>Date</th></thead></table>");
      $('.courseList').each(function()
                            {
                                var title = $(this).find('.sketch img').attr('alt');
                                $(this).find('tr').each(function()
                                                        {
                                                            var name = $(this).find('.title').html();
                                                            var author = $(this).find('.author').html();
                                                            var difficulty = $(this).find('.level').html();
                                                            var rating = $(this).find('.rating span').attr('title').replace(' Stars','').replace('Not enough course ratings',0);
                                                            var duration = $(this).find('.duration').html();
                                                            var date = $(this).find('.releaseDate').html();
                                                            $('#DavesTable').append('<tr><td>' + title + '</td><td>'+name+'</td><td>'+author+'</td><td>'+rating+'</td><td>'+difficulty+'</td><td>'+duration+'</td><td>'+date+'</td></tr>');
                                                        });
                                
                            });
      $('.main').remove();
      $('#DavesTable').dataTable({
          "bJQueryUI": true,
          "aoColumns": [
              {"bSortable": true},//title
              {"bSortable": true},//name
              {"bSortable": true},//auth
              {"bSortable": true},//rate
              {"bSortable": true},//dif
              {"bSortable": true},//duration
              {"bSortable":true,"iDateSort":4}//date
          ]
      } );
  });