// ==UserScript==
// @name           Arimaa Gameroom Login
// @namespace      Arimaa
// @description    Automatically login to the Arimaa gameroom if the username and password are already filled in.
// @include        http://arimaa.com/arimaa/gameroom/
// ==/UserScript==

function framehandler()
{
    form_els = login_frame.contentDocument.getElementsByTagName("form");
    loginform = null;
    for (i=0; i < form_els.length; i++)
    {
        if (form_els[i].name == 'a')
        {
            loginform = form_els[i];
        }
    }
    if (loginform)
    {
        have_email = have_password = false;
        input_els = loginform.getElementsByTagName("input");
        for (i=0; i < input_els.length; i++)
        {
            if (input_els[i].name == "email"
                    && input_els[i].value != '')
            {
                have_email = true;
            }
            else if (input_els[i].name == "password"
                    && input_els[i].value != '')
            {
                have_password = true;
            }
        }
        if (have_email && have_password)
        {
            loginform.submit()
        }
    }
}

frame_els = document.getElementsByTagName("frame");
for (i=0; i < frame_els.length; i++)
{
    frame = frame_els[i];
    if (frame.src == "http://arimaa.com/arimaa/gameroom/main.html")
    {
        login_frame = frame;
        frame.addEventListener("load", framehandler, false);
    }
}
