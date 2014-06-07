// ==UserScript==
// @name       1672340 - Focus Gym Training
// @namespace  http://www.torn.com/profiles.php?XID=1672340
// @version    1.65
// @description  Set which stats you want to train and set a goal for each. Helps you focus training one or more stats at a time.
// @include     http://www.torn.com/gym.php
// @require 	ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013, Fumph
// ==/UserScript==

$( document ).ready(function() {
    var win = 'http://www.torn.com/gym.php';
    if (window.location.href.substr(0,win.length) == win) {
        if (localStorage.order !== 'undefined') {
            var goals = localStorage.order.split(','), i = 0;
            while (i < 4) {
                goals[i] = goals[i].replace(/\D/g,'')
             	i++;   
            }
            if (Number($('#gymStatBoxStrength').text().split(' ')[0].replace(/,/g,'')) >= goals[0]) {
                $('#divStrength').remove();
            } else {
                $('#divStrength div.gymColumn').css('height','104');
                var percent = Math.round(($('#gymStatBoxStrength').text().split(' ')[0].replace(/,/g,'') / goals[0])*100)
                $('#divStrength div.gymColumn table').after('<div class="gymProgressContainer" style="margin-top:6px;"><div class="gymProgressFill" style="width:'+percent+'%; background-color:'+colorProgressBar(percent)+';" title="'+percent+'% of the way to your goal of '+goals[0]+'"></div></div>');   
            }
            if (Number($('#gymStatBoxDefence').text().split(' ')[0].replace(/,/g,'')) >= goals[1]) {
                $('#divDefence').remove();
            }else {
                $('#divDefence div.gymColumn').css('height','104');
                var percent = Math.round(($('#gymStatBoxDefence').text().split(' ')[0].replace(/,/g,'') / goals[1])*100)
                $('#divDefence div.gymColumn table').after('<div class="gymProgressContainer" style="margin-top:6px;"><div class="gymProgressFill" style="width:'+percent+'%; background-color:'+colorProgressBar(percent)+';" title="'+percent+'% of the way to your goal of '+goals[1]+'"></div></div>');   
            }
            if (Number($('#gymStatBoxSpeed').text().split(' ')[0].replace(/,/g,'')) >= goals[2]) {
                $('#divSpeed').remove();
            }else {
				$('#divSpeed div.gymColumn').css('height','104');
                var percent = Math.round(($('#gymStatBoxSpeed').text().split(' ')[0].replace(/,/g,'') / goals[2])*100)
             	$('#divSpeed div.gymColumn table').after('<div class="gymProgressContainer" style="margin-top:6px;"><div class="gymProgressFill" style="width:'+percent+'%; background-color:'+colorProgressBar(percent)+';" title="'+percent+'% of the way to your goal of '+goals[2]+'"></div></div>');   
            }
            if (Number($('#gymStatBoxDexterity').text().split(' ')[0].replace(/,/g,'')) >= goals[3]) {
                $('#divDexterity').remove();
            }else {
                $('#divDexterity div.gymColumn').css('height','104');
                var percent = Math.round(($('#gymStatBoxDexterity').text().split(' ')[0].replace(/,/g,'') / goals[3])*100)
             	$('#divDexterity div.gymColumn table').after('<div class="gymProgressContainer" style="margin-top:6px;"><div class="gymProgressFill" style="width:'+percent+'%; background-color:'+colorProgressBar(percent)+'" title="'+percent+'% of the way to your goal of '+goals[3]+'"></div></div>');   
            }
            $('#gymSubBoxRightColumn').after('<div id="gymSubBoxLeftColumn"><div id="divFocusTraining" class="gymSubBoxLeft"><div class="divHeader bgDark ftWhite">Focus Training</div><div class="gymTextBox gymColumn bgAlt1">> <a href=\'gym.php\' onclick=\'localStorage.order=\"undefined\"\'>Clear Goals</a></div></div></div>');
        } else {
            var onclick = 'localStorage.order=document.getElementById(\'strengthgoal\').value+\',\'+document.getElementById(\'defensegoal\').value+\',\'+document.getElementById(\'speedgoal\').value+\',\'+document.getElementById(\'dexteritygoal\').value;';
            var content = '<table cellspacing="0" cellpadding="0" border="0"><tr><td><input type="text" value="10" id="strengthgoal" style="width:160px;"></td><td width=6px></td><td>Strength</td></tr><tr style="height:8px;"></tr><tr><td><input type="text" value="10" id="defensegoal" style="width:160px;"></td><td width=6px></td><td>Defense</td></tr><tr style="height:8px;"></tr><tr><td><input type="text" value="10" id="speedgoal" style="width:160px;"></td><td width=6px></td><td>Speed</td></tr><tr style="height:8px;"></tr><tr><td><input type="text" value="10" id="dexteritygoal" style="width:160px;"></td><td width=6px></td><td>Dexterity</td></tr><tr style="height:8px;"></tr></table><a href="gym.php" class="button positive train" style="width:auto;" onclick="'+onclick+'" value="1">Change</a>';
            $('#gymSubBoxRightColumn').after('<div id="gymSubBoxLeftColumn"><div id="divFocusTraining" class="gymSubBoxLeft"><div class="divHeader bgDark ftWhite">Focus Training</div><div class="gymTextBox gymColumn bgAlt1">'+content+'</div></div></div>');
        }
    }
});
function colorProgressBar(percent) {
    if (percent < 20) {
        return '#A60000';
    } else if (percent < 40) {
        return '#FF3900';
    } else if (percent < 60) {
        return '#FF7100';
    } else if (percent < 80) {
        return '#FFCB00';
    } else if (percent < 90) {
        return '#C9F600';
    } else if (percent < 95) {
        return '#46AE03';
    } 
    return '#007800';
}