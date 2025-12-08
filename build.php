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
build_page("404", "404");
build_page("desktops", "desktops");