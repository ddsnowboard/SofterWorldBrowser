function Comic(url, title)
{
    this.url = url;
    this.title = title;
}
$(document).ready(function() 
        {
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
            // This XHR should go get the first comic and load it, and when it's done, it 
            // should start loading all the other ones.
        });
