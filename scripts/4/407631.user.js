// ==UserScript==
// @name       VCR Sound Damper
// @version    0.1
// @match      http://planets.nu/*
// ==/UserScript==

function wrapper () { // wrapper for injection

    console.log("vcrSoundDamper ver: 0.1");
   
    var old_vcrSoundLoad = vcrSound.prototype.load;
    
    vcrSound.prototype.load = function () {
     
        var vol = 10;
        var multi = false;
        
        this.enabled = true;
        try {
            this.torpIndex = 0;
            this.beamIndex = 0;
            this.laserIndex = 0;
            this.torpedoLaunch = new Array();
            for (var b = 0; b < 1; b++) {
                this.torpedoLaunch.push(soundManager.createSound({
                    id: "torpedoLaunch" + b,
                    url: getSoundPath("effects/torp.mp3"),
                    multiShot: multi,
                    volume: vol
                }).load())
            }
            this.beamFire = new Array();
            for (var b = 0; b < 1; b++) {
                this.beamFire.push(soundManager.createSound({
                    id: "beamFire" + b,
                    url: getSoundPath("effects/beam.mp3"),
                    multiShot: multi,
                    volume: vol
                }).load())
            }
            this.laserFire = new Array();
            for (var b = 0; b < 1; b++) {
                this.laserFire.push(soundManager.createSound({
                    id: "laserFire" + b,
                    url: getSoundPath("effects/laser.mp3"),
                    multiShot: multi,
                    volume: vol
                }).load())
            }
        } catch (a) {
            this.enabled = false
        }
    };
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);