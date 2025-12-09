<?php

function build_page(
	string $template_name,
	string $out_name = "",
	array  $data = [],
): void
{
	if (null === BuildContext::$twig)
	{
		$loader = new \Twig\Loader\FilesystemLoader(BuildContext::$workingDir . "/templates");
		BuildContext::$twig = new \Twig\Environment($loader, []);
	}

    if ($out_name == "")
    {
        $out_name = $template_name;
    }

	echo "Building page $out_name... (Template: $template_name)\n";
	try
	{
		$html = BuildContext::$twig->render("$template_name.html", $data);
        $out_file = BuildContext::$outDir . "/" . $out_name . ".html";
        @mkdir(
            dirname($out_file),
            recursive: true
        );
		file_put_contents($out_file, $html);
	}
	catch (\Throwable $e)
	{
		var_dump($e);
	}
}

// Delete the contents of a folder (and optionally itself)
function delete_contents(string $dir, bool $delete_self = false): void
{
    $entries = array_diff(scandir($dir), [".",".."]);
    foreach ($entries as $entry)
    {
        $path = "$dir/$entry";
        if (is_dir($path))
        {
            // Don't fuck up version control
            if ($delete_self || strtolower($entry) != ".git")
                delete_contents($path, true);
        }
        else
        {
            unlink($path);
        }
    }

    if ($delete_self)
        rmdir($dir);
}

/* Copy non-template assets */
function copy_contents(string $dir, string $target_dir): void
{
    $entries = array_diff(scandir($dir), [".",".."]);
    foreach ($entries as $entry)
    {
        $path = "$dir/$entry";
		$out = "$target_dir/$entry";
        if (is_dir($path))
        {
            mkdir($out);
            copy_contents($path, $out);
        }
        else
        {
            $out_file = $out;
            copy($path, $out_file);
        }
    }
}