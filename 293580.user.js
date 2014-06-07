// ==UserScript==
// @name        HV训练时间提示部件
// @namespace   bluedust
// @include     http://hentaiverse.org/*
// @version     1
// @grant       none
// ==/UserScript==


if(!localStorage.traningWidget_endTime){
    localStorage.traningWidget_endTime = 0;
}

if(document.location.href == 'http://hentaiverse.org/?s=Character&ss=tr'){
    if(document.getElementById('progress_bar')){
        localStorage.traningWidget_endTime = end_time;
    }
    else{
        localStorage.traningWidget_endTime = 0;
    }
}

function Widget(endTime){
    var _this = this;
    this.setX = function(){}
    this.setY = function(){}
    var panelDiv;
    var endTime = localStorage.traningWidget_endTime;
    var totalRemainingTime = endTime - parseInt(new Date().getTime()/1000);
    var currRemainingTime = totalRemainingTime;
    var timer;

    this.initialization = function(){
        panelDiv = document.createElement('div');
        panelDiv.style.width = '200px';
        panelDiv.style.height = '30px';
        panelDiv.style.background = '#ffffff';
        panelDiv.style.right = '0px';
        panelDiv.style.bottom = '0px';
        panelDiv.style.position = 'fixed';
        panelDiv.style.fontSize = '12px';
        panelDiv.style.lineHeight = '30px';

        document.body.appendChild(panelDiv);
    }

    this.start = function(){
        if(totalRemainingTime <= 0){
            _this.onNoTraning();
            return;
        }

        _this.onUpdate();
        if(timer)clearInterval(timer);
        timer = setInterval(function(){
            _this.onUpdate();
        }, 1000);
    }

    this.onUpdate = function(){
        if(--currRemainingTime){
            panelDiv.innerHTML = _this.formatTime(currRemainingTime);
        }
        else
        {
            clearInterval(timer);
            _this.onTraningComplete();
            timer = null;
        }
    }

    this.onTraningComplete = function(){
        panelDiv.style.background = '#ff0000';
        panelDiv.innerHTML = '训练完成';
    }

    this.onNoTraning = function(){
        panelDiv.style.background = '#00ff00';
        panelDiv.innerHTML = '没有训练';
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

    this.initialization();
    this.start();
}

new Widget();