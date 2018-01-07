$(document).ready(function() {
    const content = $('.content');
    let regions = ["Americas", "Europe", "SE Asia", "China"];
    let regions_array = regions.map(a => a.split(" ").join("_").toLowerCase());
    let selected_region = regions_array[0];
    let ul = $("<ul>");
    $(".options").append(ul);
    regions.forEach((a, b) => {
        ul.append(`<li class='list-group-item' id='${regions_array[b]}'><a>${a}</a></li>`)
    })
    let table = $("<table>");
    table.addClass("table table-bordered");
    $("li").click(function() {
        selected_region = $(this).attr("id");
        $.ajax({url: `http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=${selected_region}`, datatype: "json"}).done(data => {
            let region = regions[regions_array.indexOf(selected_region)];
            $(".region").html(`<h2>${region}</h2>`);
            data = data.leaderboard;
            let thead = "<thead class='thead-dark'><tr><th class='rank'>Division Rank</th><th id='header-player' class='player'>Player</th</tr></thead>";
            let rows = "";
            data.forEach((a, b) => {
                console.log(a);
                let imgurl = "http://steamcommunity-a.akamaihd.net/public/images/countryflags/"

                let team = a.team_tag
                    ? a.team_tag + "."
                    : "";

                let player = a.name;
                let sponsor = a.sponsor
                    ? "." + a.sponsor
                    : "";
                let country = a.country
                    ? "<img class='country' src='" + imgurl + a.country + ".gif '" + " />"
                    : "";
                let name = team + player + sponsor;
                rows += `<tr><td class='rank'>${b + 1}</td><td>${name}<span>${country}</span></td></tr>`;
            })
            table.html(thead + rows);
            content.html(table);
        })

    })

    $.ajax({url: `http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=${selected_region}`, datatype: "json"}).done(data => {
        let region = regions[regions_array.indexOf(selected_region)];
        $(".region").html(`<h2>${region}</h2>`);
        data = data.leaderboard;
        let thead = "<thead class='thead-dark'><tr><th class='rank'>Division Rank</th><th id='header-player' class='player'>Player</th</tr></thead>";
        let rows = "";
        data.forEach((a, b) => {
            let imgurl = "http://steamcommunity-a.akamaihd.net/public/images/countryflags/"
            let team = a.team_tag
                ? a.team_tag + "."
                : "";
            let player = a.name;
            let sponsor = a.sponsor
                ? "." + a.sponsor
                : "";
            let country = a.country
                ? "<img class='country' src='" + imgurl + a.country + ".gif '" + " />"
                : "";
            let name = team + player + sponsor;
            rows += `<tr><td class='rank'>${b + 1}</td><td>${name}<span>${country}<span></td></tr>`;

        })
        table.html(thead + rows);
        content.html(table);
    })
});
