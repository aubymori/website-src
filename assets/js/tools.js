/* == GUID to bytes == */

const GUID_REGEX = /^[{]?[0-9a-fA-F]{8}(-|_)([0-9a-fA-F]{4}(-|_)){3}[0-9a-fA-F]{12}[}]?$/;
const GUID_INPUT = document.getElementById("guid-to-bytes-guid");

function guidToBytes(guid)
{
    let text = guid.replace(/(^{|}$)/g, "");
    let output = "";

    // First part
    output += text.substr(6, 2);
    output += text.substr(4, 2);
    output += text.substr(2, 2);
    output += text.substr(0, 2);

    // Second part
    output += text.substr(11, 2);
    output += text.substr(9, 2);
    
    // Third part
    output += text.substr(16, 2);
    output += text.substr(14, 2);

    // Fourth part
    output += text.substr(19, 4);

    // Fifth part
    output += text.substr(24, 12);

    return output.toUpperCase();
}

GUID_INPUT.addEventListener("input", () => {
    let text = GUID_INPUT.value;
    let out = document.getElementById("guid-out");
    if (text == "")
    {
        out.value = "";
        return;
    }
    if (GUID_REGEX.test(text))
    {
        out.value = guidToBytes(text);
    }
    else
    {
        out.value = "Invalid GUID";
    }
});

/* == DEFINE_GUID generator == */

const DEFINE_GUID_NAME = document.getElementById("define-guid-name");
const DEFINE_GUID_GUID = document.getElementById("define-guid-guid");

function defineGuid(name, guid)
{
    let text = guid.replace(/(^{|}$)/g, "");
    let output = `DEFINE_GUID(${name}, `;

    // First part
    output += `0x${text.substr(0, 8).toUpperCase()}, `;

    // Second part
    output += `0x${text.substr(9, 4).toUpperCase()}, `;

    // Third part
    output += `0x${text.substr(14, 4).toUpperCase()}, `;

    // Fourth part
    output += `0x${text.substr(19, 2).toUpperCase()},0x${text.substr(21, 2).toUpperCase()}, `;

    // Fifth part
    output += `0x${text.substr(24, 2).toUpperCase()},`;
    output += `0x${text.substr(26, 2).toUpperCase()},`;
    output += `0x${text.substr(28, 2).toUpperCase()},`;
    output += `0x${text.substr(30, 2).toUpperCase()},`;
    output += `0x${text.substr(32, 2).toUpperCase()},`;
    output += `0x${text.substr(34, 2).toUpperCase()}`;
    

    output += ");";
    return output;
}

function updateDefineGuid()
{
    let name = DEFINE_GUID_NAME.value;
    let guid = DEFINE_GUID_GUID.value;
    let out = document.getElementById("define-guid-out");

    if (name == "" || guid == "")
    {
        out.textContent = "";
        return;
    }

    if (GUID_REGEX.test(guid))
    {
        out.textContent = defineGuid(name, guid);
    }
    else
    {
        out.textContent = "Invalid GUID";
    }
}

DEFINE_GUID_NAME.addEventListener("input", updateDefineGuid);
DEFINE_GUID_GUID.addEventListener("input", updateDefineGuid);

/* == SVG rasterizer == */
const SVG_RASTERIZER_INPUT = document.getElementById("svg-rasterizer-input");
const SVG_RASTERIZER_WIDTH = document.getElementById("svg-rasterizer-width");
const SVG_RASTERIZER_HEIGHT = document.getElementById("svg-rasterizer-height");
const SVG_RASTERIZER_OUTPUT = document.getElementById("svg-rasterizer-output");

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
    let width = SVG_RASTERIZER_WIDTH.value;
    let height = SVG_RASTERIZER_HEIGHT.value;
    SVG_RASTERIZER_OUTPUT.width = width;
    SVG_RASTERIZER_OUTPUT.height = height;
    SVG_RASTERIZER_OUTPUT.style.width = width + "px";
    SVG_RASTERIZER_OUTPUT.style.height = height + "px";

    let ctx = SVG_RASTERIZER_OUTPUT.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    let uri = svgToDataUri(SVG_RASTERIZER_INPUT.value);
    console.log(uri);
    let img = new Image();
    img.onload = function() {
        console.log("hi");
        ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = uri;
}

SVG_RASTERIZER_INPUT.addEventListener("input", rasterizeSvg);
SVG_RASTERIZER_WIDTH.addEventListener("input", rasterizeSvg);
SVG_RASTERIZER_HEIGHT.addEventListener("input", rasterizeSvg);