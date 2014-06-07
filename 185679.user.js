// ==UserScript==
// @name        jovi
// @namespace   http://zemlyaozer.com
// @include     http://ovipets.com/*
// @include     https://ovipets.com/*
// @version     1.12
// @grant       	GM_getValue
// @grant       	GM_setValue
// @grant       	GM_listValues
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==


function joviC() {
    function getQueryVariable(variable) {
        var query = window.location.toString().split('?')[1];
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return 0;
    }
    var ctab = 0;
    function getCurrentTab() {
        var panels = document.getElementsByClassName('ui-tabs-panel');
        var elem;
        console.log(panels);
        for (var p = 0; p < panels.length; p++) {
            if (panels[p].style.display != 'none') {
                elem = panels[p].childNodes[0].childNodes[0];
            }
        }
        //console.log('fail getting current tab');
        return elem;
    }
    var turnq = new Array;
    this.turn = function () { turn(); };
    function turn() {
        console.log('turning');
        var petc = document.getElementById('hatchery').getElementsByClassName('a');
        addturnq(petc);
        petc = document.getElementById('hatchery').getElementsByClassName('b');
        addturnq(petc);
        if (turnq.length > 0) {
            setTimeout(window.jovi.parseturnq, 1000);
        } else {
            setTimeout( function() { location.reload(); }, 50000);
        }
    }
    function addturnq(petc) {
        for (var p = 0; p < petc.length; p++) {
            var pright = petc[p].getElementsByClassName('right');
            var foundEgg = false;
            var turnpat = new RegExp('Turn');
            if (turnpat.test(petc[p].innerHTML)) {
                console.log('found egg');
                foundEgg = true;
            }
            if (!foundEgg)
                continue;
            var pets = petc[p].getElementsByClassName('pet');
            var petl = pets[0].parentNode;
            var petlA = petl.toString().split('&');
            for (var q = 0; q < petlA.length; q++) {
                if (petlA[q].match('pet')) {
                    var petA = petlA[q].split('=');
                }
            }
            turnq.push({ id: petA[1] });
        }
    }
    this.parseturnq = function () {
        parseturnq();
    };
    function parseturnq() {
        if (turnq.length > 0) {
            console.log('turning busy state start ' + isbusy);
            if (!isbusy)
                busy();
            var pet = turnq.pop();
            console.log('cmd=pet_turn_egg&PetID=' + pet.id);
            if (!testing) {
                $.post('/cmd.php',{cmd: "pet_turn_egg",PetID: pet.id});
            }
            else "testing mode";
            setTimeout(window.jovi.parseturnq, 1000);
        } else {
            console.log('turning busy state stop ' + isbusy);
            if (isbusy)
                busy();
            if (alwaysturn) {
                console.log('alwaysturn');
            }  
            location.reload();
        }
    }
    // Always turn
    var alwaysturn = false;
    this.alwaysturnset = function() {
        alwaysturnset();
    };
    function alwaysturnset() {
        console.log('alwaysturnset: ');
        if (!alwaysturn)
            console.log("enable %s",GM_setValue('alwaysturn', true));
        else
            console.log("disable %s",GM_setValue('alwaysturn', false));
        turn();
    }
    function alwaysturninit() {
        console.log('alwaysturninit');
        alwaysturn = GM_getValue('alwaysturn',false);
        console.log('alwaysturn value '+alwaysturn);
        var awaysturnchecked = alwaysturn ? 'checked' : '';
        var tabsright = document.getElementsByClassName('tabs right')[0];
        tabsright.insertAdjacentHTML('beforeend', '<li id="jovitab"><span id="jovitabsp" class="search" title="Turn Eggs\nClick to turn eggs on this page.\nPage will refresh when done.\n\nDoes not hatch egss,\nso if there are still egg showing the turn symbol\nit likely means they need to be hatched."><a id="jovitaba" style="background-repeat: no-repeat;background-position: center;background-image:url(data:image/gif;base64,' + eggturnimage + ');"><span style="display: none;">Jovi</span></a></span></li>');
        var jt = document.getElementById('jovitab');
        jt.onclick=function() { window.jovi.turn(); };
        var maincontent = document.getElementById('main_content');
        maincontent.insertAdjacentHTML('afterbegin','<div id="jovialwaysturn"><input type="checkbox" title="Always Turn\n Continuously turns eggs every 5 minutes." style="float:right;" ' + awaysturnchecked + ' ></div>');
        var at = document.getElementById('jovialwaysturn');
        at.onclick=function() { window.jovi.alwaysturnset(); };
        at.style.position = "absolute";
        at.style.right = "3px";
        at.style.top = "3px";
        at.onmouseover = '';
        if(alwaysturn) setTimeout(turn, 1000);
    }
    
    // Feed 
    var feedq = new Array;
    this.feed = function () {
        feed();
    };
    function feed() {
        console.log('feeding');
        var tab = getCurrentTab();
        var petc = tab.getElementsByClassName('a');
        //console.log(petc);
        addfeedq(petc);
        petc = tab.getElementsByClassName('b');
        addfeedq(petc);
        //console.log(petc);
        if (feedq.length > 0) {
            console.log('feedq length ' + feedq.length);
            setTimeout(window.jovi.parsefeedq, 1000);
        }
    }
    function addfeedq(petc) {
        for (var p = 0; p < petc.length; p++) {
            var pets = petc[p].getElementsByClassName('pet');
            var petl = pets[1];
            var petlA = petl.toString().split('&');
            for (var q = 0; q < petlA.length; q++) {
                if (petlA[q].match('pet')) {
                    var petA = petlA[q].split('=');
                }
            }
            feedq.push({
                id: petA[1],
                name: pets[1].title
            });
        }
    }
    this.parsefeedq = function () {
        parsefeedq();
    };
    function parsefeedq() {
        if (feedq.length > 0) {
            if (!isbusy)
                busy();
            console.log('parsing feedq length ' + feedq);
            var pet = feedq.pop();
            console.log('feeding ' + pet.id);
            console.log('cmd=pet_feed&PetID=' + pet.id);
            if (!testing)
                $.post('/cmd.php', {
                    cmd: 'pet_feed',
                    PetID: pet.id
                });
            setTimeout(window.jovi.parsefeedq, 1000);
        } else {
            if (isbusy)
                busy();
        }
    }
    var isbusy = false;
    this.busy = function () {
        busy();
    };
    function busy() {
        console.log('busy state: ' + isbusy);
        if (!isbusy) {
            document.getElementById('jovitaba').style.backgroundImage = 'url(data:image/gif;base64,' + ajaxloader + ')';
            isbusy = true;
        } else {
            var revertImage;
            if (sub == 'overview')
                revertImage = feedimage;
            else if (sub == 'hatchery')
                revertImage = eggturnimage;
            document.getElementById('jovitaba').style.backgroundImage = 'url(data:image/gif;base64,' + revertImage + ')';
            isbusy = false;
        }
    }
    this.checkstarving = function () { checkstarving(); };
    function checkstarving() {
        this.starvetabidx = typeof this.starvetabidx != 'undefined'?this.starvetabidx:0;
        var tabs = document.getElementsByClassName('ui-tabs-anchor');
        if(this.starvetabidx < tabs.length) {
            var tab = tabs.item(this.starvetabidx);
            tab.click();
            this.starvetabidx++;
            setTimeout(checkstarving,1000);
        } else {
            tabs.item(0).click();
            setTimeout(checkstarvingp2,1000);
        }
    }
    function checkstarvingp2() {
        console.log('checkstarvingp2');
        var alerts = document.getElementsByClassName('alert');
        this.starvetabidx = 0;
       // if(alerts.length > 0) {
            // get pet class
           // for(p=0;p<alerts.length;p++) {
            //    var pet = alerts[p].getElementsByClassName('pet');
                
           // }
         //   alert("There are "+alerts.length+" pets starving.");

        //}
        var starvebtn = document.getElementById('jovistarvebtn');
        var pets = document.getElementsByClassName('pet');
        starvebtn.setAttribute('title','Starving pets '+alerts.length+' of '+pets.length);
    }
    function stravingbtn() {
        // Add a button to check for starving pets
	// http://cdn.ovipets.com/famfamfam/exclamation.png 
	var content = document.getElementById('main_content');
        // insert at the top of content
        content.insertAdjacentHTML('afterbegin','<img id="jovistarvebtn" title="Starving Pet Patrol\nCheck for starving pets on all tabs\nWhen complete it will stop changing tabs\nMouseover this again for information" src="//cdn.ovipets.com/famfamfam/exclamation.png" title="Check Starving" >');
        var starvebtn = document.getElementById('jovistarvebtn');
        starvebtn.style.position = "absolute";
        starvebtn.style.right = "3px";
        starvebtn.style.top = "3px";
        starvebtn.onmouseover = '';
     
        starvebtn.onclick = function(e){ window.jovi.checkstarving(); };
    }
    function getfriends() {
        console.log('checking friends');
        var fs = document.getElementsByClassName('friends');
        console.log(fs);
    }
    var sub = '';
    this.subsw = function () { subsw(); };
    function subsw() {
        switch (getQueryVariable('sub')) {
        case 'overview':
            //if (getQueryVariable('usr') != 0)
              //  break;
            sub = 'overview';
            stravingbtn();
            var tabsright = document.getElementsByClassName('tabs right')[0];
            tabsright.insertAdjacentHTML('beforeend', '<li id="jovitab" title="Feed Time!\nClick to feed all pets on the current tab."><span id="jovitabsp" class="search"><a id="jovitaba"  style="background-repeat: no-repeat;background-position: center;background-image:url(data:image/gif;base64,' + feedimage + ');"><span style="display: none;">Jovi</span></a></span></li>');
            var jt = document.getElementById('jovitab');
            jt.onclick=function() { window.jovi.feed(); };
            break;
        case 'hatchery':
            sub = 'hatchery';
            if (showhatchery) {
                tabsright = document.getElementsByClassName('tabs right')[0];
                alwaysturninit();
            }
            break;
        case 'profile':
            sub = 'profile';
            var title = document.getElementById('profile').getElementsByClassName('ui-section-next')[0];
            title.insertAdjacentHTML('beforebegin', '<img title="Feed Pet\nOr first action from the left\nThis makes it quick to burn through a few pets and feed, don\'t move your mouse." onclick="getElementById(\'profile\').getElementsByClassName(\'ui-button\')[0].click();" style="cursor: pointer;float: right;"  src="//cdn.ovipets.com/famfamfam/cake.png" />');
            break;
        default:
            null;
            break;
        }
    }
    function init() {
        console.log('init oppw');
        switch (getQueryVariable('src')) {
        case 'pets':
            subsw();
            break;
        default:
          null;
          break;
        }
        //setTimeout('jovi.loop',1000);
    }
    this.init = function () {
        init();
    };
    var testing = false;
    var showhatchery = true;
    var feedimage = 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAyCAIAAACh0Q7HAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QwIBS0KpAQRpQAAEDNJREFUWMO1WGmUVcW13lV15nvu1Pf2PNN0S9NMAZmbiIgKiEicXyR5Tk+NJjFGXnSZZTAxz+QlmmierqVonIiIKDKJiKICMiqtLQ00DXTT83yHvsMZ61S9HyQIiclL3tJvnX9n1/lq7/r2qb034pzDVwHHSntEJaLg2qZPlACTQ5/uLtC1xmOnZl+8EGNRIh5BCIh82h7DVwRJ8TPGsGv7uAHInje1dsLk+o2v/alx93ZkphBGDhfPsAIA+qo8zhpZl4Ffkwhmd121+IZbbiIEbd/6zujKCq4EL//OHaqmMY8LBJ22F74qj32abFMwKBip9OTpMwcGhy0O9fMXxfq6qaQ5tikTECQFAH3FHp8N2zL3bVl7ZO/73Wm6+IZbi2W7N00nzV2siXCGGMPXAFES2nsGc8dM+dXK1aMnTK+YsbC7p9czUwBnOcm/Nrz4zDNNjZ93D6UfeeBe105bDuXMPfP2ayE2PZ7Kmswy3njhSeaahz58m3vGiEVdys7Y/MtnbJpUkARMgAMgGEJMBEfAgJiIHaQwQBrngB2XCVmH6WZ/07Hm5mzbt8fc3lNqFGYFpEn//1DbDrVsx7LNpMUNztOcxxl3sx53TU7jBs96nNoOdSnzsvEdu17gnG9e/2aGZbhrsb/gXxaXw7kkEsypQB3unvBS7Yo9HHTdjIZTgkghoHoa8kAUCAIGok/sVrb8pEJ3E0YfTjH7zHf+5TzGwBhwIpLeoWS8rQcco7OtIdZ3hA72Xfb9XwZq5wAAchxgKhaJbdIhsaQcdxx/fWXz67fcuppToCIQjs7N44yXkV3ZVUQrNqgHwgIhjuNIkoTxF4Hp8iBq259ueGV49/21E+uQe5zHaa5eYEvDP1udnF47tto/cKzyW4vuXi4dkXFd3tsPLb7aPPxYS8c104o/7EIzZv9GvnzUWHP6OcSGY2kIuSJwkxFZJhh7ngcAhJAzNinmqsh4eMmYB39e3/HylmHXFKJ17+5uqZZpZEykXPU+05ZO8VZvOrC09pbCne9+dGugv4PAiT67hls55fZvPvjmzy/94MVNyjmhliRl3/rXDb+UEyiYNG2a4ziiKDLGzraRXYFJ/glBX6wvNkzy/EX6WxuOLJ5T1i9buI/C8sT8QM8rL8+uCP66aEerVPFSOvvDEtPf0CXuHDtlVMeeuy88+eEBqPnZJ+eISwDYunHjzAljw4HwwOCQJEmu62KEzrbh7lDKTYrxjmNdTfniMMsmiSLEPfoNz8n50eZRRSOqpJS7w9NXtxySv9P+3pNOl9UVdebV9t9638Zlz2XWHFAue2FwWf25qh6w7O/95N9/+dAjDPjRhj0AIAg4kc7ybCbJYMQ1MwCSDoNvHZp194Rgm8+wC22rR8mTZQG3tSUjNbPQ0Q0DUsQ+r7zAMv2X33tn/iefaUs5JeUFU5tfuaHVdC+9Y0VBbk7CP+Ec4nzJCo29uPfg5oqqUXPnznt11YsYCyFd7RV9ITYShIwS66Usb82qK4Z2tPsCepeS4I5ciQOqUtjhqkPHDyz71o15WavC7G3a82Qg8XlTV4GsN9US85ntfTuPNSotR8ePG9P8eaNM/up2YrEeN5La8eLHzf1zl15XWla2acObC+Zf5AZylKHjKa064kNPfe/Gu+7oalp5PCWly6N5OC3+cffRK368uCa3b9323Npxt+1O9i65wL/97VdzUrwe20dTR4qETH/9lomLLlz7u+dvvHXhhzv3nz9/0TnEpmNjJ4uV0LfPL3xq34Az3EmA+XU1o+dHnRHkC/7PlaOvm6p/evzziuLZWfqxpwSPHI7PuflbUTdtB4tDzqEByOXDUtOhU8XnXbn3/dcs6NNTVR3up//24E4b8ekzL3j8oXumz7tsfP18RD3GPYeIyKQeEXhnU0fpuMJP3zvwybrfLv315ihO7//44Ny5c5noHvnTOrH9Ye5mTE9yPaoJ+qo9vY89twKMk0+sWbXg6h37925bOr7Tp+uYWBgjoA4A8kiGkPN4uvH+x3evbpiiKX2q5T39zLMYIwZIYK6kCWr7G8+89sR9HuWz5szrHEiKqS7KYPKc+QfWbh+BwPrnb4myfiaoWiZdaGbCWraqqCCefGPnngsuvHhN1nQK8iYy0i1kTG6mmJFmjs0cyzKoBd0pLu5rohE/ifd2XLzwsrpJkzBCnsM4Z5Ta1q6nf/y9H/2QcosK3g8efnrt048ihJKJpD6RR8Fc8PvP3+xSOuNsEOndQtHru1JXXfPNta8EI+PGbtn13uSZF4yfOXXzzixERKAcsdMP+IRS2t3v49nVj10xZ2zHc0/+/heP/rc/LGLwOAfMsNF6vKFqlKSPm++XcCpjB8adb8S69u0/kB5oLwrP2bt3v8YOeTvdvs0yMUqbUN/yx5fll0dySnxJo2fqmIv2rVsLoZHv3rXnRM82oiiIU4Qw4sSIt6OwT4CaEObXXhJdcOklVEBZI4FNilXJcGgg27U9zaMCALOVYEDzELvn8Zde/6/vR/MqFH/O+hceKn1uOa6HWU5gW0PDvHTgvYOHU+n9JflKedmMmddcuT85mNjRvu793x/v+zl4mawUcTmMuH1KfljyIoPGUX10JI4WYT1fcT2fVogdhByX6iqM9Bxw05gAYFGxEIs6YLLQzT99eKR92werVtaau4+pNZUySNycfDxwsNEpPZl+e0t4xgwxd/j6NXcuvqKcsmnVcybeIXqH3mjQkAQu7RNJNJYY8jInVe5/6g+nrlj2AMYiwphSKhAiYC4AwEiiQ2AZAEAMUY9l6SmkV8269DtXTqp7auO7rzaXFQSlfExHREupqbzKK3zkhS3X3GdsfDmkZd1LFqg9O//40TP3LI74fRdedcm3X1p/S37VpOCITgJEHVQXSmNm3vjbas82kSgTQjzPQ9SlDgKVko1PTQseOViy4kRFIMcM+VRPAmZueuz2oYatcV4294l3nJvy9o1SrR3SA6ncFcKpR0L1HyVO2HdOrStttFssoqD2TCRfT767Nngy5+idc8KbGuGuTXEOhmgLrm36dNXymCIqp+8eTIgL4NjY8TOihvzd760bllNSQnIyfbveeZM2vuYnXn1NWvhVUeibgfG4eModoTYUvk2o2gDNFbKveuWRfSucY1ZJ28QJowv19zuhOp0YMHICyeT1L7XKdMQHmihJvkAQsKSICgBIkoQQwoyBiIksSoNZGB0s6zrwWAEpB/2IjOXY6mXVdZNBtaKhmCAX28OCmWnTjcJXs58ci/VPi6uHrIwZKBiVCk/bKo6/PtX5y1j5hswClLu00tpVvCwaDhPKKcC519tfKhnGMTAKABk7iMf7IsHhvVvfS2fyn10+N18CQtzEoMOtlCAQWVbHjCreurvl2jW3l+aUH9Mi+TrqHGzSq/WWVE9rpDVPs+uEyJauthjGF/3nc9hjrqgT+PIqFnsMOHUAIL+wKlw+odrLb9723eOb37iysKuv4PyhnoZFM+oymQhTkCFm4iPipdVCQe5w93fD/lg/cUO5WlFLSyf31KhY4GV9e6r0yJiqrDJb4pJs9QwRAbFzG4gzxLIgWiQUzyaL6q8dTLTRsrwqgXfv/XGLF+o7cnDG/OskKU4HPApKkeLPV2Or9w1F9NlTbyhAtxVjyzMxmlAkRyRYzw3Mup0U6c52VS25LUDAlor8iTjg4Jl+6WwgSlMe1jGAgNCz91940/zMype7L68VrVgyrpQ0D2Z6E8a4POJq/uFYfPJ1fxh96bLEmstKCuVsRHvxd7uWvFMwTGxRSYSgcEDtqzGKVhQee/KjpGVZf1Ul/hUERGTEPAELVjpbWHtFMtKSF+33UmlHzzUHOqbl6tyXVQrytNJo3nkXvbBtG23vD1XEUXis3kPvvGf++rde1yI1M3o9M4/VOoFV6MDkunEAIMsyY4xSijH+Unrkcu6YlghMkLQY73p60bJr5+zp6clXgyMhPRhPmVIoV4v3j/rBHdZQc8hfBm7/YCePikbWj0Vu7u7Jm/zD3e+ExQqmpNp6vQeK2j47dudGTgA8z0MIAcCXEmPCuaYqoqohxKNCaVXB4fhwoKwcKcTnWFjDsm4ZtLRQ6ekICjnmUC+YWm6eiHIifpLDQqNmjEfNqQJdStS0lWYfyFb1C5XlOvGAM44xRgj9vWjjM+0T47yztQVwRhLxSDaJEPY8SkQhazklFcUudREGWVY4UOAYGOPgpQxPt8juKSeX9FZsvz5TGQjEI3FrGCj5Uj39DfGf61bgdspQFUcmQcpcDBghxDlHCHKK8pmAKXWxKJ69OMJd3m+NXzFrEz1+1U8v8E6M+LMZ21cn/FOtECB0en+Ih+RcxkFgUdXn5wgTjFxKdc0HIkEycVwHsIA4RggBcAQkq/UgOTrfJkX3zjr07FPUn6cLWvK6m+Gf6HwxozEboRT1CMYb1v1iUVld3H9SSeRgKwaBXL8mxjIZS2DMJdzFWWvE8JKmixBXXCsmtImZbKvJSXEVKdDtXhZsNJ28d9edjjNCCKG/G3FsixHBSQVEGwCPtDd0xOIqQUgmohYyRmJeJhaUwGpuVGQkibIP6cgOukbCgUw8rcjVk2K2ZJxodfbu2t4Y9Lqc6VGhO9nxz3SdgkpNkNSEySUV1KEmJ1JOvKTFuWs6kqpjijJEfmt1pjv5yoyLxwa0VDkpyhLDck06YiU37XAC/q0nMnFfYGG9WpJNJFPJ/LKLPQb4/xKXwGxKBTXeutfc+otgMCgHI1b2pE0ZIVQgYrioeOM7J2puXnn/tf/R3tYycPjw9tYdlpMT0aPvb3p0XCn3seziKWHNM071iaKs4Kp5+dFphNkgiP9Y2ahroKf1ieu13o+C46agkc40uIypmqiIfQk+Wn/+tfRNqw6dV10KGDj3PM4F3DVkVsqkL4CLVt+dO1FPcaw5YjAgJtOmvnJDz9U/e8ItrV5QvzBuJPyShyFCBEQpFQSBMXYmrdFzP5hSDw0dxXPyhj/iuNS2B0URhYI5HZ4mdbezJW/W1n8jEixB6M9KdSArcR/CCYCcJ66um1cjOTRus5Qn+VXqRmWeMYywJO+1WOmSlypmLA6zQRACkiSfltsX4qo0Bz5JV4Y6TgzbZYZpSUQK6oGBpDcxx+hspedNn0HlMDrr52OBgmzPpOLRD96vG9MNwlGkeBIO5CJTAJpCakaPnkK5EqEdD16eqwLjGGN8euByjqp38YIJ6qkY5yXSQJ+FADMBk+7u5B8axsxenQpp8UJAAF+s8YMFgpAR/C/ed0OhHRVHFMw1y8tygWu6Do4XtFN1tOWzY5HRU4MfZ9wTTccTiWQ8Hj9d450zvW1paW47+JZnJbDhIVkDLecbcxcVlFQBcP43dYttAVcchQsP3r64PL61ujIUkaSI7k9YwwwhWVIJ0QRX2vhhi1O75N4n16/84/M9nR2yLC9fvlwQhC/O2M5yELnHuShh2+UCczEW07aTo8tfPm4yHJtYwHW/wqwM3v/B5uSpvacObR8+3O4yLIUi+ZWjSTRaMvb8S6673SNirLfPdcyccDgQCJw9S/lfYv9R+o9/ARMAAAAASUVORK5CYII=';
    var eggturnimage = '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';
    var ajaxloader = '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';
}

window.jovi = new joviC;
window.onhashchange = function () {
    setTimeout(jovi.subsw, 1000);
};


