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
                            output = new Comic(this.response.url, this.response.title);
                        }
                    };
                    xhr.open("get", "getComic?number=" + number.toString(), false);
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
                if(comics[number] == undefined)
                {
                    comics[number] = getComic(number);
                }
                $("#imageHolder").html("<img src=\"" + comics[number] + "\">");
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
                        }
                    });
            $("#title").click(function() 
                    {
                        $("#titleBox").html(comics[comicNum].title);
                        $("#titleBox").css("visibility", "visible");
                    });
            $(document).keydown(function(event)
                    {
                        if(event.which === 27)
                            $("#titleBox").click();
                    });
            $("#titleBox").click(function()
                    {
                        if($(this).css("visibility") === "visible")
                            $("#titleBox").css("visibility", "invisible");
                    });
            var startXHR = new XMLHttpRequest();
            startXHR.onreadystatechange = function(event)
            {
                if(this.readyState === 4)
                {
                    comicNum = this.response.number;
                    maxComics = comicNum;
                    comics[comicNum] = new Comic(this.response.url, this.response.title);
                    showComic(comicNum);
                    startCaching(comicNum);
                }
            };
            startXHR.open("get", "newestComic.php");
            startXHR.send();
        });
