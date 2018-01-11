$(document).ready(function() {
    $(".message").html("<h2 style='margin-top:80px;'>Press to start</h2>");
    $("#nextPhrase").click(function() {
        $.ajax({type: 'GET', dataType: 'json', url: 'https://raw.githubusercontent.com/Semigradsky/phrasal-verbs/master/common.json'}).done(data => {
            let i = Math.floor(Math.random() * data.length)
            $(".message").html("<h2>" + data[i].verb + "</h2>" + data[i].definition + "<br> <hr> <p class='example'> Examples:  " + data[i].examples + "</p>");
        });
    });
});
