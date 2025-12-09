var GUID_REGEX = /^[{]?[0-9a-fA-F]{8}(-|_)([0-9a-fA-F]{4}(-|_)){3}[0-9a-fA-F]{12}[}]?$/;
var GUID_INPUT = document.getElementById("guid-to-bytes-guid");

function guidToBytes(guid)
{
    var text = guid.replace(/(^{|}$)/g, "");
    var output = "";

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
    var text = GUID_INPUT.value;
    var out = document.getElementById("guid-out");
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