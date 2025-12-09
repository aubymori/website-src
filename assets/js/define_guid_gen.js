var GUID_REGEX = /^[{]?[0-9a-fA-F]{8}(-|_)([0-9a-fA-F]{4}(-|_)){3}[0-9a-fA-F]{12}[}]?$/;

var DEFINE_GUID_NAME = document.getElementById("define-guid-name");
var DEFINE_GUID_GUID = document.getElementById("define-guid-guid");

function defineGuid(name, guid)
{
    var text = guid.replace(/(^{|}$)/g, "");
    var output = `DEFINE_GUID(${name}, `;

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
    var name = DEFINE_GUID_NAME.value;
    var guid = DEFINE_GUID_GUID.value;
    var out = document.getElementById("define-guid-out");

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