$(document).ready(function() {
    const content = $('.content');
    const api_key = "0C01ED8543170489D20A83F264ADC90C";
    let playerID;
    let message = "";
    $(document).keypress(e => {
        var key = e.which;
        if (key == 13) { // the enter key code
            $('#find').click();
            return false;
        }
    });
    $("#find").click(_ => {
        let input = $("#input").val();
        if (isNaN(parseInt(input))) {
            input = input.split("/");
            let len = input.length;
            input = input[len - 1] === ""
                ? input[len - 2]
                : input[len - 1];
            if (isNaN(input)) {

                $.ajax({url: `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${api_key}&vanityurl=${input}`, dataType: 'json'}).then(data => {
                    data = data.response.steamid;
                    console.log(data);
                    if (data) {
                        playerID = to32(data);
                        opendota(playerID);
                    } else {
                        $(".messsage").html("<p>Steam Not Found</p>");
                    }
                })
            } else {
                playerID = to32(input);
                opendota(playerID);
            }
        } else {
            $.ajax({url: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${parseInt(input)}`, dataType: 'json'}).then(data => {
                data = data.response.players;
                playerID = data.length === 0
                    ? input
                    : to32(input);
                opendota(playerID);
            })
        }

    });
    function opendota(id) {
        $.ajax({url: `https://api.opendota.com/api/players/${id}`, datatype: "json"}).then(data => {
            if (!data.profile) {
                $(".message").html("<p>DotaBuff Not Found</p>");
            } else {
                let table = $("<table>");
                let tr = $("<tr>");
                table.append(tr)
                table.addClass("table");
                let avatar = `<td><img src='${data.profile.avatarmedium}' /><td>`;
                let name = `<td>${data.profile.personaname}</td>`
                let soloMMR = data.solo_competitive_rank
                    ? data.solo_competitive_rank
                    : "----"
                let solo = `<td>Solo MMR:${soloMMR}</td>`;
                let steam = `<td><a href='data.profile.profileurl'>ID: ${data.profile.account_id}</a></td>`
                let dotabuff = '<td><a href="https://www.dotabuff.com/players/' + id + '" target="_blank" >DOTABUFF</a></td>'

                tr.html(avatar + name + solo + steam + dotabuff);
                $(".content").html(table);
            }

        })
    }

    function to32(bit64) {
        var big = bigInt(bit64);
        var minus = bigInt('76561197960265728');
        var result = big.subtract(minus);
        return result.value;
    }
});
