// ==UserScript==
// @name        AprWebCheckerByName
// @namespace   APR
// @include     http://pretraga2.apr.gov.rs/ObjedinjenePretrage/Search/Search
// @version     1
// ==/UserScript==


//var BaseURL='http://localhost:51946';
var BaseURL='http://andantinoapr.azurewebsites.net';
var timeout;
var timeoutSendToServer;
var timeoutWatchDog;
var WDReset=1;
var ClickCounter=0;
var MaxClickCounter=10000;

//$("input[value=Претражи]").submit(function() {
//alert('Handler for .submit() called.');
//return false;
//});

var minTimer = 1800;
var maxTimer = 4100;

function RandomInterval()
{
  return Math.floor(Math.random() * (maxTimer - minTimer + 1)) + minTimer;
}

var i = 0;
var OldRequest=null;

function SendToServer() {
    i++;
    $("input[name=SearchByRegistryCodeString]").val(i);
    var ss = $(".ContentTable").html();
    if (ss != null) {
        if (ss != OldRequest) {
            OldRequest = ss;
            $.post(BaseURL + '/NBSVIPBD/SaveAPRLinkByName/',
                   { tbl: encodeURIComponent($(".ContentTable").html()) },
                   function (data) {
                            }).done(function (status, statusText, responses, responseHeaders) {
                            }).fail(function (xhr, status, error) {
                            })
        }
    }
}

function ProcessOne() {
    
    var response = $.ajax({
        url: BaseURL+'/NBSVIPBD/GetNextUnprocessedByName',
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        beforeSend: function (xhr) {
            xhr.overrideMimeType("application/json");
        },
        complete: function (data) {
          ClickCounter++;
          if (ClickCounter<MaxClickCounter){
                $("form[data-ajax=true]").submit();
               //  $("input[value=Претражи]").trigger('submit');
                document.title = 'Obrada '+ClickCounter+'/'+MaxClickCounter+'';
                timeout = setTimeout(ProcessOne, RandomInterval());
                WDReset=0;
              }
              else
              {
                  clearInterval(timeoutSendToServer);
                  timeoutSendToServer = 0;
                  clearTimeout(timeout);
                  timeout = 0;
              }
        },
        jsonpCallback: "getResources"
    })
}


function WatchDog(){
if (WDReset==1){
   ProcessOne();
  }
  else
  {
   WDReset=1;
  }
}


$(document).ready(
function () {
   $("form")[0].action="http://www.yahoo.com";
   $('input:radio[name=rdbtnSelectInputType]').filter('[value=poslovnoIme]').trigger('click');

    timeoutSendToServer = setInterval(SendToServer, 125);
    timeoutWatchDog = setInterval(WatchDog, 30000+RandomInterval());
    timeout = setTimeout(ProcessOne, RandomInterval());
});



