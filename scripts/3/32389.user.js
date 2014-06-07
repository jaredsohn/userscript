// ==UserScript==
// @name           Gunmetal Ikariam (Carmine)
// @namespace      Ikariam
// @description    A complete visual redesign - 0.8.6 (last updated October 15th 2008)
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==
   
   var URL= "http://www.ikariamods.com/gunmetal/carmine/";
   
/* IKARIAM BORDER
   border outside game window; advisors, info pane, resources etc. */
GM_addStyle("#header                                                           {background:url("+URL+"bg/header.png) no-repeat; position: relative; left: 128px}");
GM_addStyle("body                                                              {background:url("+URL+"hardcode/invisible.png); color: #c3c3c3; background-color: #d2d2d2}");
GM_addStyle("#footer                                                           {background-image:url("+URL+"bg/footer.png); position: relative; left: -5px; color: #f0f0f0; text-align: right; padding: 33px 8px 0px 34px; height: 15px; width: 962px; bottom: -18px}");
GM_addStyle("#footer a                                                         {color: #f0f0f0}");
GM_addStyle("#footer a:hover                                                   {color: #ffff00}");
GM_addStyle("#container2                                                       {background-image:url("+URL+"bg/content.png); position: relative}");
GM_addStyle("#extraDiv1                                                        {background:url("+URL+"bg/sky.png) repeat top center; position: absolute}");
GM_addStyle("#extraDiv2                                                        {background:url("+URL+"bg/ocean.png) repeat top center; position: absolute}");
/* corners of the inner game window */
GM_addStyle("#conExtraDiv1                                                     {background-image:url("+URL+"bg/footer_bottom.png); position: absolute; width: 1020px; height: 16px; left: -15px; bottom: -14px}");
GM_addStyle("#conExtraDiv2                                                     {background-image:url("+URL+"bg/corner.png); position: relative; width: 154px; height: 20px; left: 819px; bottom: 48px}");
GM_addStyle("#conExtraDiv3                                                     {background-image:url("+URL+"bg/design.png); position: absolute; width: 143px; height: 74px; left: -85px; top: -1px}");
GM_addStyle("#conExtraDiv4                                                     {background-image:url("+URL+"bg/design_bg.png); position: absolute; width: 225px; height: 341px; left: -194px; top: 33px}");
/* colored banner at the top of the page */
GM_addStyle("#GF_toolbar *                                                     {color: #f0f0f0; top: 1px; left: -73px; text-decoration: none}");
GM_addStyle("#GF_toolbar *:hover, #GF_toolbar .premium a .textLabel            {color: #ffff00}");
GM_addStyle("#GF_toolbar .premium a .textLabel:hover                           {color: #ff0000}");
/* banner inside the game window */
GM_addStyle("#breadcrumbs                                                      {background:url("+URL+"mainview/breadcrumbs.png) no-repeat; position: absolute; left: 251px; width: 720px; height: 23px; padding: 0 0 0 2px; color: #c3c3c3; font-weight: bold; font-size: 11px}");
GM_addStyle("#breadcrumbs a                                                    {color: #f0f0f0}");
GM_addStyle("#breadcrumbs a:hover                                              {color: #ffff00}");
GM_addStyle("#breadcrumbs a.world                                              {background:url("+URL+"hardcode/icon_world.png) no-repeat; padding-left: 23px}");
GM_addStyle("#breadcrumbs a.island                                             {background:url("+URL+"hardcode/icon_island.png) no-repeat; padding-left: 23px}");
GM_addStyle("#breadcrumbs a.city                                               {background:url("+URL+"hardcode/icon_city.png) no-repeat; padding-left: 23px}");
/* ADVISORS
   a single image is repositioned based on advisor state */
GM_addStyle("#advisors #advCities a.normal                                     {background-image:url("+URL+"mainview/adv_city.png); margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advCities a.normal:hover                               {background-image:url("+URL+"mainview/adv_city.png); background-position: 0px -108px; margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advCities a.normalactive                               {background-image:url("+URL+"mainview/adv_city.png); background-position: 0px -216px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advCities a.normalactive:hover                         {background-image:url("+URL+"mainview/adv_city.png); background-position: 0px -324px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advCities a.premium                                    {background-image:url("+URL+"mainview/adv_city.png); margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advCities a.premium:hover                              {background-image:url("+URL+"mainview/adv_city.png); background-position: 0px -108px; margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advCities a.premiumactive                              {background-image:url("+URL+"mainview/adv_city.png); background-position: 0px -216px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advCities a.premiumactive:hover                        {background-image:url("+URL+"mainview/adv_city.png); background-position: 0px -324px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.normal                                   {background-image:url("+URL+"mainview/adv_military.png); margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advMilitary a.normal:hover                             {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -108px; margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advMilitary a.normalactive                             {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -216px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.normalactive:hover                       {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -324px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.normalalert                              {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -432px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.normalalert:hover                        {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -540px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.premium                                  {background-image:url("+URL+"mainview/adv_military.png); margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advMilitary a.premium:hover                            {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -108px; margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advMilitary a.premiumactive                            {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -216px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.premiumactive:hover                      {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -324px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.premiumalert                             {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -432px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advMilitary a.premiumalert:hover                       {background-image:url("+URL+"mainview/adv_military.png); background-position: 0px -540px; margin: -2px 0px 0px  0px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advResearch a.normal                                   {background-image:url("+URL+"mainview/adv_research.png); margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advResearch a.normal:hover                             {background-image:url("+URL+"mainview/adv_research.png); background-position: 0px -108px; margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advResearch a.normalactive                             {background-image:url("+URL+"mainview/adv_research.png); background-position: 0px -216px; margin: -2px 0px 0px  0px; padding: 0 0 0 1px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advResearch a.normalactive:hover                       {background-image:url("+URL+"mainview/adv_research.png); background-position: 0px -324px; margin: -2px 0px 0px  0px; padding: 0 0 0 1px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advResearch a.premium                                  {background-image:url("+URL+"mainview/adv_research.png); margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advResearch a.premium:hover                            {background-image:url("+URL+"mainview/adv_research.png); background-position: 0px -108px; margin: -2px 0px 0px  0px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advResearch a.premiumactive                            {background-image:url("+URL+"mainview/adv_research.png); background-position: 0px -216px; margin: -2px 0px 0px  0px; padding: 0 0 0 1px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advResearch a.premiumactive:hover                      {background-image:url("+URL+"mainview/adv_research.png); background-position: 0px -324px; margin: -2px 0px 0px  0px; padding: 0 0 0 1px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advDiplomacy a.normal                                  {background-image:url("+URL+"mainview/adv_diplomacy.png); margin: -2px 0px 0px -1px; padding: 0 0 0 1px; width: 88px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advDiplomacy a.normal:hover                            {background-image:url("+URL+"mainview/adv_diplomacy.png); background-position: 0px -108px; margin: -2px 0px 0px -1px; padding: 0 0 0 1px; width: 88px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advDiplomacy a.normalactive                            {background-image:url("+URL+"mainview/adv_diplomacy.png); background-position: 0px -216px; margin: -2px 0px 0px -1px; padding: 0 0 0 3px; width: 88px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advDiplomacy a.normalactive:hover                      {background-image:url("+URL+"mainview/adv_diplomacy.png); background-position: 0px -324px; margin: -2px 0px 0px -1px; padding: 0 0 0 3px; width: 88px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advDiplomacy a.premium                                 {background-image:url("+URL+"mainview/adv_diplomacy.png); margin: -2px 0px 0px -1px; padding: 0 0 0 1px; width: 88px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advDiplomacy a.premium:hover                           {background-image:url("+URL+"mainview/adv_diplomacy.png); background-position: 0px -108px; margin: -2px 0px 0px -1px; padding: 0 0 0 1px; width: 88px; font-weight: bold; color: #000000}");
GM_addStyle("#advisors #advDiplomacy a.premiumactive                           {background-image:url("+URL+"mainview/adv_diplomacy.png); background-position: 0px -216px; margin: -2px 0px 0px -1px; padding: 0 0 0 3px; width: 88px; font-weight: bold; color: #f0f0f0}");
GM_addStyle("#advisors #advDiplomacy a.premiumactive:hover                     {background-image:url("+URL+"mainview/adv_diplomacy.png); background-position: 0px -324px; margin: -2px 0px 0px -1px; padding: 0 0 0 3px; width: 88px; font-weight: bold; color: #f0f0f0}");
/* premium buttons adjacent to advisors */
GM_addStyle("#advisors a.plusteaser                                            {background-image:url("+URL+"mainview/premium.png); top: 81px; left: 70px; width: 20px; height: 20px}");
GM_addStyle("#advisors a.plusteaser:hover                                      {background-image:url("+URL+"mainview/premium.png); background-position: 0px -20px; top: 81px; left: 70px; width: 20px; height: 20px}");
GM_addStyle("#advisors a.pluslink                                              {background-image:url("+URL+"mainview/premium.png); top: 81px; left: 70px; width: 20px; height: 20px}");
GM_addStyle("#advisors a.pluslink:hover                                        {background-image:url("+URL+"mainview/premium.png); background-position: 0px -20px; top: 81px; left: 70px; width: 20px; height: 20px}");
/* RESOURCES
   resource text information */
GM_addStyle("#container #cityResources                                         {font-size: 11px; color: #c3c3c3}");
GM_addStyle("#container #cityResources .resources .disabled a                  {opacity: 0.5}");
GM_addStyle("#container #cityResources .resources .storage_danger              {font-weight: bold; color: #f0f0f0}");
GM_addStyle("#container #cityResources .resources .storage_full                {font-weight: bold; color: #ff0000}");
/* resource images in top border, some extends to inner game window */
GM_addStyle("#container ul.resources .wood                                     {background-image:url("+URL+"hardcode/wood.png); background-position: 4px 2px}");
GM_addStyle("#container ul.resources .marble                                   {background-image:url("+URL+"hardcode/marble.png); background-position: 2px 2px}");
GM_addStyle("#container ul.resources .wine                                     {background-image:url("+URL+"hardcode/wine.png); background-position: 4px 2px}");
GM_addStyle("#container ul.resources .glass                                    {background-image:url("+URL+"hardcode/glass.png); background-position: 4px 2px}");
GM_addStyle("#container ul.resources .sulfur                                   {background-image:url("+URL+"hardcode/sulfur.png); background-position: 2px 2px}");
GM_addStyle("#container ul.resources .population                               {background-image:url("+URL+"misc/population.png)}");
GM_addStyle("#container ul.resources .actions                                  {background-image:url("+URL+"hardcode/actions.png); background-position: 0px 3px; margin: 1px 0 0 0; padding: 0 0 0 27px; font-weight: bold}");
/* resource images in dropdown box */
GM_addStyle("#cityNav .citySelect .tradegood1 span.cityresource                {background-image:url("+URL+"hardcode/wine.png);background-position: 0px 1px; height: 21px}");
GM_addStyle("#cityNav .citySelect .tradegood2 span.cityresource                {background-image:url("+URL+"hardcode/marble.png);background-position: 0px 1px; height: 21px}");
GM_addStyle("#cityNav .citySelect .tradegood3 span.cityresource                {background-image:url("+URL+"hardcode/glass.png);background-position: 0px 1px; height: 21px}");
GM_addStyle("#cityNav .citySelect .tradegood4 span.cityresource                {background-image:url("+URL+"hardcode/sulfur.png);background-position: 0px 1px; height: 21px}");
/* resource mouseover */
GM_addStyle("#container #cityResources li .tooltip                             {background-color: #14181b; border: 2px solid #000000; border-top-width: 2px; color: #c3c3c3; top: 25px; width: 140px}");
/* NAVIGATION
   buttons for city, island, gold, etc. */
GM_addStyle("#globalResources .transporters a                                  {background-image:url("+URL+"mainview/btn_transports.png); color: #f0f0f0; padding: 0 0 0 3px; text-align: left}");
GM_addStyle("#globalResources .transporters a.hover                            {background-image:url("+URL+"mainview/btn_transports.png)}");
GM_addStyle("#globalResources .transporters a.down                             {background-image:url("+URL+"mainview/btn_transports.png) background-position: 0px -53px}"); 
GM_addStyle("#globalResources .gold a                                          {background-image:url("+URL+"mainview/btn_treasure.png); color: #f0f0f0; padding: 0 0 0 2px}");
GM_addStyle("#globalResources .gold a.hover                                    {background-image:url("+URL+"mainview/btn_treasure.png)}");
GM_addStyle("#globalResources .gold a.down                                     {background-image:url("+URL+"mainview/btn_treasure.png) background-position: 0px -53px}"); 
GM_addStyle("#cityNav .viewWorldmap .textLabel                                 {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#cityNav .viewWorldmap a                                          {background-image:url("+URL+"mainview/btn_world.png)}");
GM_addStyle("#cityNav .viewWorldmap a.hover                                    {background-image:url("+URL+"mainview/btn_world.png)}");
GM_addStyle("#cityNav .viewWorldmap a.down                                     {background-image:url("+URL+"mainview/btn_world.png) background-position: 0px -56px}");
GM_addStyle("#cityNav .viewIsland .textLabel                                   {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#cityNav .viewIsland a                                            {background-image:url("+URL+"mainview/btn_island.png)}");
GM_addStyle("#cityNav .viewIsland a.hover                                      {background-image:url("+URL+"mainview/btn_island.png)}");
GM_addStyle("#cityNav .viewIsland a.down                                       {background-image:url("+URL+"mainview/btn_island.png) background-position: 0px -56px}");
GM_addStyle("#cityNav .viewCity .textLabel                                     {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#cityNav .viewCity a                                              {background-image:url("+URL+"mainview/btn_city.png)}");
GM_addStyle("#cityNav .viewCity a.hover                                        {background-image:url("+URL+"mainview/btn_city.png)}");
GM_addStyle("#cityNav .viewCity a.down                                         {background-image:url("+URL+"mainview/btn_city.png) background-position: 0px -56px}");
/* dropdown box for selecting different cities */
GM_addStyle("#cityNav .citySelect *                                            {background-image:url("+URL+"mainview/citynav.png); font-weight: bold}");
GM_addStyle("#cityNav .citySelect .optionList li                               {background-image:url("+URL+"mainview/citynav.png); color: #000000}");
GM_addStyle("#cityNav .citySelect .dropbutton                                  {color: #f0f0f0}");
/* SIDEBOXES
   info pane borders on lefthand side of page */
GM_addStyle("#container .dynamic                                               {background-image:url("+URL+"bg/sidebox.png); margin: -2px 0 0 17px}");
GM_addStyle("#container .dynamic h3.header                                     {background-image:url("+URL+"bg/sidebox_header.png); height: 24px; color: #f0f0f0; padding: 0 0 0 0; line-height: 22px}");
GM_addStyle("#container .dynamic .content                                      {margin: 0 0 0 0; padding: 2px 0 2px 0; width: 100%; color: #c3c3c3}");
GM_addStyle("#container .dynamic .content a:link                               {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#container .dynamic .content a:hover                              {color: #ffff00; text-decoration: none}");
GM_addStyle("#container .dynamic div.footer                                    {background-image:url("+URL+"bg/sidebox_footer.png); height: 2px}");
GM_addStyle("#container .help                                                  {background      :url("+URL+"misc/help.png); width: 22px; height: 30px; top: -4px; right: 3px}");
/* island action buttons */
GM_addStyle("#island #actions li a .textLabel                                  {color:#c3c3c3}");
GM_addStyle("#island #actions .diplomacy                                       {background:url("+URL+"sideview/act_diplomacy.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .diplomacy a                                     {background:url("+URL+"sideview/act_diplomacy.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .diplomacy a:hover                               {background:url("+URL+"sideview/act_diplomacy.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .transport                                       {background:url("+URL+"sideview/act_transport.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .transport a                                     {background:url("+URL+"sideview/act_transport.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .transport a:hover                               {background:url("+URL+"sideview/act_transport.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .trade                                           {background:url("+URL+"sideview/act_trade.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .trade a                                         {background:url("+URL+"sideview/act_trade.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .trade a:hover                                   {background:url("+URL+"sideview/act_trade.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .deploy_army                                     {background:url("+URL+"sideview/act_move_army.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .deploy_army a                                   {background:url("+URL+"sideview/act_move_army.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .deploy_army a:hover                             {background:url("+URL+"sideview/act_move_army.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .deploy_fleet                                    {background:url("+URL+"sideview/act_move_fleet.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .deploy_fleet a                                  {background:url("+URL+"sideview/act_move_fleet.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .deploy_fleet a:hover                            {background:url("+URL+"sideview/act_move_fleet.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .espionage                                       {background:url("+URL+"sideview/act_spy.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .espionage a                                     {background:url("+URL+"sideview/act_spy.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .espionage a:hover                               {background:url("+URL+"sideview/act_spy.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .plunder                                         {background:url("+URL+"sideview/act_pillage.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .plunder a                                       {background:url("+URL+"sideview/act_pillage.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .plunder a:hover                                 {background:url("+URL+"sideview/act_pillage.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .blockade                                        {background:url("+URL+"sideview/act_blockade.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .blockade a                                      {background:url("+URL+"sideview/act_blockade.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .blockade a:hover                                {background:url("+URL+"sideview/act_blockade.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .defend_port                                     {background:url("+URL+"sideview/act_blockade_end.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .defend_port a                                   {background:url("+URL+"sideview/act_blockade_end.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .defend_port a:hover                             {background:url("+URL+"sideview/act_blockade_end.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .defend_city                                     {background:url("+URL+"sideview/act_defend.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .defend_city a                                   {background:url("+URL+"sideview/act_defend.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .defend_city a:hover                             {background:url("+URL+"sideview/act_defend.png) no-repeat top center; background-position: 2px -100px}");
GM_addStyle("#island #actions .occupy                                          {background:url("+URL+"sideview/act_occupy.png) no-repeat top center; background-position: 2px 0px}");
GM_addStyle("#island #actions .occupy a                                        {background:url("+URL+"sideview/act_occupy.png) no-repeat top center; background-position: 2px -50px}");
GM_addStyle("#island #actions .occupy a:hover                                  {background:url("+URL+"sideview/act_occupy.png) no-repeat top center; background-position: 2px -100px}");
/* island resource information */
GM_addStyle("#container #resUpgrade h4                                         {font-weight: bold; text-align: left; padding: 0 0 0 7px; margin: 8px 0 0 0; background-color: #14181b; border-left: 2px double #000000; border-right: 2px double #000000}");
GM_addStyle("#container #resUpgrade #donateForm                                {border: none; background-color: #14181b}");
GM_addStyle("#container #resUpgrade #donate label                              {font-weight: bold; text-align: left; padding: 0 0 0 1px; margin: -4px 0 1px 0}");
GM_addStyle("#container #resUpgrade #donate input.button:hover                 {color: #ffff00}");
GM_addStyle("#container #resUpgrade #donate a:hover                            {text-decoration: none}");
GM_addStyle("#container #resUpgrade #donate input.textfield                    {width: 80px}");
GM_addStyle("#container #resUpgrade.upgrading .buildingLevel                   {background-image:url("+URL+"sideview/btn_nextlevel.png); color: #c3c3c3}");
GM_addStyle("#container #resUpgrade.upgrading .nextLevel                       {color: #f0f0f0}");
GM_addStyle("#resourceUsers tr.own td                                          {color: #800606}");
/* world navigation buttons */
GM_addStyle("#worldmap_iso #container #mapCoordInput input                     {background-image:url("+URL+"sideview/mapnav.png)}");
GM_addStyle("#worldmap_iso #container #mapCoordInput .submitButton             {background-image:url("+URL+"sideview/mapnav.png)}");
GM_addStyle("#worldmap_iso #container #mapControls .visibility                 {background-color: #14181b; border-left: 2px double #000000}");
GM_addStyle("#worldmap_iso #container #mapControls .visibility #buttonTradegood{background-image:url("+URL+"sideview/mapnav.png)}");
GM_addStyle("#worldmap_iso #container #mapControls .visibility #buttonCities   {background-image:url("+URL+"sideview/mapnav.png)}");
GM_addStyle("#worldmap_iso #container #mapControls .scrolling                  {background-image:url("+URL+"sideview/mapnav.png)}");
GM_addStyle("#worldmap_iso #container #mapControls .scrolling a                {background-image:url("+URL+"sideview/mapnav.png)}");
GM_addStyle("#worldmap_iso #container .dynamic table#islandInfos a             {color: #c3c3c3}");
GM_addStyle("#worldmap_iso #container .dynamic table#islandInfos a:hover       {color: #ffff00}");
GM_addStyle("#container #resUpgrade.upgrading .progressBar                     {width: 110px; height: 10px; border: 2px double #000000; background-color: #2c3033}");
GM_addStyle("#container #resUpgrade.upgrading .progressBar .bar                {background-color: #c3c3c3; border-right: 2px double #000000}");
/* text boxes for coordinates, transparent background image */
GM_addStyle("#worldmap_iso #container #mapCoordInput                           {background-image:url("+URL+"hardcode/invisible.png); padding: 2px 0 0 0; margin: 0 0 -4px 0; border-left: 2px double #000000; border-right: 2px double #000000}");
GM_addStyle("#worldmap_iso #container #mapCoordInput input                     {color: #f0f0f0}");
GM_addStyle("#worldmap_iso #container #mapCoordInput label                     {color: #c3c3c3}");
/* building information */
GM_addStyle("#buildingUpgrade .actions .upgrade a                              {background-image:url("+URL+"sideview/btn_upgrade.png); color: #f0f0f0; font-weight: bold}");
GM_addStyle("#buildingUpgrade .actions .upgrade a:hover                        {color: #ffff00}");
GM_addStyle("#container #buildingUpgrade .actions .downgrade a                 {background-image:url("+URL+"sideview/btn_demolish.png); color: #f0f0f0}");
GM_addStyle("#container #buildingUpgrade .actions .downgrade a:hover           {color: #ffff00}");
GM_addStyle("#container #buildingUpgrade .actions .upgrade a.disabled          {background-image:url("+URL+"sideview/btn_upgrade.png); opacity: 0.33}");
GM_addStyle("#container #buildingUpgrade .actions .downgrade a.disabled        {background-image:url("+URL+"sideview/btn_demolish.png); opacity: 0.33}");
GM_addStyle("#buildingUpgrade .buildingLevel                                   {color: #f0f0f0}");
GM_addStyle("#buildingUpgrade .buildingLevel .textLabel                        {color: #c3c3c3}");
GM_addStyle("#buildingUpgrade h4                                               {background-color: #14181b; border-left: 2px double #000000; border-right: 2px double #000000; text-align: left; font-weight: bold; padding: 0 0 0 7px}");
GM_addStyle("#container #buildingUpgrade .resources li                         {float: none}");
GM_addStyle("#container #buildingUpgrade .resources li.alt                     {border: none}");
GM_addStyle("#container #buildingUpgrade .resources li.time                    {float: left; margin: 0 0 3px -1px; padding: 0 0 0 33px}");
GM_addStyle("#academy #researchFocus.dynamic h4                                {color: #f0f0f0}");
GM_addStyle("#warehouse #container .dynamic .safeinnextlevel th                {background-color: #14181b; color: #c3c3c3}");
GM_addStyle("#assignCulturalGoods .totalCulturalGoods                          {color: #f0f0f0}");
GM_addStyle("#embassy #container .dynamic ul.links li a                        {color: #f0f0f0}");
GM_addStyle("#embassy #container .dynamic ul.links li a:hover                  {color: #ffff00}");
GM_addStyle("#civilopedia_menu a                                               {color: #c3c3c3}");
GM_addStyle("#civilopedia_menu a:hover                                         {color: #ffff00; text-decoration: none}");
GM_addStyle("#backTo a                                                         {color: #c3c3c3}");
GM_addStyle("#researchOverview #researchFocus.dynamic h4                       {color: #f0f0f0}");
GM_addStyle("#researchOverview #container #mainview h4 {color: #000000}");
GM_addStyle("#port #container #mainview .contentBox01h .content a              {color: #f0f0f0}");
GM_addStyle("#port #container #mainview .contentBox01h .content a:hover        {color: #ffff00}");
GM_addStyle("#safehouseMissions #mainview a                                    {color: #f0f0f0; text-decoration: none}");
GM_addStyle("#safehouseMissions #mainview a:hover                              {color: #ffff00}");
/* upgrade information */
GM_addStyle("#container #buildingUpgrade.upgrading .buildingLevel              {background-image:url("+URL+"sideview/btn_nextlevel.png); color: #c3c3c3}");
GM_addStyle("#container #buildingUpgrade.upgrading .buildingLevel .textLabel   {color: #c3c3c3}");
GM_addStyle("#container #buildingUpgrade.upgrading .nextLevel                  {color: #f0f0f0}");
GM_addStyle("#container .progressBar                                           {width: 110px; height: 10px; border: 2px double #000000; background-color: #2c3033}");
GM_addStyle("#container .progressBar .bar                                      {background-color: #c3c3c3; border-right: 2px double #000000}");
/* unit and ship construction */
GM_addStyle("#unitConstructionList h4                                          {background-color: #14181b; border-left: 2px double #000000; border-right: 2px double #000000; text-align: left; font-weight: bold; padding: 0 0 0 7px; color: #f0f0f0; line-height: 12px}");
GM_addStyle("#unitConstructionList .currentUnit                                {border-bottom: 2px double #000000}");
GM_addStyle("#unitConstructionList.dynamic .content ul li                      {border-bottom: none}");
GM_addStyle("#unitConstructionList .currentUnit .progressbar                   {background-image:url("+URL+"hardcode/invisible.png); border: 2px double #000000; background-color: #2c3033}");
GM_addStyle("#unitConstructionList .currentUnit .progressbar .bar              {background-image:url("+URL+"hardcode/invisible.png); background-color: #c3c3c3; border-right: 2px double #000000}");
GM_addStyle("#shipyard #container #unitConstructionList li                     {border-bottom: 2px double #000000}");
/* CONTENT
   inner game window */
GM_addStyle(".contentBox01h table                                              {background-color: #d2d2d2; color: #000000}");
GM_addStyle(".contentBox01h h3.header                                          {background-image:url("+URL+"content/contentbox_header.png); line-height: 1px; color: #f0f0f0}");
GM_addStyle(".contentBox01 h3.header                                           {background-image:url("+URL+"content/contentbox_header.png); height: 21px}");
GM_addStyle(".contentBox01, .contentBox01h                                     {background-image:url("+URL+"content/contentbox.png); color: #000000");
GM_addStyle(".contentBox01 div.footer, .contentBox01h div.footer               {background-image:url("+URL+"content/contentbox_footer.png)}");
GM_addStyle("#container #mainview .unit                                        {background-image:url("+URL+"content/build.png)}");
GM_addStyle("#container #mainview table.table01                                {color: #000000; background-color: #d2d2d2; border: none}");
GM_addStyle("#container #mainview table.table01 th                             {background-color: #d2d2d2; color: #000000}");
GM_addStyle("#container #mainview table.table01 tr.alt                         {background-color: #c3c3c3}");
GM_addStyle("a                                                                 {color: #000000}");
GM_addStyle("a:hover                                                           {color: #ffff00; text-decoration: none}");
GM_addStyle("input.textfield, textarea, textarea.textfield, input.textfield:focus {border: 1px solid #000000}");
GM_addStyle("#container #mainview .unit .unitcount                             {background-image:url("+URL+"hardcode/invisible.png); background-color: #2c3033; border: 2px double #000000; line-height: 12px; padding: 0 6px 0 6px; height: 14px; color: #f0f0f0; width: 60px; margin-top: 4px");
GM_addStyle("#container ul.resources .citizens                                 {background-image:url("+URL+"hardcode/citizen.png)}");
GM_addStyle("#container ul.resources .upkeep                                   {background-image:url("+URL+"misc/gold_pos.png)}");
GM_addStyle("#container #mainview hr                                           {background-color: #c3c3c3}");
GM_addStyle("#container #mainview #units hr                                    {background-color: #c3c3c3}");
GM_addStyle("#container .resourceAssign li.wood                                {background-image:url("+URL+"hardcode/wood.png)}");
GM_addStyle("#container .resourceAssign li.wine                                {background-image:url("+URL+"hardcode/wine.png)}");
GM_addStyle("#container .resourceAssign li.marble                              {background-image:url("+URL+"hardcode/marble.png)}");
GM_addStyle("#container .resourceAssign li.glass                               {background-image:url("+URL+"hardcode/glass.png)}");
GM_addStyle("#container .resourceAssign li.sulfur                              {background-image:url("+URL+"hardcode/sulfur.png)}");
/* town advisor */
GM_addStyle("#tradeAdvisor #mainview .content #inboxCity a                     {color: #000000}");
GM_addStyle("#tradeAdvisor #mainview .content #inboxCity a:hover               {color: #ffff00; text-decoration: none}");
GM_addStyle("#tradeAdvisor #mainview #inboxCity td.city                        {background-image:url("+URL+"hardcode/icon_city.png)}");
GM_addStyle("#tradeAdvisor #mainview #inboxCity td.island                      {background-image:url("+URL+"hardcode/icon_island.png)}");
GM_addStyle("#tradeAdvisor #mainview .content #inboxCity tr.alt td.city        {background-color: #c3c3c3}");
GM_addStyle("#tradeAdvisor #mainview #inboxCity td.subject ul.resources li     {padding-top: 4px; padding-right: 4px}");
/* military advisor */
GM_addStyle(".contentBox01h table th                                                    {background-color: #c3c3c3}");
GM_addStyle("#militaryAdvisorCombatReports #mainview table.operations tr td.won a       {color: #800606}");
GM_addStyle("#militaryAdvisorCombatReports #mainview table.operations tr td.won a:hover {color: #ffff00; text-decoration: none}");
GM_addStyle("#militaryAdvisorCombatReports #mainview table.operations tr td.lost a      {color: #ff0000}");
GM_addStyle("#militaryAdvisorCombatReports #mainview table.operations tr td.lost a:hover{color: #ffff00; text-decoration: none}");
GM_addStyle("#militaryAdvisorCombatReports #mainview table.operations a                 {color: #000000}");
GM_addStyle("#militaryAdvisorCombatReports #mainview table.operations a:hover           {color: #ffff00; text-decoration: none}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.groundfight *        {font-size: 18px; margin-bottom: -4px}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.seafight *           {font-size: 18px; margin-bottom: -4px}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.groundfight .type    {background-image:url("+URL+"hardcode/invisible.png); width: 110px}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.seafight .type       {background-image:url("+URL+"hardcode/invisible.png); width: 110px}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li                      {border: none; border-top: 2px double #c3c3c3; margin: 5px -1px 0 -1px}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.enroute .type        {background-image:url("+URL+"hardcode/time.png)}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.enroute a            {color: #000000}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.enroute a:hover      {color: #ffff00; text-decoration: none}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.enroute .action      {background-image:url("+URL+"hardcode/btn_min.png); padding-top: 6px; margin-top: -5px");
GM_addStyle(".militaryAdvisorTabs                                                       {background-image:url("+URL+"content/contentbox_militarytabs.png); height: 18px; margin-bottom: 0px}");
GM_addStyle(".militaryAdvisorTabs #tabz td a                                            {color: #000000; font-size: 11px; margin: -3px 0 0 45px; height: 18px; line-height: 6px}");
GM_addStyle(".militaryAdvisorTabs #tabz td.selected a                                   {background-image:url("+URL+"content/contentbox_militaryover.png)}");
GM_addStyle(".militaryAdvisorTabs #tabz td a:hover                                      {background-image:url("+URL+"content/contentbox_militaryover.png); color: #ffff00; text-decoration: none}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#ergebnis tr.rep td     {background-color: #c3c3c3; border-bottom: 2px double #d2d2d2}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#ergebnis td a          {color: #000000; text-decoration: none; font-weight: bold}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#ergebnis td a:hover    {color: #ffff00}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#ergebnis ul.resources li  {padding-bottom: 5px; padding-top: 3px}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#ergebnis tr.rep td.winner {background-color: #14181b; color: #f0f0f0}");
GM_addStyle("#militaryAdvisorReportView #mainview .contentBox01h h3.header              {font-weight: normal}");
GM_addStyle("#militaryAdvisorReportView #mainview .contentBox01h h3.header a:link       {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#militaryAdvisorReportView #mainview .contentBox01h h3.header a:active     {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#militaryAdvisorReportView #mainview .contentBox01h h3.header a:visited    {color: #f0f0f0; font-weight: bold}");
GM_addStyle("#militaryAdvisorReportView #mainview .contentBox01h h3.header a:hover      {text-decoration: none; color: #ffff00; font-weight: bold}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result td.section      {background-color: #14181b; color: #f0f0f0; border-left: 1px solid #14181b; border-right: 2px solid #14181b; border-bottom: 2px double #d2d2d2}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result th.attacker     {background-color: #c3c3c3}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result th.defender     {background-color: #c3c3c3}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result a               {color: #000000; font-weight: bold}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result a:hover         {color: #ffff00; font-weight: bold; text-decoration: none}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result th              {background-color: #d2d2d2; color: #000000}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result td              {background-color: #d2d2d2; border-bottom: 2px double #c3c3c3}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result td.winner       {background-color: #14181b; color: #f0f0f0; border-left: 1px solid #14181b; border-right: 2px solid #14181b; border-bottom: 2px double #d2d2d2}");
GM_addStyle("#militaryAdvisorReportView #mainview .content table#result ul.resources li {padding-bottom: 5px; padding-top: 3px}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports a                       {text-decoration: none; color: #000000; font-weight: bold}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports a:hover                 {color: #ffff00}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.battle .type         {background-image:url("+URL+"hardcode/land_attack.png)}");
GM_addStyle("#militaryAdvisorMilitaryMovements ul#battleReports li.groundfight .action  {background-image:url("+URL+"misc/watch_battle.png)}");
GM_addStyle(".modifiersList ul li ul li.baseAttack                                      {background-image:url("+URL+"hardcode/land_attack.png)}");
GM_addStyle(".modifiersList ul li ul li.upgradesAttack                                  {background-image:url("+URL+"hardcode/report_offense00.png)}");
GM_addStyle(".modifiersList ul li ul li.baseDefense                                     {background-image:url("+URL+"hardcode/land_defense.png)}");
GM_addStyle(".modifiersList ul li ul li.upgradesDefense                                 {background-image:url("+URL+"hardcode/report_defense00.png)}");
GM_addStyle(".modifiersList ul li ul li.specialAssault                                  {background-image:url("+URL+"hardcode/report_special.png)}");
GM_addStyle(".modifiersList ul li ul li.specialSteady                                   {background-image:url("+URL+"hardcode/report_special.png)}");
GM_addStyle(".modifiersList ul li ul li.wallBonus                                       {background-image:url("+URL+"hardcode/report_wall.png)}");
GM_addStyle(".modifiersList ul li ul li.endurance                                       {background-image:url("+URL+"hardcode/land_stamina.png)}");
GM_addStyle(".modifiersList ul li ul li.enduranceModifier                               {background-image:url("+URL+"hardcode/report_stamina.png)}");
/* research advisor */
GM_addStyle("#mainview div#currentResearch .researchName a                     {color: #000000}");
GM_addStyle("#mainview div#currentResearch .researchName a:hover               {color: #ffff00; text-decoration: none}");
GM_addStyle("#researchAdvisor #mainview div#currentResearch .progressBar       {height: 10px; border: 2px double #000000; background-color: #2c3033}");
GM_addStyle("#researchAdvisor #mainview div#currentResearch .progressBar .bar  {background-color: #c3c3c3; height: 10px; border-right: 2px double #000000}");
GM_addStyle("#researchAdvisor #mainview div#currentResearch .percentage        {color: #000000; top: 27px; left: 480px}");
GM_addStyle("#researchAdvisor #mainview div#currentResearch .content           {background-image:url("+URL+"hardcode/invisible.png); height: 80px; padding-left: 140px}");
GM_addStyle("#researchAdvisor #mainview div#currentResearch .time              {color: #000000}");
GM_addStyle("#researchAdvisor #mainview table#inboxResearch a                  {color: #000000; font-weight: bold}");
GM_addStyle("#researchAdvisor #mainview table#inboxResearch a:hover            {color: #ffff00}");
GM_addStyle("#researchAdvisor #mainview table#inboxResearch td.subject         {background-image:url("+URL+"hardcode/invisible.png); border-bottom: none; padding: 0 0 0 0}");
/* diplomacy advisor */
GM_addStyle("div.diplomacyAdvisorTabs                                          {background-image:url("+URL+"content/contentbox_diplomacytabs.png); height: 18px; margin-bottom: 0px; line-height: 1px; font-size: 11px}");
GM_addStyle("div.diplomacyAdvisorTabs #tabz td.selected a                      {background:url("+URL+"content/contentbox_diplomacyover.png); margin-top: -4px; padding-top: 8px; line-height: 3px}");
GM_addStyle("div.diplomacyAdvisorTabs #tabz td a:hover                         {background:url("+URL+"content/contentbox_diplomacyover.png); margin-top: -4px; padding-top: 8px; line-height: 3px}");
GM_addStyle("#diplomacyAdvisor #container #mainview table.table01              {border: none}");
GM_addStyle("#diplomacyAdvisor #container #mainview table.table01 tr.entry td  {background-color: #d2d2d2; border-bottom: 2px double #c3c3c3}");
GM_addStyle("#diplomacyAdvisor #container #mainview #tab1 tr.text td.reply     {border-bottom: 2px double #c3c3c3}");
GM_addStyle("#diplomacyAdvisor #container #mainview tr.text td                 {background-color: #f0f0f0}");
GM_addStyle("#diplomacyAdvisor #container #mainview table.table01 .decision    {background-color: #f0f0f0}");
GM_addStyle("#diplomacyAdvisor #alliance #allyinfo a                           {color: #000000; font-weight: bold; text-decoration: none}");
GM_addStyle("#diplomacyAdvisor #alliance #allyinfo a:hover                     {color: #ffff00}");
GM_addStyle("#diplomacyAdvisor #container #mainview #demo a                    {color: #ffff00}");
GM_addStyle("#diplomacyAdvisor #container #mainview .table01 a:link            {color: #000000; font-weight: bold}");
GM_addStyle("#diplomacyAdvisor #container #mainview .table01 a:visited         {color: #000000; font-weight: bold}");
GM_addStyle("#diplomacyAdvisor #container #mainview .table01 a:active          {color: #000000; font-weight: bold}");
GM_addStyle("#diplomacyAdvisor #container #mainview .table01 a:hover           {color: #ffff00; font-weight: bold; text-decoration: none}");
GM_addStyle("div.diplomacyAdvisorTabs #tabz td a                               {color: #000000}");
GM_addStyle("div.diplomacyAdvisorTabs #tabz td a:hover                         {color: #ffff00; text-decoration: none}");
GM_addStyle("#diplomacyAdvisor #container #mainview table.table01 td.online    {background-image:url("+URL+"hardcode/crown.png)}");
GM_addStyle("#diplomacyAdvisor #container #mainview table.table01 td.offline   {background-image:url("+URL+"hardcode/crown.png); opacity: .33}");
GM_addStyle("#container #mainview #notice                                      {background-image:url("+URL+"content/contentbox_message.png); color: #c3c3c3}");
GM_addStyle("#container #mainview #notice textarea                             {width: 470px; background-color: #c3c3c3; margin: 3px 0 3px 6px; color: #000000}");
GM_addStyle("textarea.textfield                                                {background-image:url("+URL+"hardcode/invisible.png); border: 2px double #000000; font-size: 12px}");
/* trading port */
GM_addStyle("#port #container #mainview .contentBox01h .content a              {color: #000000; font-weight: bold}");
GM_addStyle("#port #container #mainview .contentBox01h .content .table01 td.city {background-image:url("+URL+"hardcode/icon_city.png)}");
GM_addStyle("#missionSummary .journeyTime                                      {background-image:url("+URL+"hardcode/time.png)}");
GM_addStyle("#missionSummary .journeyTarget                                    {background-image:url("+URL+"hardcode/icon_city.png)}");
GM_addStyle("#missionSummary .transporters                                     {background-image:url("+URL+"content/ship_transport.png); color: #000000; margin-left: 140px; padding-left: 90px}");
GM_addStyle("#container #mainview #missionSummary .transporters #transporterCount {color: #000000}");
GM_addStyle("#mainview .sliderinput .setMin                                    {background-image:url("+URL+"hardcode/btn_min.png); margin-top: -2px; margin-left: 9px}");
GM_addStyle("#mainview .sliderinput .setMax                                    {background-image:url("+URL+"hardcode/btn_max.png); margin-top: -2px; margin-left: -14px}");
GM_addStyle("#mainview .sliderinput .sliderbg                                  {background-image:url("+URL+"content/slider_empty.png); margin-top: -4px}");
GM_addStyle("#mainview .sliderinput .sliderbg .actualValue                     {background-image:url("+URL+"content/slider_full.png); margin: -11px 0 0 0}");
GM_addStyle("#mainview .sliderinput .sliderbg .sliderthumb                     {background-image:url("+URL+"content/slider_button.png); margin-top: 4px; height: 21px; width: 12px}");
GM_addStyle("#setPremiumTransports .header                                     {background-image:url("+URL+"content/contentbox_header.png); line-height: 1px; color: #f0f0f0}");
GM_addStyle("#setPremiumTransports                                             {background-image:url("+URL+"content/contentbox.png); color: #000000}");
GM_addStyle("#setPremiumTransports .footer                                     {background-image:url("+URL+"content/contentbox_footer.png)}");
GM_addStyle("#mainview #transportGoods .header                                 {background-image:url("+URL+"content/contentbox_header.png); line-height: 1px; color: #f0f0f0}");
GM_addStyle("#mainview #transportGoods .content                                {background-image:url("+URL+"content/contentbox.png); color: #000000; margin-left: 0px; margin-top: -9px; padding-top: 9px; margin-bottom: -1px; padding-bottom: 1px; width: 680px}");
GM_addStyle("#mainview #transportGoods .footer                                 {background-image:url("+URL+"content/contentbox_footer.png)}");
/* academy */
GM_addStyle("#academy #mainview #setScientists div.content ul                  {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#academy #mainview #setScientists div.content                     {color: #000000}");
GM_addStyle("#academy #mainview #setScientists #sliderbg                       {background-image:url("+URL+"content/slider_empty_lg.png); margin-top: -4px; width: 352px}");
GM_addStyle("#academy #mainview #setScientists #sliderbg #actualValue          {background-image:url("+URL+"content/slider_full.png); margin: -6px 0 0 0px}");
GM_addStyle("#academy #mainview #setScientists .setMin                         {background-image:url("+URL+"hardcode/btn_min.png); margin-top: -6px; margin-left: 12px}");
GM_addStyle("#academy #mainview #setScientists .setMax                         {background-image:url("+URL+"hardcode/btn_max.png); margin-top: -6px; margin-left: -16px}");
GM_addStyle("#academy #mainview #setScientists #sliderbg #sliderthumb          {background-image:url("+URL+"content/slider_button.png); margin-top: 4px; height: 21px; width: 12px}");
GM_addStyle("#academy #mainview #setScientists .scientists .value              {background-image:url("+URL+"hardcode/invisible.png); border: 2px double #000000; background-color: #2c3033; line-height: 14px; padding: 0 6px 0 6px; height: 16px; color: #f0f0f0; font-weight: bold; font-size: 12px; width: 30px; margin-left: 23px");
GM_addStyle("#academy #mainview #setScientists .citizens .value                {background-image:url("+URL+"hardcode/invisible.png); border: 2px double #000000; background-color: #2c3033; line-height: 14px; padding: 0 6px 0 6px; height: 16px; color: #f0f0f0; font-weight: bold; font-size: 12px; width: 35px; margin-left: 12px");
GM_addStyle("#academy #mainview div#currentResearch .content                   {background-image:url("+URL+"hardcode/invisible.png); height: 80px; padding-left: 140px}");
GM_addStyle("#academy #mainview div#currentResearch .progressBar               {height: 10px; border: 2px double #000000; background-color: #2c3033}");
GM_addStyle("#academy #mainview div#currentResearch .progressBar .bar          {background-color: #c3c3c3; height: 10px; border-right: 2px double #000000}");
GM_addStyle("#academy #mainview div#currentResearch .percentage                {color: #000000; top: 27px; left: 490px}");
GM_addStyle("#academy #mainview div#currentResearch .time                      {color: #000000}");
GM_addStyle("#researchDetail #mainview .contentBox01h table td                 {border-bottom: 1px solid #c3c3c3; color: #000000}");
GM_addStyle("#researchDetail #mainview .contentBox01h table td a:link          {color: #000000; font-weight: bold; text-decoration: none}");
GM_addStyle("#researchDetail #mainview .contentBox01h table td a:hover         {color: #ffff00}");
GM_addStyle("#changeResearch #container #mainview ul li.active                 {background-color: #c3c3c3}");
GM_addStyle("#changeResearch #container #mainview ul li .progress              {color: #000000}");
GM_addStyle("#changeResearch #container #mainview ul li .progress a            {color: #000000}");
GM_addStyle("#changeResearch #container #mainview ul li .progress a:link       {color: #000000}");
GM_addStyle("#changeResearch #container #mainview ul li .progress a:hover      {color: #ffff00; text-decoration: none}");
GM_addStyle("#researchDetail #mainview .contentBox01h table td a               {color: #000000; text-decoration: none; font-weight: bold}");
GM_addStyle("#changeResearch #container #mainview ul li .statusBar             {background-color: #2c3033; border: 2px double #000000; height: 10px}");
GM_addStyle("#changeResearch #container #mainview ul li .statusBar .bar        {background-color: #c3c3c3; border-right: 2px double #000000}");
GM_addStyle("#changeResearch #container #mainview ul li .statusBar .bar .percentage                        {top: -3px}");
GM_addStyle("#researchOverview #container #mainview div.contentBox01h div.content ul.explored li a         {color: #800606}");
GM_addStyle("#researchOverview #container #mainview div.contentBox01h div.content ul.unexplored li a       {color: #000000}");
GM_addStyle("#researchOverview #container #mainview div.contentBox01h div.content ul.unexplored li         {color: #000000}");
GM_addStyle("#researchOverview #container #mainview div.contentBox01h div.content ul.explored li a:hover   {color: #ffff00}");
GM_addStyle("#researchOverview #container #mainview div.contentBox01h div.content ul.unexplored li a:hover {color: #ffff00}");
/* museum */
GM_addStyle("#museum #culturalGoods .content                                   {background-image:url("+URL+"hardcode/invisible.png); height: 120px; margin-left: -110px}");
GM_addStyle("#museum #culturalGoods div.goods .value                           {background-image:url("+URL+"hardcode/invisible.png); color: #800606; vertical-align: bottom}");
GM_addStyle("#museum #culturalGoods div.goods                                  {color: #000000; font-size: 12px; font-weight: bold}");
GM_addStyle("#museum #culturalGoods .result                                    {padding: 0px}");
GM_addStyle("#museum #culturalGoods .result .value                             {color: #800606}");
GM_addStyle("#museum table th                                                  {background-color: #d2d2d2; color: #000000; text-align: left}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods .culturalGoods     {color: #800606}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods li .city           {background-image:url("+URL+"mainview/btn_city.png); left: -10px; padding-left: 14px; top: -12px; color: #000000}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods p.error            {color: #ff0000}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods input.disabled     {color: #d2d2d2; opacity: .5}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods .outraged          {background-image:url("+URL+"content/satisfaction_sm.png); width: 35px; height: 35px; background-position: 0px 0px}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods .sad               {background-image:url("+URL+"content/satisfaction_sm.png); width: 35px; height: 35px; background-position: 0px -35px}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods .neutral           {background-image:url("+URL+"content/satisfaction_sm.png); width: 35px; height: 35px; background-position: 0px -70px}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods .happy             {background-image:url("+URL+"content/satisfaction_sm.png); width: 35px; height: 35px; background-position: 0px -105px}");
GM_addStyle("#culturalPossessions_assign #moveCulturalGoods .ecstatic          {background-image:url("+URL+"content/satisfaction_sm.png); width: 35px; height: 35px; background-position: 0px -140px}");
/* island resources */
GM_addStyle(".contentBox table th                                              {background-color: #d2d2d2; color: #000000}");
GM_addStyle(".contentBox table                                                 {background-color: #c3c3c3; color: #000000}");
GM_addStyle(".contentBox table .alt                                            {background-color: #d2d2d2; color: #000000}");
GM_addStyle("#resourceUsers td.actions                                         {border-left: 2px double #c3c3c3}");
GM_addStyle("#mainview .contentBox01 div.content ul                            {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#mainview #setWorkers .contentBox01 div.content                   {color: #000000}");
GM_addStyle("#mainview #setWorkers .citizens .value                            {background-image:url("+URL+"hardcode/invisible.png); border: 2px double #000000; background-color: #2c3033; line-height: 14px; padding: 0 6px 0 6px; height: 16px; color: #f0f0f0; font-weight: bold; font-size: 12px; width: 35px; margin-left: 12px");
GM_addStyle("#mainview #setWorkers .workers .value                             {background-image:url("+URL+"hardcode/invisible.png); border: 2px double #000000; background-color: #2c3033; line-height: 14px; padding: 0 6px 0 6px; height: 16px; color: #f0f0f0; font-weight: bold; font-size: 12px; width: 35px; margin-left: 12px");
GM_addStyle("#mainview #setWorkers .setMin                                     {background-image:url("+URL+"hardcode/btn_min.png); margin-top: -6px; margin-left: 7px}");
GM_addStyle("#mainview #setWorkers .setMax                                     {background-image:url("+URL+"hardcode/btn_max.png); margin-top: -6px; margin-left: -21px}");
GM_addStyle("#mainview #setWorkers #sliderbg                                   {background-image:url("+URL+"content/slider_empty_lg.png); margin-top: -4px}");
GM_addStyle("#mainview #setWorkers #sliderbg #actualValue                      {background-image:url("+URL+"content/slider_full.png); margin: -6px 0 0 -1px; width: 350px}");
GM_addStyle("#mainview #setWorkers #sliderbg #sliderthumb                      {background-image:url("+URL+"content/slider_button.png); margin-top: 4px; margin-left: -5px; height: 21px; width: 12px}");
GM_addStyle("#mainview #setWorkers #sliderbg #overcharge                       {background-image:url("+URL+"content/slider_over.png); margin: -6px 0 0 -16px}");
GM_addStyle("#mainview #setWorkers ul                                          {background-image:url("+URL+"hardcode/invisible.png); color: #000000}");
/* troops in town */
GM_addStyle("#cityMilitary-army .contentBox01h div.content                     {background-color: #d2d2d2}");
GM_addStyle("#cityMilitary-fleet .contentBox01h div.content                    {background-color: #d2d2d2}");
GM_addStyle("#cityMilitary-army #container #mainview table th                  {background-color: #c3c3c3; color: #000000}");
GM_addStyle("#cityMilitary-fleet #container #mainview table th                 {background-color: #c3c3c3; color: #000000}");
GM_addStyle("#cityMilitary-army #container #mainview .content table th         {border: 2px double #000000}");
GM_addStyle("#cityMilitary-fleet #container #mainview .content table th        {border: 2px double #000000}");
GM_addStyle("#cityMilitary-army #container #mainview .content table td         {color: #000000; border: none}");
GM_addStyle("#cityMilitary-fleet #container #mainview .content table td        {color: #000000; border: none}");
GM_addStyle("#cityMilitary-army #container #mainview table tr.count td         {background-color: #d2d2d2}");
GM_addStyle("#cityMilitary-fleet #container #mainview table tr.count td        {background-color: #d2d2d2}");
GM_addStyle("#cityMilitary-army #tabz td a                                     {margin-left: 34px; margin-top: -1px; height: 17px}");
GM_addStyle("#cityMilitary-army #tabz td.selected a                            {background-image:url("+URL+"content/contentbox_militaryover.png)}");
GM_addStyle("#cityMilitary-army #tabz td a:hover                               {background-image:url("+URL+"content/contentbox_militaryover.png)}");
GM_addStyle("#cityMilitary-fleet #tabz td a                                    {margin-left: 34px; margin-top: -1px; height: 17px}");
GM_addStyle("#cityMilitary-fleet #tabz td.selected a                           {background-image:url("+URL+"content/contentbox_militaryover.png)}");
GM_addStyle("#cityMilitary-fleet #tabz td a:hover                              {background-image:url("+URL+"content/contentbox_militaryover.png)}");
/* high score */
GM_addStyle("#highscore #mainview table.table01 th                             {color: #000000; border-top: 2px double #000000; border-bottom: 2px double #000000; background-color: #c3c3c3}");
GM_addStyle("#highscore #mainview a                                            {color: #000000}");
GM_addStyle("#highscore #mainview a:hover                                      {color: #ffff00}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.own             {background-color: #800606; color: #f0f0f0}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.ownally         {background-color: #2c3033; color: #f0f0f0}");
GM_addStyle("#highscore #mainview div.content table.table01                    {border: none}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.first           {border-bottom: #c3c3c3; background-color: #ffffff; color: #000000}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.second          {border-bottom: #c3c3c3; background-color: #f0f0f0; color: #000000}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.third           {border-bottom: #c3c3c3; background-color: #d2d2d2; color: #000000}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.first td.place  {background-image:url("+URL+"content/medal_first.png)}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.second td.place {background-image:url("+URL+"content/medal_second.png)}");
GM_addStyle("#highscore #mainview div.content table.table01 tr.third td.place  {background-image:url("+URL+"content/medal_third.png)}");
/* options */
GM_addStyle("#options #mainview .content h3, #options caption                  {border-bottom: 2px double #c3c3c3; color: #000000}");
GM_addStyle("#options p.error, #options ul.errors li                           {color: #ff0000}");
GM_addStyle("#options #mainview #emailInvalidWarning h3                        {color: #f0f0f0}");
GM_addStyle("#options #mainview #emailInvalidWarning p                         {color: #ff0000}");
GM_addStyle("#options #mainview #emailInvalidWarning p.confirmation            {color: #ff0000}");
/* help */
GM_addStyle("#container #mainview div.informations div.hint                    {background-image:url("+URL+"misc/help.png); padding-left: 40px; border: 2px double #000000; background-color: #d2d2d2; color: #000000}");
GM_addStyle("#container #mainview div.informations div.navigation              {color: #c3c3c3; border: none}");
GM_addStyle("#container #mainview div.informations div.navigation a            {color: #c3c3c3}");
GM_addStyle("#container #mainview div.informations div.navigation a:hover      {color: #ffff00}");
GM_addStyle("#container #mainview div.informations h2                          {color: #f0f0f0}");
GM_addStyle("#unitdescription #mainview .costs #unitValues td                  {color: #000000}");
GM_addStyle("#unitdescription #mainview .costs                                 {border: 2px solid #000000; background-color: #c3c3c3; color: #000000}");
GM_addStyle("#unitdescription #mainview .costs #unitValues th                  {border-bottom: 2px solid #c3c3c3}");
GM_addStyle("#unitdescription #mainview .costs #unitCosts th                   {border-bottom: 2px solid #c3c3c3}");
GM_addStyle("#unitdescription #mainview div.costs table#upgrades th            {border-bottom: 2px solid #c3c3c3; color: #000000}");
GM_addStyle("#unitdescription #mainview .costs ul.resources                    {margin-left: 10px}");
GM_addStyle("#shipdescription #mainview .costs #unitValues td                  {color: #000000}");
GM_addStyle("#shipdescription #mainview .costs                                 {border: 2px solid #000000; background-color: #c3c3c3; color: #000000}");
GM_addStyle("#shipdescription #mainview .costs #unitValues th                  {border-bottom: 2px solid #c3c3c3}");
GM_addStyle("#shipdescription #mainview .costs #unitCosts th                   {border-bottom: 2px solid #c3c3c3}");
GM_addStyle("#shipdescription #mainview div.costs table#upgrades th            {border-bottom: 2px solid #c3c3c3; color: #000000}");
GM_addStyle("#shipdescription #mainview .costs ul.resources                    {margin-left: 10px}");
GM_addStyle("#shipdescription #mainview .costs ul.resources li                 {padding-bottom: 8px}");
GM_addStyle("#buildingDetail #container #mainview table#overview               {border: 2px double #c3c3c3}");
GM_addStyle("#buildingDetail #container #mainview table#overview th            {background-color: #c3c3c3; border: none; color: #000000}");
GM_addStyle("#buildingDetail #container #mainview table#overview tr.alt        {background-color: #c3c3c3}");
/* tavern */
GM_addStyle("#tavern span.bonus                                                {color: #000000}");
GM_addStyle("#tavern span.value                                                {color: #800606}");
GM_addStyle("#citySatisfaction.outraged                                        {background-image:url("+URL+"content/satisfaction.png); width: 80px; height: 80px; background-position: 0px 0px}");
GM_addStyle("#citySatisfaction.sad                                             {background-image:url("+URL+"content/satisfaction.png); width: 80px; height: 80px; background-position: 0px -80px}");
GM_addStyle("#citySatisfaction.neutral                                         {background-image:url("+URL+"content/satisfaction.png); width: 80px; height: 80px; background-position: 0px -160px}");
GM_addStyle("#citySatisfaction.happy                                           {background-image:url("+URL+"content/satisfaction.png); width: 80px; height: 80px; background-position: 0px -240px}");
GM_addStyle("#citySatisfaction.ecstatic                                        {background-image:url("+URL+"content/satisfaction.png); width: 80px; height: 80px; background-position: 0px -320px}");
/* trading post */
GM_addStyle("#branchOffice #container #mainview .content table.tablekontor th  {background-color: #d2d2d2; color: #000000}");
GM_addStyle("#branchOffice .tablekontor                                        {background-color: #d2d2d2; color: #000000}");
GM_addStyle("#branchOffice #container #mainview table.tablekontor tr.alt       {background-color: #c3c3c3}");
GM_addStyle("#takeOffer td.priceTolerance div.increaseInput a.decrease         {background-image:url("+URL+"content/btn_decrease.png)}");
GM_addStyle("#takeOffer td.priceTolerance div.increaseInput a.increase         {background-image:url("+URL+"content/btn_increase.png)}");
/* workshop */
GM_addStyle("#workshop-army #container #mainview #demo table.units td                  {border-top: 2px double #c3c3c3; border-bottom: 2px double #c3c3c3}");
GM_addStyle("#workshop-fleet #container #mainview #demo table.units td                 {border-top: 2px double #c3c3c3; border-bottom: 2px double #c3c3c3}");
GM_addStyle("#workshop-army #container #mainview #demo table.units table.inside        {background-color: #c3c3c3; border: 2px double #c3c3c3}");
GM_addStyle("#workshop-fleet #container #mainview #demo table.units table.inside       {background-color: #c3c3c3; border: 2px double #c3c3c3}");
GM_addStyle("#workshop-army #container #mainview #demo table.units table.inside:hover  {border: 2px double #c3c3c3}");
GM_addStyle("#workshop-fleet #container #mainview #demo table.units table.inside:hover {border: 2px double #c3c3c3}");
GM_addStyle("#workshop-army #container #mainview #demo .units div.progressbar          {border: 2px double #000000; height: 10px; background-color: #14181b}");
GM_addStyle("#workshop-fleet #container #mainview #demo .units div.progressbar         {border: 2px double #000000; height: 10px; background-color: #14181b}");
GM_addStyle("#workshop-army #container #mainview #demo .units div.progressbar div.bar  {border-right: 2px double #000000; height: 10px; background-color: #c3c3c3}");
GM_addStyle("#workshop-fleet #container #mainview #demo .units div.progressbar div.bar {border-right: 2px double #000000; height: 10px; background-color: #c3c3c3}");
/* hideout */
GM_addStyle("ul.yui-nav                                                        {background-image:url("+URL+"content/contentbox_hideouttabs.png); height: 36px; margin-bottom: -6px; padding-top: 6px; font-size: 11px}");
GM_addStyle(".yui-navset .yui-nav .selected a                                  {background-image:url("+URL+"content/contentbox_hideoutover.png); margin-left: 25px; color: #000000}");
GM_addStyle(".yui-navset .yui-nav a:hover                                      {background-image:url("+URL+"content/contentbox_hideoutover.png); color: #ffff00; text-decoration: none}");
GM_addStyle("#safehouse #container #mainview div.spyinfo                       {border: 2px double #c3c3c3; background-color: #c3c3c3}");
GM_addStyle("#safehouse #container #mainview td.subject a                      {color: #000000; font-weight: bold; text-decoration: none}");
GM_addStyle("#safehouse #container #mainview td.subject a:hover                {color: #ffff00}");
GM_addStyle("#safehouse #container #mainview .spyinfo li.city                  {background-image:url("+URL+"hardcode/icon_city.png)}");
GM_addStyle("#safehouse #container #mainview .spyinfo li.city a                {color: #000000}");
GM_addStyle("#safehouse #container #mainview .spyinfo li.city a:hover          {color: #ffff00}");
GM_addStyle("#safehouse #container #mainview .spyinfo li.status                {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#safehouse #container #mainview ul li.risk .statusBar             {border: 2px double #000000; height: 8px; background-color: #2c3033}");
GM_addStyle("#safehouseMissions #mainview .statusBar                           {border: 2px double #000000; height: 8px; background-color: #2c3033}");
GM_addStyle("#safehouseMissions #mainview div.percentage                       {top: 13px}");
GM_addStyle("#safehouse #container #mainview ul li.risk .statusBar .bar        {background-image:url("+URL+"hardcode/invisible.png); border-right: 2px double #000000; height: 10px; background-color: #f0f0f0; border-right: 2px double #000000}");
GM_addStyle("#safehouseMissions #mainview .statusBar .bar                      {background-image:url("+URL+"hardcode/invisible.png); border-right: 2px double #000000; height: 10px; background-color: #f0f0f0; border-right: 2px double #000000}");
GM_addStyle("#safehouse #container #mainview .spyinfo div.missionButton a      {background-image:url("+URL+"misc/spy_mission.png); color: #000000; font-weight: bold}");
GM_addStyle("#safehouse #container #mainview .spyinfo div.missionButton a:hover{background-color: #c3c3c3; color: #ffff00}");
GM_addStyle("#safehouse #container #mainview .spyinfo div.missionAbort a       {background-image:url("+URL+"hardcode/cancel.png); color: #000000; font-weight: bold; margin-top: 12px; padding-top: 25px}");
GM_addStyle("#safehouse #container #mainview .spyinfo div.missionAbort a:hover {background-color: #c3c3c3; color: #ffff00}");
GM_addStyle("#safehouse #container #mainview table.spyMessages td.time         {background-image:url("+URL+"hardcode/time.png)}");
GM_addStyle("#safehouse #container #mainview table.spyMessages td.money        {background-image:url("+URL+"hardcode/gold.png)}");
GM_addStyle("#safehouse #container #mainview table.spyMessages td.arrived      {background-image:url("+URL+"hardcode/icon_city.png)}");
GM_addStyle("#safehouse #container #mainview table.spyMessages td.return       {background-image:url("+URL+"hardcode/btn_min.png)}");
GM_addStyle("#safehouseMissions #mainview li div.missionCosts .gold            {background-image:url("+URL+"hardcode/gold.png)}");
GM_addStyle("#safehouseMissions #mainview ul#missionlist li                    {border-bottom: 2px double #c3c3c3}");
GM_addStyle("#safehouse #container #spyCount                                   {color: #000000}");
GM_addStyle("#safehouse #container .summary                                    {color: #000000}");
GM_addStyle("#safehouseReports #container #mainview tr.status                  {border-bottom: 2px double #c3c3c3}");
GM_addStyle("#safehouseReports #container #mainview table.reportTable          {border: 2px double #c3c3c3}");
GM_addStyle("#safehouseReports #container #mainview table.reportTable th       {background-color: #c3c3c3; color: #000000}");
GM_addStyle("#sendSpy .costs                                                   {background-image:url("+URL+"hardcode/gold.png)}");
GM_addStyle("#sendSpy .risk .statusBar                                         {border: 2px double #000000; height: 8px; background-color: #2c3033; margin-top: 5px}");
GM_addStyle("#sendSpy .risk .statusBar .bar                                    {background-image:url("+URL+"hardcode/invisible.png); border-right: 2px double #000000; height: 10px; background-color: #c3c3c3}");
GM_addStyle("#sendSpy #mainview .statusBar .bar                                {background-image:url("+URL+"hardcode/invisible.png); border-right: 2px double #000000; height: 10px; background-color: #c3c3c3}");
GM_addStyle("#safehouse #container #mainview table.spyMessages td.garrison     {background-image:url("+URL+"hardcode/report_offense00.png)}");
/* town hall */
GM_addStyle(".happiness_outraged                                               {background-image:url("+URL+"content/sat_outraged.png); color: #000000}");
GM_addStyle(".happiness_sad                                                    {background-image:url("+URL+"content/sat_sad.png); color: #000000}");
GM_addStyle(".happiness_neutral                                                {background-image:url("+URL+"content/sat_neutral.png); color: #000000}");
GM_addStyle(".happiness_happy                                                  {background-image:url("+URL+"content/sat_happy.png); color: #000000}");
GM_addStyle(".happiness_ecstatic                                               {background-image:url("+URL+"content/sat_ecstatic.png); color: #000000}");
GM_addStyle("#CityOverview h3 a                                                {background-image:url("+URL+"hardcode/invisible.png); color: #ffff00; margin-top: -6px; width: 40px}");
GM_addStyle("#CityOverview h3 a:hover                                          {background-image:url("+URL+"hardcode/invisible.png); color: #ff0000}");
GM_addStyle(".contentBox h3.header                                             {background-image:url("+URL+"content/contentbox_header.png); line-height: 1px; color: #f0f0f0}");
GM_addStyle(".contentBox                                                       {background-image:url("+URL+"content/contentbox.png); color: #000000");
GM_addStyle(".contentBox div.footer                                            {background-image:url("+URL+"content/contentbox_footer.png)}");
GM_addStyle("#notices h4                                                       {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#notices .warning                                                 {background-image:url("+URL+"hardcode/report.png); border: none; background-color: #c3c3c3; color: #000000}");
GM_addStyle("#PopulationGraph                                                  {background-color: #d2d2d2; border: none; color: #000000}");
GM_addStyle("#PopulationGraph h4                                               {color: #000000}");
GM_addStyle("#PopulationGraph .citizens                                        {background-image:url("+URL+"mainview/graph_gold.png); border: none; background-position: left}");
GM_addStyle("#PopulationGraph .woodworkers                                     {background-image:url("+URL+"mainview/graph_museum.png); border: none; background-position: center}");
GM_addStyle("#PopulationGraph .specialworkers                                  {background-image:url("+URL+"mainview/graph_luxury.png); border: none; background-position: center}");
GM_addStyle("#PopulationGraph .scientists                                      {background-image:url("+URL+"mainview/graph_scientists.png); border: none; background-position: right}");
GM_addStyle("#CityOverview .stats .space                                       {background-image:url("+URL+"hardcode/icon_city.png)}");
GM_addStyle("#CityOverview .stats .growth_positive                             {background-image:url("+URL+"misc/growth_pos.png)}");
GM_addStyle("#CityOverview .stats .growth_negative                             {background-image:url("+URL+"misc/growth_neg.png)}");
GM_addStyle("#CityOverview .stats .actions                                     {background-image:url("+URL+"hardcode/actions.png)}");
GM_addStyle("#CityOverview .stats .incomegold_positive                         {background-image:url("+URL+"misc/gold_pos.png)}");
GM_addStyle("#CityOverview .stats .incomegold_negative                         {background-image:url("+URL+"misc/gold_neg.png)}");
GM_addStyle("#CityOverview .stats .corruption                                  {background-image:url("+URL+"misc/gold_corrupt.png)}");
GM_addStyle("#SatisfactionOverview * h5                                        {color: #000000}");
GM_addStyle("#SatisfactionOverview .positives                                  {border-right: 2px double #c3c3c3}");
GM_addStyle("#SatisfactionOverview .negatives                                  {border-right: 2px double #c3c3c3}");
GM_addStyle("#SatisfactionOverview div.cat div                                 {border: 2px double #000000}");
GM_addStyle("#SatisfactionOverview .basic .base                                {background-image:url("+URL+"mainview/graph_basic.png); border: none; background-position: left; color: #f0f0f0}");
GM_addStyle("#SatisfactionOverview .basic .research1                           {background-image:url("+URL+"mainview/graph_scientists.png); border: none; background-position: center}");
GM_addStyle("#SatisfactionOverview .basic .capital                             {background-image:url("+URL+"mainview/graph_gold.png); border: none; background-position: right}");
GM_addStyle("#SatisfactionOverview .wine .tavern                               {background-image:url("+URL+"mainview/graph_tavern.png); border: none; background-position: left; color: #f0f0f0}");
GM_addStyle("#SatisfactionOverview .wine .serving                              {background-image:url("+URL+"mainview/graph_wine.png); border: none; background-position: right}");
GM_addStyle("#SatisfactionOverview .culture .museum                            {background-image:url("+URL+"mainview/graph_museum.png); border: none; background-position: left}");
GM_addStyle("#SatisfactionOverview .culture .treaties                          {background-image:url("+URL+"mainview/graph_luxury.png); border: none; background-position: right}");
GM_addStyle("#SatisfactionOverview .negatives .overpopulation .bar             {background-image:url("+URL+"mainview/graph_population.png); border: none; background-position: left; color: #f0f0f0}");
GM_addStyle("#SatisfactionOverview .negatives .corruption .bar                 {background-image:url("+URL+"mainview/graph_corruption.png); border: none; background-position: left; color: #f0f0f0}");
GM_addStyle("#SatisfactionOverview .negatives .punishment .bar                 {background-image:url("+URL+"mainview/graph_corruption.png); border: none; background-position: left; color: #f0f0f0}");
GM_addStyle("#SatisfactionOverview .happiness h4                               {color: #000000}");
GM_addStyle("#SatisfactionOverview .happiness .value                           {color: #800606; font-size: 16px}");
GM_addStyle("#renameCity .oldCityName                                          {color: #000000}");
GM_addStyle("#CityOverview .stats .incomegold_positive .value                  {color: #800606; font-weight: bold}");
GM_addStyle("#CityOverview .stats .incomegold_negative .value                  {color: #ff0000; font-weight: bold}");
/* embassy */
GM_addStyle("#embassy #container #mainview table.table01 td.online             {background-image:url("+URL+"hardcode/crown.png)}");
GM_addStyle("#embassy #container #mainview table.table01 td.offline            {background-image:url("+URL+"hardcode/crown.png); opacity: .33}");
GM_addStyle("#embassy #mainview .contentBox01h table td                        {border-bottom: none}");
GM_addStyle("#container #mainview table.table01 tr.highlight                   {background-color: #f0f0f0}");
/* trade fleet */
GM_addStyle("#merchantNavy #container #mainview table.table01 td a             {color: #000000; text-decoration: none}");
GM_addStyle("#merchantNavy #container #mainview table.table01 td a:hover       {color: #ffff00}");
GM_addStyle("#merchantNavy #mainview table td.transports                       {color: #800606; text-align: center}");
GM_addStyle("#merchantNavy #mainview table .payload                            {color: #000000; background-color: #c3c3c3}");
GM_addStyle("#merchantNavy #mainview table .space                              {color: #000000; background-color: #c3c3c3}");
GM_addStyle("#merchantNavy #mainview table div.pulldown div.content            {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#merchantNavy #mainview table td.gotoown                          {background-image:url("+URL+"content/trade_self.png)}");
GM_addStyle("#merchantNavy #mainview table td.returning                        {background-image:url("+URL+"content/trade_back.png)}");
GM_addStyle("#merchantNavy #mainview table td.gotoforeign                      {background-image:url("+URL+"content/trade_goto.png)}");
/* MISCELLANEOUS
   clickable button */
GM_addStyle("*.button                                                          {background-image:url("+URL+"misc/button.png); font-size: 11px; font-weight: bold; color: #f0f0f0; border: 2px double #000000; padding: 3px 0 3px 0; line-height: 13px}");
GM_addStyle("*.button:hover                                                    {color: #ffff00}");
GM_addStyle("*.button:active                                                   {font-size: 11px; font-weight: bold; color: #ffff00; border: 2px double #000000; padding: 3px 0 3px 0; line-height: 13px}");
GM_addStyle("*.button_inactive                                                 {background-image:url("+URL+"misc/button.png); font-size: 11px; font-weight: bold; color: #ff0000; border: 2px double #000000; padding: 3px 0 3px 0; line-height: 13px}");
GM_addStyle("*.buttonChanged                                                   {background-image:url("+URL+"misc/button.png); font-size: 11px; font-weight: bold; color: #ff0000; border: 2px double #000000; padding: 3px 0 3px 0; line-height: 13px}");
GM_addStyle("*.buttonChanged:hover                                             {color: #ffff00}");
GM_addStyle("*.dangerButton, *.cancelUpgrade                                   {background-image:url("+URL+"misc/button.png); font-size: 11px; font-weight: bold; color: #f0f0f0; border: 2px double #000000; padding: 3px 0 3px 0; line-height: 13px}");
GM_addStyle("*.dangerButton:hover, *.cancelUpgrade:hover                       {color: #ffff00}");
GM_addStyle("*.dangerButton:active, *.cancelUpgrade:active                     {font-size: 11px; font-weight: bold; color: #ffff00; border: 2px double #000000; padding: 3px 0 3px 0; line-height: 13px}");
/* advisor logos to the right of the titles in the inner game window */
GM_addStyle("#tradeAdvisor .buildingDescription                                {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#militaryAdvisor .buildingDescription                             {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#researchAdvisor .buildingDescription                             {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#diplomacyAdvisor .buildingDescription                            {background-image:url("+URL+"hardcode/invisible.png)}");
/* island view city names */
GM_addStyle("#island #mainview #cities .city .textLabel .palm                  {background-image:url("+URL+"misc/vacation.png); width: 23px; height: 24px; top: -4px; left: -13px}");
GM_addStyle("#island #mainview #cities .city .textLabel                        {background-image:url("+URL+"hardcode/invisible.png); background-color: #2c3033; border: 2px double #000000; line-height: 14px; padding: 0 6px 0 6px; height: 16px; color: #f0f0f0; font-weight: bold");
GM_addStyle("#island #mainview #cities .city .textLabel .before                {background-image:url("+URL+"hardcode/invisible.png); width: 0px; height: 0px}");
GM_addStyle("#island #mainview #cities .city .textLabel .after                 {background-image:url("+URL+"hardcode/invisible.png); width: 0px; height: 0px}");
GM_addStyle("#island #mainview #cities .city .textLabel .vacation              {color: #c3c3c3}");
GM_addStyle("#island #mainview #cities .city .textLabel .inactivity            {color: #c3c3c3}");
/* other miscellaneous minor code */
GM_addStyle("#container ul.resources .time                                     {background-image:url("+URL+"hardcode/time.png)}");
GM_addStyle("#container .resources .gold                                       {background-image:url("+URL+"hardcode/gold.png); width: 20px; height: 19px}");
GM_addStyle("#mainview h1                                                      {color: #f0f0f0; margin: 16px auto 0 19px; height: 30px}");
GM_addStyle("#diplomacyAdvisor #container #mainview #tab1 td.reply a.button    {color: #f0f0f0}");
GM_addStyle("#diplomacyAdvisor #container #mainview #tab1 td.reply a.button:hover {color: #ffff00; text-decoration: none}");
GM_addStyle("#container #mainview #notice input                                {color: #f0f0f0}");
GM_addStyle(".modifiersList ul:hover li ul                                     {background-color: #14181b; border: 2px double #000000; color: #f0f0f0}");
GM_addStyle(".modifiersList ul li ul                                           {background-image:url("+URL+"hardcode/invisible.png)}");
GM_addStyle("#finances #container #mainview table#balance tr.result td         {border-top: 1px solid #000000}");
GM_addStyle("#finances #container #mainview table#balance                      {margin-top: 8px; border: 2px double #000000}");
GM_addStyle("#safehouse #container #mainview .unit                             {background-image:url("+URL+"content/build.png)}");
GM_addStyle("#missionSummary .transporters .textLabel                          {color: #000000}");
GM_addStyle("#palace #container #mainview .contentBox01h .content th           {background-color: #d2d2d2}");
GM_addStyle("#colonize #mainview #createColony .costs                          {background-color: #c3c3c3; border: 2px double #c3c3c3; left: 0px}");
GM_addStyle("#wonderDetail #container #mainview .content h4                    {color: #000000}");
GM_addStyle("#buildingGround #container #mainview .building                    {background-image:url("+URL+"content/build.png)}");
GM_addStyle("#buildingGround #container #mainview .building hr                 {background-color: #c3c3c3; height: 2px}");
GM_addStyle("#buildingGround #container #mainview #buildings .building p.cannotbuild {color: #000000}");
GM_addStyle("#tearing                                                          {background-image:url("+URL+"content/contentbox.png)}");
GM_addStyle("#container .assignUnits .amount                                   {color: #000000}");
GM_addStyle("#missionSummary .additionalUpkeep                                 {background-image:url("+URL+"misc/gold_pos.png)}");
GM_addStyle("#missionSummary .estMissionCosts                                  {background-image:url("+URL+"hardcode/gold.png)}");
GM_addStyle("#demolition .content .yes, #NEResOfferPremium .content .yes       {background-image:url("+URL+"misc/yes.png); font-size: 12px; font-weight: bold}");
GM_addStyle("#demolition .content .no, #NEResOfferPremium .content .no         {background-image:url("+URL+"misc/no.png); font-size: 12px; font-weight: bold}");
/* WORLD VIEW
   world tiles */
GM_addStyle("#worldmap_iso #worldmap .ocean_feature1                           {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .ocean_feature2                           {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .ocean_feature3                           {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .ocean_feature4                           {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .ocean1                                   {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .ocean2                                   {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .ocean3                                   {background-image:url("+URL+"world/ocean.png)}");
GM_addStyle("#worldmap_iso #worldmap .island1                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island2                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island3                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island4                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island5                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island6                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island7                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island8                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island9                                  {background-image:url("+URL+"world/island.png)}");
GM_addStyle("#worldmap_iso #worldmap .island10                                 {background-image:url("+URL+"world/island.png)}");
/* resources and wonders */
GM_addStyle("#worldmap_iso #worldmap .tradegood1                               {background-image:url("+URL+"hardcode/wine.png)}");
GM_addStyle("#worldmap_iso #worldmap .tradegood2                               {background-image:url("+URL+"hardcode/marble.png)}");
GM_addStyle("#worldmap_iso #worldmap .tradegood3                               {background-image:url("+URL+"hardcode/glass.png)}");
GM_addStyle("#worldmap_iso #worldmap .tradegood4                               {background-image:url("+URL+"hardcode/sulfur.png)}");
GM_addStyle("#worldmap_iso #worldmap .island1 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island2 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island3 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island4 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island5 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island6 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island7 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island8 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island9 .tradegood                       {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .island10 .tradegood                      {bottom:53px; left:132px}");
GM_addStyle("#worldmap_iso #worldmap .wonder1                                  {background-image:url("+URL+"world/wonder1.png); width: 28px; height: 30px}");
GM_addStyle("#worldmap_iso #worldmap .wonder2                                  {background-image:url("+URL+"world/wonder2.png); width: 28px; height: 30px}");
GM_addStyle("#worldmap_iso #worldmap .wonder3                                  {background-image:url("+URL+"world/wonder3.png); width: 28px; height: 30px}");
GM_addStyle("#worldmap_iso #worldmap .wonder4                                  {background-image:url("+URL+"world/wonder4.png); width: 28px; height: 30px}");
GM_addStyle("#worldmap_iso #worldmap .wonder5                                  {background-image:url("+URL+"world/wonder5.png); width: 31px; height: 30px}");
GM_addStyle("#worldmap_iso #worldmap .wonder6                                  {background-image:url("+URL+"world/wonder6.png); width: 24px; height: 32px}");
GM_addStyle("#worldmap_iso #worldmap .wonder7                                  {background-image:url("+URL+"world/wonder7.png); width: 31px; height: 32px}");
GM_addStyle("#worldmap_iso #worldmap .wonder8                                  {background-image:url("+URL+"world/wonder8.png); width: 20px; height: 32px}");
GM_addStyle("#worldmap_iso #worldmap .island1 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island2 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island3 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island4 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island5 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island6 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island7 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island8 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island9 .wonder                          {bottom:60px; left:101px}");
GM_addStyle("#worldmap_iso #worldmap .island10 .wonder                         {bottom:60px; left:101px}");
/* miscellaneous */
GM_addStyle("#worldmap_iso #worldmap .islandMarked                             {background-image:url("+URL+"world/select.png); width: 238px; height: 120px; left: 0px; bottom: 0px}");
GM_addStyle("#worldmap_iso #worldmap .ownIslandMarked                          {background-image:url("+URL+"world/border.png); background-position: 0px 0px}");
GM_addStyle("#worldmap_iso #worldmap .cities                                   {background-image:url("+URL+"hardcode/invisible.png); background-color: #2c3033; border: 2px double #000000; bottom: 28px; left: 106px; padding-top: 1px; height: 16px}");

/* HARD CODE
   hack to replace "hard coded" images */
var replaceImages = new Array (
"action_back.gif|cancel_big.png",
"ambrosia_icon.gif|ambrosia.png",
"btn_max.gif|btn_max.png",
"btn_min.gif|btn_min.png",
"clock.gif|time.png",
"colony_build.jpg|invisible.png",
"crown.gif|crown.png",
"icon_glass.gif|glass.png",
"icon_gold.gif|gold.png",
"icon_marble.gif|marble.png",
"icon_message_write.gif|message.png",
"icon_sulfur.gif|sulfur.png",
"icon_wine.gif|wine.png",
"icon_wood.gif|wood.png",
"icon-back.gif|btn_min.png",
"icon-city2.gif|icon_city.png",
"icon-crossedswords.gif|invisible.png",
"icon-endurance2.gif|report_stamina.png",
"icon-helmet.gif|report_sum.png",
"icon-island.gif|icon_island.png",
"icon-kick.gif|report.png",
"icon-kiste.gif|actions.png",
"icon-map.gif|crosshair.png",
"icon-message.gif|message.png",
"icon_time.gif|time.png",
"icon-treaty-break.gif|cancel.png",
"icon_treaty_cancel.gif|cancel.png",
"icon-wall.gif|report_wall.png",
"icon-world.gif|icon_world.png",
"icon32_culturalgood.gif|invisible.png",
"level_green.gif|barracks_opt.png",
"level_green1.gif|barracks_opt.png",
"level_red.gif|barracks_min.png",
"level_red1.gif|barracks_min.png",
"shield-icon1.gif|report_defense03.png",
"shield-icon2.gif|report_defense02.png",
"shield-icon3.gif|report_defense02.png",
"shield-icon-report.gif|report_defense00.png",
"ship-attack-y27.gif|invisible.png",
"sigma.gif|report_sum.png",
"sword-icon1.gif|report_offense03.png",
"sword-icon2.gif|report_offense02.png",
"sword-icon3.gif|report_offense01.png",
"sword-icon-report.gif|report_offense00.png",
"unit_boom.gif|report_special.png",
"unit_attack.gif|land_attack.png",
"unit_defend.gif|land_defense.png",
"unit_helmet.gif|citizen.png",
"unit_speed.gif|report_stamina.png",
"unit_type.gif|land_stamina.png");

hardImageFix();

function hardImageFix()
{
   for ( i = 0 ; i < document.images.length; i++ )
   {
      for ( x = 0 ; x < replaceImages.length; x++ )
      {
         var imageReplace = replaceImages[x].split("|");
         
         if ( document.images[i].src.search(imageReplace[0]) != -1 )
         {
            document.images[i].src = URL + "hardcode/" + imageReplace[1];
         }         
      }
   }
}

/* HORIZONTAL SCROLL
   code which removes the useless horizontal scrollbar */
(function() {
var css = "body {overflow-x: hidden !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

/* QUICKBAR
   code which adds Ikariam Quickbar functionality */
unsafeWindow.places = GM_getValue("places","0");
var version="1.6";
var opened=0;

vquickbar = document.createElement("div");
vquickbar.setAttribute("id", "quickbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vquickbar);

unsafeWindow.showquick = function() {
    if(document.getElementById("quickbar").style.left == "-412px")
    {
        document.getElementById("quickbar").style.left = "0px;"
        unsafeWindow.qbbuildinterior();
    }
    if(opened==0)
    {
    unsafeWindow.qbbuildinterior();
    opened=1;
    }
}

unsafeWindow.hidequick = function() {
    document.getElementById("quickbar").style.left = "-412px;"
}

unsafeWindow.qbdeleteentry = function(deleteme) {
    deleteme = deleteme.slice(0,-1);
    var splitplaces = unsafeWindow.places.split(/;/);
    for(i = 0; i < splitplaces.length-1; i++){
        if(splitplaces[i] == deleteme){
            splitplaces.splice(i,1);
            break;
        }
    }
    if(splitplaces.length-1 > 0){
        unsafeWindow.places = splitplaces.join(';');
    }
    else{
        unsafeWindow.places = "0";
    }
    window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbrenameentry = function(renameme) {
    var renameto = prompt("Rename your Quickmark:","");
    if((renameto == '') || (renameto == '^') || (renameto == ';'))
    {
        alert("Invalid name! Cannot have ^ or ;!");
        return;
    }
    renameme = renameme.slice(0,-1);
    var splitplaces = unsafeWindow.places.split(/;/);
    var splitpiece = '';
    for(i = 0; i < splitplaces.length-1; i++){
        if(splitplaces[i] == renameme){
            splitpiece = splitplaces[i].split('|');
            splitplaces[i] = renameto + '|' + splitpiece[1];
            break;
        }
    }
    if(splitplaces.length-1 > 0){
        unsafeWindow.places = splitplaces.join(';');
    }
    window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbaddentry = function() {
    
    var addname = prompt("What would you like to name this location?","");
    if((addname.search(/\|/) != -1) || (addname.search(/;/) != -1))
    {
        alert('Invalid location name! No | or ;!');
        exit;
    }
    var addlocation = window.location;
    
    if(unsafeWindow.places != "0")
    {
    unsafeWindow.places += addname + '|' + addlocation + ';';
    }
    else
    {
    unsafeWindow.places = addname + '|' + addlocation + ';';
    }
    window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbexport = function() {
    if(unsafeWindow.places != "0"){
        prompt("Copy this! You can import it later!", unsafeWindow.places);
    }
    else {
        alert("You have no Quickmarks to export!");
    }
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbimport = function() {
    var imported = prompt("Paste you Quickmark(s) here. Make sure they follow the correct format! (nameofquickmark|http://pagelocationgoeshere.com;)","");
    if(unsafeWindow.places == "0"){
    unsafeWindow.places = imported;
    }
    else {
    unsafeWindow.places += imported;
    }
    unsafeWindow.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);    
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbdeleteall = function() {
    if(confirm("Are you absolutely sure you want to delete all your quickmarks?"))
    {
        unsafeWindow.places = "0";
        window.setTimeout(GM_setValue, 0, "places", "0");        
    }
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbmovedown = function(moveitdown) {
    moveitdown = moveitdown.slice(0,-1);
    var splitplaces = unsafeWindow.places.split(/;/);
    for(i = 0; i < splitplaces.length-1; i++){
        if(splitplaces[i] == moveitdown){
            if(i<splitplaces.length-1)
            {
                splitplaces[i] = splitplaces[i+1];
                splitplaces[i+1] = moveitdown;
                break;
            }
            else
            {
                alert("This quickmark is already the last in the list.");
                break;
            }
        }
    }
    unsafeWindow.places = splitplaces.join(';');
    window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbmoveup = function(moveitup) {
    moveitup = moveitup.slice(0,-1);
    var splitplaces = unsafeWindow.places.split(/;/);
    var moveitdown = '';
    for(i = 0; i < splitplaces.length-1; i++){
        if(splitplaces[i] == moveitup){
            if(i<splitplaces.length-1)
            {
                splitplaces[i] = splitplaces[i-1];
                splitplaces[i-1] = moveitup;
                break;
            }
            else
            {
                alert("This quickmark is already the last in the list.");
                break;
            }
        }
    }
    unsafeWindow.places = splitplaces.join(';');
    window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
    unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbbuildinterior = function()
{
    var qbHTML = '<div id="quicktab" onmouseover="javascript:showquick()" onclick="javascript:hidequick()"></div>';
    qbHTML    += '<div id="qhead"><a style="color: #f0f0f0;">Ikiariam Quickbar</a></div>';
    qbHTML    += '<div id="qplaces">';

    if(unsafeWindow.places != "0")
    {
        qbHTML += '<div style="border-bottom:1px #000000 solid; width:271px; margin-top:3px; height:166px; overflow-y:auto; overflow-x:hidden;"><table style="width:332px; border: none;">';
        var placepiece = '';
        var splitplaces = unsafeWindow.places.split(";");
        for(i = 0; i < splitplaces.length-1; i++){
            placepiece = splitplaces[i].split("|");
            qbHTML += '<tr>';
            qbHTML += '<td width="20%" align="right" valign="bottom">';
            if(i>0){
            qbHTML += '<a title="Move Quickmark Up" href="javascript:qbmoveup(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://www.ikariamods.com/gunmetal/carmine/content/btn_increase.png" border="0"></a>';
            }
            else {
            qbHTML += '<img src="http://www.imgboot.com/images/enigmabrand/movetrans.png" width="10" height="10" border="0">';
            }
            if(i<splitplaces.length-2){
            qbHTML += '<a title="Move Quickmark Down" href="javascript:qbmovedown(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://www.ikariamods.com/gunmetal/carmine/content/btn_decrease.png" border="0"></a>';
            }
            else {
            qbHTML += '<img src="http://www.imgboot.com/images/enigmabrand/movetrans.png" height="10" width="10" border="0">';
            }
            qbHTML += '<a title="Delete Quickmark" href="javascript:qbdeleteentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://www.ikariamods.com/gunmetal/carmine/content/delete.png" border="0"></a>';
            qbHTML += ' <a title="Rename Quickmark" href="javascript:qbrenameentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://www.ikariamods.com/gunmetal/carmine/content/rename.png" border="0"></a>-</td>';
            qbHTML += '<td align="left" width="80%" valign="bottom">&nbsp;<a href="' + placepiece[1] + '">' + placepiece[0] + '</a></td>';
            qbHTML += '</tr>';
        }
        qbHTML += '</table></div>';
    }
    else
    {
    qbHTML += '<div style="border-bottom:1px #000000 solid; width:271px; height:166px; overflow-y:auto; overflow-x:hidden;"><table style="width:271px; border: none; color: #000000"><tr><td align="center">No places saved</td></tr></table></div>';
    }

    qbHTML += '<a href="javascript:qbaddentry();"><b><small>Quickmark current page</b></small></a><br>';
    qbHTML += '<a href="javascript:qbexport();" title="Export list"><img src="http://www.ikariamods.com/gunmetal/carmine/content/btn_increase.png" border="0"></a>';
    qbHTML += ' <a href="javascript:qbimport();" title="Import list (append)"><img src="http://www.ikariamods.com/gunmetal/carmine/content/btn_decrease.png" border="0"></a>';
    qbHTML += ' <a href="javascript:qbdeleteall();" title="Delete all quickmarks"><img src="http://www.ikariamods.com/gunmetal/carmine/content/delete.png" border="0"></a>';
    qbHTML += '</div>';
    qbHTML += '<div id="qfoot"></div>';
    document.getElementById("quickbar").innerHTML = qbHTML;
}

GM_addStyle("#qhead          {background:url(http://www.ikariamods.com/gunmetal/carmine/bg/notebar_header.png); position: absolute; height: 21px; width: 282px; line-height: 20px; font-weight: bold; font-size: 11px; background-repeat: no-repeat; border-right: 2px double #000000}");
GM_addStyle("#quicktab       {background:url(http://www.ikariamods.com/gunmetal/carmine/bg/quickbar_title.png); position: absolute; height: 85px; width: 17px; left: 284px}");
GM_addStyle("#quickbar       {width: 284px; position: absolute; left: -284px; height: 228px; top: 129px; z-index: 150; background-color: #d2d2d2; background:url(http://www.ikariamods.com/gunmetal/carmine/bg/quickbar_title.png)}");
GM_addStyle("#quickbar:hover {width: 284px; left: 0px; background:url(http://www.ikariamods.com/gunmetal/carmine/bg/quickbar.png); background-repeat: no-repeat}");
GM_addStyle("#qplaces        {position: absolute; top: 21px; left: 7px; bottom: 3px; border: none; font-size: 12px; overflow:auto; width: 271px; height: 205px; background-color: #d2d2d2}");
document.getElementById("quickbar").innerHTML = '<div id="quicktab" onmouseover="showquick()" onclick="hidequick()"></div>';

/* NOTEBAR
   code which adds Ikariam Notebar functionality */
var mynotes = GM_getValue("mynotes", "Click here to begin taking notes!");

vnotebar = document.createElement("div");
vnotebar.setAttribute("id", "notebar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vnotebar);

unsafeWindow.savenotes = function() {
    window.setTimeout(GM_setValue, 0, "mynotes", document.getElementById("notes").value);
}

unsafeWindow.startnotes = function() {
    if(document.getElementById("notes").value == "Click here to begin taking notes!")
    {
        document.getElementById("notes").value = "";
    }
}

unsafeWindow.shownotes = function() {
    if(document.getElementById("notebar").style.left == "827px")
    {
        document.getElementById("notebar").style.left = "0px;"
    }
}

unsafeWindow.hidenotes = function() {
    document.getElementById("notebar").style.left = "827px;"
}

GM_addStyle("#nhead         {background:url(http://www.ikariamods.com/gunmetal/carmine/bg/notebar_header.png); position: absolute; height: 21px; width: 343px; line-height: 20px; font-weight: bold; font-size: 11px; background-repeat: no-repeat}");
GM_addStyle("#notetab       {background:url(http://www.ikariamods.com/gunmetal/carmine/bg/notebar_title.png); position: absolute; height: 85px; width: 17px; left: 345px}");
GM_addStyle("#notebar       {width: 345px; position: absolute; left: -345px; height: 228px; top: 36px; z-index: 150; background-color: #d2d2d2; background:url(http://www.ikariamods.com/gunmetal/carmine/bg/notebar_visible.png)}");
GM_addStyle("#notebar:hover {width: 345px; left: 0px; background:url(http://www.ikariamods.com/gunmetal/carmine/bg/notebar.png); background-repeat: no-repeat}");
GM_addStyle("#notes         {position: absolute; top: 21px; left: 7px; bottom: 3px; background: #d2d2d2; border: none; font-size: 12px; padding: 3px}");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML    += '<div id="nhead"><a style="color: #f0f0f0;">Ikariam Notebar</a></div>';
nbHTML    += '<textarea id="notes" cols="56" wrap="soft" rows="12" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML    += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

/* UPDATE NOTIFICATION
   code which automatically notifies user of script updates */
scriptName='Gunmetal Ikariam (Carmine Edition)';
scriptId='32389';
scriptVersion=0.86;
scriptUpdateText='For a full list of changes visit: http://userscripts.org/scripts/show/32389';
var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (parseInt(navigator.appVersion)>3) {
    if (navigator.appName=="Netscape") {
        winW = window.innerWidth;
        winH = window.innerHeight;
    }
    if (navigator.appName.indexOf("Microsoft")!=-1) {
        winW = document.body.offsetWidth;
        winH = document.body.offsetHeight;
    }
}
if (currentTime > (lastCheck + 86400)) { //24 hours after last check
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
        headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
        onload: function(responseDetails) {
            var text = responseDetails.responseText;
            var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
            var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
            if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
GM_addStyle("#gm_update_alert                      {background-image:url(http://www.ikariamods.com/gunmetal/carmine/bg/sidebox_header.png); position: fixed; z-index:100000; top: "+((winH/2)-160)+"px; left: "+((winW/2)-200)+"px; width: 224px; background-repeat: no-repeat; background-position: -2px -2px; background-color: #14181b; padding-top: 2px; text-align: left; border: 2px double #000000}");
GM_addStyle("#gm_update_alert_buttons              {position: relative; top: -5px; margin: 7px}");
GM_addStyle("#gm_update_alert_button_close         {background-image:url(http://www.ikariamods.com/gunmetal/carmine/misc/button.png); font-weight: bold; font-size: 11px; width: 35px; height: 14px; position: absolute; top: 112px; left: 84px; padding: 3px 6px 3px 6px; z-index: inherit; color: #f0f0f0; cursor:pointer}");
GM_addStyle("#gm_update_alert_buttons span         {text-decoration:none; color: #f0f0f0; font-weight: bold; font-size: 11px; cursor:pointer}");
GM_addStyle("#gm_update_alert_buttons span a       {text-decoration:none; color: #f0f0f0; font-weight: bold; font-size: 11px; cursor:pointer}");
GM_addStyle("#gm_update_alert_buttons span a:hover {text-decoration:none; color: #ffff00; font-weight: bold; cursor:pointer}");
                newversion = document.createElement("div");
                newversion.setAttribute('id', 'gm_update_alert');
                newversion.innerHTML = ''
                +'  <center><b><font color="#f0f0f0">Gunmetal Ikariam (Carmine Edition)</font></b><br><br>'
                +'  There is an update available!</center>'
                +'  <div id="gm_update_alert_button_close">'
                +'      <center>Close</center></div>'
                +'  <div id="gm_update_alert_buttons">'
                +'  <span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;from&nbsp;version&nbsp;'+scriptVersion+'&nbsp;to&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
                +'  <span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;to&nbsp;script&nbsp;homepage</a></span>&nbsp;&nbsp;'
                +'  <span id="gm_update_alert_button_wait"><a href="#">Remind&nbsp;me&nbsp;again&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
                +'  <span id="gm_update_alert_button_waitnextversion"><a href="#">Remind&nbsp;me&nbsp;at&nbsp;the&nbsp;next&nbsp;version</a></span> </div><br>';
                document.body.insertBefore(newversion, document.body.firstChild);
                document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
                document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
                document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
                }
            }
    });
}

/* SOURCES CITED
   Sevensins for the "hard coded" image hack
   Blazed-d for the webspace (www.ikariamods.com)
   subverted and EuroDance for the horizontal scrollbar removal code (http://userscripts.org/scripts/show/32292)
   Seifer for the auto update-notification script (http://userscripts.org/scripts/show/12193)
   EnigmaBrand for the Ikariam Notebar code (http://ikariamwikibar.googlepages.com/home) */