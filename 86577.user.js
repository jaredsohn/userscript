// ==UserScript==
// @name           Amazon.com -> Tracktor.com
// @namespace      lecapitan
// @description    Add's links to Amazon.com products for viewing price history on TheTracktor.com
// @include        http://*.amazon.*
// ==/UserScript==

unsafeWindow.ATObject = 
{
    FloatingDiv: undefined,
    CloseDiv: undefined,
    IFrame: undefined,
    TitleElement: function()
        {
            return document.getElementById('btAsinTitle');
        },

    GetProductNumber: function()
        {
            var matches = location.href.match(/^.*amazon\.[^\/]*\/.*\/(B[^\/]{9})\/?.*$/);
            return matches[1];
        },
        
    LoadiFrame: function()
        {
            this.FloatingDiv = document.createElement('div');
            this.FloatingDiv.style['position'] = 'absolute';
            this.FloatingDiv.style['left'] = '100px';
            this.FloatingDiv.style['top'] = '100px';
            this.FloatingDiv.style['width'] = (this.WindowWidth() - 200) + 'px';
            this.FloatingDiv.style['height'] = (this.WindowHeight() - 200) + 'px';
            this.FloatingDiv.style['backgroundColor'] = 'white';
            this.FloatingDiv.style['zIndex'] = '998';
            
            this.IFrame = document.createElement('IFRAME');
            this.IFrame.id = 'tracktorInfo';
            this.IFrame.src = 'http://thetracktor.com/detail/' + this.GetProductNumber() + '/';
            this.IFrame.width = (this.WindowWidth() - 200);
            this.IFrame.height = (this.WindowHeight() - 200);
            
            this.CloseDiv = document.createElement('div');
            this.CloseDiv.style['position'] = 'absolute';
            this.CloseDiv.style['right'] = '24px';
            this.CloseDiv.style['top'] = '0px';
            this.CloseDiv.style['backgroundColor'] = 'white';
            this.CloseDiv.style['border'] = '1px solid #000000';
            this.CloseDiv.style['padding'] = '3px';
            this.CloseDiv.style['fontFamily'] = 'Verdana';
            this.CloseDiv.style['fontSize'] = '10px';
            this.CloseDiv.style['zIndex'] = '999';
            this.CloseDiv.style['cursor'] = 'pointer';
            this.CloseDiv.innerHTML = "Close";
            this.CloseDiv.setAttribute("onclick", "window.ATObject.CloseiFrame()");
            
            this.FloatingDiv.appendChild(this.IFrame);
            this.FloatingDiv.appendChild(this.CloseDiv);
            document.body.appendChild(this.FloatingDiv);
        },
        
    CloseiFrame: function()
        {
            document.body.removeChild(this.FloatingDiv);
            this.FloatingDiv = undefined;
            this.IFrame = undefined;
            this.CloseDiv = undefined;
        },
        
    Insert: function()
        {
            var productNumber = this.GetProductNumber();
            if (productNumber)
            {
                var link = document.getElementById('ATLINK');
                if (!link)
                {
                    console.log('inserting');
                    link = '<br /><a href="#" id="ATLINK" onclick="window.ATObject.LoadiFrame()" style="cursor: pointer; margin: 2px; font-family: Verdana; font-size: 12px; color: #CC6600; text-decoration: none;"><b>--&gt; View price history on TheTracktor.com</b></a>';
                    this.TitleElement().innerHTML += link;
                }
                else
                {
                    console.log('already there');
                }
            }
            //setTimeout('window.ATObject.Insert()', 500);
        },
        
    WindowWidth: function()
        {
            if (document.width)
            {
                return document.width;
            }
            else if (window.innerWidth)
            {
                return window.innerWidth;
            }
            else if (document.documentElement && document.documentElement.clientWidth)
            {
                return document.documentElement.clientWidth;
            }
        },

    WindowHeight: function()
        {
            if (window.innerHeight)
            {
                return window.innerHeight;
            }
            else if (document.height)
            {
                return document.height;
            }
            else if (document.documentElement && document.documentElement.clientHeight)
            {
                return document.documentElement.clientHeight;
            }
        }
};

unsafeWindow.ATObject.Insert();