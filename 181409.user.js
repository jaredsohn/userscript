// ==UserScript==
// @name Univision History Watch
// @description History Watch.
// @author ENDiGo
// @include http://tv.univision.mn/24/watch
// @grant    none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


    var container = $('div.grid_11.now-playing.roboto'),
    channelName = ['MNB','MNB2','Education','UBS','TV25','NTV','TV5','Eagle','SBN','Shuud','TV9','SportBox','ETV','Mongol TV','Royal','MNC','Эх Орон','Bloomberg','Parliament'],
    channelValue = ['mnb','mnb_2','edu','ubs','mn25','ntv','tv5','eagle','sbn','shuud','tv9','sportbox','etv','mongolhd','royal','mnc','ehoron','bloomberg','parliament'],
    channelId = ['1','24','23','3','22','4','26','25','27','8','31','32','5','2','38','39','9','41','42'],
    currentDate = new Date(),
    cDate = [currentDate.getFullYear(),(currentDate.getMonth() + 1),currentDate.getDate()].join('-');
    select = $('<select id="channel"></select>').css('float','right'),
    selectedChannelId = undefined;
	

    $.each(channelName,function(i){
        var option = $('<option></option>');
        option.val(channelValue[i]).html(channelName[i]).data('id',channelId[i]);
        if(channelId[i] == '24')
            option.attr('selected','selected');
        select.append(option);    
    });

	var token = ($('script')[10].innerHTML.split('playlist.m3u8?')[1]); 
	token = token.substring(0,token.indexOf('\''))
    
    select.appendTo(container).on('change',function(){
        var selected = $(this).find('option:selected'),
        val = selected.val(),id = selected.data('id');
    
        jwplayer('mediaspace').setup({
            file: 'http://202.70.32.50/hls/_definst_/tv_mid/smil:' + val + '.smil/playlist.m3u8?'+token,
            image: 'js/jwplayer/images/Anywhere.png',
            logo:{
               file: '/js/jwplayer/images/logo.png',
               link: 'http://www.univision.mn'
            },
            autostart: 'true',
            width: '640',
            height: '420',
        });
    
        getPrograms(id,cDate);
        selectedChannelId = id;
    });
	setInterval(function(){getPrograms(selectedChannelId, cDate);},60001);