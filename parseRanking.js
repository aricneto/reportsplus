// ==UserScript==
// @name         aricneto's Ranking Copy
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Allows you to copy off/mil/def rankings of your own alliance
// @author       aricneto
// @include      https://w*.crownofthegods.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var ranking;
    var alliance = cotg.player.alliance();

    $(document).ready(function() {
        //create a button
        var copyMilRankButton = "<button class='greenb tooltip tooltipstered' style='position: absolute; bottom: 30px; right: 20px; z-index:1000' id='aric_copyMilRank'>Copy Mil Rank</button>";

        var copyOffRankButton = "<button class='greenb tooltip tooltipstered' style='position: absolute; bottom: 30px; right: 20px; z-index:1000' id='aric_copyOffRank'>Copy Off Rank</button>";

        var copyDefRankButton = "<button class='greenb tooltip tooltipstered' style='position: absolute; bottom: 30px; right: 20px; z-index:1000' id='aric_copyDefRank'>Copy Def Rank</button>";
        //add it to the game
        $("#militaryRankings").before(copyMilRankButton);
        $("#offenseRankings").after(copyOffRankButton);
        $("#defenseRankings").after(copyDefRankButton);

        //make the button do something
        $('#aric_copyMilRank').off('click');
        $('#aric_copyOffRank').off('click');
        $('#aric_copyDefRank').off('click');

        $('#aric_copyMilRank').click(function () {
            copyRank("Mil", 16);
        });

        $('#aric_copyOffRank').click(function () {
            copyRank("Off", 17);
        });

        $('#aric_copyDefRank').click(function () {
            copyRank("Def", 18);
        });
    });

    function copyRank(title, type) {
        let data = title + " Rank,Player,Score\r";

        if (ranking != undefined) {
            ranking[type].forEach(player => {
                if (player[3] == alliance) {
                    data += player[0] + "," + player[1] + "," + player[2] + "\r";
                }
            });
        }
        navigator.clipboard.writeText(data);
    }

    setTimeout(function () {
        (function (open) {
            XMLHttpRequest.prototype.open = function () {
                this.addEventListener("readystatechange", function () {
                    if (this.readyState == 4) {
                        var url = this.responseURL;
                        if (url.indexOf('gR.php') != -1) {
                            ranking = JSON.parse(this.response);
                        }
                    }
                }, false);
                open.apply(this, arguments);
            };
        })(XMLHttpRequest.prototype.open);
    }, 4000);



})();