// ==UserScript==
// @name        HV训练助手
// @namespace   bluedust
// @include     http://hentaiverse.org/?s=Character&ss=tr
// @version     1
// @grant       none
// ==/UserScript==

createControlPanel();
var trainList = parseConfig();
var timer = null;

if(trainList){
    timer = setInterval(run, 10000);
}

function saveConfig(config){
    if(config){
        localStorage.trainingassistant_trainConfig = buildConfig(config);
    }
    else{
        if(document.getElementById('trainConfig').value != ''){
            localStorage.trainingassistant_trainConfig = document.getElementById('trainConfig').value;
            if(timer)clearInterval(timer)
            timer = setInterval(run, 10000);
            trainList = parseConfig();
            if(trainList.length){
                alert('已保存，请等待10秒钟后开始启动！');
            }
            else{
                alert('数据错误！');
            }
        }
        else{
            alert('数据已清除！');
        }

    }
}

function parseConfig(){
    if(!localStorage.trainingassistant_trainConfig)return false;

    var training = localStorage.trainingassistant_trainConfig.split('\n');
    var trainingList = [];
    for(var key in training){
        training[key] = training[key].split(',');
        var trainIndex = parseInt(training[key][0]);
        var trainCount = parseInt(training[key][1]);
        if(isNaN(trainCount))trainCount = -1;
        if(!trainIndex || trainIndex < 1 || trainIndex > 15)continue;

        trainingList.push({
            index: trainIndex,
            count: trainCount
        })
    }
    return trainingList;
}

function buildConfig(trainingList){
    var str = '';
    for(var key in trainingList){
        if(key != '0')str += '\n';
        str += trainingList[key].index;
        str += ','
        str += trainingList[key].count;
    }
    return str;
}

function run(){
    if(document.getElementById('progress_bar'))return;

    for(var key in trainList){
        if(trainList[key].count != 0){
            if(isCanTraining(trainList[key].index)){
                if(trainList[key].count != -1)trainList[key].count--;
                saveConfig(trainList);
                training(trainList[key].index);
                return true;
            }
        }
        continue;
    }
    clearInterval(timer);
    timer = null;
    alert('训练任务已完成！')
}

function training(trainIndex){
    var trainIcon = document.querySelectorAll('#trainform table tr')[trainIndex]
        .getElementsByTagName('td')[7]
        .querySelector('img');

    if(!trainIcon || !trainIcon.getAttribute('onclick'))return false;
    trainIcon.click();
    return true;
}

function isCanTraining(trainIndex){
    var trainIcon = document.querySelectorAll('#trainform table tr')[trainIndex]
        .getElementsByTagName('td')[7]
        .querySelector('img');

    if(!trainIcon || !trainIcon.getAttribute('onclick'))return false;
    return true;
}


function createControlPanel(){
    var controlDiv = document.createElement('div');
    controlDiv.style.position = 'absolute';
    if(localStorage.trainingassistant_panelLeft != undefined){
        controlDiv.style.left = localStorage.trainingassistant_panelLeft
        controlDiv.style.top = localStorage.trainingassistant_panelTop;
    }
    else{
        controlDiv.style.right = '0px';
        controlDiv.style.top = '200px';
    }

    controlDiv.style.width = '200px';
    controlDiv.style.background = '#FFFFFF';
    controlDiv.style.zIndex = 10000;

    controlDiv.innerHTML = '<div style="font-size: 13px; padding: 10px; cursor: move;" id="title">学习设置</div>' +
        '<textarea id="trainConfig" style="width: 150px;">' +
        (localStorage.trainingassistant_trainConfig || '') +
        '</textarea>' +
        '<p style="color: #959595; width: 170px; text-align: left; margin: 0px auto;">提示: 填入 “序号，次数”，每条一行</br>' +
        '例：2,-1（第二个技能，无限次，次数从1开始，-1为无限）</p>' +
        '<button style="margin: 10px;">保存</button>';

    document.getElementsByTagName('body')[0].appendChild(controlDiv);
    controlDiv.querySelector('button').addEventListener('click', function(){
        saveConfig();
    });

    var posX;
    var posY;
    controlDiv.querySelector('#title').addEventListener('mousedown', function(e)
    {
        posX = e.clientX - parseInt(controlDiv.offsetLeft);
        posY = e.clientY - parseInt(controlDiv.offsetTop);
        document.addEventListener('mousemove', mousemove);
    });
    document.addEventListener('mouseup',function()
    {
        document.removeEventListener('mousemove', mousemove);
        localStorage.trainingassistant_panelLeft = controlDiv.style.left;
        localStorage.trainingassistant_panelTop = controlDiv.style.top;
    });

    function mousemove(ev)
    {
        if(ev==null) ev = window.event;//IE
        controlDiv.style.left = (ev.clientX - posX) + "px";
        controlDiv.style.top = (ev.clientY - posY) + "px";
    }
}