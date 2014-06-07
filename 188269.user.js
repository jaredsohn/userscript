// ==UserScript==
// @name            Testing
// @include         http://www.trada.net/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==


//--- Create a cell for transmitting the date from page scope to GM scope.
$('body').prepend ('<div id="LatestJSON_Data"></div>');

var J_DataCell          = $('#LatestJSON_Data');


//--- Evesdrop on the page's AJAX calls and paste the data into our special div.
unsafeWindow.$('body').ajaxSuccess (
    function (event, requestData)
    {
        J_DataCell.text (requestData.responseText);
    }
);


//--- Listen for changes to the special div and parse the data.
J_DataCell.bind ('DOMSubtreeModified', ParseJSON_Data);


function ParseJSON_Data ()
{
    //--- Get the latest data from the special cell and parse it.
    var myJson              = J_DataCell.text ();
    var jsonObj             = $.parseJSON (myJson);

    //--- The JSON should return a 2-D array, named "d".
    var AuctionDataArray    = jsonObj.d;

    //--- Loop over each row in the array.
    $.each (
        AuctionDataArray,
        function (rowIndex, singleAuctionData) {

            //--- Print the 7th column.
            console.log ('Row: ' + (parseInt (rowIndex) + 1) + ' Column: 7  Value: ' + singleAuctionData[6]);
        }
    );
}


//--- Format our special cell with CSS.  Add "visibility: hidden;" or "display: none;", if desired.
GM_addStyle ( (<><![CDATA[
    #LatestJSON_Data
    {
        background:         gold;
        border:             3px ridge #0000DD;
        font-size:          10px;
        margin:             0 2em;
        padding:            1ex 1em;
        width:              94%;
        opacity:            0.8;
        overflow:           hidden;
        z-index:            666;
        position:           absolute;
        color:              black;
    }
]]></>).toString () );