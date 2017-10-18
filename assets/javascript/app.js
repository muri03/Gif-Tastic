$(document).ready(function() {
    var cities = ["new york city", "los angeles", "san francisco", "las vegas"];

    function displayCityInfo() {
        var cityName = $(this).attr("data-name");
        // Constructing a URL to search Giphy for the entered city
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cityName + "&api_key=0g2gvsPw2fBKjFCDa38eUbxcKEk6HjnV&limit=12";
        // Performing our AJAX GET request 
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the API
            .done(function(response) {
                // Storing an array of results in the results variable
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var cityImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        cityImage.attr("src", results[i].images.fixed_height.url);

                        // Appending the paragraph and cityImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(cityImage);

                        // Prepending the gifDiv to the "#city-view" div in the HTML
                        $("#city-view").prepend(gifDiv);
                    }
                }
            });
    	}

    // Function for displaying city data
    function renderButtons() {

        // Deleting the city buttons prior to adding new city buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#button-holder").empty();

        // Looping through the array of cities
        for (var i = 0; i < cities.length; i++) {

            // Then dynamicaly generating buttons for each city in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("cities");
            // Adding a data-attribute with a value of the city at index i
            a.attr("data-name", cities[i]);
            // Providing the button's text with a value of the city at index i
            a.text(cities[i]);
            // Adding the button to the HTML
            $("#button-holder").append(a);
        }
    }

    // This function handles events where one button is clicked
	 $("#add-city").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var city = $("#city-input").val().trim();
        // The city from the textbox is then added to our array
        cities.push(city);
        console.log(cities);

        // calling renderButtons which handles the processing of our city array
        renderButtons();
    });

    $(document).on("click", ".cities", displayCityInfo);

    // Calling the renderButtons function at least once to display the initial list of city
    renderButtons();


});