<?php
require "vendor/autoload.php";
require "context.php";
require "functions.php";

/* Setup */

$out_dir = "C:\\xampp\\htdocs";
$out_dir_env = getenv("WEBSITE_OUT_DIR");
if ($out_dir_env !== false)
{
    $out_dir = $out_dir_env;
}
BuildContext::$outDir = $out_dir;
BuildContext::$workingDir = realpath(dirname(__FILE__));

$prod_mode = ("--prod" == @$argv[1]);

/* Assets */

$assets_dir = BuildContext::$outDir . "/assets";
$is_dir = is_dir($assets_dir);
$is_link = is_link($assets_dir);

/* is dir AND link (windows symlink) */
if ($is_dir && $is_link)
{
    rmdir($assets_dir);
}
/* is dir (prod) */
else if ($is_dir)
{
    delete_contents($assets_dir, true);
}
/* is link (unix symlink) actually idk but being safe ig */
else if (is_link($assets_dir))
{
    unlink($assets_dir);
}

if ($prod_mode)
{
    /* Copy assets */
    mkdir($assets_dir, recursive: true);
    copy_contents(BuildContext::$workingDir . "/assets", $assets_dir);

    /* Remove Apache .htaccess */
    @unlink(BuildContext::$outDir . "/.htaccess");

    /* Add GitHub 404.md */
    file_put_contents(BuildContext::$outDir . "/404.md",
        "---\n" .
        "permalink: /404.html\n" .
        "---"
    );
}
else
{
    /* Symlink assets */
    symlink(BuildContext::$workingDir . "/assets", $assets_dir);

    /* Remove GitHub 404.md */
    @unlink(BuildContext::$outDir . "/404.md");

    /* Add Apache .htaccess */
    copy(
        BuildContext::$workingDir . "/.htaccess",
        BuildContext::$outDir     . "/.htaccess");   
}

/* Copy favicon */
copy(
    BuildContext::$workingDir . "/favicon.ico",
    BuildContext::$outDir     . "/favicon.ico");

/* Pages */

build_page("home", "index");
build_page("404");
build_page("desktops");

$files = [
    (object)[
        "title" => "Classic UAC",
        "id" => "classic_uac",
        "name" => "1607uac.zip",
        "preview" => (object)[
            "image" => "classic-uac-preview.png",
            "alt" => "Classic User Account Control GUI"
        ],
        "description" => <<<MULTILINE
            Files necessary to restore the classic DirectUI User Account Control GUI Windows 10 versions 1703 and up. x86-64 only.

            <b>NOTE: This is deprecated. You should check out <a href="https://get-ntmu.github.io/#!/pack/classicuac">the NTMU pack</a>
            instead.</b>
            MULTILINE
    ],
    (object)[
        "title" => "StartIsBack++ Patch",
        "id" => "sib_patch",
        "name" => "HelpPaneandSIBMods.7z",
        "preview" => (object)[
            "image" => "sib-patch-preview.png",
            "alt" => "Start menu with the SIB++ patch"
        ],
        "description" => <<<MULTILINE
            Patched StartIsBack++ 2.9.19 DLL which adds the "Help and Support" right pane item as an option, reduces padding in the programs list, and restores scrollbars all with the goal of improving accuracy to Windows 7. x86-64 only.

            You should probably use <a href="https://winclassic.net/thread/2588/explorer7-windows-explorer-10-11">explorer7</a>
            instead but I will keep this up for historical purposes.
            MULTILINE
    ],
    (object)[
        "title" => "Old Ease of Access Files",
        "id" => "old_utilman",
        "name" => "old-utilman.zip",
        "preview" => (object)[
            "image" => "old-utilman-preview.png",
            "alt" => "Old Ease of Access"
        ],
        "description" => <<<MULTILINE
            Files necessary to restore the Windows 7 Ease of Access dialog on the
            logon UI.

            <a target="_blank" href="https://winclassic.net/thread/2345/windows-7-ease-access-dialog">
                Instructions
            </a>

            <b>NOTE: This is deprecated. You should check out
            <a href="https://get-ntmu.github.io/#!/pack/old-utilman">the NTMU pack</a>
            instead.</b>
            MULTILINE
    ],
    (object)[
        "title" => "Custom CMD Version Text Files",
        "id" => "custom_cmd_ver_text",
        "name" => "CustomCmdVerText.zip",
        "preview" => (object)[
            "image" => "custom-cmd-ver-text-preview.png",
            "alt" => "CMD with custom version text"
        ],
        "description" => <<<MULTILINE
            Files necessary to change the CMD version text without breaking batch scripts.
            Instructions included.

            <b>
            NOTE: This is deprecated You should check out
            the <a href="https://windhawk.net/mods/custom-cmd-startup-text">Custom Command Prompt
            Startup Text</a> Windhawk mod instead.
            </b>
            MULTILINE
    ],
    (object)[
        "title" => "Windows 7 Network Flyout",
        "id" => "win7_network_flyout",
        "name" => "pnidui.zip",
        "preview" => (object)[
            "image" => "win7-network-flyout-preview.png",
            "alt" => "Windows 7 Network Flyout on Windows 10"
        ],
        "description" => <<<MULTILINE
            Files necessary to restore the Windows 7 Network Flyout
            Windows 10. Only en-US included, installer also included.
            
            <b>
            NOTE: This is deprecated. You should check out
            <a href="https://get-ntmu.github.io/#!/pack/win7-tray-items">the NTMU pack</a>
            instead.
            </b>
            MULTILINE
    ],
    (object)[
        "title" => "Windows 7 Tray Icons Pack",
        "id" => "win7_tray_pack",
        "name" => "win7tray.zip",
        "preview" => (object)[
            "image" => "win7-tray-pack-preview.png",
            "alt" => "Windows 7 Tray Icons"
        ],
        "description" => <<<MULTILINE
            Files for all the various Windows 7 tray icons
            and flyouts (excluding clock). Comes with an installer.
            en-US only.
            
            <b>
            NOTE: This is deprecated. You should check out
            <a href="https://get-ntmu.github.io/#!/pack/win7-tray-items">the NTMU pack</a>
            instead.
            </b>
            MULTILINE
    ],
    (object)[
        "title" => "Windows Games Explorer",
        "id" => "gameux",
        "name" => "gameux.zip",
        "preview" => (object)[
            "image" => "gameux-preview.png",
            "alt" => "Games Explorer"
        ],
        "description" => <<<MULTILINE
            Files to restore the Games Explorer in later Windows
            10. en-US only, installer included.
            
            <b>
            NOTE: This is deprecated. You should check out
            <a href="https://get-ntmu.github.io/#!/pack/gameux">the NTMU pack</a>
            instead.
            </b>
            MULTILINE
    ],
    (object)[
        "title" => "Windows XP Summary Tab",
        "id" => "docprop2",
        "name" => "docprop2.zip",
        "preview" => (object)[
            "image" => "docprop2-preview.png",
            "alt" => "Summary Tab"
        ],
        "description" => <<<MULTILINE
            Files to restore the "Summary" tab from Windows XP to Windows 10's
            properties dialog. Instructions included.
            MULTILINE
    ],
];

$subnav_data = (object)[
    "subnav" => (object)[
        "title" => "Files",
        "items" => [],
    ]
];
foreach ($files as $file)
{
    $subnav_data->subnav->items[] = (object)[
        "title" => $file->title,
        "url" => "/files/" . $file->id
    ];
}

foreach ($files as $i => $file)
{
    $data = $subnav_data;
    $data->subnav->items[$i]->selected = true;

    $data->file = $file;
    // Ensure uniform line endings
    $data->file->description = str_replace("\r\n", "\n", $data->file->description);
    // Convert double newlines into single newlines and delete
    // single newlines
    $data->file->description = preg_replace("/\n(?!\n)/", " ", $data->file->description);

    $filesize = filesize(BuildContext::$workingDir . "/assets/files/" . $file->name);
    $suffixes = [ " bytes", " KB", " MB", " GB" ];
    $factor = min(floor((strlen((string)$filesize) - 1) / 3), count($suffixes) - 1);
    $formatted_filesize = sprintf("%.2f", $filesize / pow(1024, $factor)) . $suffixes[$factor];

    $data->file->size = $formatted_filesize;

    build_page("files", "files/" . $file->id, (array)$data);

    $data->subnav->items[$i]->selected = false;
}