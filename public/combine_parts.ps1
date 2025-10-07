# Root folder to scan
$baseDir = Join-Path (Get-Location) "participants"

# Loop through each participant folder
Get-ChildItem -Path $baseDir -Directory | ForEach-Object {
    $participant = $_.Name
    $participantPath = $_.FullName

    # Loop through each subfolder (one level deep)
    Get-ChildItem -Path $participantPath -Directory | ForEach-Object {
        $subFolder = $_.Name
        $subFolderPath = $_.FullName
        $listFile = Join-Path $subFolderPath "concat_list.txt"
        $outputFile = "/data/participants/$participant/$subFolder.webm"

        # Collect all .webm files
        $lines = Get-ChildItem -Path $subFolderPath -Filter *.webm | Sort-Object Name | ForEach-Object {
            "file '/data/participants/$participant/$subFolder/$($_.Name)'"
        }

        if ($lines.Count -gt 0) {
            # Write concat list as UTF-8 without BOM
            [System.IO.File]::WriteAllLines($listFile, $lines, (New-Object System.Text.UTF8Encoding($false)))

            # Run ffmpeg inside docker
            docker run --rm -v "${baseDir}:/data/participants" -w /data linuxserver/ffmpeg `
                -f concat -safe 0 -i "/data/participants/$participant/$subFolder/concat_list.txt" -c copy $outputFile

            # Clean up
            Remove-Item $listFile

            Write-Host "✅ Combined $participant/$subFolder into $subFolder.webm"
        }
        else {
            Write-Host "⚠️  No .webm files found in $participant/$subFolder"
        }
    }
}
