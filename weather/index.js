$(document).ready(function() {
    function changeCelsiusDegree(cel) {
        return cel * 9 / 5 + 32;
    }
    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'

        ];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let day = days[a.getDay()];
        let time = day + ', ' + date + ' ' + month + ' ' + year;
        return time;
    }
    $("#find").click(function() {
        let address = $("#input").val().split(" ").join("+");
        let google_key = "AIzaSyACObD_IqVU6wHYa9uiroiraZbkXDNBwJw";
        let google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${google_key}`
        $.ajax({url: google_url, datatype: "json"}).done(data => {
            let address = data.results[0].formatted_address;
            let lat = data.results[0].geometry.location.lat;
            let lng = data.results[0].geometry.location.lng;
            let weather_key = "60174b206c1ec5ad81b665c91d64730f";
            let weather_url = `https://api.darksky.net/forecast/${weather_key}/${lat},${lng}?units=si&exclude=minutely,daily,alert,flags`;
            $.ajax({url: weather_url, datatype: "json"}).done(weather => {
                $("#time").html(`Forecast for: ${timeConverter(weather.currently.time)}`)
                $("#here").html(`<img src="https://i.imgur.com/GWsCg4M.png" title="Marker" alt="marker"/>${address}`);
                $("#hourly").html(weather.hourly.summary.replace(".", ""));
                $("#temp").html("Temperature: " + "<span id = 'cel'>" + weather.currently.temperature.toFixed() + "</span>" + "<span id = 'change'>&deg;C</span>");
                $("#rain").html(`Rain: ${weather.currently.precipProbability * 100}%`)
                $("#humid").html("Humidity: " + weather.currently.humidity.toFixed(1) * 100 + "%");
                $("#wind").html("Windspeed: " + weather.currently.windSpeed + " m/s");
                $
                var icon = weather.currently.icon;
                var skycons = new Skycons({"color": "#42A5F5", "resizeClear": true});
                skycons.add("icon1", icon);
                skycons.play();
                var state = true;
                $("#change").css('cursor', 'pointer');
                $(document).on("click", "#change", function() {
                    if (state === true) {
                        var fahrenheit = changeCelsiusDegree($("#cel").text());

                        $("#cel").html(fahrenheit.toFixed());
                        $("#change").html("&deg;F");
                        state = false;
                    } else {
                        $("#cel").html(weather.currently.temperature.toFixed());
                        $("#change").html("&deg;C");
                        state = true;
                    }
                });
            })
        })
    })

})
