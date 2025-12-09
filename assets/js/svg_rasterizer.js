var SVG_RASTERIZER_INPUT = document.getElementById("svg-rasterizer-input");
var SVG_RASTERIZER_WIDTH = document.getElementById("svg-rasterizer-width");
var SVG_RASTERIZER_HEIGHT = document.getElementById("svg-rasterizer-height");
var SVG_RASTERIZER_OUTPUT = document.getElementById("svg-rasterizer-output");

function svgToDataUri(svgString)
{
    return "data:image/svg+xml," + svgString.replace("<svg",(~svgString.indexOf("xmlns")?"<svg":"<svg xmlns=\"http://www.w3.org/2000/svg\""))
        .replace(/"/g, "\"")
        .replace(/%/g, "%25")
        .replace(/#/g, "%23")       
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")         
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E")
        .replace(/\s+/g," ");
}

function rasterizeSvg()
{
    var width = SVG_RASTERIZER_WIDTH.value;
    var height = SVG_RASTERIZER_HEIGHT.value;
    SVG_RASTERIZER_OUTPUT.width = width;
    SVG_RASTERIZER_OUTPUT.height = height;
    SVG_RASTERIZER_OUTPUT.style.width = width + "px";
    SVG_RASTERIZER_OUTPUT.style.height = height + "px";

    var ctx = SVG_RASTERIZER_OUTPUT.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    var uri = svgToDataUri(SVG_RASTERIZER_INPUT.value);
    console.log(uri);
    var img = new Image();
    img.onload = function() {
        console.log("hi");
        ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = uri;
}

SVG_RASTERIZER_INPUT.addEventListener("input", rasterizeSvg);
SVG_RASTERIZER_WIDTH.addEventListener("input", rasterizeSvg);
SVG_RASTERIZER_HEIGHT.addEventListener("input", rasterizeSvg);