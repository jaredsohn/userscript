// ==UserScript==
// @name           AMOS: Filter SELECT plugins (jQuery)
// @author         Nadav Kavalerchik (based on: Awesumness)
// @Notes          Enjoy.
// @include        http://lang.moodle.org/*
// ==/UserScript==

if (document.addEventListener){
  document.addEventListener("DOMContentLoaded", durf(), false);
}

function durf() {
    if(typeof unsafeWindow.jQuery == 'undefined'){
      var jayQuery = document.createElement('script');
      jayQuery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
      document.getElementsByTagName("head")[0].appendChild(jayQuery);
    }
}

<script>
jQuery.fn.filterByText = function(textbox) {
    return this.each(function() {
        var select = this;
        var options = [];
        $(select).find('option').each(function() {
            options.push({value: $(this).val(), text: $(this).text()});
        });
        $(select).data('options', options);

        $(textbox).bind('change keyup', function() {
            var options = $(select).empty().data('options');
            var search = $.trim($(this).val());
            var regex = new RegExp(search,"gi");

            $.each(options, function(i) {
                var option = options[i];
                if(option.text.match(regex) !== null) {
                    $(select).append(
                        $('<option>').text(option.text).val(option.value)
                    );
                }
            });
        });
    });
};

$('#amosfilter_fcmp').before('Filter plugins:<input type="text" id="filteplugins"></input><br/>');

$(function() {
    $('select').filterByText($('filteplugins'));
});

</script>