var BYTES_REGEX = /^[0-9A-F]+$/;
var BYTES_INPUT = document.getElementById("bytes-to-guid-bytes");

function bytesToGuid(byteStr)
{
    var output = "";

    // First part
    output += byteStr.substr(6, 2);
    output += byteStr.substr(4, 2);
    output += byteStr.substr(2, 2);
    output += byteStr.substr(0, 2);
    output += "-";
    
    // Second part
    output += byteStr.substr(10, 2);
    output += byteStr.substr(8, 2);
    output += "-";
    
    // Third part
    output += byteStr.substr(14, 2);
    output += byteStr.substr(12, 2);
    output += "-";
    
    // Fourth part
    output += byteStr.substr(16, 4);
    output += "-";

    output += byteStr.substr(20, 12);

    return output.toUpperCase();
}

BYTES_INPUT.addEventListener("input", () => {
    var text = BYTES_INPUT.value;
    var out = document.getElementById("guid-out");
    text = text.replaceAll(" ", "");
    if (text == "")
    {
        out.value = "";
        return;   
    }

    if (BYTES_REGEX.test(text) && text.length == 32)
    {
        out.value = bytesToGuid(text);
    }
    else
    {
        out.value = "Invalid bytes";
    }
});