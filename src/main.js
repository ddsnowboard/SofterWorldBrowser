function Comic(url, title, favorite) {
    this.url = url;
    this.title = title;
    this.favorite = favorite;
}
$(document).ready(function() {
    function getComic(number, asynchronous) {
        var xhr = new XMLHttpRequest();
        var output;
        xhr.onreadystatechange = function(event) {
            if (this.readyState === 4) {
                var response = JSON.parse(this.response);
                // THIS IS JUST A STOPGAP; I NEED TO CHANGE THIS WHEN I ACTUALLY DO THE 
                // FEATURE
                response.favorite = false;
                comics[number] = new Comic(response.url, response.title, response.favorite);
                $("#prefetch").append("<img src=\"" + comics[number].url + "\">");
            }
        };
        // I know that using synchronous XHR's is bad, but otherwise it gets really complicated 
        // and as far as my testing shows, nothing bad happens when I do it this way 
        xhr.open("get", "getComic.php?number=" + number.toString(), asynchronous);
        xhr.send();
        if (!asynchronous)
            return comics[number];
    }

    function startCaching(number) {
        getComic(number - 1, true);
        getComic(number + 1, true);
        nextRand = Math.floor(Math.random() * maxComics) + 1;
        getComic(nextRand, true);
    }

    function showComic(number, fromBackButton) {
        if(fromBackButton == false)
            history.pushState(number, "#" + number.toString(), "?comic=" + number);
        // This removes the title box if it's there
        $("#titleBox").click();
        if (comics[number] == undefined) {
            getComic(number, false);
        }
        $("#imageHolder").html("<img src=\"" + comics[number].url + "\">");
        $("#number").html(number);
        startCaching(number);
    }
    window.onpopstate = function(state)
    {
        showComic(state.state, true);
    };
    var maxComics;
    var comicNum;
    var nextRand;
    var comics = {};
    $("#left").click(function() {
        if (comicNum != undefined) {
            comicNum--;
            showComic(comicNum, false);
        }
    });
    $("#right").click(function() {
        if (comicNum != undefined) {
            comicNum++;
            showComic(comicNum, false);
        }
    });
    $("#random").click(function() {
        if (maxComics != undefined) {
            if (nextRand == undefined) {
                nextRand = Math.floor(Math.random() * maxComics) + 1;
            }
            comicNum = nextRand;
            showComic(comicNum, false);
            nextRand = undefined;
            startCaching(comicNum);
        }
    });
    $("#showTitle").click(function() {
        var $titleBox = $("#titleBox");
        if ($titleBox.css("display") === "none") {
            $titleBox.html(comics[comicNum].title);
            $titleBox.css("display", "block");
        } else
            $titleBox.click();
    });
    $(document).keydown(function(event) {
        var ESCAPE = 27;
        var Z = 90;
        var C = 67;
        var S = 83;
        var X = 88;
        var F = 70;
        switch(event.which) {
            case ESCAPE:
                $("#titleBox").click();
                break;
            case Z:
                $("#left").click();
                break;
            case C:
                $("#right").click();
                break;
            case S:
                $("#random").click();
                break;
            case X:
                $("#showTitle").click();
                break;
            case F:
                $("#favorite").click();
                break;
        }
    });
    var lastTouchStartingX = 0;
    var lastTouchStartingY = 0;
    var ignoringLift = true;
    document.getElementById("imageHolder").addEventListener("touchstart", function(event) {
        if(event.touches.length > 1)
        {
            ignoringLift = true;
            return;
        }
        ignoringLift = false;
        event.preventDefault();
        lastTouchStartingX = event.changedTouches[0].screenX;
        lastTouchStartingY = event.changedTouches[0].screenY;
    });

    document.getElementById("imageHolder").addEventListener("touchend", function(event) {
        if(ignoringLift)
        {
            ignoringLift = true;
            return;
        }
        var MINIMUM_DELTA = 50;
        event.preventDefault();
        var newX = event.changedTouches[0].screenX;
        var newY = event.changedTouches[0].screenY;
        if (Math.abs(newX - lastTouchStartingX) >= MINIMUM_DELTA) {
            if (newX > lastTouchStartingX)
                $("#left").click();
            else
                $("#right").click();
        }
        else if(Math.abs(newY - lastTouchStartingY) >= MINIMUM_DELTA)
            $("#random").click();
        else
            $("#showTitle").click();
    });
    $("#titleBox").click(function() {
        if ($(this).css("display") === "block")
            $("#titleBox").css("display", "none");
    });
    $("#favorite").click(function() {
        $(this).toggleClass("favorited");
    });


    // This handles the possibility of the browser recovering from a 
    // crash or someone clicking on a link to get a comic and having
    // a comic number in the URL from a session that we don't have
    // on the history stack. This is only run when you first load
    // the site.
    var queryString = new URLSearchParams(window.location.search);
    var queryHasComic = queryString.has("comic");
    if(queryHasComic)
    {
        comicNum = parseInt(queryString.get("comic"));
        showComic(comicNum, false);
    }
    var startXHR = new XMLHttpRequest();
    startXHR.onreadystatechange = function(event) {
        if (this.readyState === 4) {
            var response = JSON.parse(this.response);
            if(!queryHasComic)
            {
                comicNum = response.number;
                showComic(comicNum, false);
            }
            maxComics = comicNum;
            // THIS IS JUST A STOPGAP; I NEED TO CHANGE THIS WHEN I ACTUALLY DO THE 
            // FEATURE
            response.favorite = false;
            comics[comicNum] = new Comic(response.url, response.title, response.favorite);
            startCaching(comicNum);
        }
    };
    startXHR.open("get", "newestComic.php");
    startXHR.send();
});
