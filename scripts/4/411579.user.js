// ==UserScript==
// @name        2048 RNG
// @description play 2048 using RNG(Random Number Generator)
// @include     http://gabrielecirulli.github.io/2048/
// @run-at      document-start
// @version     1
// ==/UserScript==

// 0: up, 1: right, 2:down, 3: left
var _requestAnimationFrame=requestAnimationFrame,
    reqCnt=0,
    gameCnt=0,
    gm,
    intervalId;

unsafeWindow.requestAnimationFrame=function(){
    if(reqCnt++){
        _requestAnimationFrame.apply(this,arguments);
    }
    else{
//         console.log('first request detected');
        _requestAnimationFrame(function(){
            unsafeWindow.gm = gm = new unsafeWindow.GameManager(4, unsafeWindow.KeyboardInputManager, unsafeWindow.HTMLActuator, unsafeWindow.LocalScoreManager);
            intervalId=setInterval(randomMove,0);
        });
    }
}

function randomMove(){
    if(gm.isGameTerminated()){
        if(gm.won){
            clearInterval(intervalId);
            alert('Won!')
        }
        else{
            console.log(gameCnt+++': '+gm.score);
            gm.restart();
        }
    }
    else{
        gm.move(Math.floor(Math.random() * 4))
    }
}