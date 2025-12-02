<?php

/* Global context. */
class BuildContext
{
	public static string $workingDir = "";
	public static string $outDir = "";
	public static ?\Twig\Environment $twig = null;
};
