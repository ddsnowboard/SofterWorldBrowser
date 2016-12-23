function Comic(url, title) {
    this.url = url;
    this.title = title;
}
$(document).ready(function() {
    function getComic(number, async) {
        var xhr = new XMLHttpRequest();
        var output;
        xhr.onreadystatechange = function(event) {
            if (this.readyState === 4) {
                var response = JSON.parse(this.response);
                comics[number] = new Comic(response.url, response.title);
                output = new Comic(response.url, response.title);
                $("#prefetch").append("<img src=\"" + output.url + "\">");
            }
        };
        xhr.open("get", "getComic.php?number=" + number.toString(), async);
        xhr.send();
        if (!async)
            return output;
    }

    function startCaching(number) {
        getComic(number - 1, true);
        getComic(number + 1, true);
        nextRand = Math.floor(Math.random() * maxComics) + 1;
        getComic(nextRand, true);
    }

    function showComic(number) {
        $("#titleBox").click();
        if (comics[number] == undefined) {
            getComic(number, false);
        }
        $("#imageHolder").html("<img src=\"" + comics[number].url + "\">");
        $("#number").html(number);
        startCaching(number);
    }
    var maxComics;
    var comicNum;
    var nextRand;
    var comics = {};
    $("#left").click(function() {
        if (comicNum != undefined) {
            comicNum--;
            showComic(comicNum);
        }
    });
    $("#right").click(function() {
        if (comicNum != undefined) {
            comicNum++;
            showComic(comicNum);
        }
    });
    $("#random").click(function() {
        if (maxComics != undefined) {
            if (nextRand == undefined) {
                nextRand = Math.floor(Math.random() * maxComics) + 1;
            }
            comicNum = nextRand;
            showComic(comicNum);
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
        if (event.which === 27)
            $("#titleBox").click();
        else if (event.which === 90)
            $("#left").click();
        else if (event.which === 67)
            $("#right").click();
        else if (event.which === 83)
            $("#random").click();
        else if (event.which === 88)
            $("#showTitle").click();
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
    var startXHR = new XMLHttpRequest();
    startXHR.onreadystatechange = function(event) {
        if (this.readyState === 4) {
            var response = JSON.parse(this.response);
            comicNum = response.number;
            maxComics = comicNum;
            comics[comicNum] = new Comic(response.url, response.title);
            showComic(comicNum);
            startCaching(comicNum);
        }
    };
    startXHR.open("get", "newestComic.php");
    startXHR.send();
});
