var teams = ['Dallas Cowboys', 'New York Giants', 'Philadelphia Eagles', 'Washington Redskins',
    'Seattle Seahawks', 'San Francisco 49ers', 'Arizona Cardinals', 'Los Angeles Rams', 'Carolina Panthers', 'Tampa Bay Buccaneers', 'Atlanta Falcons', 'New Orleans Saints',
    'Chicago Bears', 'Green Bay Packers', 'Minnesota Vikings', 'Detroit Lions'
];

function addButton(teamName) {
    var button = $('<button>');
    button.attr('class', 'btn btn-info team-btn');
    button.attr('data-team', teamName);
    button.text(teamName);
    $('#team-buttons').append(button);
}

function addTeam(teamName) {
    if (!teams.includes(teamName)) {
        teams.push(teamName);
    } else {
        $('.alert').show();
    }
}

function showButtons() {
    $('#team-buttons').html('');
    for (var i = 0; i < teams.length; i++) {
        addButton(teams[i]);
    }
}

$(document).ready(function() {
    $('#add-team').on('click', function() {
        var searchTerm = $('#team-input').val();
        addTeam(searchTerm);
        showButtons();
        return false;
    });

    $('#close-alert-button').click(function() {
        $('.alert').hide();
    });
    showButtons();

    $(document).on('click', '.team-btn', function() {
        $('#team-gifs').html('');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?';
        var searchTerm = 'q=' + $(this).data('team');
        var limitSearch = '&limit=10';
        var rating = '&rating=g&pg';
        var apiKey = '&api_key=dc6zaTOxFJmzC';
        queryURL = queryURL + searchTerm + limitSearch + rating + apiKey;

        $(document).on('click', '.team-img', function() {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var imagesArray = response.data;
                for (var i = 0; i < imagesArray.length; i++) {
                    var imgUrl = imagesArray[i].images.fixed_height_still.url;
                    var animatedImgUrl = imagesArray[i].images.fixed_height.url;
                    var imgDiv = $('<div>');
                    imgDiv.attr('class', 'img-div');
                    var rating = $('<p>');
                    rating.text('Rating: ' + imagesArray[i].rating);
                    var img = $('<img>');
                    imgDiv.append(rating);
                    imgDiv.append(img);
                    img.attr('src', imgUrl);
                    img.attr('class', 'team-img');
                    img.attr('data-still', imgUrl);
                    $('#team-gifs').prepend(imgDiv);
                }
            });
    });
});
