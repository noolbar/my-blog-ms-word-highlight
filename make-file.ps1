param($codefile)

if (-not(Test-Path $codefile)) {exit};

$basePath = (Resolve-Path($codefile + "\..\..\output\")).Path;
if (-not(Test-Path $basePath)) {mkdir -p $basePath}

$outputfile = ($basePath + (ls $codefile).BaseName + ".html");
$code = cat $codefile

cmd.exe /c "%windir%\System32\cscript.exe //nologo //E:{1B7CD997-E5FF-4932-A7A6-2A9E636DA385} runWSH.jse.js `"$code`" `"$outputfile`""

if (-not(Test-Path ($basePath + "prism.css"))){cp ./res/prism.css $basePath}
$htmlstring = @"
<html>
<head>
<link href="./prism.css" rel="stylesheet" />
</head>
<body>
$(cat $outputfile)
</body>
</html>
"@

$htmlstring > $outputfile
