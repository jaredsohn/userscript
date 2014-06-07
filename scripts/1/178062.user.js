// ==UserScript==
// @name       D2L CourseListWidget workaround
// @namespace
// @version    0.28
// @include      https://gsw2.view.usg.edu/d2l/lp/homepage/home.d2l?ou=6626
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2012+, Simon Baev
// ==/UserScript==

if($("h2:contains('My Admin Tools')").length > 0) {
   
   function getCourse(s) {
      if(s.match(" CO$") != null) {
         var tokens = s.split(" ");
         return tokens.slice(0,tokens.length-4).join(" ").trim();	
      }
      else
         return s;
   }
   function getGroupData(s) {
      var temp = new Object();
      var hash = {
         'Spring': 1,
         'Summer': 2,
         'Fall': 3
      }
      
      if(s.match(" CO$") != null) {
         var tokens = s.split(" ");
         temp.term = tokens[tokens.length-4] + " " + tokens[tokens.length-2];
         temp.sortKey = parseInt(tokens[tokens.length-2])*10 + hash[tokens[tokens.length-4]];
      }
      else {
         if(s.match("^(Spring|Summer|Fall)_Semester_") != null) {
            var tokens = s.split("_");
            temp.term = "Migrated"
            temp.sortKey = 0;
         }
         else {
            temp.term = "No Semester";
            temp.sortKey = 1000000;
         }  
      }
      return temp;
   }
   Array.prototype.indexOfField = function (propertyName, value) {
      for (var i = 0; i < this.length; i++) {
         if (this[i][propertyName] === value) {
            return i;
         }
      }
      return -1;
   }
   //-- Creating and filling in array of groups with data from the list of available courses   
   var groups = new Array();
   var table = $("#z_v");
   $('.dhdg_1').remove();
   table.find('tr:lt(2)').remove();
   table.find("tr").each(function() {
      var cell = $(this).find("th:eq(0) a");
      var text = cell.text();
      groups.push(getGroupData(text));
      var url = cell.attr('href');
      var ou = url.split("?",2)[1];
      table.find('tbody').prepend($('<tr>')
                                  .attr('class','d_gd')
                                  .append($('<td>')
                                          .css('padding-left','20px')
                                          .attr('align','left')
                                          .append($('<a>')
                                                  .attr('href',url)
                                                  .text(text))
                                          .append($('<ul>')
                                                  .append($('<li>').append($('<a>').text('Dropbox').attr('href','/d2l/lms/dropbox/admin/folders_manage.d2l?' + ou)))
                                                  .append($('<li>').append($('<a>').text('Discussions').attr('href','/d2l/lms/discussions/admin/forum_topics_list.d2l?' + ou)))
                                                  .append($('<li>').append($('<a>').text('Quizzes').attr('href','/d2l/lms/quizzing/admin/quizzes_manage.d2l?' + ou)))
                                                  .append($('<li>').append($('<a>').text('Content').attr('href','/d2l/lms/content/manage/topicsmodules_list.d2l?' + ou)))                                                                             
                                                  .hide()))
                                  .click(function(e){
                                     if($(e.target).is('a') == false) {
                                        $(this).siblings().find('ul').hide();$(this).find('ul').fadeToggle();
                                     }
                                  })
                                 );
      
      $(this).remove();       
   });
   //-- Sort groups and add them at the beginning of the table
   groups_sorted = groups.filter(function(value, index, self){return self.indexOfField("sortKey",value.sortKey) === index;}).sort(function(a,b){return b.sortKey-a.sortKey});
   for(var i=0;i<groups_sorted.length;i++) {
      table.find('tbody').prepend($('<tr>')
                                  .attr('class','groupTitle')
                                  .append($('<th>')
                                          .attr('class','d_hch')
                                          .css('text-align','left')
                                          .text(groups_sorted[groups_sorted.length-i-1].term)));
   }
   //-- Move courses into corresponding groups
   table.find('tr:gt(' + (groups_sorted.length-1) + ')').each(function(i){
      var text = $(this).find('td a:first').text();
      var temp = groups_sorted.indexOfField("sortKey",getGroupData(text).sortKey);
      if(temp != 1) {
         $(this).off('mouseenter');
         $(this).find('ul').remove();
      }   
      $(this).find('td a:first').text(getCourse(text));      
      $(this).insertAfter($(this).parent().find('tr.groupTitle:eq(' + temp + ')'));            
   });
   //-- Show context menu for the first course in "current term" group
   //table.find('tbody tr.groupTitle:eq(1)').next().find('ul').show();
   
   //-- Hide annoying divs
   $("#z_ba").hide();$("#z_bd").hide();$("#z_x").hide();
   
   //-- Resize top-level table containing 3 main columns
   $("#z_a").find('tbody tr:eq(1) td:eq(0)').attr('colspan','25').next().attr('colspan','50').next().attr('colspan','25');
}
