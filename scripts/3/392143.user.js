// ==UserScript==
// @name       CashGO История поединка
// @namespace  http://com.appscanlive/monkey/cashgo_logs/
// @version    1.0
// @description Выводит историю поединка после того, как он закончился
// @match      http://cashgo.ru/play/*/
// @copyright  2014+, Антон Зыков
// ==/UserScript==

function addJQuery(callback) 
{
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() 
    {
      var script = document.createElement("script");
      script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);
  document.body.appendChild(script);
}

function main() 
{
 function onGameFinished()
    {
        var container = $('<div class="block"><div class="block-title">Результаты игры (<a href="#" id="close-messages-button">Закрыть</a>)</div></div>').appendTo('body');
        var messages = $('#messages-common');
        console.log(messages);
        container.css({
            'position': 'absolute',
            'top': '100px',
            'bottom': '10%',
            'left': '25%',
            'right': '25%',
            'box-shadow': '7px 7px 10px #888888',
            'background': '#eee',
            'z-index': '100'
        });
        messages.css({
            'position': 'absolute',
            'top': '130px',
            'bottom': '10%',
            'left': '25%',
            'right': '25%',
            'display': 'block',
            'background': '#eee',
            'padding': '0.5em',
            'margin': container.css('margin'),
            'margin-bottom': '0px',
            'overflow-y': 'scroll',
            'border': 'solid 1px #d1e2ee',
            'z-index': '101'
        });
/*        
        $('a#copy-messages-button', container).on('click', function() {
            var text = '';
            messages.children().each(function (i, message) {
                text += $(message).text() + "\r\n";
            });
        });*/
        $('a#close-messages-button', container).on('click', function() {
            container.hide();
            messages.hide();
        });
        messages.get(0).contentEditable = true;
        messages.get(0).tabIndex = 0;
        messages.get(0).focus();
    }

    
    var lastDlgText = '';
    var interval = setInterval(function()
               {
                   var lastText = $('#messages-personal > p:first-child').html();
                   if (lastText.match(/.+Победа.+Мечта.+куплена/))
                   {
                       onGameFinished();
                       clearInterval(interval);
                   }
               }
        , 2000);
}

// load jQuery and execute the main function
addJQuery(main);