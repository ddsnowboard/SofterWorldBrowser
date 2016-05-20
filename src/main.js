function Comic(url, title)
{
    this.url = url;
    this.title = title;
}
$(document).ready(function() 
        {
            function getComic(number)
            {
                var xhr = new XMLHttpRequest();
                var output;
                xhr.onreadystatechange = function(event)
                {
                    if(this.readyState === 4)
                    {
                        var response = JSON.parse(this.response);
                        output = new Comic(response.url, response.title);
                    }
                };
                xhr.open("get", "getComic.php?number=" + number.toString(), false);
                console.log("getComic.php?number=" + number.toString());
                xhr.send();
                return output;
            }
            function startCaching(number)
            {
                comics[number - 1] = getComic(number - 1);
                comics[number + 1] = getComic(number + 1);
                nextRand = Math.floor(Math.random() * maxComics) + 1;
                comics[nextRand] = getComic(nextRand);
            }
            function showComic(number)
            {
                $("#titleBox").click();
                if(comics[number] == undefined)
                {
                    comics[number] = getComic(number);
                }
                $("#imageHolder").html("<img src=\"" + comics[number].url + "\">");
                $("#number").html(number);
            }
            var maxComics;
            var comicNum;
            var nextRand;
            var comics = {};
            $("#left").click(function()
                    {
                        if(comicNum != undefined)
                        {
                            comicNum--;
                            showComic(comicNum);
                        }
                    });
            $("#right").click(function()
                    {
                        if(comicNum != undefined)
                        {
                            comicNum++;
                            showComic(comicNum);
                        }
                    });
            $("#random").click(function()
                    {
                        if(maxComics != undefined)
                        {
                            if(nextRand == undefined)
                            {
                                nextRand = Math.floor(Math.random() * maxComics) + 1;
                            }
                            comicNum = nextRand;
                            showComic(comicNum);
                            nextRand = undefined;
                        }
                    });
            $("#showTitle").click(function() 
                    {
                        $("#titleBox").html(comics[comicNum].title);
                        $("#titleBox").css("display", "block");
                    });
            $(document).keydown(function(event)
                    {
                        if(event.which === 27)
                            $("#titleBox").click();
                        else if(event.which === 90)
                            $("#left").click();
                        else if(event.which === 67)
                            $("#right").click();
                        else if(event.which === 83)
                            $("#random").click();
                        else if(event.which === 88)
                            $("#showTitle").click();
                    });
            $("#titleBox").click(function()
                    {
                        if($(this).css("display") === "block")
                            $("#titleBox").css("display", "none");
                    });
            var startXHR = new XMLHttpRequest();
            startXHR.onreadystatechange = function(event)
            {
                if(this.readyState === 4)
                {
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
