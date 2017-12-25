$(document).ready(function() {
    var artDiv = $('.article');
    $('#find').on('click', function(f) {
        f.preventDefault();
        var searchterm = $('#input').val();
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + searchterm;
        var page = 'https://en.wikipedia.org/?curid=';
        $.ajax({
            type: 'GET',
            url: api,
            dataType: "json",
            success: function(array) {
                artDiv.empty();
                var result = array.query.pages;
                for (var prop in result) {
                    var newart = $('<div>').addClass("row content");
                    var titleS = $("<div>").html("<a href=" + page + prop + "' target='_blank'>" + result[prop].title + "</a>" + "<br>" + "<a href=" + page + prop + "' target='_blank'>" + result[prop].extract + "</a>");
                    newart.append(titleS);
                    artDiv.append(newart);
                }
            }
        });
    });
    $('#random').on('click', function(r) {
        r.preventDefault();
        window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank')
    })
});
