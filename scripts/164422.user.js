// ==UserScript==
// @name       better-streamclud
// @include http://streamcloud.eu/*.avi*
// @version    0.1
// @description  adds html5 quicktime vlc and download button
// @run-at document-end
// @copyright  2013, b7r
// @grant       none
// ==/UserScript==

var flashContainer, videoURL, videoImage;
function getReady() {
    if(document.getElementById('countdown') == undefined) {
        clearTimeout(getReadyInterval);
        var form = document.getElementsByClassName('proform')[0];
        if(form != undefined) {
            form.submit();
        } else {
            //videoURL = document.getElementsByName("flashvars")[0].value += '&autostart=true';
            
            videoURL = document.getElementsByName("flashvars")[0].value.split("&file=")[1].split("&")[0].replace(/%3A/g, ":").replace(/%2F/g, "/");
            videoImage = document.getElementsByName("flashvars")[0].value.split("&image=")[1].split("&")[0].replace(/%3A/g, ":").replace(/%2F/g, "/");
            
            var a = document.getElementsByTagName('a');
            for (i=0; i<a.length; i++) {
                if(a[i].innerHTML == 'Download') {
                    a[i].parentNode.className = '';
                    a[i].parentNode.innerHTML = '<a href="'+videoURL+'" style="font-weight:normal; padding: 0;" target="_blank">Download as MP4</a>';
                    a[i].parentNode.style.lineHeight = '29px';
                    
                    var stream = a[i].parentNode.parentNode.getElementsByTagName('li')[0];
                    var flash = '', html5 = '', quicktime = '', vlc = '';
                    stream.innerHTML = '';
                    stream.className = '';
                    stream.style.lineHeight = '29px';
                    var select = document.createElement('select');
                    select.onchange = function() {
                        switchPlayer(this.value);
                    };
                    break;
                }
            }
            
            flashContainer = document.getElementById('mediaplayer_wrapper').innerHTML;
            var player = readCookie('streamcloudPlayer');
            var autoplay = readCookie('streamcloudAutoplay');

            switch(player) {
                case 'Flash':
                    flash = 'selected';
                    break;
                case 'HTML5':
                    html5 = 'selected';
                    
                    var auto = '';
                    if(autoplay == 'true')
                        auto = 'autoplay';
                    else
                        auto = '';
                        
                    document.getElementById('mediaplayer_wrapper').innerHTML = '<video width=900 height=537 poster="'+videoImage+'" style="background:black;" controls '+auto+'><source src="'+videoURL+'" type="video/mp4"></source></video>';
                    break;
                case 'Quicktime':
                    quicktime = 'selected';
                    
                    var auto = '';
                    if(autoplay == 'true')
                        auto = 'autostart="true"';
                    else
                        auto = 'autostart="false"';
                        
                    document.getElementById('mediaplayer_wrapper').innerHTML = '<embed src="'+videoURL+'" width=900 height=537 '+auto+'></embed>';
                    break;
                case 'VLC':        
                    vlc = 'selected';
                    
                    var auto = '';
                    if(autoplay == 'true')
                        auto = 'autoplay="yes"';
                    else
                        auto = 'autoplay="no"';       
                        
                    document.getElementById('mediaplayer_wrapper').innerHTML = '<embed type="application/x-vlc-plugin" name="VLC" loop="no" '+auto+' volume="100" width="900" height="537" target="'+videoURL+'">';
                    break;
                default:   
                    flash = 'selected';
                    
                    break;
            }  
            
            select.innerHTML = '<select onchange="switchPlayer()"><option '+flash+' value="Flash">Flash</option><option '+html5+' value="HTML5">HTML5</option><option '+quicktime+' value="Quicktime">Quicktime</option><option '+vlc+' value="VLC">VLC</option></select>';          
            stream.appendChild(select);
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            if(autoplay == 'true') {
                cb.checked = true;
            }
            cb.onchange = function() {
                if(this.checked) {
                    var date = new Date();
                	date.setTime(date.getTime()+(14*24*60*60*1000));
                	var expires = "; expires="+date.toGMTString();
                    document.cookie = 'streamcloudAutoplay=true'+expires+'; path=/';
                } else {
                    var date = new Date();
                	date.setTime(date.getTime()+(14*24*60*60*1000));
                	var expires = "; expires="+date.toGMTString();
                    document.cookie = 'streamcloudAutoplay=false'+expires+'; path=/';
                }
            };
            var ap = document.createElement('li');
            ap.appendChild(cb);
            ap.style.lineHeight = '29px';
            //stream.parentNode.appendChild(ap);
            stream.parentNode.insertBefore(ap, stream.nextSibling);
            var apl = document.createElement('label');
            apl.innerHTML = ' Autoplay';
            ap.appendChild(apl);
        }
    }
}

function switchPlayer(v) {
    var date = new Date();
	date.setTime(date.getTime()+(14*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
    document.cookie = 'streamcloudPlayer='+v+expires+'; path=/';
    
    var autoplay = readCookie('streamcloudAutoplay');
    
    switch(v) {
        case 'Flash':
            document.getElementById('mediaplayer_wrapper').innerHTML = flashContainer;
            break;
        case 'HTML5':
            html5 = 'selected';
            
            var auto = '';
            if(autoplay == 'true')
                auto = 'autoplay';
            else
                auto = '';
                        
            document.getElementById('mediaplayer_wrapper').innerHTML = '<video width=900 height=537 poster="'+videoImage+'" style="background:black;" controls '+auto+'><source src="'+videoURL+'" type="video/mp4"></source></video>';
            break;
        case 'Quicktime':
            quicktime = 'selected';
               
            var auto = '';
            if(autoplay == 'true')
                auto = 'autostart="true"';
            else
                auto = 'autostart="false"';
                        
            document.getElementById('mediaplayer_wrapper').innerHTML = '<embed '+auto+' src="'+videoURL+'" width=900 height=537 '+auto+'></embed>';
            break;
        case 'VLC':        
            vlc = 'selected';
                 
            var auto = '';
            if(autoplay == 'true')
                auto = 'autoplay="yes"';
            else
                auto = 'autoplay="no"'; 
                
            document.getElementById('mediaplayer_wrapper').innerHTML = '<embed type="application/x-vlc-plugin" name="VLC" loop="no" volume="100" '+auto+' width="900" height="537" target="'+videoURL+'">';
            break;
        default:
            document.getElementById('mediaplayer_wrapper').innerHTML = flashContainer;
            break;
    }
}

function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
			
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var getReadyInterval = setInterval(getReady, 1000);
