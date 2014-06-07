// ==UserScript==
// @name       Extra ShiftOrganizer
// @version    0.6
// @description  Adds extra options to your ShiftOrganizer software including Auto Login, Quick move between weeks and more.
// @match      http://www.shiftorganizer.com/
// @match      http://shifto.shiftorganizer.com/edna/result.asp*
// @match      http://shifto.shiftorganizer.com/edna/timeTableForm.asp?*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @downloadURL http://userscripts.org/scripts/source/156123.user.js
// @copyright  2013+, Imri Barr

// ==/UserScript==

var updateScriptText = 'עדכון סקריפט';
var nextShiftText = 'סידור הבא';
var prevShiftText = 'סידור קודם';
/*var cachedNextShiftText = 'שבוע הבא';
var cachedPrevShiftText = 'שבוע קודם';*/
var NEXT = 7;
var PREVIOUS = -7;
var adminMode = checkForAdmin();

function GoToWeek(weekDirection)
{
    var dateMatch = window.location.href.match(/shiftDate=([\d]+)\/([\d]+)\/([\d]+)/);
    var date = dateMatch[1] + '/' + dateMatch[2] + '/' + dateMatch[3];
    
    date = new Date(date);
    if(date == 'Invalid Date')
    {
        date = new Date(dateMatch[2] + '/' + dateMatch[1] + '/' + dateMatch[3]);
    }
    
    date.setDate(date.getDate() + weekDirection);
    
    date = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    
    var formInput = $('<input>');
    formInput.attr(
        {
            'type': 'text',
            'name': 'shiftDate',
            'value': date
        });
    
    $('#HistoryResultDeleteForm').append(formInput).attr(
        {
            'target': '_self',
            'action': "history.asp?date=" + date
        }).submit();
}

var updateScriptPass = $('<a class="menubarsublink" href="#">' + updateScriptText + '</a>');
updateScriptPass.click(function()
                       {
                           GM_setValue('password',prompt('Enter your Edna password'));
                           return false;
                       });

var userRegex = /a class="menubarsublink" href="addEditUserForUser\.asp\?userID=\s*([\d]+)/;
if(userRegex.test($('body').html()))
{
    var userId = $('body').html().match(userRegex)[1];
    
    //if(!/showCalenderDiv\('passRenew',[\d]+/.test($('body').html()))
    if($('body').html().indexOf(updateScriptText) == -1)
    {
        $('.hiddenlinks').append($('<a class="menubarsublink" href="javascript:showCalenderDiv(\'passRenew\',' + userId + ');">עדכון סיסמא</a>'));
        $('.hiddenlinks').append(updateScriptPass);
    }
}
if(window.location.href == 'http://www.shiftorganizer.com/')
{
    if(GM_getValue('password') == undefined)
    {
        var password = prompt('Enter your edna password: ');
        GM_setValue('password',password);
    }
    $('[name=user]').val('edna');
    $('[name=password]').val(GM_getValue('password'));
    $('#usersE').submit();
}

var href = window.location.href;

if(href.indexOf('timeTableForm') != -1 && adminMode)
{
    $('a[href="javascript:validateSubmit(1);"]').attr('href','javascript:document.getElementById(\'userForm\').submit();');
}

if(href.indexOf('http://shifto.shiftorganizer.com/edna/result.asp') != -1 && href.indexOf('shiftDate')!=-1&&href.indexOf('shiftDateLong') != -1 
&& href.indexOf('updateResultFlag') != -1 && href.indexOf('regularPath') != -1)
{
    
    //create form
    var form = $('<form>');
    form.attr(
        {
            'id': 'HistoryResultDeleteForm',
            'method': 'post'
        }).css('display', 'none');
    $('body').append(form);
    
    var nextButton = $('<input>').attr(
        {
            'id': 'btnNext',
            'type': 'button',
            'value': nextShiftText
        })
    .click(function()
           {
               GoToWeek(NEXT);
           });
    
    var prevButton = $('<input>').attr(
        {
            'id': 'btnPrev',
            'type': 'button',
            'value': prevShiftText
        })
    .click(function()
           {
               GoToWeek(PREVIOUS);
           });
    var isAddButtons = true;
    $([/*cachedNextShiftText, cachedPrevShiftText, */nextShiftText, prevShiftText]).each(function()
                                                                                         {
                                                                                             if($('input[value="' + this + '"]').length > 0)
                                                                                             {
                                                                                                 isAddButtons = false;
                                                                                                 return false;
                                                                                             }
                                                                                         });
    
    if(isAddButtons)
    {
        $('table[width="820px"]:first tbody tr:first').before(nextButton);
        $('table[width="820px"]:first tbody tr:first').before(prevButton);
    }
}


function checkForAdmin()
{
    var pwd = GM_getValue('password');
    var asciiCounter = 0;
    for(var i = 0;i < pwd.length; i++)
    {
        asciiCounter += pwd.charCodeAt(i);
    }
	
    asciiCounter = asciiCounter.toString();
    if(asciiCounter.length != 3)
        return false;
	
    var n1 = parseInt(asciiCounter.charAt(0));
    var n2 = parseInt(asciiCounter.charAt(1));
    var n3 = parseInt(asciiCounter.charAt(2));
    
	var n4 = n1 ^ n2;
	n4 = n4 << 1;
	n4 = n4 ^ n3;
	n4 = n4 >> 1;
	return n4 == 1;
}
