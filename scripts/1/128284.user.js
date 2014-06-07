// ==UserScript==
// @name           novakom
// @namespace      NovakomCleanPrint
// @version        0.5
// @source         http://кис.com.ua/
// @author         MotherHacker aka discovery
// @description    Print the pays list more readable
// @include        http://www.novakom.com.ua/duty
// @include        http://www.novakom.com.ua/pays
// @include        http://www.novakom.com.ua/paymenter
// ==/UserScript==
(function() {
  if (typeof unsafeWindow.jQuery == 'undefined') {  
    window.setTimeout(waitForJquery, 100);
  } else {
    $ = unsafeWindow.jQuery;
    $('form#frm_duty div.quick_form').append('<div id="discovery" title="Added by discovery">prepare to print</div>');
    $('#discovery').css({
      'border':'1px solid #ff9933',
      'background-color':'#ffcc99',
      'text-align':'center',
      'cursor':'pointer',
      'font-size':'0.9em',
      'margin-top':'1em'
    }).click(function() {
      $('<body />').attr('id', 'dtm_body').appendTo('html');
      $('.minmaxtable:first').clone().appendTo('#dtm_body');
      $('#DBG_tbl_duty_result').clone().appendTo('#dtm_body');
      $('#dtm_body form#frm_duty div.quick_form').remove();
      $('#dtm_body .minmaxtable').removeAttr('id');
      $('#dtm_body').css('font-size','.92em');
      $('#dtm_body table.yaml thead th').css({
        'background-color':'#cccccc',
        'color':'#000000',
        'background-image':'none'
      });
      $('#dtm_body table.yaml').css({'font-size':'.92em', 'margin-top':'1em', 'color':'#000000'});
      $('#dtm_body table.yaml td span').css('color','#000000');
      $('#dtm_body #psum, #dtm_body #nsum').each(function(){ $(this).removeAttr('id'); });

      var new_win = window.open( "about:blank", 'dtm_my_print', 'width=960,height=500,status=no,toolbar=no,scrollbars=yes,resizable=yes' );
      var newHTML = $('<html />');
      $('head').clone().appendTo(newHTML);
      $('#dtm_body').appendTo(newHTML);
      $('#dtm_body').remove();
      new_win.document.write( newHTML.html() );
      new_win.document.write('<script type=\"text/javascript\">window.print();</script>');
      new_win.document.close();
      new_win.focus();
    });
    

    if (document.location.pathname == "/pays") {
      $('div > center').siblings('table.yaml').css({'margin-top':'1em', 'font-size':'8pt'}).find('td').css({'border':'0px none #000000', 'padding':'0.2em', 'margin':'0em 0em'});
      $('div > center').siblings('table.yaml').find('td:nth-child(4)').css({'text-align':'right'});
      $('div > center').siblings('table.yaml').find('td:nth-child(6)').css({'text-align':'right', 'font-weight':'bold'});
      $('div > center').siblings('table.yaml').find('tr:nth-child(odd)').css({'background-color':'#cccccc'});
      $('div > center').siblings('table.yaml').find('th').css({'padding':'0.3em', 'background-color':'#666666', 'color':'#ffffff'});
      $('div > center').siblings('table.yaml').find('tr:last-child td').css({'font-weight':'bold', 'background-color':'#666666', 'padding':'0.5em', 'font-size':'10pt', 'color':'#ffffff'});
      $('div > center').css({'font-size':'14pt', 'margin-bottom':'1em'});
    }

    if(document.location.pathname == "/paymenter") {
      $('a.info_counter').click(
        function (e) {
          e.preventDefault();
      });
      $('a.info_counter').click(); // open all calendars
    }
  }
})();