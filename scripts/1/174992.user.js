    // ==UserScript==
    // @name                        EM cmds
    // @description         Some crap you may find useful.
    // @match                       http://www.epicmafia.com/game/*
    // ==/UserScript==
     
    function cmds() {
            //No cheating allowed
            if(ranked) {
                    return log('EM cmds has been disabled for this ranked game.')
                    }
     
            //Define variables
            var     ctrl=false,
                    afk=false,
                    bdayb=false,
                    autospam=false,
                    autobomb=false,
                    autothulu=false,
                    spazbubble=false,
                    roles=role_infos,
                    meets=new Object(),
                    prevInput=new Array(),
                    prevIndex=-1,
                    prevCurrent=false,
                    setupid=Number($('#setupid').val()),
                    notfoxie=user.match(/^(foxy|foxie|tokuu|sishen|nightofthelivingcats)$/i)?false:function() {
                            log('function disabled','bold')
                            }
     
            //Compensating for lack of roles
            roles.mafia=roles.quack=roles.thief=roles.villager=roles.fool
     
            //Default data
            var     defaultdata={
                    logging:false,
                    notes:new Object(),
                    blacklist:new Object()
                    }
     
            //Load/create stuff you need
            var     cmds=localStorage.cmds?
                    JSON.parse(localStorage.cmds):
                    defaultdata
       
            //Add missing stuff
            Object.keys(defaultdata).forEach(function(key) {
                    if(!cmds[key]) {
                            cmds[key]=defaultdata[key]
                            }
                    })
     
            //Shorthand variables
            var     notes=cmds.notes,
                    blacklist=cmds.blacklist
     
            //Save stuff when the time comes
            $(window).on('beforeunload',function() {
                    for(var x in notes) {
                            if(!notes[x]) {
                                    delete notes[x]
                                    }
                            }
                    localStorage.cmds=JSON.stringify(cmds)
                    })
     
            //Log info
            function log(message,type) {
                    window.log(parsemsg(message),type+' emcmd')
                    }
     
            //Log errors
            window.onerror=function(message,file,line) {
                    log('Error!','bold')
                    log(line+': '+message)
                    }
     
            //Name grabbing for lazy bums
            function getname(input) {
     
                    }
     
            //My little parser
            function parsemsg(message) {
                    return message
                            .replace(/(&\w+;)/g,function(match,id) {
                                    return $('<span/>').html(id).text()
                                    })
                            .replace(/\{([^}]+\/[^}]+)\}/g,function(string,array) {
                                    return array.split('/')[Math.random()*array.split('/').length|0]
                                    })
                    }
     
            //Autohost setup
            function autohost(title) {
                    title=typeof title==='string'?title:false
                    engine.sock.$events.disconnect=function() {
                            $.getJSON('/game/add/mafia',{
                                    setupid:setupid,
                                    ranked:false,
                                    add_title:title?1:0,
                                    game_title:title||0
                                    },function(json) {
                                            location.href='/game/'+json.table
                                            })
                            }
                    engine.sendcmd('leave')
                    }
     
            //De commands
            var     commands={
                    'host(?: (.+))?':autohost,
                    're(connect|load)':igreconnect,
     
                    //eval() code
                    'eval (.+)':function(code) {
                            log('Evaluation: '+JSON.stringify(eval(code)))
                            },
     
                    //Clear logs? blacklist?
                    'clear ?(logs)?(bl|blacklist)?':function(logs,bl) {
                            if(logs) {
                                    $('#window .emcmd').remove()
                                    }
                            else if(bl) {
                                    log('Blacklist cleared.')
                                    blacklist=cmds.blacklist=new Object()
                                    }
                            else {
                                    $('#window').empty()
                                    }
                            },
     
                    //Blacklist name? reason?
                    '(?:ban|blacklist|bl)(?: (\\w+))?(?: (.+))?':function(name,reason) {
                            if(!name) {
                                    log('The following {scum/plebians/inferiorities} are blacklisted...','bold')
                                    for(var x in blacklist) {
                                            log('&bull; '+x+(blacklist[x]==='N/A'?'':' ('+blacklist[x]+')'))
                                            }
                                    }
                            else {
                                    name=name.toLowerCase()
                                    if(!reason&&blacklist[name]) {
                                            delete blacklist[name]
                                            log('Removed '+name+' from the {blacklist/wall of shame}.')
                                            }
                                    else {
                                            blacklist[name]=reason||'N/A'
                                            log('Blacklisted '+name+'.')
                                            if(meets.pregame.active) {
                                                    Object.keys(meets.pregame.members).some(function(who) {
                                                            if(name===who.toLowerCase()) {
                                                                    engine.sendcmd('ban',{
                                                                            user:who
                                                                            })
                                                                    }
                                                            })
                                                    }
                                            }
                                    }
                            },
                    }
     
            //Check input
            commands.exec=function(input) {
                    for(var regex in this) {
                            if(typeof regex==='string') {
                                    var     match=RegExp(regex).exec(input)
                                    if(match&&input===match[0]) {
                                            match.shift()
                                            this[regex].apply(this,match)
                                            }
                                    }
                            }
                    }
     
            //Manage input
            $(window).on('keydown',function(event) {
                    var     typebox=$('#typebox'),
                            input=typebox.val()
                    if(event.which===17) {
                            ctrl=true
                            }
                    else if(ctrl) {
                            ctrl=false
                            if(event.which===81) {
                                    engine.sendcmd('<',{
                                            msg:input,
                                            meet:'village',
                                            quote:true,
                                            target:user
                                            })
                                    prevIndex=-1
                                    prevInput.unshift(input)
                                    prevCurrent=false
                                    typebox.val('')
                                    }
                            }
                    else {
                            if(!event.target.type) {
                                    typebox.focus()
                                    }
                            if(event.which===8) {
                                    if(input==='/thulu ') {
                                            typebox.val('')
                                            }
                                    }
                            else if(event.which===38) {
                                    if(!prevCurrent) {
                                            prevCurrent=input
                                            }
                                    prevIndex=Math.min(prevIndex+1,prevInput.length-1)
                                    typebox.val(prevInput[prevIndex])
                                    }
                            else if(event.which===40) {
                                    if(!prevCurrent) {
                                            prevCurrent=input
                                            }
                                    prevIndex=Math.max(prevIndex-1,-1)
                                    typebox.val(prevInput[prevIndex]||prevCurrent)
                                    }
                            else if(event.which===13) {
                                    prevIndex=-1
                                    prevInput.unshift(input)
                                    prevCurrent=false
                                    if(input.charAt(0)==='/'&&input.slice(1,4)!='me ') {
                                            typebox.val('')
                                            input=input.substr(1)
                                            commands.exec(input)
                                            }
                                    }
                            else if(input.match(/&\w+;/)) {
                                    typebox.val(input.replace(/&\w+;/g,function(match) {
                                            return $('<span/>').html(match).text()
                                            }))
                                    }
                            }
                    })
            $(window).on('keyup',function(event) {
                    if(event.which===17) {
                            ctrl=false
                            }
                    else if(autothulu) {
                            autothulu=false
                            $('#typebox').val('/thulu ')
                            }
                    })
     
            //Intercept socket
            engine.sock.on('message',function(data) {
                    var     packet
                    try {
                            data=data
                                    .replace(/\x00/g,'')
                                    .replace(/(^|\])(?:\[\])(\[|$)/g,'$1$2')
                                    .replace(/\]\[/g,',')
                            packet=JSON.parse(data||'[]')
                            }
                    catch(error) {
                            packet=new Array()
                            console.log(data)
                            log('Packet error negated ('+error+')')
                            }
                    for(var x in packet) {
                            var     cmd=packet[x][0],
                                    data=packet[x][1]
                            if(cmds.logging&&cmd!='k'&&cmd!='u') {
                                    console.log(cmd,data)
                                    }
                            switch(cmd) {
                                    case 'owner':
                                            setTimeout(function() {
                                                    $('.game_option').not('.sel').click()
                                                    })
                                            break
                                    case 'auth':
                                            trackuser.notes=notes
                                            setTimeout(function() {
                                                    $('#leavetable_confirm').append(
                                                            $('<span class="emcmd">/</span>'),
                                                            $('<a class="emcmd">New</a>')
                                                                    .on('click',autohost))
                                                    })
                                            //Repairing Lucid's holes
                                            /*engine.sock._callbacks.message[1]=function(original) {
                                                    return function(a) {
                                                            try {
                                                                    original(a)
                                                                    }
                                                            catch(error) {
                                                                    log('Non-EM_cmds error caught ('+error+')')
                                                                    }
                                                            }
                                                    }(engine.sock._callbacks.message[1])
                                            */
                                            break
                                    case 'users':
                                            if(!gamestate) {
                                                    meets.pregame={
                                                            active:true,
                                                            votes:new Object(),
                                                            members:new Object(),
                                                            non_voting:new Object()
                                                            }
                                                    Object.keys(data.users).forEach(function(who) {
                                                            meets.pregame.members[who]=true
                                                            })
                                                    }
                                            break
                                    case '<':
                                            if($('.window')[0].scrollHeight-$('.window').scrollTop()===$('.window').innerHeight()) {
                                                    setTimeout(function() {
                                                            $('.window').scrollTop($('.window')[0].scrollHeight)
                                                            })
                                                    }
                                            setTimeout(function() {
                                                    $('.msg:last').html($('.msg:last').html()
                                                            .replace(/(https?\:\/\/([a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3})(\/\S*)?)/g,
                                                                    '<a href="$1" target="_blank">$2</a>')
                                                            )
                                                    })
                                            break
                                    case 'join':
                                            var     reason=blacklist[data.user.toLowerCase()]
                                            if(reason&&window.owner) {
                                                    log('{Banned/Kicked} '+data.user+(reason!='N/A'?' ('+reason+').':'.'))
                                                    engine.sendcmd('ban',{user:data.user})
                                                    }
                                            else {
                                                    if(meets.pregame.active) {
                                                            meets.pregame.members[data.user]=true
                                                            }
                                                    if(cmds.logging) {
                                                            log(data.user+' has joined.')
                                                            }
                                                    if(bdayb) {
                                                            birthday[name]=true
                                                            }
                                                    }
                                            break
                                    case 'leave':
                                            delete meets.pregame.members[data.user]
                                            if(cmds.logging) {
                                                    log(data.user+' has left.')
                                                    }
                                            break
                                    case 'kick':
                                    case 'kill':
                                            if(data.target) {
                                                    data.user=data.target
                                                    }
                                            for(var x in meets) {
                                                    delete meets[x].members[data.user]
                                                    delete meets[x].votes[data.user]
                                                    }
                                            break
                                    case 'round':
                                            for(var x in meets) {
                                                    meets[x].active=false
                                                    }
                                            break
                                    case 'meet':
                                            meets[data.meet]={
                                                    active:true,
                                                    votes:new Object(),
                                                    members:new Object(),
                                                    non_voting:new Object()
                                                    }
                                            data.members.forEach(function(who) {
                                                    meets[data.meet].members[who]=true
                                                    })
                                            if(data.non_voting) {
                                                    data.non_voting.forEach(function(who) {
                                                            meets[data.meet].non_voting[who]=true
                                                            })
                                                    }
                                            if(data.meet.match(/^(mafia|thief)$/)) {
                                                    Object.keys(meets.pregame.members).forEach(function(who) {
                                                            if(!data.choosedata[who]) {
                                                                    setTimeout(function() {
                                                                            log(who+' is your partner!')
                                                                            })
                                                                    }
                                                            })
                                                    }
                                            if(afk) {
                                                    var     target
                                                    if(afk===1) {
                                                            target=data.basket.length-1
                                                            }
                                                    else {
                                                            target=Math.random()*data.basket.length|0
                                                            }
                                                    engine.sendcmd('point',{
                                                            meet:data.meet,
                                                            target:data.basket[target]
                                                            })
                                                    }
                                            break
                                    case 'point':
                                            if(data.unpoint) {
                                                    delete meets[data.meet].votes[data.user]
                                                    }
                                            else if(meets[data.meet]) {
                                                    meets[data.meet].votes[data.user]=data.target
                                                    }
                                            break
                                    case 'start_input':
                                            if(autobomb) {
                                                    setTimeout(function() {
                                                            var     choose
                                                            if(autobomb!==true) {
                                                                    var     player=typeof autobomb==='string'?autobomb:autobomb[0]
                                                                    choose=$('#inputchoice_player_'+player+'_'+player)
                                                                    if(choose.length) {
                                                                            choose.click()
                                                                            return false
                                                                            }
                                                                    }
                                                            choose=$('#inputid_'+data.id+' .inputchoice')
                                                            choose[Math.random()*choose.length|0].click()
                                                            })
                                                    }
                                            break
                                    }
                            }
                    })
            }
     
    //Not letting those global variables go to waste
    setTimeout(function() {
            inject_script=document.createElement('script')
            inject_script.textContent=String(cmds)+'cmds()'
            document.body.appendChild(inject_script)
            })
