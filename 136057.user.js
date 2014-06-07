// ==UserScript==
// @author      Clifton Swafford
// @description Makes a comment on an issue after you move it to a new milestone, assign it to a different user, or change the labels
// @include     https://github.com/*/issues*
// @license     MIT
// @name        GitHub Issue Management Tracking
// @namespace   github.com
// @version     0.30
// ==/UserScript==

// Load jQuery from the window
var $ = null;
function run( callback ) {
  if( typeof unsafeWindow.jQuery != 'undefined' ) {
    $ = unsafeWindow.jQuery;
    main();
  } else {
    var script = document.createElement('script');
    script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
    script.addEventListener( 'load', function() {
      var s = document.createElement('script');
      s.textContent = 'jQuery.noConflict();('+callback.toString()+')();';
      document.body.appendChild(s);
    }, false );
    document.body.appendChild(script);
  }
}

function main() {
  // Get the repository base URL
  var WWW = document.location.href.match( /(http[s]?:\/\/github.com(.*))\/issues(.*)/ )[1];

  // Issue view page
  if( document.location.href.indexOf( '/issues/' ) != -1 ) {

    var issue = document.location.href.match( /[0-9]+/ )[0];
    var authenticity_token = $('meta[name="csrf-token"]').attr('content');

    // Adding or removing a label from an issue
    $('ul.smallnav.labels > li > a').click( function() {
      // The class attribute is updated after the click handler executes,
      // so e.g. if the <a> has the class "selected" then we will be removing
      // the label from the issue
      var action = !$(this).hasClass('selected') ? 'Added' : 'Removed';

      var label = $(this).children('span.name').html();
      if( !$(this).hasClass('selected') ) {
        addLabel( label, issue, authenticity_token );
      } else {
        removeLabel( label, issue, authenticity_token );
      }
    } );

    // Setting the milestone
    $(document).on( 'click', 'div.milestone-selector div.milestone-item, div.milestone-selector div.clear', function() {
      // Don't do anything if the user selected the existing milestone
      if( $(this).find('span:contains(Current)').length > 0 )
        return;

      var milestone_name = $(this).children('h4.milestone-title').html();
      moveToMilestone( milestone_name, issue, authenticity_token );
    } );

    // Setting the assignee
    $('div.user-selector li.selector-item').click( function() {
      var text_nodes = $(this).find('h4').contents().filter( function() {
        return $.trim( $(this).text() ) && this.nodeType == Node.TEXT_NODE;
      } );

      var assignee = $.trim( $(text_nodes[0]).text() );
      if( assignee == 'Clear assignee' )
        assignee = null;
      if( assignee != $('div.assignee > span a').html() )
        assignIssue( assignee, issue, authenticity_token );
    } );

  } else {
    // Milestone view page

    var authenticity_token = $('meta[name="csrf-token"]').attr('content');

    // Setting labels
    $(document).on( 'click', 'button.update-labels', function() {
      // Don't do anything if the user selected the existing milestone
      if( $(this).find('span:contains(Current)').length > 0 )
        return;

      var labels = [];
      $('ul.labels a.selected').each( function(i,e){ labels.push( $(e).children('span.name').html() ); } );

      var issues = [];
      $('input[name="issues[]"]:checked').each( function(i,e){ issues.push( e.value ); } );

      for( var i in issues ) {
        // Remove any current labels that are no longer selected
        var current_labels = [];
        $('tr#issue_'+issues[i]+' span.label').each( function(i,e) {
          var label = $(e).html();
          current_labels.push( label );
          if( $.inArray( label, labels ) == -1 )
            removeLabel( label, issues[i], authenticity_token );
        } );

        // Add any new labels
        for( var l in labels ) {
          if( $.inArray( labels[l], current_labels ) == -1 )
            addLabel( labels[l], issues[i], authenticity_token );
        }
      }
    } );

    var clear_milestone;
    // Setting the milestone
    $(document).on( 'click', 'div.milestone-selector div.milestone-item, div.milestone-selector div.clear', function() {
      var issues = [];
      $('input[name="issues[]"]:checked').each( function(i,e){ issues.push( e.value ); } );

      var milestone_name = $(this).find('h4.milestone-title').html();
      var current_milestone = $('div.smallnav.milestone div.info-main span.title').html();

      // Remove the option to clear the milestone if we're viewing the milestone screen
      if( current_milestone === null && $('div.smallnav.milestone > p').html() == 'Issues with no milestone set' ) {
        clear_milestone = $('div.milestone-selector div.selector-item.clear').detach();
      } else if( $('div.milestone-selector div.selector-item.clear') === undefined ) {
        clear_milestone.insertAfter('div.milestone-selector div.filterbar');
        clear_milestone = null;
      }

      // Don't do anything if the user tried to move issues to the
      // same milestone that is currently in context
      if( current_milestone > '' && current_milestone == milestone_name ) {
        return;
      }

      for( i in issues ) {
        moveToMilestone( milestone_name, issues[i], authenticity_token );
      }
    } );

    // Setting the assignee
    $(document).on( 'click', 'div.user-selector li.selector-item', function() {
      var issues = [];
      $('input[name="issues[]"]:checked').each( function(i,e){ issues.push( e.value ); } );

      var text_nodes = $(this).find('h4').contents().filter( function() {
        return $.trim( $(this).text() ) && this.nodeType == Node.TEXT_NODE;
      } );

      var assignee = $.trim( $(text_nodes[0]).text() );
      for( i in issues ) {
        var current_assignee = $('tr#issue_'+issues[i]+' a.assignee-bit').attr('href');
        if( current_assignee != undefined )
          current_assignee = current_assignee.substr(1);
        if( current_assignee != assignee )
          assignIssue( assignee, issues[i], authenticity_token );
      }
    } );

    // Clearing the assignee
    $(document).on( 'click', 'div.user-selector label.clear h4', function() {
      var issues = [];
      $('input[name="issues[]"]:checked').each( function(i,e){ issues.push( e.value ); } );

      var text_nodes = $(this).contents().filter( function() {
        return $.trim( $(this).text() ) && this.nodeType == Node.TEXT_NODE;
      } );

      var assignee = $.trim( $(text_nodes[0]).text() );
      if( assignee != 'Clear assignee' )
        return false;
      assignee = null;

      for( i in issues ) {
        var current_assignee = $('tr#issue_'+issues[i]+' a.assignee-bit').attr('href');
        if( current_assignee == undefined ) {
          if( assignee == null ) continue;
        } else {
          current_assignee = current_assignee.substr(1);
        }
        if( current_assignee != assignee )
          assignIssue( assignee, issues[i], authenticity_token );
      }
    } );
  }

  // Submit a comment to note that the user added a label to an issue
  function addLabel( label, issue, authenticity_token ) {
    var data = {};
    data.issue = issue;
    data.comment = { body: 'Added label "' + label +'"' };
    data.authenticity_token = authenticity_token;
    $.post( WWW+'/issue_comments', data );
  }

  // Submit a comment to note that the user removed a label from an issue
  function removeLabel( label, issue, authenticity_token ) {
    var data = {};
    data.issue = issue;
    data.comment = { body: 'Removed label "' + label +'"' };
    data.authenticity_token = authenticity_token;
    $.post( WWW+'/issue_comments', data );
  }

  function moveToMilestone( milestone_name, issue, authenticity_token ) {
    var data = {};
    data.authenticity_token = authenticity_token;
    data.issue = issue;
    if( milestone_name === null )
      data.comment = { body: 'Cleared milestone' };
    else
      data.comment = { body: 'Moved to ' + milestone_name };
    $.post( WWW+'/issue_comments', data );
  }

  function assignIssue( assignee, issue, authenticity_token ) {
    var data = {};
    data.authenticity_token = authenticity_token;
    data.issue = issue;
    if( assignee === null )
      data.comment = { body: 'Cleared assignee' };
    else
      data.comment = { body: 'Assigned to @' + assignee };
    $.post( WWW+'/issue_comments', data );
  }
}

run( main );
