$(document).ready(function() {
    const content = $('.content');
    content.append($("<table>"));
    $("table").addClass("table");
    $("table").html("<thead><tr><th>Rank</th><th>Name</th><th>USD Price</th><th>BTC Price</th></tr></thead>");
    $("thead").addClass("thead-dark");
    const url = "https://api.coinmarketcap.com/v1/ticker/?limit=10";
    $.ajax({url: url, datatype: "json"}).then(data => {
        console.log(data);
        data.forEach(coin => {
            let row = $("<tr>");
            let rank = `<td class="rank">${coin.rank}</td>`;
            let name = `<td class="name">${coin.name}</td>`;
            let price_usd = `<td class="usd" >${Math.round(coin.price_usd * 100) / 100} USD</td>`;
            let price_btc = `<td class="btc">${Math.round(coin.price_btc * 1000) / 1000} BTC</td>`;
            row.html(rank + name + price_usd + price_btc);
            $("table").append(row);
        })
    }).catch(error => {
        console.log(error);
    })
});
