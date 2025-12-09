/*** IMAGE VIEWER ***/

var imageViewer = {
    width: 0,
    height: 0,
};

function updateImageSize()
{
    var width = imageViewer.width;
    var height = imageViewer.height;

    var docWidth = document.documentElement.clientWidth * .9;
    var docHeight = document.documentElement.clientHeight * .9;

    var aspectRatio = width / height;
    var docRatio = docWidth / docHeight;

    var scaledWidth = width;
    var scaledHeight = height;
    if (width > docWidth || height > docHeight)
    {
        if (aspectRatio < docRatio)
        {
            scaledWidth = width * (docHeight / height);
            scaledHeight = docHeight;
        }
        else
        {
            scaledWidth = docWidth;
            scaledHeight = height * (docWidth / width);
        }
    }

    var imageEl = document.getElementById("image-viewer-image");
    imageEl.width = scaledWidth;
    imageEl.height = scaledHeight;
}

document.addEventListener("click", function(event)
{
    var el = event.target;
    if (el.tagName == "IMG"
    && el.classList.contains("viewable"))
    {
        var img = new Image();
        img.onload = function()
        {
            imageViewer.width = img.width;
            imageViewer.height = img.height;
            
            document.getElementById("image-viewer-image").src = img.src;
            document.getElementById("image-viewer-link").href = img.src;

            updateImageSize();
            document.body.classList.add("image-viewer-visible");
        };
        img.src = el.src;
    }
    else if (el.id == "image-viewer")
    {
        document.body.classList.remove("image-viewer-visible");
    }
});

window.addEventListener("resize", function()
{
    if (document.body.classList.contains("image-viewer-visible"))
        updateImageSize();
});

document.addEventListener("keydown", function(event)
{
    if (event.key == "Escape"
    && !event.ctrlKey
    && !event.shiftKey
    && !event.altKey)
        document.body.classList.remove("image-viewer-visible");
});