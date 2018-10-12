var topics = ["beyonce", "robyn", "lady gaga", "ciara"];

$(document).ready(function () {

    renderButtons();

    $(document).on("click", ".musician", function () {
        $("#gif-display").empty();
        var musician = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            musician + "&api_key=H0dv1uvUBqsj4vHzwLWUyerqxsmp4DK1&limit=10";
        console.log("button");

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;
                    console.log(rating);

                    var p = $("<p>").text("Rating: " + rating);


                    var celebImage = $("<img>");
                    celebImage.addClass("celebImage");
                    celebImage.attr("src", results[i].images.fixed_height_still.url);
                    celebImage.attr("data-still", results[i].images.fixed_height_still.url);
                    celebImage.attr("data-animate", results[i].images.fixed_height.url);
                    celebImage.attr("data-state", "still");


                    gifDiv.prepend(p);
                    gifDiv.prepend(celebImage);

                    $("#gif-display").prepend(gifDiv);


                }
            });

    })

    $(document).on("click", ".celebImage", function () {
        var state = $(this).attr("data-state")
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })


    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("musician");
            // Added a data-attribute
            a.attr("data-person", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the HTML
            $("#buttons").append(a);
        }
    }

    $("#add-musician").on("click", function (event) {
        event.preventDefault(); // preventDefault makes it so the page doesn't refresh when submitting data during the ajax call

        var musicians = $("#musician-input").val().trim();

        topics.push(musicians);

        renderButtons();
    })
})

