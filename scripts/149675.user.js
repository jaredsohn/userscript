// ==UserScript==
// @name       SMS Postfach Cleaner
// @namespace  http://*.sms.at/messagebox/postfach/?*
// @version    0.1
// @description  enter something useful
// @match      http://*.sms.at/messagebox/postfach/?*
// @copyright  2012+, vememas
// ==/UserScript==
(function () {
    console.log("SMSatCleaner startet...");
    function main() {
        var deleteAll = function(){
            setCookie('deleteAll', true, 1);
            document.cookie.match(/Goldbach=[true|false]{1}/g)
            $('body').data('delete', true);
            if($('form[name=frm] table.global_content_box620:first input.input_checkbox').length > 1){
                console.log('lösche...');
                $('input[type=checkbox]').attr('checked', true);
                document.getElementById('delete').value='1';
                document.frm.submit();
            } else {
                console.log('done!');
                setCookie('deleteAll', false, 1);
            }
        }
        var setCookie = function(c_name,value,exdays){
            var exdate=new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=c_name + "=" + c_value;
        }
        var getCookie = function(c_name){
            var i,x,y,ARRcookies=document.cookie.split(";");
            for (i=0;i<ARRcookies.length;i++)
            {
                x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
                x=x.replace(/^\s+|\s+$/g,"");
                if (x==c_name)
                {
                    return unescape(y);
                }
            }
        }
        
        $('form[name=frm] table.global_content_box620:last tr:first').append('<a href="#" class="button" id="deleteAll"><span>alle Löschen</span></a>');
        $('#deleteAll').click(function(){
            if (confirm('Wirklich alles löschen?'))
            {
                console.log('lösche alles');
                deleteAll();
            }
        });
        if (getCookie('deleteAll') == 'true') {
            deleteAll();
        }
    }
    addJQuery(main);
})();

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
