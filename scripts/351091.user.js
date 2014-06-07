// ==UserScript==
// @name        HV训练助手V2.0
// @namespace   bluedust
// @include     http://hentaiverse.org/*
// @exclude     http://hentaiverse.org/pages*
// @version     1
// @grant       none
// ==/UserScript==

var nameSpace = 'training_assistant_2';
var L = localStorageData();

function localStorageSet(key, value){
    L[key] = value;
    localStorage[nameSpace] = JSON.stringify(L);
}

function localStorageGet(key){
    return L[key];
}

function localStorageData(){
    return JSON.parse(localStorage[nameSpace] || '{}');
}

if(document.location.href == 'http://hentaiverse.org/?s=Character&ss=tr'){
    localStorageSet('endTime', document.getElementById('progress_bar') ? end_time : 0);
}

function TrainingWidget(endTime){
    var _this = this;
    this.setX = function(){}
    this.setY = function(){}
    var panelDiv;
    var totalRemainingTime = endTime - parseInt(new Date().getTime()/1000);
    var currRemainingTime = totalRemainingTime;
    var timer;

    var onTrainingCompleteListeners = [];
    var onNoTrainingListeners = [];
    var onTrainingListeners = [];

    this.initialization = function(){
        panelDiv = _this.createUI();
    }

    this.createUI = function(){
        var panelDiv = document.createElement('div');
        panelDiv.style.width = '200px';
        panelDiv.style.height = '30px';
        panelDiv.style.background = '#ffffff';
        panelDiv.style.right = '0px';
        panelDiv.style.bottom = '0px';
        panelDiv.style.position = 'fixed';
        panelDiv.style.fontSize = '12px';
        panelDiv.style.lineHeight = '30px';
        document.body.appendChild(panelDiv);

        return panelDiv;
    }

    this.getUI = function(){
        return panelDiv;
    }

    this.appendToBody = function(){
        document.body.appendChild(panelDiv);
    }

    this.start = function(){
        if(totalRemainingTime <= 0){
            _this.onNoTraining();
            return;
        }

        for(var key in onTrainingListeners){
            onTrainingListeners[key]();
        }

        _this.onUpdate();
        if(timer)clearInterval(timer);
        timer = setInterval(function(){
            _this.onUpdate();
        }, 1000);
    }

    this.stop = function(){
        clearInterval(timer);
        timer = null;
    }

    this.onUpdate = function(){
        if(--currRemainingTime){
            panelDiv.innerHTML = _this.formatTime(currRemainingTime);
        }
        else
        {
            clearInterval(timer);
            _this.onTrainingComplete();
            timer = null;
        }
    }

    this.onTrainingComplete = function(){
        panelDiv.style.background = 'red';
        panelDiv.innerHTML = '训练完成';
        for(var key in onTrainingCompleteListeners){
            onTrainingCompleteListeners[key]();
        }
    }

    this.onNoTraining = function(){
        panelDiv.style.background = 'red';
        panelDiv.innerHTML = '没有训练';
        for(var key in onNoTrainingListeners){
            onNoTrainingListeners[key]();
        }
    }

    this.formatTime = function(second){
        var hours = parseInt(second/3600);
        second = second % 3600;
        var minute = parseInt(second/60);
        second = second % 60;

        var str = '训练剩余时间：';
        if(hours > 0) str += hours + '小时';
        if(minute > 0) str += minute + '分';
        if(second > 0) str += second + '秒';
        return str;
    }

    this.addOnTrainingCompleteListener = function(listener){
        if(typeof listener == 'function'){
            onTrainingCompleteListeners.push(listener);
        }
    }

    this.removeOnTrainingCompleteListener = function(listener){
        var index = onTrainingCompleteListeners.indexOf(listener);
        if (index > -1) {
            onTrainingCompleteListeners.splice(index, 1);
        }
    }

    this.addOnNoTrainingListener = function(listener){
        if(typeof listener == 'function'){
            onNoTrainingListeners.push(listener);
        }
    }

    this.removeOnNoTrainingListener = function(listener){
        var index = onNoTrainingListeners.indexOf(listener);
        if (index > -1) {
            onNoTrainingListeners.splice(index, 1);
        }
    }

    this.addOnTrainingListener = function(listener){
        if(typeof listener == 'function'){
            onTrainingListeners.push(listener);
        }
    }

    this.removeOnTrainingListener = function(listener){
        var index = onTrainingListeners.indexOf(listener);
        if (index > -1) {
            onTrainingListeners.splice(index, 1);
        }
    }
}

function AutoTrainingRobot(){
    var _this = this;
    var controlDiv;
    var trainingList;

    var onAllTrainingCompleteListeners = [];

    this.initialization = function(){
        controlDiv = _this.createUI();
        trainingList = localStorageGet('trainConfig');
    }

    this.createUI = function(){
        var controlDiv = document.createElement('div');
        controlDiv.style.position = 'absolute';
        if(localStorageGet('panelLeft') != undefined){
            controlDiv.style.left = localStorageGet('panelLeft');
            controlDiv.style.top = localStorageGet('panelTop');
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
            (_this.buildConfig(localStorageGet('trainConfig')) || '') +
            '</textarea>' +
            '<p style="color: #959595; width: 170px; text-align: left; margin: 0px auto;">提示: 填入 “序号，次数”，每条一行</br>' +
            '例：2,-1（第二个技能，无限次，次数从1开始，-1为无限）</p>' +
            '<button style="margin: 10px;">保存</button>';

        document.body.appendChild(controlDiv);
        controlDiv.querySelector('button').addEventListener('click', function(){
            _this.saveConfig(document.getElementById('trainConfig').value);
        });

        var posX;
        var posY;
        controlDiv.querySelector('#title').addEventListener('mousedown', function(e)
        {
            posX = e.clientX - parseInt(controlDiv.offsetLeft);
            posY = e.clientY - parseInt(controlDiv.offsetTop);
            document.addEventListener('mousemove', mouseMove);
        });

        document.addEventListener('mouseup',function()
        {
            document.removeEventListener('mousemove', mouseMove);
            localStorageSet('panelLeft', controlDiv.style.left);
            localStorageSet('panelTop', controlDiv.style.top);
        });

        function mouseMove(ev)
        {
            if(ev==null) ev = window.event;//IE
            controlDiv.style.left = (ev.clientX - posX) + "px";
            controlDiv.style.top = (ev.clientY - posY) + "px";
        }

        return controlDiv;
    }

    this.getUI = function(){
        return controlDiv;
    }

    this.parseConfig = function(value){
        var training = value.split('\n');
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

    this.buildConfig = function(trainingList){
        var str = '';
        for(var key in trainingList){
            if(key != '0')str += '\n';
            str += trainingList[key].index;
            str += ','
            str += trainingList[key].count;
        }
        return str;
    }

    this.saveConfig = function(configStr){
        if(configStr !== undefined){
            if(document.getElementById('trainConfig').value != ''){
                localStorageSet('trainConfig', _this.parseConfig(document.getElementById('trainConfig').value));
                trainingList = localStorageGet('trainConfig');
                if(trainingList.length){
                    alert('已保存！');
                    _this.stop();
                    _this.start();
                }
                else{
                    alert('数据错误！');
                }
            }
            else{
                localStorageSet('trainConfig', []);
                localStorageSet('allComplete', true);
                alert('数据已清除！');
            }
        }
    }

    this.isCanTraining = function(trainIndex){
        var trainIcon = document.querySelectorAll('#trainform table tr')[trainIndex]
            .getElementsByTagName('td')[7]
            .querySelector('img');

        if(!trainIcon || !trainIcon.getAttribute('onclick'))return false;
        return true;
    }

    this.training = function(trainIndex){
        var trainIcon = document.querySelectorAll('#trainform table tr')[trainIndex]
            .getElementsByTagName('td')[7]
            .querySelector('img');

        if(!trainIcon || !trainIcon.getAttribute('onclick'))return false;
        trainIcon.click();
        return true;
    }

    this.start = function(){
        if(document.getElementById('progress_bar'))return;

        for(var key in trainingList){
            if(trainingList[key].count != 0){
                if(_this.isCanTraining(trainingList[key].index)){
                    if(trainingList[key].count != -1)trainingList[key].count--;
                    localStorageSet('trainConfig', trainingList);
                    localStorageSet('allComplete', false);
                    _this.training(trainingList[key].index);
                    return true;
                }
            }
            continue;
        }

        //所有训练完成
        for(var key in onAllTrainingCompleteListeners){
            onAllTrainingCompleteListeners[key]();
        }
        if(!localStorageGet('allComplete')){
            localStorageSet('allComplete', true);
            alert('训练任务已完成！')
        }
    };

    this.stop = function(){};

    this.addOnAllTrainingCompleteListener = function(listener){
        if(typeof listener == 'function'){
            onAllTrainingCompleteListeners.push(listener);
        }
    }
}

(function(){
    var runMode = localStorageGet('mode') || 'normal';
    var trainingUrl = 'http://hentaiverse.org/?s=Character&ss=tr';

    if(document.location.href == trainingUrl){
        var robot = new AutoTrainingRobot();
        robot.initialization();
        robot.start();
        robot.getUI().appendChild(createModeUI());
    }

    var widget = new TrainingWidget(localStorageGet('endTime'));
    widget.initialization();
    widget.addOnTrainingListener(function(){
        localStorageSet('trainingTipsCount', 0);
    });
    widget.addOnNoTrainingListener(onNoTrainingListener);
    widget.addOnTrainingCompleteListener(onNoTrainingListener);
    widget.start();

    function onNoTrainingListener(){
        if(!localStorageGet('allComplete')){
            if(isBattle() || document.location.href == trainingUrl){
                localStorageSet('trainingTipsCount', 0);
                return;
            }

            if(runMode == 'auto'){
                if(!isBattle()){
                    document.location.href = trainingUrl;
                }
            }
            else{
                var tipsCount = localStorageGet('trainingTipsCount') || 0;
                if(tipsCount++%3 == 0){
                    if(confirm('训练已完成！是否跳到训练页面进行训练?')){
                        document.location.href = trainingUrl;
                    }
                }
                localStorageSet('trainingTipsCount', tipsCount);
            }
        }
    }

    function isBattle(){
        return document.getElementById('ckey_attack') || document.getElementById('riddlemaster');
    }

    function createModeUI(){
        var div = document.createElement('div');
        div.innerHTML = '<label><input type="checkbox" id="runMode">自动</label>';
        div.style.position = 'absolute';
        div.style.right = '10px';
        div.style.bottom = '10px';
        var checkbox = div.querySelector("#runMode");
        localStorageGet('mode') == 'auto' ? checkbox.checked = true : '';

        checkbox.addEventListener('change', function(){
            localStorageSet('mode', this.checked ? 'auto' : 'normal');
        });
        return div;
    }
})();
